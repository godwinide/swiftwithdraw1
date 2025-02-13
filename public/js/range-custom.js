 $(document).ready(function(){
    var sliderElementStarter = $('#slider-starter');
    var sliderElementSilver = $('#slider-silver');
    var sliderElementGold = $('#slider-gold');
    var sliderElementPlatinum = $('#slider-platinum');

    // this is the start of the script for STARTER ======================================================
    sliderElementStarter.slider({
      range: "min",
      value: 800,
      min: 250,
      max: 1600,   
      slide: function( event,ui){
        $("#amount-starter").val( "$" + ui.value);
         $(".total-return-stater").html( "$" + Math.round((ui.value/5.67 )*100)/100);
          $(".per-return-starter").html( "$" + Math.round((ui.value/8.67 )*100)/100);
      }
    });
    // this code below is to show the value of the input once the page loads
    $("#amount-starter").val( "$" + sliderElementStarter.slider("value"));
    // =====================================this is the end of Starter design =============================

    // this is the script for SLIVER =====================================================================

    sliderElementSilver.slider({
      range: "min",
      value: 7499.5,
      min: 5000,
      max: 9999,
      slide: function( event, ui){
        $("#amount-silver").val("$" + ui.value);
        $(".total-return-silver").html( "$" + Math.round((ui.value/3.67 )*100)/100);
          $(".per-return-silver").html("$" + Math.round((ui.value/6.67 )*100)/100);
      }
    });
    $("#amount-silver").val("$" + sliderElementSilver.slider("value"));

    // end script for SLIVER ============================================================================

    // this is the script for GOLD =====================================================================
    sliderElementGold.slider({
      range: "min",
      value: 29999.5,
      min: 10000,
      max: 49999,slide: function(event,ui){
        $("#amount-gold").val( "$" + ui.value);
        $(".total-return-gold").html( "$" + Math.round((ui.value/4.67 )*100)/100);
          $(".per-return-gold").html( "$" + Math.round((ui.value/7.67 )*100)/100);
      }
    });
    $("#amount-gold").val("$" + sliderElementGold.slider("value"));

    // end script for GOLD ============================================================================

    // this is the script for PLATINUM =====================================================================
    sliderElementPlatinum.slider({
      range: "min",
      value: 75000,
      min: 50000,
      max: 100000,
      slide: function(event, ui){
        $("#amount-platinum").val( "$" + ui.value);
        $(".total-return-platinum").html( "$" + Math.round((ui.value/6.67 )*100)/100);
          $(".per-return-platinum").html( "$" + Math.round((ui.value/6.67 )*100)/100);
      }
    });
    $("#amount-platinum").val("$" + sliderElementPlatinum.slider("value"));

    // end script for PLATINUM ============================================================================

    // this script is for the modal 
        $('#myModal').on('shown.bs.modal', function () {
          $('#myInput').trigger('focus')
        })
 
    // end major begining 
  });