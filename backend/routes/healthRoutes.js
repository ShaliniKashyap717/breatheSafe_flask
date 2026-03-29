const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const HealthLog = require('../models/HealthLog');
const { getHealthRiskAssessment } = require('../services/mlService');

/**
 * POST: /api/health/check
 * triggers ml inference and persists a health snapshot
 */
router.post('/check', async (req, res) => {
  try {
    const { userId, userData, aqiData, locationName, coordinates } = req.body;

     
const safeUserId = userId || new mongoose.Types.ObjectId();

    // delegate prediction to ml_service 
    const prediction = await getHealthRiskAssessment(userData, aqiData);

    // short-circuit if service is unavailable
    if (!prediction) {
      return res.status(503).json({ 
        message: "Health Risk Service is temporarily unavailable. Please try again later." 
      });
    }

    // map request + prediction into schema
    const newLog = new HealthLog({
      userId: safeUserId,
      locationName,
      coordinates,
      aqiSnapshot: {
        pm2_5: aqiData.iaqi?.pm25?.v || 0,
        pm10: aqiData.iaqi?.pm10?.v || 0,
        no2: aqiData.iaqi?.no2?.v || 0,
        temp: aqiData.iaqi?.t?.v || 0,
        humidity: aqiData.iaqi?.h?.v || 0
      },
      healthRiskScore: prediction.risk_score,
      riskStatus: prediction.status,
      mainDriver: prediction.main_driver,
      recommendation: prediction.recommendation,

      // derived metrics from model response
      scientificMetrics: {
        effectivePm25: prediction.scientific_metrics?.effective_pm25 || 0,
        safeWindowHours: prediction.scientific_metrics?.safe_window_hours || 0,
        filterEfficiency: prediction.scientific_metrics?.filter_efficiency || "0%"
      }
    });

    const savedLog = await newLog.save();

    res.status(200).json(savedLog);

  } catch (err) {
    console.error("Health Route Error:", err.message);
    res.status(500).json({ message: "Internal Server Error processing health check." });
  }
});

// GET: /api/health/history/:userId
// returns latest logs for dashboard 
router.get('/history/:userId', async (req, res) => {
  try {
    const logs = await HealthLog.find({ userId: req.params.userId })
      .sort({ timestamp: -1 })
      .limit(10);
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
