module.exports = (req, res, next) => {

  // If user is admin, allow access
  if (req.user.admin) return next();

  // Otherwise forward error message to errorHandler and set http status to 401-Unauthorized
  res.status(401);
  return next(new Error(`Not Authorized - ${req.method} ${req.originalUrl}`));
};
