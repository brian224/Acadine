(function (window, document, jQuery, undefined) {
	'use strict';

	var pageObj = new page();

	function page() {
		this._resand = '.jQ-resand';
	}

	projects.$w.load(function(){
	});

	projects.$d.ready(function(){
		$(pageObj._resand).on('click', function(){
			$(common._lBody).attr('data-switch', 2);
		});
	});

	if ( ! window.pageObj ) {
		window.pageObj = pageObj;
	}
}(window, document, $));