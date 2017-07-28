var Customer = require('../model/customer');

exports.index = function(req, res){
  res.render('catalog', {customer: req.customer});
}

exports.register = function(req, res){
  res.render('register', {});
}

exports.doRegister = function(req, res){
  //Check to see if the posted fields are empty.
  req.checkBody('custFirstName', 'Please supply a First Name!').notEmpty();
  req.checkBody('custLasttName', 'Please supply a Last Name!').notEmpty();
  req.checkBody('custEmail', 'Please supply a valid Email Address!').notEmpty().isEmail();
  req.checkBody('custAddress1', 'Please supply Address Line 1!').notEmpty();
  req.checkBody('custAddress2', 'Please supply Address Line 2!').notEmpty();
  req.checkBody('custPostcode', 'Please supply Postcode!').notEmpty();
  req.checkBody('custPhoneNumber', 'Please supply Phone Number!').notEmpty();
  req.checkBody('custPassword', 'Please supply a password!').notEmpty();
  req.checkBody('custConfirmPassword', 'Please supply password confirmation!').notEmpty();

  //Trim and escape values to make sure data isn't dirty
  req.sanitize('custFirstName').escape();
  req.sanitize('custFirstName').trim();
  req.sanitize('custLasttName').escape();
  req.sanitize('custLasttName').trim();
  req.sanitize('custEmail').escape();
  req.sanitize('custEmail').trim();
  req.sanitize('custAddress1').escape();
  req.sanitize('custAddress1').trim();
  req.sanitize('custAddress2').escape();
  req.sanitize('custAddress2').trim();
  req.sanitize('custPostcode').escape();
  req.sanitize('custPostcode').trim();
  req.sanitize('custPhoneNumber').escape();
  req.sanitize('custPhoneNumber').trim();
  req.sanitize('custPassword').escape();
  req.sanitize('custPassword').trim();
  req.sanitize('custConfirmPassword').escape();
  req.sanitize('custConfirmPassword').trim();

  //Run the validators and store in a variable
  var errors = req.getValidationResult();

  var firstName = req.body.custFirstName;
  var lastName = req.body.custLasttName;
  var email = req.body.custEmail;
  var addressLine1 = req.body.custAddress1;
  var addressLine2 = req.body.custAddress2;
  var postcode = req.body.custPostcode;
  var phoneNumber = req.body.custPhoneNumber;
  var password = req.body.custPassword;
  var confirmPassword = req.body.custConfirmPassword;

  if(errors){
    //res.send('Errors for some reason ' + custFirstName + " " + custEmail);
  } else {
    //res.send('No errors found ' + custFirstName + " " + custEmail);
    Customer.register(new Customer({ firstName: firstName, lastName: lastName,
                                      email: email, addressLine1: addressLine1,
                                    addressLine2: addressLine2, postcode: postcode,
                                  phoneNumber: phoneNumber, password: password }),
    password, function(err, customer) {
          if(err) {
            return res.render('register', { customer: customer });
          }

          passport.authenticate('local', {
            successRedirect: '/catalog',
            failureRedirect: '/login',
            failureFlash: true
      })(req, res, next);

  });
}

}

exports.login = function(req, res){
  res.render('login', {});
}

exports.doLogin = function(req, res){
  //Check to see if the posted fields are empty.
  req.checkBody('loginEmail', 'Please supply a valid email!').notEmpty().isEmail();
  req.checkBody('loginPassword', 'Please supply a password!').notEmpty();

  //Trim and escape values to make sure data isn't dirty
  req.sanitize('loginEmail').escape();
  req.sanitize('loginEmail').trim();
  req.sanitize('loginPassword').escape();
  req.sanitize('loginPassword').trim();

  var userEmail = req.body.loginEmail;
  var userPassword = req.body.loginPassword;

  var errors = req.validationErrors();

  if(errors){
    res.send('Errors for some reason ' + userEmail + " " + userPassword);
  } else {
    res.send('No errors found ' + userEmail + " " + userPassword);
  }
}

exports.logout = function(req, res){
  res.render('login');
}

exports.resetPassword = function(req, res){
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
