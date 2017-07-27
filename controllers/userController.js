//var Users = require('../model/userModel');

exports.index = function(req, res){
  res.render('login', {errorMessage: ""});
}

exports.check = function(req, res){
  //Check to see if the posted fields are empty.
  req.checkBody('loginEmail', 'Please supply a valid email!').notEmpty();
  req.checkBody('loginPassword', 'Please supply a password!').notEmpty();

  //Trim and escape values to make sure data isn't dirty
  req.sanitize('loginEmail').escape();
  req.sanitize('loginEmail').trim();
  req.sanitize('loginPassword').escape();
  req.sanitize('loginPassword').trim();

  //Run the validators and store in a variable
  var errors = req.validationErrors();

  var userEmail = req.body.loginEmail;
  var userPassword = req.body.loginPassword;

  //BCrypt the password before moving on.

  if(errors){
    //If there is errors render a error message in the view
    res.render('login', {errorMessage: errors});
    //res.send('Errors for some reason ' + userEmail + " " + userPassword);

  } else {
    //Check the database for values and redirect accordingly
    //Users.findOne({ 'email': userEmail, 'password': userPassword})
     //.exec( function(err, emailFound) {

          //if (err) { return next(err); }

          //if (emailFound) {
              //Email and password exist redirect to catalogue and initiate session/ cookie
              //res.redirect(catalogue);
          //}
          //else {
              //Error message of some kind
          //}

      //});
      res.send('No errors found ' + userEmail + " " + userPassword);
  }

}

exports.resetPassword = function(req, res){
  //Validate/ Sanitize post data
  req.checkBody('resetEmail', 'Please supply a valid email!').notEmpty();
  req.sanitize('resetEmail').escape();
  req.sanitize('resetEmail').trim();

  var errors = req.validationErrors();
  var emailForPasswordReset = req.body.resetEmail;

  if (errors){
    //Rerender the login with errors.
    //res.render('login', {errorMessage: errors});
    res.send('Errors ' + emailForPasswordReset);
  } else {
    //Send the user an email to reset their password
    res.send('Password reset function ' + emailForPasswordReset);
  }
}
