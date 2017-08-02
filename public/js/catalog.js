  $(document).ready(function(){
  $(".itemPanel").click(function(){
    $(".panelToOpen").removeClass("is-open");
    var productName = $(this).attr('id');
    var panelToOpenId = "#" +productName + "PanelToOpen";
    $(panelToOpenId).addClass("is-open");
});

    });

//to-open needs removing from panelToOpen class
    $(document).ready(function(){
    $(".panelToOpen").click(function(){
      var Exit = $(this).attr('id');
      var panelToCloseId = "#" +Exit;
      $(panelToCloseId).removeClass("is-open");
  });

      });

//closing that only works for first panel
    //   $(document).ready(function(){
    //   $("#panelClose").click(function(){
    //     $(".panelToOpen").removeClass("is-open");
    // });
    //
    //     });
