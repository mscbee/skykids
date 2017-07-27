var UserSchema = require('./base/user');
var mongoose = require('mongoose');

var CustomerSchema = new UserSchema({
  // Define customer specific properties
});

//Export model
module.exports = mongoose.model('Customer', CustomerSchema);
