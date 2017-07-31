var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var expressValidator = require('express-validator');
var product = require('./model/product');
var customer = require('./model/customer');
var cart = require('./model/cart');

// Routes
var user = require('./routes/user');
var catalog = require('./routes/catalog');
var cart = require('./routes/cart');



var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// open connection to database, should be in config file?
var mongoDB = 'mongodb://localhost:27017/skykids_shop';
//mongoose.connect(mongoDB);

// Serialize/Deserialize should be defined in User/Customer model ideally
// Required for session DO NOT DELETE!
var Customer = require('./model/customer');
passport.use(Customer.createStrategy());
passport.serializeUser(Customer.serializeUser(function(user, done) {
  done(null, user.id);
}));
passport.deserializeUser(Customer.deserializeUser(function(id, done){
  Customer.findOne(id, function(err, user){ // Return the one user into sessions
    done(err, user);
  })
}));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressValidator());

app.use('/', catalog);
app.use('/', user);
app.use('/catalog', catalog);
app.use('/', cart);


mongoose.Promise = global.Promise;

mongoose.connect(mongoDB)
  .then(() =>  console.log('connection successful'))
  .catch((err) => console.error(err.message));

// store connection object and add on event to check for errors
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

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
