var mongoose = require('mongoose');
var accountSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  emailConfirmation: String,
  address: String,
  postcode: String,
  phoneNumber: Number,
  age: { type: Number, min: 18, max: 65 },
  dob: { type: Date, default: Date.now },
  isloved: Boolean
});
var account = mongoose.model('Account', accountSchema);

module.exports.account = account;
