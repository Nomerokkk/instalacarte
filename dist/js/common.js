svg4everybody();

/*****************GLOBAL VAR*****************/
var $header = $('.j-header'),
	$up = $('.j-up'),
	$window = $(window),
	$document = $(document);


$(function() {
	function headerFixed() {
		var scroll = $window.scrollTop();

		if(scroll > 0) {
			$header.addClass('fixed');
		} else {
			$header.removeClass('fixed');
		}

		if(scroll > 800) {
			$up.addClass('active');
		} else {
			$up.removeClass('active');
		}
	}
	$up.on('click', function() {
		$('body, html').animate({
			scrollTop: 0,
		});
	});
	$window.scroll(function() {
		headerFixed();
	});
	$document.ready(function() {
		headerFixed();
		$('.j-mask').mask('+38 (099) 999-99-99');
	});
});

/*********************LAZY */
$('.j-lazy').lazy({
	visibleOnly: true,
	effect: 'fadeIn',
	effectTime: 500,
});

$(function() {
	var $btn = $('[data-toggle]');

	$btn.on('click', function(e) {
		var $this = $(this),
			target = $this.attr('data-toggle'); 

		if(!$this.is('.active')) {
			$this.closest('li, .cat-page__top').addClass('active');
			$this.addClass('active');
			$(target).stop().slideToggle();
		} else {
			$this.closest('li, .cat-page__top').removeClass('active');
			$this.removeClass('active');
			$(target).stop().slideToggle();
		}
	});
});


/***************OPEN TARGET******************/
$(function() {
	var btn = '[data-target]';

	$document.on('click', btn, function(e) {
		e.preventDefault();

		var $this = $(this),
			target = $this.attr('data-target'); 

			$(btn).each(function() {
				var $this_new = $(this),
					target_new = $this_new.attr('data-target'),
					$target_new = $(target_new); 

				if(target != target_new && !$(target).parents().is('.active-target')) {			
					$this_new.removeClass('active-target');
					$target_new.removeClass('active-target');
				}
			});

			$this.toggleClass('active-target');
			$(target).toggleClass('active-target');
	});

	function hide_target() {
		$(btn).each(function() {
			var $this = $(this),
				target = $this.attr('data-target'); 

			$this.removeClass('active-target');
			$(target).removeClass('active-target');
		});
	}

	$document.on('click', function(e) {
		var $target = $(e.target);
		
		if( !$target.is(btn) && 
			!$target.parents().is(btn) && 
			!$target.is('.active-target') && 
			!$target.parents().is('.active-target') 
		) {
			hide_target();
		}
	});
});

/*********************FANCYBOX */
$('[data-fancybox-my]').on('click', function(e) {
	e.preventDefault();

	$.fancybox.close();

	var href = $(this).attr('href');

	$.fancybox.open({
		src  : href,
		type : 'inline',
		opts : {
			autoFocus: false,
			animationEffect: "fade",
			animationDuration: 300,
			touch: false,
		}
	});
});


/******************SELECT */
$('.j-select').niceSelect();

/*************LOAD IMG***********/
$(function() {
	var $file = document.querySelector('.j-file'),
		$remove_btn = $('.j-remove-img');
	
	if($file) {
		$file.addEventListener('change', function() {
			if (this.files && this.files[0]) {
				var img = document.querySelector('.j-file-img'),
					close_btn = document.querySelector('.j-remove-img');

				close_btn.classList.remove('hide');
				img.src = URL.createObjectURL(this.files[0]);
				img.style = 'display: block;';
			}
		});
	}

	$remove_btn.on('click', function() {
		var $this = $(this),
			$wrapper = $this.closest('.j-file-wrap'),
			default_img = $this.attr('data-default-img');

		$this.addClass('hide');
		$wrapper.find('.j-file-img')
			.attr('src', default_img)
			.hide();
		$wrapper.find('.j-file').val('');
	});
});

/***************ADD INPUT*************/
$(function() {
	var number = 0;

	$(document).on('click', '.j-repeat-btn', function() {
		var $this = $(this),
			$wrapper = $this.closest('.j-repeat-wrapper'),
			id = $this.attr('data-id'),
			html = $(id).html(),
			tmpl = _.template(html);

		number++;
		
		var end = tmpl({ count: number });

		$wrapper.append(end);
	});

	$(document).on('click', '.j-repeat-btn-opts', function() {
		var $this = $(this),
			$wrapper = $this.closest('.j-repeat-wrapper'),
			id = $this.attr('data-id'),
			html = $(id).html(),
			tmpl = _.template(html);

		number++;
		
		var end = tmpl({ count: number });

		$wrapper.find('.j-repeat-fields').last().after(end);
	});

	$(document).on('click', '.j-close', function() {
		$(this).closest('.j-repeat-wrapper').remove();
	});

	$(document).on('click', '.j-close-fields', function() {
		$(this).closest('.j-repeat-fields').remove();
	});
});

/***********COPY**********/
function copytext(el) {
    var $tmp = $("<textarea>");
    $("body").append($tmp);
    $tmp.val(el.val()).select();
    document.execCommand("copy");
    $tmp.remove();
}  

$('.j-copy').on('click', function() {
	var $this = $(this),
		$wrapper = $this.closest('.j-copy-wrapper'),
		$input = $wrapper.find('.j-copy-input'),
		$tooltip = 	$wrapper.find('.j-tooltip');

	copytext($input);

	$tooltip.stop().fadeIn();

	setTimeout(function() {
		$tooltip.stop().fadeOut();
	}, 1000);
});

/************LOADER**********/
$window.on('load', function() {
	$('.j-load-item').removeClass('j-load-item');
})


/*****************TIMEPICKER***************/
$(function() {
	var $time = $('.j-time');

	if($time.length > 0) {
		$time.mask('99:99');
	}
});


/*************BLOG SLIDER *************/
$('.j-blog-slider').each(function() {
	let $this = $(this);

	new Swiper($this.find('.blog-slider__overflow')[0], {
		wrapperClass: 'blog-slider__wrapper',
		slideClass: 'blog-slider__slide',
		navigation: {
			nextEl: $this.find('.j-next')[0],
			prevEl: $this.find('.j-prev')[0],
		},
		pagination: {
			el: $this.find('.j-dots')[0],
			type: 'bullets',
		},
		breakpoints: {
			993: {
				slidesPerView: 3,
				spaceBetween: 30
			},
			768: {
				slidesPerView: 2,
				spaceBetween: 30
			},
			481: {
				slidesPerView: 2,
				spaceBetween: 15
			},
			0: {
				slidesPerView: 1,
				spaceBetween: 15
			}
		}
	});
});