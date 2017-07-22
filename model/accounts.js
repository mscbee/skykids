var mongoose = require('mongoose');
var accountSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  emailConfirmation: String,
  address: String,
  postcode: String, //mixed doesn't seem to exist but 'string' might not let me input numbers
  phoneNumber: Number,
  age: { type: Number, min: 18, max: 65 },
  dob: { type: Date, default: Date.now },
});
mongoose.model('Account', accountSchema);
