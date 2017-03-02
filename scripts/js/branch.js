(function (window, document, jQuery, undefined) {
	'use strict';

	var pageObj = new page();

	function page() {
		this._slideDown = '.jq-slide-down';
	}

	projects.$w.load(function(){
		$('.social-wall').masonry({
			itemSelector: '.list-item',
			columnWidth: '.item-sizer',
			gutter: 20
		});
	});

	projects.$d.ready(function(){
		$(pageObj._slideDown).on('click', function(){
			projects.$hb.animate({
				'scrollTop' : $('.activity-cut').offset().top - $(common._lHeader).height()
			});
		});
	});

	projects.$w.on('scroll' , function(){
	});

	projects.$w.resize(function(){
	});

	if ( ! window.pageObj ) {
		window.pageObj = pageObj;
	}
}(window, document, $));