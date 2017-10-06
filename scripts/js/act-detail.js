(function (window, document, jQuery, undefined) {
	'use strict';

	var pageObj = new page();

	function page() {
		this._actInfo    = '.act-info';
		this._wrapHeight = parseInt($(this._actInfo).css('padding-top'), 10) + parseInt($(this._actInfo).css('padding-bottom'), 10);
	}

	projects.$w.load(function(){
		if ( projects.device() !== 'Mobile') {
			$(pageObj._actInfo + ' > *').each(function(){
				pageObj._wrapHeight += $(this).outerHeight() + parseInt($(this).css('margin-top'), 10) + parseInt($(this).css('margin-bottom'), 10);
			});

			$('.act-timer img').height(pageObj._wrapHeight);
		}
	});

	projects.$d.ready(function(){
	});

	if ( ! window.pageObj ) {
		window.pageObj = pageObj;
	}
}(window, document, $));