const axios = require('axios');
require('dotenv').config(); 

/**
 * connects to python ml service for health risk prediction
 */
const getHealthRiskAssessment = async (user, aqiData) => {
  try {
    // map aqicn data to model input format

    const payload = {
      pm2_5: aqiData.iaqi?.pm25?.v || 0,
      pm10: aqiData.iaqi?.pm10?.v || 0,
      no2: aqiData.iaqi?.no2?.v || 0,
      nox: aqiData.iaqi?.no?.v || 0, 
      no: aqiData.iaqi?.no?.v || 0,
      at: aqiData.iaqi?.t?.v || 25,
      ozone: aqiData.iaqi?.o3?.v || 0,
      co: aqiData.iaqi?.co?.v || 0,
      nh3: 0,
      so2: aqiData.iaqi?.so2?.v || 0,
      benzene: 0,
      toluene: 0,
      xylene: 0,
      temp: aqiData.iaqi?.t?.v || 20,
      rh: aqiData.iaqi?.h?.v || 50,
      ws: aqiData.iaqi?.w?.v || 1,
      wd: 180,
      sr: 100,
      rf: 0,
      bp: aqiData.iaqi?.p?.v || 1013,
      vws: 0,
      age: user.age || 25,
      mask_type: user.mask_type || 0,
      is_smoker: user.is_smoker ? 1 : 0,
      has_asthma: user.has_asthma ? 1 : 0
    };

    // call ml api
    const response = await axios.post(process.env.ML_SERVICE_URL, payload);

    return response.data.data; 

  } catch (error) {
    // log error from ml service
    const errorDetail = error.response?.data?.detail || error.message;
    console.error("ML Service Connection Error:", errorDetail);
    
    return null; 
  }
};

module.exports = { getHealthRiskAssessment };
