new WOW().init();

var $header = $('.j-header');

$(function() {
    var $wrapper = $('.j-wrapper'),
        $inner = $('.j-inner'),
        height_wrapper = $wrapper.height()
        height_inner = $inner.height(),
        position = 0;

    function headerFixed() {
        var scroll = $wrapper.scrollTop();

        if(scroll + height_wrapper >= height_inner) {
            $header.removeClass('fixed');
        } else {
            if(scroll > position && scroll > 50) {
                $header.addClass('fixed');
            } else {
                $header.removeClass('fixed');
            }

            position = scroll;
        }

        if(scroll > 50) {
            $header.addClass('down');
        } else {
            $header.removeClass('down');
        }
    }
    $wrapper.scroll(function() {
        headerFixed();
    });
    $(document).ready(function() {
        headerFixed();
    });
});

$(function() {
    var $link = $('.j-cat-item'),
        $slider_container = $('.j-slider .j-slider-wrapper'),
        $ball = $('.j-ball');

    $link.on('click', function() {
        var $this = $(this);
 
        $link.removeClass('active');
        $this.addClass('active');  
        
        changePositionScroll();
    });

    function changePositionScroll() {
        var width_container = $slider_container.width(),
            scroll_left_container = $slider_container.scrollLeft(),
            $active_slide = $('.j-cat-item.active'),
            offset_end = offset - width_container + 150;

        if($active_slide.index() == 0) {
            var offset = $active_slide.position().left - 3 + scroll_left_container;
        } else {
            var offset = $active_slide.position().left - 4 + scroll_left_container;
        }

        $ball.css({
            'transform': 'translateX(' + offset + 'px)',
        });

        $slider_container.stop().animate({
            scrollLeft: offset_end,
        }, 500); 

        $header.removeClass('fixed');
    }

    $slider_container.on('scroll', function() {
        $header.removeClass('fixed');
    });
});



//sort
$(function() {
    var $product_wrap = $('.j-product-item-wrap'),
        count = 0;
    
    $('.j-sort a').on('click', function(e) {
        e.preventDefault();

        count++;

        var href = $('.j-sort a').eq(count).attr('href');

        $('.j-sort a').removeClass('active');
        $('.j-sort a').eq(count).addClass('active');

        $product_wrap.removeClass('gor list');
        $product_wrap.addClass(href);

        if(count == 2) {
            count = -1;
        }
    });
});


$('.j-like').on('click', function() {
    var $this = $(this);

    $this.addClass('animated').toggleClass('active');
    setTimeout(function() {
        $this.removeClass('animated');
    }, 400);
});

//modal
$(function() {
    var $wrapper = $('.j-wrapper'),
        $modal = $('.j-modal');

    $(document).on('click', '.j-product-item', function() {
        var offset = $wrapper.scrollTop();
    
        $wrapper.css('overflow', 'hidden');
        $modal.css('top', offset).addClass('active'); 
    });

    $(document).on('click', '.j-close', function() {
        $wrapper.css('overflow', 'auto');
        $(this).closest('.j-modal').removeClass('active');
        setTimeout(function() {
            $modal.css('top', 0);
        }, 400);
    });
});



$(function() {
    var $btn = $('[data-target]');

	$btn.on('click', function(e) {
		var $this = $(this),
			targ = $this.attr('data-target'); 

		if(!$this.is('.active')) {  
            
			$this.addClass('active');
            $(targ).addClass('active');
		} else {
			$this.removeClass('active');
            $(targ).removeClass('active');
        } 
    });

    $(document).on('click', function(e) {
        var $target_desctop = $(e.target);

        if(!$target_desctop.is('.j-data-target-wrapper') 
            && !$target_desctop.parents().is('.j-data-target-wrapper') 
            && $('.j-data-target-wrapper').is('.active') 
            && !$target_desctop.is('[data-target]')
            && !$target_desctop.parents().is('[data-target]')) {

                $('.j-data-target-wrapper').removeClass('active');
                $('[data-target]').removeClass('active');
            }
    });
    $('.j-search-close').on('click', function(e) {
        var $target_desctop = $(e.target);

        $('.j-data-target-wrapper').removeClass('active');
        $('[data-target]').removeClass('active');
    });
});

function loaded_el() {
    $('.j-product-item-wrap').addClass('zoomInMy');
    $('.j-product-item-wrap .j-load-el img').addClass('zoomInMy');
	$('.j-load-item').removeClass('j-load-item');
}

/************LOADER**********/
$(window).on('load', function() {
    loaded_el();
})