//IBG======================================================================================================
function ibg() {
	$.each($('._ibg'), function (index, val) {
		if ($(this).find('img').length > 0) {
			$(this).css('background-image', 'url("' + $(this).find('img').attr('src') + '")');
		}
	});
}
ibg();

//tabs======================================================================================================


//sliders======================================================================================================
if ($('.mainslider__body').length > 0) {
	$('.mainslider__body').slick({
		// autoplay: true,
		// infinite: false,
		dots: true,
		arrows: false,
		accessibility: false,
		slidesToShow: 1,
		autoplayspeed: 3000,
		appendDots: '.mainslider__dots',
		adaptiveHeight: true
		// responsive: [{
		// }]
	});
}

if ($('.products-slider__slide').length > 0) {
	$('.products-slider__slide').slick({
		// autoplay: true,
		// infinite: false,
		dots: false,
		arrows: true,
		accessibility: false,
		slidesToShow: 1,
		autoplayspeed: 3000,
		appendArrows: '.products-slider__control',
		prevArrow: '<div class="products-slider__arrow products-slider__arrow_prev _arrow _arrow_prev"></div>',
		nextArrow: '<div class="products-slider__arrow products-slider__arrow_next _arrow _arrow_next"></div>',
		adaptiveHeight: true
		// responsive: [{
		// }]
	});
}

if ($('.brands-slider__slide').length > 0) {
	$('.brands-slider__slide').slick({
		// autoplay: true,
		infinite: false,
		dots: false,
		arrows: true,
		accessibility: false,
		slidesToShow: 5,
		slidesToScroll: 1,
		autoplayspeed: 3000,
		appendArrows: '.brands-slider__arrows',
		prevArrow: '<div class="brands-slider__arrow brands-slider__arrow_prev _arrow _arrow_prev"></div>',
		nextArrow: '<div class="brands-slider__arrow brands-slider__arrow_next _arrow _arrow_next"></div>',
		// variableWidth: true
		// adaptiveHeight: true
		responsive: [
			{
				breakpoint: 1180,
				settings: {
					slidesToShow: 5
				}
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 4
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 3
				}
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 2
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1
				}
			}
		]
	});
}

if ($('.images-product__mainslider').length > 0) {
	$('.images-product__mainslider').slick({
		// autoplay: true,
		// infinite: false,
		dots: false,
		arrows: false,
		accessibility: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		asNavFor: '.images-product__subslider'
		// adaptiveHeight: true
		// responsive: [{
		// }]
	});
}
if ($('.images-product__subslider').length > 0) {
	$('.images-product__subslider').slick({
		// autoplay: true,
		infinite: false,
		dots: false,
		arrows: false,
		accessibility: false,
		slidesToShow: 5,
		slidesToScroll: 5,
		asNavFor: '.images-product__mainslider',
		focusOnSelect: true,
		centerMode: false
		// adaptiveHeight: true
		// responsive: [{
		// }]
	});
}

//clicks======================================================================================================
$(document).ready(function () {
	$('.icon-menu').click(function (event) {
		$('.icon-menu, .menu__body').toggleClass('_active');
		$('body').toggleClass('_lock');
	});
	$('.menu-page__burger').click(function (event) {
		$('.menu-page__burger').toggleClass('_active');
	});
	$('._spoller').click(function (event) {
		$(this).toggleClass('_active').next().slideToggle();
	});
	$('.menu-page__burger').click(function (event) {
		$('.menu-page__body').slideToggle();
	});
	$('.search-page__select').click(function (event) {
		$('.search-page__select').toggleClass('_active');
		$('.categories-search').slideToggle();
	});
	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
		$('.filter__title').click(function (event) {
			$('.filter__content').slideToggle();
		});
	};
	$('._tabs-item').click(function (event) {
		if (!$(this).hasClass('_active')) {
			$('._tabs-item._active').removeClass('_active');
			$(this).addClass('_active');
			$(this).closest('._tabs').find('._tabs-block').removeClass('_active').eq($(this).index()).addClass('_active');
		}
	});
	// $('.pagging__list > li').click(function (event) {
	// 	$(this).toggleClass('._active');
	// })
})
//ismobile======================================================================================================
//submenu======================================================================================================
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
	let menuParents = document.querySelectorAll('.menu-page__parent>a');
	for (let index = 0; index < menuParents.length; index++) {
		const menuParent = menuParents[index];
		menuParent.addEventListener("click", function (e) {
			menuParent.parentElement.classList.toggle('_active');
			e.preventDefault();
		});
	}
} else {
	let menuParents = document.querySelectorAll('.menu-page__parent');

	for (let index = 0; index < menuParents.length; index++) {
		const menuParent = menuParents[index];
		menuParent.addEventListener("mouseenter", function (e) {
			menuParent.classList.add('_active');
		});
		menuParent.addEventListener("mouseleave", function (e) {
			menuParent.classList.remove('_active');
		});
	}
}

//categories checkbox======================================================================================================
let checkboxCategories = document.querySelectorAll('.categories-search__checkbox');

for (let index = 0; index < checkboxCategories.length; index++) {
	const checkboxCategory = checkboxCategories[index];
	checkboxCategory.addEventListener("change", function (e) {
		checkboxCategory.classList.toggle('_active');

		let checkboxActiveCategories = document.querySelectorAll('.categories-search__checkbox._active');
		let searchSelect = document.querySelector('.search-page__select');

		if (checkboxActiveCategories.length > 0) {
			searchSelect.classList.add('_categories');
			let searchQuantity = searchSelect.querySelector('.search-page__quantity');
			searchQuantity.innerHTML = searchQuantity.getAttribute('data-text') + checkboxActiveCategories.length;
		} else {
			searchSelect.classList.remove('_categories');
		}
	})
}

//quantity======================================================================================================
let quantityButtons = document.querySelectorAll('.quantity__button');

if (quantityButtons.length > 0) {
	for (let index = 0; index < quantityButtons.length; index++) {
		const quantityButton = quantityButtons[index];
		quantityButton.addEventListener("click", function (e) {
			let value = parseInt(quantityButton.closest('.quantity').querySelector('input').value);
			if (quantityButton.classList.contains('quantity__button_plus')) {
				value++;
			} else {
				value = value - 1;
				if (value < 1) {
					value = 1;
				}
			}
			quantityButton.closest('.quantity').querySelector('input').value = value;


			// let quantityButtonMinus = document.querySelector('.quantity__button_minus');
			// let quantityButtonPlus = document.querySelector('.quantity__button_plus');
			// if (value <= 1) {
			// 	quantityButtonMinus.classList.add('._lock');
			// } else {
			// 	quantityButtonMinus.classList.remove('._lock');
			// }
			// if (value >= 9) {
			// 	quantityButtonPlus.classList.add('._lock');
			// } else {
			// 	quantityButtonPlus.classList.remove('._lock');
			// }
		})
	}
}

//nouisliders======================================================================================================
const priceSlider = document.querySelector('.price-filter__slider');

noUiSlider.create(priceSlider, {
	start: [0, 100000],
	step: 1000,
	tooltips: [wNumb({ decimals: 0 }), wNumb({ decimals: 0 })],
	connect: true,
	range: {
		'min': [0],
		'max': [200000]
	}
});

const priceStart = document.getElementById('price-start');
const priceEnd = document.getElementById('price-end');
priceStart.addEventListener('change', function () {
	priceSlider.noUiSlider.set([priceStart.value, null]);
});
priceEnd.addEventListener('change', function () {
	priceSlider.noUiSlider.set([null, priceEnd.value]);
});

priceSlider.noUiSlider.on('update', function (values, handle) {
	if (handle) {
		priceEnd.value = values[handle];

	} else {
		priceStart.value = values[handle];
	}
});

