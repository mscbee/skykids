var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
<<<<<<< HEAD
var expressValidator = require('express-validator');
var db = require('./model/db');
=======
var mongoose = require('mongoose');
>>>>>>> f5fb9865a8d6ca3ed1d0b36af36db23eba1eb001
var account = require('./model/accounts');
<<<<<<< HEAD
var accounts = require('./routes/accounts');
=======
var product = require('./model/product');
var customer = require('./model/customer');

>>>>>>> 78d6d60a156db406d4b7fd68612ac4b692629531
var users = require('./routes/users');
var catalog = require('./routes/catalog');
var login = require('./routes/loginRoute');

//for Register form
var register = require('./routes/registerRoute');
var expressValidator = require('express-validator');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// open connection to database, should be in config file?
var mongoDB = 'mongodb://localhost/27107/';
mongoose.connect(mongoDB);

// store connection object and add on event to check for errors
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Register validation
app.use(expressValidator()); // Add this after the bodyParser middlewares!
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressValidator());

<<<<<<< HEAD



//app.use('/', index);
app.use('/', index);
=======
app.use('/', catalog);
>>>>>>> 78d6d60a156db406d4b7fd68612ac4b692629531
app.use('/users', users);
app.use('/catalog', catalog);
<<<<<<< HEAD
app.use('/login', login);
=======
app.use('/account', accounts);

//for Register form
app.use('/register', register);
>>>>>>> f5fb9865a8d6ca3ed1d0b36af36db23eba1eb001

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
