var mongoose = require('mongoose');
var Schema = mongoose.Schema; // Create Schema object

// Base properties for all users
var UserSchema = new Schema({
    username: { type: String, required: true},
    password: { type: String},
    email: {type: String},
    firstName: { type: String},
    lastName: { type: String},
    loginStatus: { type: String },
    accessLevel: { type: String }
}, { collection: 'users', discriminatorKey: '_type'}); // Allows us to differentiate between users

UserSchema.statics.serializeUser = function(user, done) {
  done(null, user.id);
}

UserSchema.statics.deserializeUser = function(id, done){
  UserSchema.findOne(id, function(err, user){ // Return the one user into session
    done(err, user);
  })
}

var User  = mongoose.model('User', UserSchema); // Create the model

module.exports = {
  getUserSchema: function(){
    return UserSchema;
  },
  User : User
}
