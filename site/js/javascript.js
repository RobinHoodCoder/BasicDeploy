$(function() {
    // run test on initial page load


    $('.swiper-container').each(function(){

        if($(this).hasClass('lazy')){
            // console.log('lazy slider');
            var $currSwiper =  new Swiper($(this),{
                navigation: {
                    noSwiping: true,
                    noSwipingClass: 'swipe-this'
                },
                // Disable preloading of all images
                preloadImages: false,

                // Enable lazy loading
                lazy: {
                    loadPrevNextAmount: 3,
                    loadOnTransitionStart: true


                }

            });
        }else{
            var $currSwiper =  new Swiper($(this),{

            });
        }
    });



    var deviceSize = $('.device').css("position");


    if(deviceSize !== 'fixed'){
        $('.sub-portfolio').imagesLoaded().done( function(instance) {
            var cards = $(instance.elements).find('.subGalleryCard');
            var heights = new Array();
            $(cards).each(function () {
                heights.push($(this).height());
            });
            var max = Math.max.apply( Math, heights );
            $(cards).css('height', max + 'px');
        });
        $('.portfolio-items').imagesLoaded({background: true}).done( function(instance) {
            var cards = $(instance.elements).find('.portfolio-item');
            var heights = new Array();
            $(cards).each(function () {
                heights.push($(this).height());
            });
            var max = Math.max.apply( Math, heights );
            $(cards).css('height', max + 'px');
        })
    }


    function setImage(device,imgContainer,type){
        console.log(device);


        //Versie met alleen data background
        $(imgContainer).each(function(i,bgToReplace){
            var currCrop = $(bgToReplace).attr('data-crop');
            if(device === 'fixed'){
                var replaceCropto = $(bgToReplace).attr('data-mobile-crop');
            }
            else {
                //alert('NOTFIEXED');
                var replaceCropto = currCrop;
            }
            if($(bgToReplace).attr('data-retina-crop')){
                if(device === 'relative'){
                    replaceCropto = $(bgToReplace).attr('data-retina-crop');
                    // alert('retina');
                }
            }

            //alert($(currCrop));

            if($(bgToReplace).attr('data-background')) {

                var background = $(bgToReplace).attr('data-background');

                // If the background image is anything other than "none"
                if (background.indexOf(currCrop) > 0) {
                    // alert('GEVONDEN');
                } else {
                    //alert('nIEYT');
                }

                var img = new Image;
                img.src = background;

                var newDataBg = img.src.replace(currCrop, replaceCropto);
                // console.log(newDataBg);
                //$(bgToReplace).attr('data-background', newDataBg);

                if (background) {
                    // console.log($(bgToReplace).attr('data-background'));
                    $(bgToReplace).attr('data-background', newDataBg);
                } else {
                    alert('gebruik bg-image ipv background shorthand in je slider of header afbeelding');
                }
                if(type === 'slider'){

                }
                if(type === 'textpage'){
                    $(bgToReplace).css('background-image', 'url("' + newDataBg + '")');
                }
                if (i === 1) {


                }
            }else{

            }

        });
    }

    setImage(deviceSize,$('.retina'),'textpage');

    $('.swiper-container').each(function(){
        setImage(deviceSize,$('.swiper-img'),'slider');
    });

    if ($(this).scrollTop() > 0){
        $('.menu-container').addClass("scrolled");
        $('.scrolled-menu-btn').addClass("scrolled");
    }
    //Create plakkende nav
    window.addEventListener('scroll',function(e) {
        if ($(this).scrollTop() > 0){
            $('.menu-container').addClass("scrolled");
            // $('.toppest').addClass("fade-out");
        }
        else{
            $('.menu-container').removeClass("scrolled");
            // $('.toppest').removeClass("fade-out");
        }
    });


    // Hamburger Menu
    $( "#hamburger-menu" ).on('click',function() {
        $( "nav" ).toggleClass( "visible" );
        $( ".menuOverlay" ).toggleClass( "active" );
        $( "body" ).toggleClass( "overlay" );
        $( ".phone-cta.mobile" ).toggleClass( "visible" );
    });
    $( ".menuOverlay" ).on('click',function() {
        $( ".menuOverlay" ).toggleClass( "active" );
        $( "nav" ).toggleClass( "visible" );
        $( "body" ).toggleClass( "overlay" );
        $( ".phone-cta.mobile" ).toggleClass( "visible" );
    });

    // E-mailadres spam prevention
    $('.email').each(function(){
        var str = $(this).html();
        str = str.replace('[a]', '@').replace('[d]', '.');
        if($(this).hasClass('mailto')){
            str = '<a href="mailto:'+ str +'">'+ str +'</a>';
        }
        $(this).after(str).remove();
    });

    if($('.masonry-grid').length > 0) {
        $('.masonry-grid').imagesLoaded().done(function (instance) {
            var gridItems = $(instance.elements).find('.grid-item');

            var $grid = $('.masonry-grid').masonry({
                itemSelector: '.grid-item',

                masonry: {
                    // use outer width of grid-sizer for columnWidth
                    "columnWidth": '.grid-item',
                    "gutterWidth": 10,
                    "horizontalOrder": true

                }
            });
            $grid.masonry('layout');

        });
    }

    $('.lazy').each(function (i,el) {
        $(el).on('appear',function() {
            var datasrc = $(this).attr('data-src');
            $(this).attr('src',datasrc);
            $(this).addClass('load');
            $(this).removeClass('lazy');
        });
        $(el).appear(function() {

        })
    });

    // Gallery
    (function($) {
        var $pswp = $('.pswp')[0];
        var image = [];

        $('.picture').each( function() {
            var $pic     = $(this),
                getItems = function() {
                    var items = [];
                    $pic.find('a').each(function() {
                        var $href   = $(this).attr('href'),
                            $size   = $(this).data('size').split('x'),
                            $width  = $size[0],
                            $height = $size[1],
                            $caption = $(this).data('caption'),
                            $tagitems = $(this).data('tags')


                        var item = {
                            src : $href,
                            w   : $width,
                            h   : $height,
                            title: $caption,
                            tagitems: $tagitems
                        }

                        items.push(item);
                    });
                    return items;
                }

            var items = getItems();

            $.each(items, function(index, value) {
                image[index]     = new Image();
                image[index].src = value['src'];
            });

            $pic.on('click', 'figure', function(event) {
                event.preventDefault();

                var $index = $( "figure" ).index( this );
                var options = {
                    index: $index,
                    bgOpacity: 0.9,
                    showHideOpacity: false,
                }


                var lightBox = new PhotoSwipe($pswp, PhotoSwipeUI_Default, items, options);
                lightBox.init();

            });
        });
    })(jQuery);

    $("img").on("contextmenu",function(e){
        return false;
    });


    // Gallery




});

