var $document = $(document),
    $window = $(window),
    $header = $('.j-header'),
    $wrapper = $('.j-wrapper'),
    $inner = $('.j-inner'),
    $main = $('.j-main'),
    $overlay = $('.j-overlay');

/*******************HEADER***************/
$(function() {
    var position = 0;

    function headerFixed() {
        var scroll = $inner.scrollTop(),
            height_inner = $inner.outerHeight(),
            main_height = $main.outerHeight();

        if(scroll + height_inner + 1 >= main_height) {
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
    $inner.scroll(function() {
        headerFixed();
    });
    $document.ready(function() {
        headerFixed();
    });
});

/********************OPEN TARGET**************/
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

	$('.j-overlay').on('click', function() {
		hide_target();
	});
});

/************LOADER**********/
function loaded_el() {
    $('.j-product-item-wrap').addClass('zoomInMy');
    $('.j-product-item-wrap .j-load-el img').addClass('zoomInMy');
	$('.j-load-item').removeClass('j-load-item');
}

$(window).on('load', function() {
    loaded_el();
});

/********************TABS****************/
function change_tabs_item() {
    var $item_active = $('.j-tab.active'),
        offset = $item_active.position().left,
        width = $item_active.width(),
        $bg = $('.j-tab-bg');

    gsap.to($bg[0], {
        x: offset, 
        width: width,
        duration: .3, 
    });
}
$(function() {
    var $item = $('.j-tab');

    $window.resize(function() {
        change_tabs_item();
    });

    $item.on('click', function() {
        var $this = $(this);

        $item.removeClass('active');
        $this.addClass('active');
    
        change_tabs_item();
    });

    change_tabs_item();

    gsap.fromTo('.j-content-wrapper', {y: 30, opacity: 0}, {y: 0, opacity: 1});
});


 /*****************SUCCESS MODAL****************/
 $('.j-success-btn').on('click', function() {
    $('.j-success-modal').toggleClass('active-target');
    $overlay.toggleClass('active-target');
});

$overlay.on('click', function() {
    $('.j-success-btn').trigger('click');
});


/*********************WIDTH TABLE PRICE********************/
$(function() {
    var $bl = $('.j-order-bl');
        
    $bl.each(function() {
        var w = 0,
            $this_bl = $(this),
            $price = $this_bl.find('.j-table-price');

        $price.each(function() {
            var $this = $(this);
    
            if($this.width() > w) {
                w = $this.width();
            }
        });

        $price.css('width', w);
    });
});