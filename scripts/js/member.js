(function (window, document, jQuery, undefined) {
	'use strict';

	var memberObj = new page();

	function page() {
		this._resand = '.jQ-resand';
	}

	projects.$w.load(function(){
	});

	projects.$d.ready(function(){
		projects.validate({
			event : 'focusout'
		});

		$(memberObj._resand).on('click', function(){
			$(common._lBody).attr('data-switch', 2);
		});
	});

	if ( ! window.memberObj ) {
		window.memberObj = memberObj;
	}
}(window, document, $));