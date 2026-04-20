
// Photo Options Nav
var photo_nav_options = {
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    arrows: false,
    adaptiveHeight: false,
    variableWidth: false,
    infinite: true,
    useTransform: true,
    speed: 500,
    cssEase: "cubic-bezier(0.77, 0, 0.18, 1)",
    asNavFor: $(".photo-slider"),
};

// Photo Options Slider
var photo_slider_options = {
    centerMode: true,
    swipeToSlide: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: false,
    arrows: true,
    adaptiveHeight: false,
    variableWidth: true,
    infinite: true,
    useTransform: true,
    speed: 500,
    cssEase: "cubic-bezier(0.77, 0, 0.18, 1)",
    prevArrow: $('.story-chitra__arrow-btn.prev'),
    nextArrow: $('.story-chitra__arrow-btn.next'),
    asNavFor: $(".photo-nav"),
};

// Resize Photo Nav
var resize_photo_nav = function () {
    var $nav = $(".photo-nav");

    var width = $nav.find(".photo-item").width();
    var ratio = 372 / 362; // Rasio tinggi terhadap lebar dari desain

    var height = width * ratio;

    $nav.find(".photo-img-wrap").each((i, o) => {
        $(o).css("height", `${height}px`);
    });
};


// story slider
var storySlider = function () {
    var options = {
        speed: 500,
        autoplay: true,
        autoplaySpeed: 10000,
        pauseOnFocus: false,
        pauseOnHover: false,
        touchThreshold: 5000,
        swipeToSlide: true,
        arrows: false,
        dots: true,
        adaptiveHeight: false,
        fade: true,
    };

    // slick options
    var storyPreviewOptions = {
        ...options,
        ...{
            appendDots: "#story__slider-dots",
            asNavFor: "#story__slider-caption",
        },
    };

    var storyCaptionOptions = {
        ...options,
        ...{
            dots: false,
            adaptiveHeight: false,
            asNavFor: "#story__slider-preview",
            adaptiveHeight: false,
            arrows: false,
            // prevArrow: '.story--button.prev',
            // nextArrow: '.story--button.next'
        },
    };

    // init slick
    $("#story__slider-preview").slick(storyPreviewOptions);

    $("#story__slider-caption").slick(storyCaptionOptions);

    // Sliders
    var sliderForWrap = $('.story-chitra__slider-for');

    $(sliderForWrap).on('afterChange', function (event, slick, currentSlide) {
        var manualNav = $('.story-chitra__slider-nav__item__manual');
        for (var i = 0; i < manualNav.length; i++) {
            var slickIndex = $(manualNav[i]).attr('data-slick-index');
            if (slickIndex <= currentSlide) $(manualNav[i]).addClass('is-active')
            if (slickIndex > currentSlide) $(manualNav[i]).removeClass('is-active')
        }
    });
};

var resize_story_nav = function () {
    var $nav = $('.story__slider-preview');

    const baseViewport = 390;
    const baseWidth = 320;
    const baseHeight = 245;
    const maxWidth = 450;

    const currentViewport = $(window).width();

    let width, height;

    if (currentViewport < 560) {
        // Skala proporsional berdasarkan base viewport
        const scale = currentViewport / baseViewport;
        width = baseWidth * scale;
    } else {
        // Batas maksimal 450px
        width = Math.min(maxWidth, $nav.width());
    }

    // Hitung tinggi berdasarkan rasio dasar
    height = (baseHeight / baseWidth) * width;

    // Terapkan ke setiap .preview-wrap
    $nav.find('.preview-wrap').each((i, o) => {
        $(o).css({
            width: `${width}px`,
            height: `${height}px`
        });
    });
};


// Wedding Gift Picture
var wgu_classhandle_picture = function (e) {

    if (e.target.files.length > 0) {
        $('.wgu-up-btn').removeClass('show');
        $('.wgu-reup-btn').addClass('show');
        $('.wedding-gift-upload-wrap').addClass('show');
    }
}

$(document).on('change', 'input#weddingGiftPicture', wgu_classhandle_picture);

// KADO HANDLER

var init_gifts_slick = function () {
    var gifts_wrap = $('.hadiah-wrap')
    var gifts_wrap_nav = $('.hadiah-wrap-nav')

    if (gifts_wrap.length) {
        var sliderOptions = {
            infinite: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false,
            prevArrow: false,
            nextArrow: false,
            fade: true,
            cssEase: 'linear'
        }

        gifts_wrap.on('init', function () {
            $('.gifts__slider-nav__item__manual').eq(0).addClass('is-active');
        }).slick(sliderOptions);

    }

    if (gifts_wrap_nav.length) {
        var sliderOptions = {
            slidesToShow: 2,
            slidesToScroll: 2,
            dots: true,
            focusOnSelect: false,
            infinite: false,
            appendDots: '.dots-gifts-nav',
            prevArrow: '.dots-gifts-prev',
            nextArrow: '.dots-gifts-next',
        }

        gifts_wrap_nav.on('init', function () {
            $('.hadiah-wrap-nav .slick-slide.slick-current').addClass('is-active');
        }).slick(sliderOptions);

    }

   gifts_wrap.on('afterChange', function (event, slick, currentSlide) {
        gifts_wrap_nav.slick('slickGoTo', currentSlide);
        var currrentNavSlideElem = '.hadiah-wrap-nav .slick-slide[data-slick-index="' + currentSlide + '"]';
        $('.hadiah-wrap-nav .slick-slide.is-active').removeClass('is-active');
        $(currrentNavSlideElem).addClass('is-active');
    });

    gifts_wrap_nav.on('click', '.slick-slide', function (event) {
        event.preventDefault();
        var goToSingleSlide = $(this).data('slick-index');

       gifts_wrap.slick('slickGoTo', goToSingleSlide);
    });
}

// On Ready
$(document).ready(function () {
    storySlider();

    resize_story_nav();

    resize_photo_nav();

    if ($(".photo-nav").children().length > 0) {
        // Slick
        $(".photo-nav").slick(photo_nav_options);
    }

    if ($(".photo-slider").children().length > 0) {
        // Slick
        $(".photo-slider").slick(photo_slider_options);
    }

    var kadoWrapper = $('.kado-wrapper');
    if (kadoWrapper) {
        var intervalId = setInterval(function () {
            var $gifts_wrap = $('.hadiah-wrap');

            // Memeriksa apakah data sudah ada
            if ($gifts_wrap.length && $gifts_wrap.children().length > 0) {
                // Data sudah ada, inisialisasi slider
                init_gifts_slick();

                // Hentikan interval
                clearInterval(intervalId);
            }
        }, 500); // Periksa setiap 500 milidetik (0,5 detik)
    }

});


/*  ================================================
        ORNAMENTS VIDEO
============================================= */
function initOrnamentsVideo() {
    const video = $('#tcVideo');
    const source = $('#tcVideoSource');
    const videoData = $('.orn-videoSrc');
    const playButton = $('#startToExplore');
    
    // Early return jika elemen tidak ada
    if (!video.length || !source.length || !videoData.length) {
        console.log('Responsive video elements not found - skipping initialization');
        return;
    }
    
    const videoElement = video[0];
    let hasPlayedOnMobile = false;
    
    function isMobile() {
        return window.innerWidth <= 560;
    }
    
    function setVideoSource() {
        const srcMb = videoData.data('src-mb');
        const srcTab = videoData.data('src-tab');
        
        if (!srcMb || !srcTab) {
            console.warn('Video data attributes missing');
            return;
        }
        
        const width = window.innerWidth;
        const videoSrc = width <= 560 ? srcMb : (width >= 561 && width < 960) ? srcTab : srcTab;
        
        if (source.attr('src') !== videoSrc) {
            source.attr('src', videoSrc);
            videoElement.load();
            
            // Hanya autoplay jika BUKAN mobile
            if (!isMobile()) {
                videoElement.play().catch(err => console.log('Autoplay prevented:', err));
            }else{
                videoElement.pause();
            }
        }
    }
    
    setVideoSource();
    
    // Event listener untuk button play di mobile (hanya sekali)
    playButton.on('click', function() {
        if (isMobile() && !hasPlayedOnMobile) {
            videoElement.play()
                .then(() => {
                    hasPlayedOnMobile = true;
                })
                .catch(err => console.log('Play prevented:', err));
        }
    });
    
    let resizeTimer;
    $(window).on('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(setVideoSource, 50);
    });
    
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
            // Hanya autoplay jika bukan mobile ATAU sudah pernah play di mobile
            if (!isMobile() || hasPlayedOnMobile) {
                videoElement.play().catch(err => console.log('Play prevented:', err));
            }
        }
    });
}

$(document).ready(function() {
    // Running The Function
    initOrnamentsVideo();
});