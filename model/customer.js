var User = require('./base/user'); // Include the base schema
var mongoose = require('mongoose'),
    extend = require('mongoose-schema-extend');
var passportLocalMongoose = require('passport-local-mongoose'); // decorates the object with a set of methods, also hashes the passwords.

var UserSchema = User.getUserSchema(); // Store the user schema

var CustomerSchema = UserSchema.extend({
  // Define customer specific properties
  phoneNumber: { type: String },
  addressLine1: { type: String },
  addressLine2: { type: String },
  postcode: { type: String },
  creditCard: { type: String}
});

// Can handle errors here
var options = {missingPasswordError: "Forgot password",
AttemptTooSoonError:'Account is currently locked. Try again later',
TooManyAttemptsError: 'Account locked due to too many failed login attempts',
NoSaltValueStoredError: 'Authentication not possible. No salt value stored',
IncorrectPasswordError: 'Password or username are incorrect',
IncorrectUsernameError: 'Password or username are incorrect',
MissingUsernameError: 'No username was given',
UserExistsError: 'A user with the given username is already registered'}; 

//REQUIRED PLUGIN FOR PASSPORT creates statics methods .serializeUser.deserializeUser.authenticate etc DO NOT DELETE
CustomerSchema.plugin(passportLocalMongoose, options);

// New customers can be created in userController
var Customer = mongoose.model('Customer', CustomerSchema);

//Export model
module.exports = Customer;
