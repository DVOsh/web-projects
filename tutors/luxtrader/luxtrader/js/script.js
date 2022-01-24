$('.icon-menu').click(function(event){
    $(this).toggleClass('_active');
    $('.menu__body').toggleClass('_active');
});

let user_icon = document.querySelector('.user-header__icon');
user_icon.addEventListener("click", function(e){
    let user_menu = document.querySelector('.user-header__menu');
    user_menu.classList.toggle('_active');
});

document.documentElement.addEventListener("click", function(e){
    if(!e.target.closest('.user-header')){
        let user_menu = document.querySelector('.user-header__menu');
        user_menu.classList.remove('_active');
    }
});



function ibg(){
    $.each($('._ibg'), function(index, val){
        if($(this).find('img').length>0){
            $(this).css('background-image', 'url("' + $(this).find('img').attr('src') + '")');
        }
    });
}
ibg();

if($('.main-slider__body').length>0){
    $('.main-slider__body').slick({
        // autoplay:true,
        // infinite:false,
        dots: false,
        arrows: true,
        accessibility: false,
        slidesToShow:1,
        autoplayspeed: 3000,
        // adaptiveHeight: true,
        appendArrows:'.main-slider__control.control-main-slider',
        nextArrow:'<div class="control-main-slider__arrow control-main-slider__arrow_next"></div>',
        prevArrow:'<div class="control-main-slider__arrow control-main-slider__arrow_prev"></div>',
        responsive:[{
            breakpoint: 768,
            settings:{adaptiveHeight: true}
        },
        {
            breakpoint:320,
            settings:{adaptiveHeight:false}
        }]
    });
}

if($('.slider-lots__body').length>0){
    $('.slider-lots__body').slick({
        // autoplay:true,
        infinite:true,
        dots: false,
        arrows: true,
        accessibility: false,
        slidesToShow:3,
        slidesToScroll:3,
        autoplayspeed: 3000,
        // adaptiveHeight: true,
        lazyLoad:'ondemand',
        appendArrows:'.slider-lots__control.control-slider-lots',
        nextArrow:'<div class="control-slider-lots__arrow control-slider-lots__arrow_next"><span></span></div>',
        prevArrow:'<div class="control-slider-lots__arrow control-slider-lots__arrow_prev"><span></span></div>',
        responsive:[{
            breakpoint: 768,
            settings:{
                slidesToShow:2,
                slidesToScroll:2,
            }
        },
        {
            breakpoint:436,
            settings:{
                slidesToShow:1,
                slidesToScroll:1,
            }
        }]
    });
}

if($('.slider-quotes__body').length>0){
    $('.slider-quotes__body').slick({
        // autoplay:true,
        infinite:true,
        dots: false,
        arrows: true,
        zIndex: 10,
        accessibility: false,
        slidesToShow:1,
        slidesToScroll:1,
        autoplayspeed: 3000,
        // adaptiveHeight: true,
        lazyLoad:'ondemand',
        fade: true,
        cssEase: 'linear',
        appendArrows:'.control-slider-quotes__button',
        nextArrow:'<div class="control-slider-quotes__next"><div class="control-slider-quotes__circle"></div></div>',
        prevArrow:'<div class="control-slider-quotes__prev" style="display:none;"></div>',
        responsive:[{
            breakpoint: 768,
            settings:{adaptiveHeight: false}
        },
        {
            breakpoint:570,
            settings:{adaptiveHeight:true}
        }]
    });
}