(function (window, document, jQuery, undefined) {
	'use strict';

	var formObj = new page();

	function page() {
	}

	projects.$w.load(function(){
	});

	projects.$d.ready(function(){
		projects.validate({
			event : 'focusout'
		});
	});

	if ( ! window.formObj ) {
		window.formObj = formObj;
	}
}(window, document, $));