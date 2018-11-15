const passport = require('passport');
const mongoose = require('mongoose');
const { user } = require('../models');
const authKeys = require('../config/keys');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

