(function (window, document, jQuery, undefined) {
	'use strict';

	var pageObj = new page();

	function page() {
		this._item  = '.list-item';
		this._sizer = '.item-sizer';
		this._sizerWidth = $(this._sizer).width();
	}

	projects.$w.load(function(){
		console.log($('iframe').length);

		setTimeout(function () {
			$('.social-list').masonry({
				itemSelector: pageObj._item,
				columnWidth: pageObj._sizer,
				gutter: 20
			});
		}, 2000);
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