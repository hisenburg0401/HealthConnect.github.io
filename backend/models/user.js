const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // ensures email is unique
  },
  password: {
    type: String,
    required: true,
  }
});

// Create User model based on schema
const User = mongoose.model('User', userSchema);

module.exports = User;
