var e = document.getElementById('parent');

e.onmouseover = function () {
  document.getElementById('popup').style.display = 'block';
}

e.onmouseout = function () {
  document.getElementById('popup').style.display = 'none';
}

// function is linked to onclick event in views/payments.ejs
//and redirects user to views/paymentsuccess.ejs
//redirects to payment success page
function makePayment() {

  window.location="../../views/paymentSuccess"; //takes us to views/paymentSuccess page

}
 var telephone = document.getElementById('phoneNumber').value;
//this only works with node index.js command
function sendText() {
  var accountSid = 'AC2fea5b00e75f029c0bb8657e9a5e0c32'; // Your Account SID from www.twilio.com/console
  var authToken = '3985d5a411a88bf2a248f7e6eb313ee9';   // Your Auth Token from www.twilio.com/console

  var twilio = require('twilio');
  var client = new twilio(accountSid, authToken);

  client.messages.create({
      body: 'Thanks for your order!',
      to: telephone,  // Text to the number from form
      from: '+441158246021' // From a valid Twilio number
    })
}

function paySuccess() {
  sendText();
  makePayment();
}
