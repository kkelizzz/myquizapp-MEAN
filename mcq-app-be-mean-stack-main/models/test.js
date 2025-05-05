const mongoose = require('mongoose');

// Test schema
const testSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  timeLimit: {
    type: Number, // in minutes
    required: true
  }
});

const Test = mongoose.model('Test', testSchema);

module.exports = Test;
