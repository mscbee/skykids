$(document).ready(function(){
  // Initialize form validation on the registration form.
  // It has the name attribute "registration"
  $("form[name='registerForm']").validate({
    rules: {
      firstName: "required",
      lastName: "required",
      email: {// compound rule
      required: true,
      email: true,
            },
    password: {
    required: true,
    minlength: 8
              },
  address1: "required",
  address2: "required",
  town: "required",
  county: "required",
  postcode: "required",
  country: "required",
  phoneNumber: "required",
  dob: "required",
          },
        messages: {

            firstName: "Please enter your firstname",
            lastName: "Please enter your firstname",
            email: "Please enter your email",
            password: {
                required: "Please enter a password",
                minlength: "Your password must consist of at least 8 characters"
                      },
            password2: {
                required: "Please enter a password",
                minlength: "Your password must consist of at least 8 characters"
                        },
            address1: "Please enter your address line 1",
            address2: "Please enter your address line 1",
            town: "Please enter your town",
            county: "Please enter your county",
            postcode: "Please enter your postcode",
            country: "Please enter your county",
            phoneNumber: "Please enter your phonenumber",
            dob:"Please enter your Date of Birth",

                }


      });

    });
