const nodemailer = require('nodemailer');
require('dotenv').config(); 


const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// function to generate email HTML
const generateEmailTemplate = (user, aqiData) => {
  const { aqi, dominentpol, iaqi, city, forecast, time, attributions } = aqiData;

  const iaqiDetails = Object.entries(iaqi || {})
    .map(([pollutant, data]) => `<li><strong>${pollutant.toUpperCase()}:</strong> ${data.v || "N/A"}</li>`)
    .join("");

  const weatherDetails = `
    <p><strong>Temperature:</strong> ${iaqi.temp?.v || "N/A"} °C</p>
    <p><strong>Humidity:</strong> ${iaqi.h?.v || "N/A"}%</p>
    <p><strong>Pressure:</strong> ${iaqi.p?.v || "N/A"} hPa</p>
    <p><strong>Wind:</strong> ${iaqi.w?.v || "N/A"} m/s</p>
  `;

  const forecastDetails = forecast?.daily
    ? Object.entries(forecast.daily)
        .map(([pollutant, data]) => {
          const entries = data.map(entry => `<li>${entry.day}: Min ${entry.min}, Max ${entry.max}</li>`).join("");
          return `<li><strong>${pollutant.toUpperCase()}</strong>: <ul>${entries}</ul></li>`;
        })
        .join("")
    : "<p>No forecast data available.</p>";

  return `
    <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto; border:1px solid #ddd; padding:20px; border-radius:10px;">
      <h1 style="color:#4CAF50; text-align:center;">🌍 Daily Air Quality Report</h1>
      <p>Hi <strong>${user.name}</strong>,</p>
      <p>Your daily air quality update for <strong>${city?.name || "Unknown Location"}</strong>:</p>

      <h2 style="color:#FF5722;">Current AQI</h2>
      <p><strong>AQI:</strong> ${aqi}</p>
      <p><strong>Dominant Pollutant:</strong> ${dominentpol || "Unknown"}</p>

      <h2 style="color:#2196F3;">Individual Pollutants</h2>
      <ul style="list-style:none; padding:0;">${iaqiDetails || "<li>No data available</li>"}</ul>

      <h2 style="color:#9C27B0;">Weather Details</h2>
      ${weatherDetails}

      <h2 style="color:#009688;">Forecast</h2>
      <ul style="list-style:none; padding:0;">${forecastDetails}</ul>

      <p><strong>Data Time:</strong> ${time?.s || "Unknown"}</p>
      <hr>
      <footer style="text-align:center; font-size:12px; color:gray;">
        Sent by Airify - Your Personal AQI Assistant
        <br>
        Source: ${attributions?.map(attr => attr.url).join(", ") || "Not Available"}
      </footer>
    </div>
  `;
};

// function to send email
const sendAqiEmail = async (user, aqiData) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: " Your Daily Air Quality and Weather Report",
      html: generateEmailTemplate(user, aqiData),
    });
    console.log(`Email sent to ${user.email}`);
  } catch (error) {
    console.error(`Email failed for ${user.email}:`, error.message);
  }
};

module.exports = { sendAqiEmail };
