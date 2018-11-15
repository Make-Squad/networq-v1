require('dotenv').config();
process.env.NODE_ENV = process.env.NODE_ENV || 'development'; // if NODE_ENV not set, then assume we are in development
const authKeys = require("./config/keys");
const cookieSession = require("cookie-session");
const helmet = require('helmet');
const express = require("express");
const path = require("path");
const controllers = require('./controllers');
const { db } = require('./services');
const { limiter, notFoundHandler, errorHandler } = require('./middlewares');
const app = express();
const port = process.env.PORT || "5000";

// Connect to MongoDb
db.connect();

// Setup express to return json
app.use(express.json());

// Setup express to use client-side cookies, req.session is used to referrence and destroy
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [authKeys.cookieKey]
  })
);

/*
>> Helmet sets various HTTP headers to make our app more secure <<
referrerPolicy() sets policy to no-referrer. This option is useful to hide that
the app is using nginx as a reverse proxy if configured in such a way (reccommended)
*/
app.use(helmet.referrerPolicy())

// Apply our rate limiter middleware to all routes
app.use(limiter);

// In production, serve our built react app with express
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "public", "index.html"));
  });
}

/*
>> Import our controllers as routes to be used by Express <<
We must make sure the controller is not a destructured import
such as the models that we import in the controllers.
*/
for (var i in controllers) {
  if (Object.getPrototypeOf(controllers[i]) == express.Router) {
    app.use("/api/v1", controllers[i]);
  }
}

// If no routes found then send to notFoundHandler
app.use(notFoundHandler);

// All errors will be sent here and will send a json error message
app.use(errorHandler);

// Start our express server
app.listen(port, () => {
  console.log('\x1b[35m%s\x1b[0m', `\nExpress listening for requests on port ${port}\n`);
});

// Export our express server to be used for tests
module.exports = app;