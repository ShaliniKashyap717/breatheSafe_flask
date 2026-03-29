const mongoose = require('mongoose');

const healthLogSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },

  locationName: { type: String, required: true },

  coordinates: { type: [Number], required: true }, // [lng, lat]
  
  // environmental snapshot
  aqiSnapshot: {
    pm2_5: Number,
    pm10: Number,
    no2: Number,
    temp: Number,
    humidity: Number
  },

  // model output
  healthRiskScore: { type: Number, required: true },
  
  // includes both old + new status labels
  riskStatus: { 
    type: String, 
    enum: ['Safe', 'Elevated Sensitivity', 'Critical Exposure', 'Low Risk', 'Medium Risk', 'High Risk'] 
  },
  
  mainDriver: { type: String },
  recommendation: { type: String },

  // derived metrics
  scientificMetrics: {
    effectivePm25: { type: Number },      // pm2.5 after mask
    safeWindowHours: { type: Number },    // safe outdoor time
    filterEfficiency: { type: String }    // mask efficiency
  },

  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('HealthLog', healthLogSchema);
