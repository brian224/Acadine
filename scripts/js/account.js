(function (window, document, jQuery, undefined) {
	'use strict';

	var pageObj = new page();

	function page() {
		this._category = '.jQ-category';
		this._curr     = '.jQ-curr';
	}

	projects.$w.load(function(){
	});

	projects.$d.ready(function(){
		$(pageObj._curr).text($('.category-list .is-curr').text());

		$(pageObj._category).on('click', function(){
			if (projects.$w.width() < 740) {
				$(this).addClass('is-active');
				common.offClick(pageObj._category);
			}
		});
	});

	if ( ! window.pageObj ) {
		window.pageObj = pageObj;
	}
}(window, document, $));