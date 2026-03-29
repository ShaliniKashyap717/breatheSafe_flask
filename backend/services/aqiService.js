const axios = require('axios');
const redis = require('redis');

// initialized Redis Client
const redisClient = redis.createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379'
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.connect();

const getAQIData = async (lat, lon) => {
  // created a unique key based on coordinates
  const cacheKey = `aqi:${lat.toFixed(2)}:${lon.toFixed(2)}`;

  try {
    // checking if data exists in Cache
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      console.log('Serving from Cache');
      return JSON.parse(cachedData);
    }

    // if cache miss - fetch from API
    console.log('Fetching from API...');
    const waqiApiToken = process.env.WAQI_API_TOKEN;
    const url = `https://api.waqi.info/feed/geo:${lat};${lon}/?token=${waqiApiToken}`;
    
    const response = await axios.get(url);
    const data = response.data.data;

    // saved to Redis with TTL of 15 min 
    if (response.data.status === 'ok') {
      await redisClient.setEx(cacheKey, 900, JSON.stringify(data));
      return data;
    }
    
    return null;
  } catch (error) {
    console.error('AQI Service Error:', error.message);
    return null;
  }
};