function init_pickr(_this) {
	let $this = $(_this),
		$wrap = $this.closest('.j-pickr-wrap'),
		$tabs_wrapper = $this.closest('.j-tab-wrapper'),
		tab_index = $this.closest('.j-tab').index(),
		color = $this.val(),
		variable = $this.data('var');
	
	$tabs_wrapper.find('.pcr-app').remove();

	let pickr = new Pickr({
		el: $this[0],
		default: color,
		container: $wrap[0],
		theme: 'nano',
		useAsButton: true,
		showAlways: true,
		autoReposition: false,
		components: {
			hue: true,
			interaction: {
				input: true,
			}
		}
	}).on('change', (color, source, instance) => {
		let color_rgb = color.toRGBA(),
			color_hexa = color.toHEXA() + '',
			r = color_rgb[0],
			g = color_rgb[1],
			b = color_rgb[2];

		color_hexa = color_hexa.replace(',', '');

		color_rgb = r + ',' + g + ',' + b;

		$tabs_wrapper.find('.j-color-btn').eq(tab_index).css('background', color_hexa);

		$this.val(color_hexa);

		document.querySelector('.j-iframe iframe').contentDocument.documentElement.style.setProperty('--' + variable, color_rgb);
	})
}

function hexToRgb(hex) {
	let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

	return result ? {
		r: parseInt(result[1], 16),
		g: parseInt(result[2], 16),
		b: parseInt(result[3], 16)
	} : null;
}

function show_iframe($iframe_wrap, $iframe) {
	if(!$iframe_wrap.is(':visible')) {
		$iframe.attr('src', $iframe.data('src'));
		$iframe_wrap.show();
	}
}

$(function() {
	let $item = $('[data-tab]'),
		$iframe_wrap = $('.j-iframe'),
		$iframe = $iframe_wrap.find('iframe'),
		$background = $('.j-background');

	$item.on('click', function() {
		let $this = $(this),
			$tabs_wrapper = $this.closest('.j-tab-wrapper'),
			index = $this.closest('.colors__col').index(),
			$target = $tabs_wrapper.find('.j-tab').eq(index);
		
		show_iframe($iframe_wrap, $iframe);

		if(!$this.is('.active')) {
			$item.removeClass('active');
			$tabs_wrapper.find('.j-tab').removeClass('active');

			$this.addClass('active');
			$target.addClass('active');

			init_pickr($target.find('.j-pickr')[0]);
		}
	});

	$('.j-reset-color').on('click', function() {
		let $this = $(this),
			$tabs_wrapper = $this.closest('.j-tab-wrapper'),
			$tab = $tabs_wrapper.find('.j-tab');
			$input = $tabs_wrapper.find('.j-pickr');

		$tab.removeClass('active');

		$input.each(function() {
			let $this = $(this),
				index = $this.closest('.j-tab').index(),
				old_color = $this.data('old-color'),
				variable = $this.data('var'),
				color_rgb = hexToRgb(old_color);

			color_rgb = color_rgb.r + ',' + color_rgb.g + ',' + color_rgb.b;
				
			$tabs_wrapper.find('.j-color-btn').eq(index)
				.css('background', old_color)
				.removeClass('active');

			$this.val(old_color);
			
			$iframe[0].contentDocument.documentElement.style.setProperty('--' + variable, color_rgb);
		});
	});

	$background.on('click', function() {
		show_iframe($iframe_wrap, $iframe);
	});

	$background.on('change', function() {
		let $this = $(this);

		$iframe[0].contentDocument.querySelector('.j-inner').style.background = 'url(' + $('.j-file-img').attr('src') + ')';
	});

	$('.j-background-remove').on('click', function() {
		$iframe[0].contentDocument.querySelector('.j-inner').removeAttribute('style');
	});
});