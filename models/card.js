const mongoose = require('mongoose');
const validator = require('validator');

const cardSchema = mongoose.Schema({
  firstName : {
    type: String,
    required: true,
  },
  lastName : {
    type: String,
    required: true,
  },
  phone : {
    type: String,
    minlength: 7,
  },
  email: {
    type: String,
    index: true,
    unique: true,
    minlength: 6,
  },
  employer: {
    type: String,
  },
  jobTitle: {
    type: String,
    required: true,
    minlength: 5,
  },
  jobDescription: {
    type: String,
    minlength: 10,
  },
  city: {
    type: String,
    minlength: 2,
  },
  state: {
    type: String,
    minlength: 2,
  },
  zip: {
    type: Number,
    minlength: 5
  },
});


module.exports = mongoose.model('Card', cardSchema);
