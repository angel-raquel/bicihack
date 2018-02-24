require('dotenv').config();
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
var schedule = require('node-schedule');

const bicimad = require('./configs/bicimad')
var schedule = schedule.scheduleJob('*/15 * * * *', function(){
  const bicimadUser = process.env.BICIMAD_USER;
  const bicimadKey = process.env.BICIMAD_KEY;
  bicimad.getBicimadStations(bicimadUser, bicimadKey);
});


const app = express();

app.use(express.static(path.join(__dirname, 'public')));

require('./configs/db.config');
require('./configs/passport.config').setup(passport);

const index = require('./routes/index.routes');
const auth = require('./routes/auth.routes');
const user = require('./routes/user.routes');
const station = require('./routes/station.routes');
const issue = require('./routes/issue.routes');

app.use(expressLayouts);
app.set('layout', 'layouts/main');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname, '/public/images/', 'favicon.png')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'Super Secret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 1000
  },
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60
  })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use( (req, res, next) => {
  res.locals.loggedUser = req.user;
  next();
})

app.use('/', index);
app.use('/', auth);
app.use('/user', user);
app.use('/station', station);
app.use('/issue', issue);

app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
