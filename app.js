var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

const session = require('express-session');
const mongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');

const user = require('./controllers/user');
const message = require('./controllers/message');

let uri = `mongodb://localhost/headline`;
// connect mongodb
mongoose.connect(uri);
// debug
mongoose.set('debug', true);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'images', 'logo.jpg')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('soonfy'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'soonfy',
  resave: false,
  saveUninitialized: true,
  cookie: {},
  store: new mongoStore({
    url: uri,
    collections: 'sessions'
  })
}))

app.use(message);
app.use(user);

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
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
