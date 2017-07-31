  $(document).ready(function(){
  $("#panelTest").click(function(){
    $("#panelToOpen").addClass("is-open");
});

    });

    $(document).ready(function(){
    $("#panelClose").click(function(){
      $("#panelToOpen").removeClass("is-open");
  });

      });

//TOGGLE - doesn't work, removed in JQuery version 1.9
// $(document).ready(function(){
// $("#panelTest").toggle(
//     function(){$("#panelToOpen").addClass("is-open");},
//     function(){$("#panelToOpen").removeClass("is-open");
//   });
