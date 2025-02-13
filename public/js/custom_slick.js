 $(document).ready(function(){
        // $('.single-item').slick({
        // infinite: true,
        // speed: 600,
        // slidesToShow: 1,
        // autoplay: true,
        // adaptiveHeight: true
        // }); 

        $('.single-item').slick({
          dots: true,
          infinite: true,
          speed: 500,
          fade: true,
          autoplay: true,
          slidesToShow: 1,
          cssEase: 'linear'
        });
                // end first slick

                // now we will create for the nav bar 
            $(window).on('scroll',function(){
              // var navbar = $('.col-nav');
              if ($(window).scrollTop() > 80) {
                  $('.col-f-nav').addClass('nav-back',4000,'ease');
              }else{
                $('.col-f-nav').removeClass('nav-back',4000,'ease');
              }
          });

        $('.col-test-card').slick({
          slidesToShow: 3,
          autoplay: true,
          autoplaySpeed: 2000,
          dots: true,
          // this is to make the slick responsive 
          responsive: [{
            breakpoint: 768,
            settings: {
              slidesToShow: 1
            }
          }]

        });
        // end second slick for the testimony text

        $('.col-test-video').slick({
          slidesToShow: 3,
          autoplay: true,
          autoplaySpeed: 2000,
          dots: true,
          // this is to make the slick responsive 
          responsive: [{
            breakpoint: 768,
            settings: {
              slidesToShow: 1
            }
          }]

        });

        $('.price-slide').slick({
          slidesToShow: 4,
          autoplay: true,
          autoplaySpeed: 2000,
          dots: true,
          // this is to make the slick responsive 
          responsive: [{
            breakpoint: 768,
            settings: {
              slidesToShow: 1
            }
          }]

        });


   
        // end second slick for the testimony text

        // for the bootstrap tooltip.js
        $('[data-toggle="tooltip"]').tooltip();

        

         // scroll up for live bitcoin prices
           $('.live').cycle({
              fx: 'scrollUp',
              random:  1,
              delay:  9000,
              cleartypeNoBg: true,
              center: true,
              height: "fit"

            });
           // end of live price bitcoin counter
        
    });
