
$('#CreditCard').validateCreditCard(function(result)
    {
        alert('CC type: ' + result.card_type.name
          + '\nLength validation: ' + result.length_valid
          + '\nLuhn validation: ' + result.luhn_valid);
    });

var twilio = require('twilio');
$(document).ready(function(){
	var e = document.getElementById('parent');

	e.onmouseover = function () {
	  document.getElementById('popup').style.display = 'block';
	}

	e.onmouseout = function () {
	  document.getElementById('popup').style.display = 'none';
	}

	var payment = document.getElementById('payment');
	payment.addEventListener('click',function (){
		var telephone = document.getElementById('phoneNumber').value;
		var accountSid = 'AC2fea5b00e75f029c0bb8657e9a5e0c32'; // Your Account SID from www.twilio.com/console
	  var authToken = '3985d5a411a88bf2a248f7e6eb313ee9';   // Your Auth Token from www.twilio.com/console


	  var client = new twilio(accountSid, authToken);

	  client.messages.create({
	      body: 'Thanks for your order!',
	      to: '+447944899080',  // Text to the number from form
	      from: '+441158246021' // From a valid Twilio number
	    })

	});

	// function is linked to onclick event in views/payments.ejs
	//and redirects user to views/paymentsuccess.ejs
	//redirects to payment success page
	function makePayment() {

	  window.location="../../views/paymentSuccess"; //takes us to views/paymentSuccess page

	}

	//this only works with node index.js command
	function paySuccess() {


	  // var accountSid = 'AC2fea5b00e75f029c0bb8657e9a5e0c32'; // Your Account SID from www.twilio.com/console
	  // var authToken = '3985d5a411a88bf2a248f7e6eb313ee9';   // Your Auth Token from www.twilio.com/console
		//
	  // var twilio = require('twilio');
	  // var client = new twilio(accountSid, authToken);
		//
	  // client.messages.create({
	  //     body: 'Thanks for your order!',
	  //     to: '+447944899080',  // Text to the number from form
	  //     from: '+441158246021' // From a valid Twilio number
	  //   })
	}

	// function paySuccess() {
	//   sendText();
	//   makePayment();
	// }


});
