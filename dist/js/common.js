svg4everybody();

//new WOW().init();

function headerFixed() {
	var scroll = $(window).scrollTop();

	if(scroll > 0) {
		$('.j-header').addClass('fixed');
	} else {
		$('.j-header').removeClass('fixed');
	}
}
$(window).scroll(function() {
	headerFixed();
});
$(document).ready(function() {
	headerFixed();

	$('.j-mask').mask('+38 (099) 999-99-99');
});

$('.j-lazy').lazy();

$(function() {
	var $btn = $('[data-target]');

	$btn.on('click', function(e) {
		var $this = $(this),
			target = $this.attr('data-target'); 

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

$('[data-fancybox]').fancybox({
	autoFocus: false,
	animationEffect: "fade",
	animationDuration: 300,
	touch: false,
	beforeLoad: function( instance, current ) {
		
	}
});



$('.j-up').on('click', function() {
	$('body, html').animate({
		scrollTop: 0,
	});
});

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
		$wrapper.find('.j-file-img').attr('src', default_img);
		$wrapper.find('.j-file').val('');
	});
});

//ADD INPUT
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
//var instance = $('.j-loader').scheletrone();

	$(window).on('load', function() {
		$('.j-load-item').removeClass('j-load-item');
	})
