var mongoose = require('mongoose');

var Schema = mongoose.Schema; // Create Schema object

// Base properties for all users
var UserSchema = new Schema({
    firstName: { type: String, required: true},
    lastName: { type: String, required: true},
    email: { type: String, required: true},
    password: { type: String, required: true},
    loginStatus: { type: String },
    accessLevel: { type: String }
}, { collection: 'users', discriminatorKey: '_type'}); // Allows us to differentiate between users

var User  = mongoose.model('User', UserSchema); // Create the model

module.exports = {
  getUserSchema: function(){
    return UserSchema;
  },
  User : User
}
