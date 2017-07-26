var mongoose = require('mongoose');
var accountSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  confirmPassword: String,
  address: String,
  postcode: String, //mixed doesn't seem to exist but 'string' might not let me input numbers
  phoneNumber: Number,
  dob: { type: Date, default: Date.now },

});

//var loginSchema = new mongoose.Schema({
//  username:
//})
var account = mongoose.model('Account', accountSchema);

module.exports.account = account;
