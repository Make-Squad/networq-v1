const router = require('express').Router();
const { user } = require('../models');

// CREATE A USER
router.post('/users', (req, res, next) => {
  user.create(req.body).then(user => {
    user.password = null;
    user.__v = null;
    req.session.user = user;
    // console.log(req.session.user);
    res.json({
      message: "User created successfully!"
    });
  }).catch(error => {
    next(error);
  });
});

// LOGIN A USER
router.post('/users/login', (req, res, next) => {
  user.authenticate(req.body.email, req.body.password).then(user => {
    req.session.user = user;
    res.json({
      message: "User logged in successfully!"
    });
  }).catch(error => {
    next(error);
  });
});

// LOGOUT A USER
router.post('/users/logout', (req, res, next) => {
  req.session = null;
  res.json({
    message: "User logged out successfully! Go smoke some weed!"
  });
});

module.exports = router;