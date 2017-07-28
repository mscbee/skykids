var User = require('./base/user'); // Include the base schema
var mongoose = require('mongoose'), 
    extend = require('mongoose-schema-extend');

var UserSchema = User.getUserSchema(); // Store the user schema

var CustomerSchema = UserSchema.extend({
  // Define customer specific properties
});

// New customers can be created in userController
var Customer = mongoose.model('Customer', CustomerSchema);

//Export model
module.exports = Customer;
