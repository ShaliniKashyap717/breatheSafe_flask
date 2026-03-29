const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

// If using Node.js in CommonJS mode, fetch isn't globally available — so polyfill it:
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const WAQI_API_TOKEN = process.env.WAQI_API_TOKEN;

exports.getAqiInsightsFromBackend = async (req, res) => {
  try {
    const location = req.query.location || 'Delhi'; // default for testing

    // Detect if location is coordinates
    const coordPattern = /^-?\d+\.?\d*,-?\d+\.?\d*$/;
    const isCoordinates = coordPattern.test(location.replace(/\s/g, ''));

    let url;
    if (isCoordinates) {
      const [lat, lng] = location.split(',').map(coord => coord.trim());
      url = `https://api.waqi.info/feed/geo:${lat};${lng}/?token=${WAQI_API_TOKEN}`;
    } else {
      url = `https://api.waqi.info/feed/${encodeURIComponent(location)}/?token=${WAQI_API_TOKEN}`;
    }

    const waqiResponse = await fetch(url);
    const waqiData = await waqiResponse.json();

    if (waqiData.status !== 'ok' || !waqiData.data) {
      return res.status(400).json({ error: 'Failed to fetch air quality data' });
    }

    const data = waqiData.data;

    const today = {
      aqi: data.aqi || 0,
      temp: data.iaqi?.t?.v || 0,
      humidity: data.iaqi?.h?.v || 0,
      visibility: data.iaqi?.p?.v ? Math.round(data.iaqi.p.v / 100) : 10
    };



    const prompt = `
You are an environmental health advisor. Analyze the air quality and weather in ${data.city?.name || location}.

Today's:
- AQI: ${today.aqi}
- Temp: ${today.temp}°C
- Humidity: ${today.humidity}%
- Visibility: ${today.visibility} km



Tasks:
1. Summarize today's air quality nd compare factors.
2. Comment on how temperature and humidity may be influencing AQI.
3. Mention short-term health risks / impact (breathing issues, headaches, etc.) especially for sensitive groups (kids, elderly, asthma patients).
4. If AQI is poor, recommend actions (e.g., stay indoors, use masks).

Avoid technical jargon. Use clear and concise actionable suggestions.
`.trim();

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const summary = response.text();


    console.log(prompt);
    console.log("Generated Summary:", summary);
    res.json({
      summary
    });

  } catch (error) {
    console.error("Backend summary generation failed:", error);
    res.status(500).json({ error: 'Failed to generate summary' });
  }
};
