const express = require("express");
const app = express();
const port = process.env.PORT || "5000";

const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/networq",
  { useNewUrlParser: true },
  () => {
    console.log("Connected to networq database");
  }
);

const authKeys = require("./config/keys");

const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [authKeys.cookieKey]
  })
);


if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "public", "index.html"));
  });
}

app.listen(port, () => {
  console.log("wooot");
});
