const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // Adding Role-Based Access Control
  role: { 
    type: String, 
    enum: ['Member', 'Admin', 'Project Manager'], 
    default: 'Member' 
  }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);