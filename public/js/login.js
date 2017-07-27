$(document).ready(function(){
    console.log("ready");

    var resetPasswordDiv = $("#resetPasswordWrapper");
    var emailResponseDiv = $("#resetPasswordResponseMessage");
    var responseDiv = $("#responseMessage");

    resetPasswordDiv.hide();

    $("#showResetPasswordDiv").click(function(){
      event.preventDefault();
      resetPasswordDiv.slideToggle();

    });

    $("#loginButton").click(function(){
        event.preventDefault();

        var username = $("#username").val().trim();
        var password = $("#password").val().trim();

        responseDiv.empty();

        if (username != "" && password != ""){

          $.ajax({
            url: "http://localhost:3000/catalog/login",
            type: "POST",
            dataType: "json",
            data: JSON.stringify({"username": username, "password": password}),
            contentType: "application/json",
            complete: function() {
              //called when complete
              console.log('process complete');
            },
            success: function(data) {
              console.log(data);
              console.log('process sucess');
            },
            error: function(error) {
              console.log(error);
              responseDiv.html('<p>An error has occurred please try again</p>');
              removeDiv(responseDiv);
            },
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
            url: '/login',
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
