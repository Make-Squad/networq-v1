const router = require('express').Router();

router.get('/', (req, res, next) => {
  res.json({
    message: `Welcome to networq api! 🎉`
  });
});

module.exports = router;