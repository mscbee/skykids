var User = require('./base/user'); // Include the base schema
var mongoose = require('mongoose'),
    extend = require('mongoose-schema-extend');
var passportLocalMongoose = require('passport-local-mongoose'); // decorates the object with a set of methods, also hashes the passwords.

var UserSchema = User.getUserSchema(); // Store the user schema

var WarehouseEmployeeSchema = UserSchema.extend({
  // Define customer specific properties

});

var options = ({missingPasswordError: "Forgot password"}); // Can handle errors here


//REQUIRED PLUGIN FOR PASSPORT creates statics methods .serializeUser.deserializeUser.authenticate etc DO NOT DELETE
WarehouseEmployeeSchema.plugin(passportLocalMongoose, options);

// New customers can be created in userController
var WarehouseEmployee = mongoose.model('Warehouse', WarehouseEmployeeSchema);

//Export model
module.exports = WarehouseEmployee;
