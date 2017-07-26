var mongoose = require('mongoose');
var accountSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  password2: String,
  address1: String,
  address2: String,
  town: String,
  county: String,
  postcode: String, //mixed doesn't seem to exist but 'string' might not let me input numbers
  country: String,
  phoneNumber: Number,
  dob: { type: Date, default: Date.now },

});

//var loginSchema = new mongoose.Schema({
//  username:
//})
var account = mongoose.model('Account', accountSchema);

module.exports.account = account;
