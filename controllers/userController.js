//var Users = require('../model/userModel');

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
  req.checkBody('custEmail', 'Please supply Email Address!').notEmpty();
  req.checkBody('custAddress1', 'Please supply Address Line 1!').notEmpty();
  req.checkBody('custAddress2', 'Please supply Address Line 2!').notEmpty();
  req.checkBody('custTown', 'Please supply Town!').notEmpty();
  req.checkBody('custPostcode', 'Please supply Postcode!').notEmpty();
  req.checkBody('custPhoneNumber', 'Please supply Phone Number!').notEmpty();
  req.checkBody('custDob', 'Please supply Date Of Birth!').notEmpty();
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
  req.sanitize('custTown').escape();
  req.sanitize('custTown').trim();
  req.sanitize('custPostcode').escape();
  req.sanitize('custPostcode').trim();
  req.sanitize('custPhoneNumber').escape();
  req.sanitize('custPhoneNumber').trim();
  req.sanitize('custDob').escape();
  req.sanitize('custDob').trim();
  req.sanitize('custPassword').escape();
  req.sanitize('custPassword').trim();
  req.sanitize('custConfirmPassword').escape();
  req.sanitize('custConfirmPassword').trim();

  //Run the validators and store in a variable
  var errors = req.validationErrors();

  var loginEmail = req.body.loginEmail;
  var loginPassword = req.body.loginPassword;
  var custFirstName = req.body.custFirstName;
  var custLasttName = req.body.custLasttName;
  var custEmail = req.body.custEmail;
  var custAddress1 = req.body.custAddress1;
  var custAddress2 = req.body.custAddress2;
  var custTown = req.body.custTown;
  var custPostcode = req.body.custPostcode;
  var custPhoneNumber = req.body.custPhoneNumber;
  var custDob = req.body.custDob;
  var custPassword = req.body.custPassword;
  var custConfirmPassword = req.body.custConfirmPassword;

  if(errors){
    res.send('Errors for some reason ' + custFirstName + " " + custEmail);
  } else {
    res.send('No errors found ' + custFirstName + " " + custEmail);
  }
}

exports.login = function(req, res){
  res.render('login', {});
}

exports.doLogin = function(req, res){
  //Check to see if the posted fields are empty.
  req.checkBody('loginEmail', 'Please supply a valid email!').notEmpty();
  req.checkBody('loginPassword', 'Please supply a password!').notEmpty();

  //Trim and escape values to make sure data isn't dirty
  req.sanitize('loginEmail').escape();
  req.sanitize('loginEmail').trim();
  req.sanitize('loginPassword').escape();
  req.sanitize('loginPassword').trim();

  var userEmail = req.body.loginEmail;
  var userPassword = req.body.userPassword;

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
  req.checkBody('resetEmail', 'Please supply a valid email!').notEmpty();
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
