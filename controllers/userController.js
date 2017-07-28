//var Users = require('../model/userModel');

exports.index = function(req, res){
  res.render('register', {errorMessage: ""});
}

//  create form on GET
exports.create = function(req, res, next) {
    res.render('register', { title: 'Create Genre' });
};

exports.check = function(req, res){
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

  var userEmail = req.body.custFirstName;
  var userPassword = req.body.custLasttName;
  var userPassword = req.body.custEmail;
  var userPassword = req.body.custAddress1;
  var userPassword = req.body.custAddress2;
  var userPassword = req.body.custTown;
  var userPassword = req.body.custPostcode;
  var userPassword = req.body.custPhoneNumber;
  var userPassword = req.body.custDob;
  var userPassword = req.body.custPassword;
  var userPassword = req.body.custConfirmPassword;

  //BCrypt the password before moving on.

  if(errors){
    //If there is errors render a error message in the view
    res.render('register', {errorMessage: errors});
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
      res.send('No errors found ');
  }

}