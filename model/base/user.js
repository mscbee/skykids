var util = require('util'); //allows sub-models to inherit all attributes
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

function UserSchema() {
  Schema.apply(this, arguments);

  this.add({
    userId: {type: String, required: true},
    password: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    loginStatus: {type: String, required: true},
    accessLevel: {type: String, required: true}

  });
}

util.inherits(UserSchema, Schema);

module.exports = UserSchema;
