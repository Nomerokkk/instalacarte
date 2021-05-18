// new WOW().init();

var $document = $(document),
    $window = $(window),
    $header = $('.j-header'),
    $wrapper = $('.j-wrapper'),
    $inner = $('.j-inner'),
    $main = $('.j-main'),
    $modal = $('.j-modal');

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


/********************CATEGORY TOP******************/
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
            offset,
            offset_end;

        if($active_slide.index() == 0) {
            offset = $active_slide.position().left - 3 + scroll_left_container;
        } else {
            offset = $active_slide.position().left - 4 + scroll_left_container;
        }

        offset_end = offset - width_container + 150;

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



/*****************SORT******************/
$(function() {
    var $product_wrap = $('.j-product-item-wrap'),
        $link = $('.j-sort a'),
        count = 0;
    
    $link.on('click', function(e) {
        e.preventDefault();

        count++;

        var href = $link.eq(count).attr('href');

        $link.removeClass('active');
        $link.eq(count).addClass('active');

        $product_wrap.removeClass('gor list');
        $product_wrap.addClass(href);

        if(count == 2) {
            count = -1;
        }
    });
});


/********************LIKE****************/
$('.j-like').on('click', function() {
    var $this = $(this);

    $this.addClass('animated').toggleClass('active');

    setTimeout(function() {
        $this.removeClass('animated');
    }, 400);
});


/******************MODAL*************/
$(function() {
    $document.on('click', '.j-product-item', function() {
        var offset = $wrapper.scrollTop();
    
        $modal.css('top', offset).addClass('active'); 
        gsap.to('.j-modal-img', {height: 318, duration: .4});
    });

    $document.on('click', '.j-close', function() {
        $(this).closest('.j-modal').removeClass('active');
        gsap.to('.j-modal-img', {height: 200, duration: .4});

        setTimeout(function() {
            $modal.css('top', 0);
        }, 400);
    });
});


/********************OPEN TARGET**************/
$(function() {
	var btn = '[data-target]';

	$(document).on('click', btn, function(e) {
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

	$(document).on('click', function(e) {
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


/***********************BASKET*****************/
gsap.registerPlugin(MotionPathPlugin);

$(function() {
    var $basket_modal = $('.j-basket-modal'),
        $basket_empty = $('.j-basket-empty'),
        $basket = $('.j-basket'),
        $overlay = $('.j-overlay'),
        $ordering = $('.j-ordering');

    gsap.to($basket_modal[0], { y: 0, duration: .5});

    $('.j-add-product').on('click', function() {
        var $icon = $('.j-modal-icon'),
            icon_html = $icon.html(),
            $icon_wrapper = $('.j-modal-icon-wrapper'),
            $offset = $('.j-modal-inner').height(),
            duration = 1.2,
            basket_count = Number($basket_modal.attr('data-count'));
        
        $icon_wrapper.append('<span>');
    
        var $span = $icon_wrapper.find('span').last();
    
        $span.last().html(icon_html);
    
        gsap.to($span[0], {
            duration: duration/2,
            scale: 2,
            ease: 'power3.in',
        });
    
        gsap.to($span[0], 
            {
                motionPath: {
                    path: [
                        {x:0, y:0}, 
                        {x:20, y:-80}, 
                        {x:80, y:-30}, 
                        {x:100, y:$offset/3}, 
                        {x:180, y:$offset}, 
                    ],
                    curviness: 1,
                },
                duration: duration, 
                ease: CustomEase.create("custom", "M0,0,C0.344,0.166,0.562,0.036,0.592,0.464,0.61,0.726,0.818,1.001,1,1"),
                onComplete: function() {
                    $span.remove();
                }
            },
        );

        setTimeout(() => {
            if(!$ordering.is(':visible')) {
                $basket_modal.height(90);
            }
            setTimeout(() => {
                if(!$ordering.is(':visible')) {
                    $basket_modal.height(72);
                }
            }, 300);
        }, 600);

        $basket_modal.attr('data-count', basket_count + 1);

        basket_count = $basket_modal.attr('data-count');

        if(basket_count > 0) {
            $basket_modal.find('.basket__title').text(basket_count + ' dishes awaiting payment');
        }
    });

    function clear_transform() {
        gsap.set($basket_modal[0], { y: 0});
    }

    function show_basket_modal() {
        var basket_count = $basket_modal.attr('data-count');

        $overlay.addClass('active-target');

        if(!$basket_modal.is('.active')) {
            if(basket_count > 0) {
                var ordering_height = $ordering.outerHeight(),
                    inner_height = $inner.height();

                $basket.hide();
                $basket_empty.hide();
                $ordering.show();
                $basket_modal.height(ordering_height);

                if(ordering_height + 70 > inner_height) {
                    $basket_modal.css({
                        'bottom': inner_height - ordering_height - 80,
                    });

                    clear_transform();
                }
                change_tabs_item();
            } else {
                $basket.hide();
                $basket_empty.show();
                $basket_modal.height($basket_empty.outerHeight());
            }

            $basket_modal.addClass('active');
        }
    }

    function hide_basket_modal() {
        if($basket_modal.is('.active')) {
            $overlay.removeClass('active-target');
            $basket_empty.hide();
            $ordering.hide();
            $basket.show();
            $basket_modal.height(72);
            $basket_modal.css({
                'bottom': 0,
            });
            $basket_modal.removeClass('active');
        }
    }

    $basket.on('click', function() {
        show_basket_modal();
    });

    Draggable.create($basket_modal[0], {
        type: 'y',
        //bounds: {minY: $basket_modal.height(), maxY: - $basket_modal.height()},
        throwProps:true,
        onDragEnd: function() {
            var direction = this.getDirection(),
                y = this.y;

            if(direction == 'up') {                
                if($ordering.is(':visible')) {
                    var ordering_height = $ordering.outerHeight(),
                        inner_height = $inner.height(),
                        offset = ordering_height + 80 - inner_height;

                    if(-y > offset) {
                        gsap.set($basket_modal[0], { y: -offset});   
                    }
                } else {
                    clear_transform();
                }

                show_basket_modal();
            } else {
                if($ordering.is(':visible')) {
                    if(y >= 50) {
                        hide_basket_modal();
                        clear_transform();
                    }
                    if(y < 50 && y > 0) {
                        clear_transform();
                    }
                } else {
                    hide_basket_modal();
                    clear_transform();
                }
            }
        },
    });

    $overlay.on('click', function() {
        hide_basket_modal();
        clear_transform();
    });
});


/********************TABS****************/
function change_tabs_item() {
    var $item_active = $('[data-tab].active'),
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
    var $item = $('[data-tab]');

    $window.resize(function() {
        change_tabs_item();
    });

    $item.on('click', function() {
        var $this = $(this),
            id = $this.attr('data-tab');

        $item.removeClass('active');
        $('.j-tab-wrapper').removeClass('active');

        $this.addClass('active');
        $(id).addClass('active');

        change_tabs_item();
    });
});


/*****************SWIPE IMAGE BOUNCE***************/
$(function() {
    var $img = $('.j-modal-img'),
        img_height = 318,
        offset;


    $modal.swipe({
        allowPageScroll: 'vertical',
        swipeStatus:function(event, phase, direction, distance, duration, fingers, fingerData, currentDirection) {
            
            if(direction == 'down') {
                if(distance < 100) {
                    offset = img_height + distance;
                } else {
                    offset = img_height + 100;
                }
                gsap.to($img[0], {height: offset, duration: .3});
            } 

            if(direction == 'up') {
                gsap.to($img[0], {height: img_height, duration: .3});
            }     

        },
        swipeDown: function() {
            gsap.to($img[0], {height: img_height, duration: .3});
        }
    })
});