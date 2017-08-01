var Customer = require('../model/customer');
var passport = require("passport");
var userController = {};

userController.register = function(req, res){
  res.render('register', { error: false });
}

userController.doRegister = function(req, res, next){
  // Sanitize think passport does it inherently? Perhaps sanitize with separate function...
  // Check to see if the posted fields are empty.
  req.checkBody('username', 'Please supply a valid username').notEmpty();
  req.checkBody('email', 'Please supply a valid email').isEmail().notEmpty();
  req.checkBody('firstName', 'Please supply a First Name!').notEmpty();
  req.checkBody('lastName', 'Please supply a Last Name!').notEmpty();
  req.checkBody('password', 'Please supply a password!').notEmpty();

  // Trim and escape values to make sure data isn't dirty
  req.sanitize('username').escape();
  req.sanitize('username').trim();
  req.sanitize('email').escape();
  req.sanitize('email').trim();
  req.sanitize('firstName').escape();
  req.sanitize('firstName').trim();
  req.sanitize('lastName').escape();
  req.sanitize('lastName').trim();
  req.sanitize('password').escape();
  req.sanitize('password').trim();

  // Run the validators and store in a variable
  var errors = req.getValidationResult();

  // Variables to pass into customer object
  var username = req.body.username;
  var email = req.body.email;
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var password = req.body.password;

  errors.then(function(result){
    if(!result.isEmpty()) {
      var errors = result.array().map(function (elem) {
      return elem.msg;
    });
    //console.log('There are following validation errors: ' + errors.join('&&'));
    res.render('register', { error: errors });
    } else {
      // Register new customer
  Customer.register(new Customer({ username: username, email: email, firstName: firstName, lastName: lastName}),
  password, function(err, customer, options) {
        // if (err) { return next(err) }
        if(!customer) {
          // If registration unsuccessful, send message to user they were unsuccessful
          return res.render('register', { error: err });
      } else {
        // This is where email, text would be sent to user for confirmation
        // Would require updating fields to include email, phonenumber etc
        // Currently just returning the registered user for TESTING!
        res.send({
                success: true,
                user: customer // might push this up to user base to avoid confusion
            });
        }
      });
     }
   });
    
  }

// Currently checks if user is logged and displays the response
// Would likely redirect back to homepage, this is just to TEST it works!
// If they are not logged in then display the login page
userController.login = function(req, res){
    if (req.user) {
        res.redirect('catalog');
    } else {
      res.render('login');
    }
}

// Authenticate user by using the local strategy by default
userController.doLogin = function(req, res, next){
  Customer.authenticate()(req.body.username, req.body.password, function(err, customer, options){
    if(err) return next(err);
    if(!customer){
      res.render('login',{ message: options.message }); // If it is not a valid customer send error message
    } else {
      req.login(customer, function (err) { // If it is a valid customer login them in and show us customer details
            res.redirect('/catalog');
          });
    }
  })
}

// When logout button is pressed log out the user
userController.logout = function(req, res){
  req.logout();
  res.redirect('login');
}

// Need to check passport functionality for resetting password!!!
userController.resetPassword = function(req, res){
  //Validate/ Sanitize post data
  req.checkBody('resetEmail', 'Please supply a valid email!').notEmpty().isEmail();
  req.sanitize('resetEmail').escape();
  req.sanitize('resetEmail').trim();

  var errors = req.validationErrors();
  var emailForPasswordReset = req.body.resetEmail;

  if (errors){
    res.send('Errors ' + emailForPasswordReset);
  } else {
    res.send('Password reset function ' + emailForPasswordReset);
  }

}

module.exports = userController;

