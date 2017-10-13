(function (window, document, jQuery, undefined) {
	'use strict';

	var pageObj = new page();

	function page() {
		this._url = window.location.href;
	}

	projects.$w.load(function(){
		if (pageObj._url.split('Keyword=')[1] !== undefined) {
			var _keyword = pageObj._url.split('Keyword=')[1];

			$('input.gsc-input').val(_keyword.split('&')[0]).css({
				'background': '',
				'text-indent': 0
			});

			$('input.gsc-search-button').trigger('click');
		}
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