(function (window, document, jQuery, undefined) {
	'use strict';

	var pageObj = new page();

	function page() {
		this._keyword = '.jQ-keyword';
		this._search  = '.jQ-search';
	}

	projects.$w.load(function(){
		$('.result-list').masonry({
			itemSelector: '.list-item',
			columnWidth: '.item-sizer',
			gutter: '.item-gutter'
		});
	});

	projects.$d.ready(function(){
		$(pageObj._keyword).on('click', function(){
			$(this).toggleClass('is-curr').parent().siblings().find('.is-curr').removeClass('is-curr');
			$('.result-content').addClass('is-show');
		});

		$(pageObj._search).on('click', function(){
			$('.result-content').addClass('is-show');
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