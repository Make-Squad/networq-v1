module.exports = (req, res, next) => {

  // If user is logged in, allow access
  if (req.user) return next();

  // Otherwise forward error message to errorHandler and set http status to 401-Unauthorized
  res.status(401);
  return next(new Error(`You must log in!`));
};
