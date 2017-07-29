var Customer = require('../model/customer');
var userController = {};

userController.index = function(req, res){
  res.render('catalog', { user: req.user });
}

userController.register = function(req, res){
  res.render('register', {});
}

userController.doRegister = function(req, res){
  // Sanitize think passport does it inherently? Perhaps sanitize with separate function...
  // Check to see if the posted fields are empty.
  req.checkBody('username', 'Please supply a valid username').notEmpty()
  req.checkBody('firstName', 'Please supply a First Name!').notEmpty();
  req.checkBody('lastName', 'Please supply a Last Name!').notEmpty();
  req.checkBody('password', 'Please supply a password!').notEmpty();

  // Trim and escape values to make sure data isn't dirty
  req.sanitize('username').escape();
  req.sanitize('username').trim();
  req.sanitize('firstName').escape();
  req.sanitize('firstName').trim();
  req.sanitize('lasttName').escape();
  req.sanitize('lastName').trim();
  req.sanitize('password').escape();
  req.sanitize('password').trim();

  // Run the validators and store in a variable
  var errors = req.getValidationResult();

  // Variables to pass into customer object
  var username = req.body.username;
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var password = req.body.password;

  // Register new customer
  Customer.register(new Customer({ username: username, firstName: firstName, lastName: lastName}),
  password, function(err, customer) {
        if(err) {
          // If registration unsuccessful, send message to user they were unsuccessful
          return res.render('register', { customer : customer });
      }
    res.redirect('catalog'); // If registration successful redirect to catalog page

    });
}

userController.login = function(req, res){
    res.render('login', { user: req.user });
}

userController.doLogin = function(req, res){
    res.redirect('catalog');
}

userController.logout = function(req, res){
  req.logout();
  res.redirect('login');
}

// Need to check passport functionality for resetting password
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

