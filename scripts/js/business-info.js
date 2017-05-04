(function (window, document, jQuery, undefined) {
	'use strict';

	var pageObj = new page();

	function page() {
	}

	projects.$w.load(function(){
	});

	projects.$d.ready(function(){
	});

	projects.$w.on('scroll' , function(){
	});

	projects.$w.resize(function(){
	});

	if ( ! window.pageObj ) {
		window.pageObj = pageObj;
	}
}(window, document, $));