module.exports = function(req, res, next) {
  res.status(404);
  next(new Error(`Not Found - ${req.method} ${req.originalUrl}`));
};