/*
 *  networq Main Server
 */
/** Require environment variable(s) */
require('dotenv').config();

/** Require middlewares */
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const path = require('path');

/** Instantiate server */
const app = express();
const PORT = process.env.PORT || 3000;

/** Use middlewares */
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json({ limit: '70mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '70mb', extended: true }));
app.use(methodOverride('_method'));
app.use(cookieParser());

/** Custom auth-checking middleware */
const checkAuth = (req, res, next) => {
    if (typeof req.cookies.faceToken === 'undefined' || req.cookies === null) {
        req.user = null;
    } else {
        const token = req.cookies.faceToken;
        const decodedToken = jwt.decode(token, { complete: true }) || {};
        req.user = decodedToken.payload;
    }
    next();
};

app.use(checkAuth);

/** Database connection */
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/networq', {
    useNewUrlParser: true
});
mongoose.set('useCreateIndex', true);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected successfully.');
});

/** Require controller(s) */
require('./controllers/index')(app);
// require('./controllers/auth')(app);
// require('./controllers/users')(app);

/** Port listener */
app.listen(PORT, () => {
    console.log('networq app listening on port', PORT);
});

module.exports = app;
