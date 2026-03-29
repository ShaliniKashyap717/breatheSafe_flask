const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  location: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, default: 'submitted' },
  timestamp: { type: Date, default: Date.now },
  coordinates: { type: [Number], required: true },
});

module.exports = mongoose.model('Report', reportSchema);
