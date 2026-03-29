const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  
  // MANUAL LOGIN: Only exists if they didn't use Google
  password: { type: String }, 
  
  // GOOGLE LOGIN: Only exists if they used Google
  googleId: { type: String }, 
  
  // SHARED HEALTH DATA (Required for ML Model)
  age: { type: Number, default: 25 }, 
  isSmoker: { type: Boolean, default: false },
  hasAsthma: { type: Boolean, default: false },
  isProfileComplete: { type: Boolean, default: false }
});