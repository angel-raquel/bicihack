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

// Schedule API GET to Bicimad and update mongodb each 15 minutes
const bicimad = require('./configs/bicimad')
var schedule = schedule.scheduleJob('*/1 * * * *', function(){
  bicimad.getBicimadStations();
  console.log("SCHEDULE");
});

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
// Configs
require('./configs/db.config');
require('./configs/passport.config').setup(passport);

// Routes
const index = require('./routes/index.routes');
const auth = require('./routes/auth.routes');
const user = require('./routes/user.routes');
const station = require('./routes/station.routes');
const issue = require('./routes/issue.routes');


// view engine setup
app.use(expressLayouts);
app.set('layout', 'layouts/main');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
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

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
