const { logger } = require('../models');

module.exports = function(error, req, res, next) {
  // If the error was a rate limit then we want to log the incident in the database
  if(res.statusCode == 429) {
    logger.find({ ip: req.ip }).sort({ date: -1 }).limit(1).lean().then(result => {
      if(result.length > 0) {
        const current = new Date();
        if(current.getTime() - result[0].date.getTime() > 60000) { // in ms, should be the same as limiter duration
          logger.create({ ip: req.ip }).then(log => {
            console.log('\x1b[35m%s\x1b[0m',`[${log.date.toLocaleTimeString()}] ${log.ip} has been rate limited`);
          })
        }
      }
    })
  }
  res.status(res.statusCode || 500);
  res.json({
    error: error.message
  });
};