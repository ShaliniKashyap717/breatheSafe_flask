const HealthLog = require('../models/HealthLog'); // Your Mongoose Model
const { getHealthRiskAssessment } = require('../services/mlService'); // The file you just shared
const aiService = require('../services/aiService'); // The new service we talked about

exports.processHealthCheck = async (req, res) => {
    try {
        const { aqiData, userData } = req.body;
        const userId = req.user.id; // From Auth Middleware

        // 1. Get Prediction from ML Service (Port 8001)
        const prediction = await getHealthRiskAssessment(userData, aqiData);
        
        if (!prediction) {
            return res.status(500).json({ message: "ML Service failed to provide assessment" });
        }

        // 2. Save to MongoDB (The "Source of Truth")
        const newLog = new HealthLog({
            userId,
            location: aqiData.location || "Unknown",
            aqi: aqiData.aqi,
            riskStatus: prediction.riskStatus, // e.g. "High Risk"
            recommendation: prediction.recommendation,
            scientificMetrics: prediction.scientificMetrics,
            timestamp: new Date()
        });

        const savedLog = await newLog.save();

        // 3. Sync to AI Memory (Port 8002) - "Fire and Forget"
        // We map the risk string to match the Python Pydantic validator
        const riskMap = {
            "Low Risk": "low",
            "Moderate Risk": "moderate",
            "High Risk": "high",
            "Very High Risk": "very_high",
            "Hazardous": "hazardous"
        };

        const aiPayload = {
            user_id: String(userId),
            log_data: {
                aqi: Number(savedLog.aqi),
                risk: riskMap[savedLog.riskStatus] || "moderate",
                location: String(savedLog.location)
            }
        };

        // Don't 'await' here so the frontend gets the response faster
        aiService.syncHealthMemory(aiPayload).catch(err => {
            console.error("AI Memory Sync Error:", err.response?.data || err.message);
        });

        // 4. Return the result to the Frontend
        res.status(200).json(savedLog);

    } catch (error) {
        console.error("Health Controller Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};