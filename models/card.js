const mongoose = require('mongoose');
const validator = require('validator');

const cardSchema = mongoose.Schema({
  firstName : {
    type: String,
    required: true
  },
  lastName : {
    type: String,
    required: true
  },
  phone : {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    index: true,
    unique: true,
    minlength: 6
  },
});


module.exports = mongoose.model('Card', cardSchema);
