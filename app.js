var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var product = require('./model/product');
var customer = require('./model/customer');
var user = require('./routes/user');
var catalog = require('./routes/catalog');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressValidator());

app.use('/', catalog);
app.use('/', user);
app.use('/catalog', catalog);

var Customer = require('./model/customer');
passport.use(new LocalStrategy(Customer.authenticate()));
passport.serializeUser(Customer.serializeUser());
passport.deserializeUser(Customer.deserializeUser());

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/27107/skykids_store')
  .then(() =>  console.log('connection successful'))
  .catch((err) => console.error(err))

// open connection to database, should be in config file?
// var mongoDB = 'mongodb://localhost/27107/skykids_store';
// mongoose.connect(mongoDB);

// // store connection object and add on event to check for errors
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

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
