(function (window, document, jQuery, undefined) {
	'use strict';

	var pageObj = new page();

	function page() {
		this._keyword = '.jQ-keyword';
		this._search  = '.jQ-search';
	}

	page.prototype.masonry = function() {
		$('.result-list').masonry({
			itemSelector: '.list-item',
			columnWidth: '.item-sizer',
			gutter: '.item-gutter'
		});
	}

	projects.$w.load(function(){
	});

	projects.$d.ready(function(){
		$(pageObj._keyword).on('click', function(){
			$(pageObj._keyword).removeClass('is-curr');
			$(this).addClass('is-curr');
			$('.result-content').addClass('is-show');
			pageObj.masonry();
		});

		$(pageObj._search).on('click', function(){
			$('.result-content').addClass('is-show');
			pageObj.masonry();
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