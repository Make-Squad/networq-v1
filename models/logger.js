const mongoose = require('mongoose');

const LoggerSchema = mongoose.Schema({
  ip: {
    type: String,
    required: true,
    default: 'unknown'
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  }
});

module.exports = mongoose.model('Logger', LoggerSchema)