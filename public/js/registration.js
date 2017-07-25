$(document).ready(function() {
console.log("ready");
$("form.register").click(function() {
var firstName = $("#firstName").val();
var lastName = $("#lastName").val();
var email = $("#email").val();
var password = $("#password").val();
var password2 = $("#password2").val();
var address1 = $("#address1").val();
var address2 = $("#address2").val();
var town = $("#town").val();
var county = $("#county").val();
var postcode = $("#postcode").val();
var country = $("#country").val();
var phoneNumber = $("#phoneNumber").val();
var dob = $("#dob").val();
if (firstName == '' || lastName == '' || email == '' || password == '' || password2 == '' || address1 == '' || address2 == '' || town == '' || county == '' || postcode == '' || country == '' || phoneNumber == '' || dob == '') {
alert("Please fill all fields...!!!!!!");
} else if ((password.length) < 8) {
alert("Password should atleast 8 character in length...!!!!!!");
} else if (!(password).match(password2)) {
alert("Your passwords don't match. Try again?");
} else {
$.post("account.js", function(data) {
if (data == 'You have Successfully Registered.....') {
$("form")[0].reset();
}
alert(data);
});
}
});
});
