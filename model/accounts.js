var mongoose = require('mongoose');
var accountSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
<<<<<<< HEAD
  password: String,
  password2: String,
  address1: String,
  address2: String,
  town: String,
  county: String,
  postcode: String, //mixed doesn't seem to exist but 'string' might not let me input numbers
  country: String,
=======
  emailConfirmation: String,
  address: String,
  postcode: String,
>>>>>>> 78d6d60a156db406d4b7fd68612ac4b692629531
  phoneNumber: Number,
  dob: { type: Date, default: Date.now },

});

//var loginSchema = new mongoose.Schema({
//  username:
//})
var account = mongoose.model('Account', accountSchema);

module.exports.account = account;
