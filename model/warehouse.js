var User = require('./base/user'); // Include the base schema
var mongoose = require('mongoose'),
    extend = require('mongoose-schema-extend');
var passportLocalMongoose = require('passport-local-mongoose'); // decorates the object with a set of methods, also hashes the passwords.

var UserSchema = User.getUserSchema(); // Store the user schema

var WarehouseSchema = UserSchema.extend({

    //warehouse properties

});
