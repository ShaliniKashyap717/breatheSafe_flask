const cron = require('node-cron');
const User = require('../models/User');
const { getAQIData } = require('../services/aqiService');
const { sendAqiEmail } = require('../services/emailService');

const initCronJobs = () => {
  // Runs at 11:30 AM daily
  cron.schedule('30 11 * * *', async () => {
    console.log('🚀 Starting Daily AQI Email Batch...');
    
    const users = await User.find({ "location.latitude": { $exists: true } });

    // Using Promise.allSettled so one user's failure doesn't stop the loop
    const results = await Promise.allSettled(users.map(async (user) => {
      const { latitude, longitude } = user.location;
      
      // 1. Fetch data (This now uses our REDIS caching automatically!)
      const aqiData = await getAQIData(latitude, longitude);
      if (!aqiData) return;

      // 2. Send Email
      return await sendAqiEmail(user, aqiData);
    }));

    console.log(`✅ Batch complete. Processed ${results.length} users.`);
  });
};

module.exports = { initCronJobs };