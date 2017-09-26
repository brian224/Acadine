(function (window, document, jQuery, undefined) {
	'use strict';

	var cartObj = new page();

	function page() {
	}

	projects.$w.load(function(){
	});

	projects.$d.ready(function(){
		projects.validate({
			event : 'focusout'
		});
	});

	if ( ! window.cartObj ) {
		window.cartObj = cartObj;
	}
}(window, document, $));