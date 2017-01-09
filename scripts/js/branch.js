(function (window, document, jQuery, undefined) {
	'use strict';

	var pageObj = new page();

	function page() {
		this._Like = '.jQ-like';
	}

	projects.$w.load(function(){
		$('.social-wall').masonry({
			itemSelector: '.list-item',
			columnWidth: '.item-sizer',
			gutter: 20
		});

		$(pageObj._Like).on('click', function(){
			$(this).toggleClass('is-add');
		});
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