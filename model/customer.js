var User = require('./base/user'); // Include the base schema
var mongoose = require('mongoose'),
    extend = require('mongoose-schema-extend');
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = User.getUserSchema(); // Store the user schema

var CustomerSchema = UserSchema.extend({
  // Define customer specific properties
  phoneNumber: { type: String, required: true},
  addressLine1: { type: String, required: true},
  addressLine2: { type: String, required: true},
  postcode: { type: String, required: true},
  creditCard: { type: String}
});

//REQUIRED PLUGIN FOR PASSPORT .serializeUser.deserializeUser.authenticate DO NOT DELETE
CustomerSchema.plugin(passportLocalMongoose);

// New customers can be created in userController
var Customer = mongoose.model('Customer', CustomerSchema);

//Export model
module.exports = Customer;
