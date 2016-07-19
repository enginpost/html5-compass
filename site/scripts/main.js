/* main js file*/

(function($){
  $(document).ready(function(){
    //Immediately try to get the current location
    getLocation();
    startCompass();
    setupDestinationClickEvent();
  });

  function getLocation(){
    if ( Modernizr.geolocation ) {
      navigator.geolocation.getCurrentPosition( displayLocation, function(error){ alert(error.message)}, {enableHighAccurancy:true, timeout:5000} );
      updateUserPosition();
    } else {
      alert("your device does not support geolocation identification");
    }
  }

  function updateUserPosition(){
    navigator.geolocation.watchPosition( function( newPosition ){
      displayLocation( newPosition );
    });
  }

  function startCompass(){
    if( Modernizr.deviceorientation ){
      $(window).on("deviceorientation", function(evt){
        $(".compass-face").attr("data-alpha", evt.originalEvent.alpha);
        orientDevice();
      });
    }else{
      alert("your device does not support orientation events");
    }
  }
  function orientDevice(){
    if( $(".compass-face").attr("data-alpha") > 0 ){
      $(".compass-face").css({'transform' : 'rotate(' + (360 - $(".compass-face").attr("data-alpha") )*-1 + 'deg)'});
      $(".compass-heading").css({'transform' : 'rotate(' + ( ( ( 360 - $(".compass-face").attr("data-alpha"))*-1) - $(".compass-heading").attr("data-heading") ) + 'deg)'});
    }else{
      $(".compass-face").css({'transform' : 'rotate(' + $(".compass-face").attr("data-alpha") + 'deg)'});
      $(".compass-heading").css({'transform' : 'rotate(' + ($(".compass-face").attr("data-alpha") - $(".compass-heading").attr("data-heading") ) + 'deg)'});
    }
  }
  function displayLocation( thisPosition ){
    $('#latitude').attr('data-latitude', thisPosition.coords.latitude);
    $('#latitude').html( thisPosition.coords.latitude);
    $('#longitude').attr('data-longitude', thisPosition.coords.longitude);
    $('#longitude').html( thisPosition.coords.longitude);
    getCompassHeading();
  }
  function getCompassHeading(){
    $('.compass-heading').attr('data-heading', compass.heading( Number($('#latitude').attr('data-latitude')), 
                                                                Number($('#longitude').attr('data-longitude')), 
                                                                Number($(".destinations .btn-primary").attr('data-latitude')), 
                                                                Number($(".destinations .btn-primary").attr('data-longitude')) ) );
  }
  function setupDestinationClickEvent(){
    $(".destinations a").on("click", function(evt){
      evt.preventDefault();
      $(".destinations a.btn-primary").removeClass('btn-primary');
      $(this).addClass('btn-primary');
      $(".selected-destination").html($(this).html());
      getCompassHeading();
      orientDevice();
    })
  }
})(jQuery);