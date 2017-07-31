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

});
