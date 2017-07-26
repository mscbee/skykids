$(document).ready(function(){
    console.log("ready");

    var resetPasswordDiv = $("#resetPasswordWrapper");
    var emailResponseDiv = $("#resetPasswordResponseMessage");
    var responseDiv = $("#responseMessage");

    resetPasswordDiv.hide();

    //this just shows and hides the div
    $("#showResetPasswordDiv").click(function(){
      event.preventDefault();
      resetPasswordDiv.slideToggle();

    });

    $("#loginButton").click(function(){
        //Prevent form from refreshing due ot not using submit()
        event.preventDefault();

        //store the values input into a variable, trim the white spaces from around
        var userEmail = $("#userEmail").val().trim();
        var password = $("#password").val().trim();

        responseDiv.empty();

        //check if the values are empty, if they are tell the user to put some values in
        if (username != "" && password != ""){

          //generate a post and supply the post values as the variables
          $.post({
            url: 'https://www.google.co.uk/', //post url location change to localhost:3000/accounts
            data: {
                    userEmail: userEmail,
                    password: password
                  },
            dataType: 'json',
            error: function() {
               responseDiv.html('<p>An error has occurred please try again</p>');
               removeDiv(responseDiv);
            },
            success: function() {
               setTimeout(' window.location.href = "/catalogue"; ',4000);
            }
          });

        } else {
          responseDiv.html("<p>Please supply some credentials before trying to log in.</p>");
          removeDiv(responseDiv);
        }

    });

    $("#resetPasswordButton").click(function(){
        event.preventDefault();

        var email = $("#email").val().trim();

        emailResponseDiv.empty();

        if (email != ""){

          $.post({
            url: 'https://www.google.co.uk/',
            data: {
                    email: email
                  },
            dataType: 'json',
            error: function() {
               emailResponseDiv.html('<p>An error has occurred please try again</p>');
               removeDiv(emailResponseDiv);
            },
            success: function() {
               setTimeout(' window.location.href = "/resetPassword"; ',4000);
            }
          });

        } else {
          emailResponseDiv.html("<p>Please supply an email address before trying to reset your password</p>");
          removeDiv(emailResponseDiv);
        }

    });

    function removeDiv(divToRemove){
      setTimeout(function(){ divToRemove.empty(); }, 3000);

    };

});
