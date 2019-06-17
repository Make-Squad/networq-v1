const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const userSchema = mongoose.Schema({
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
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  profilePhotoUrl: {
    type: String, 
  },
  photos: {
    type: Array,
  },
  employer: {
    type: String,
  },
  employmentStatus: {
    type: String,
  },
  jobTitle: {
    type: String,
    required: true, // if unemployed put what you'd like to have
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
  admin : {
    type: Boolean, 
    default: false 
  }
});

// custom validators
userSchema.path('email').validate(function(v) {
  return validator.isEmail(v);
});

// authenticate a user
userSchema.statics.authenticate = async function(email, password) {
  const user = await this.find({ email: email }).limit(1).lean();
  if(user.length > 0) {
    const match = await bcrypt.compare(password, user[0].password);
    if(match) {
      user[0].password = null;
      user[0].__v = null;
      return user[0];
    }
    return Promise.reject(new Error(`Invalid Password.`));
  }
  return Promise.reject(new Error(`Email not found.`));
}

// hash the password before saving a new user
userSchema.pre('save', async function() {
  this.password = await bcrypt.hash(this.password, 10);
});

module.exports = mongoose.model('User', userSchema);
