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

	page.prototype.showResult = function() {
		// if (Math.round(Math.random()) === 0) {
		// 	$('.result-content.empty-result').addClass('is-show');
		// 	$('.result-content.has-result').removeClass('is-show');
		// } else {
		// 	$('.result-content.has-result').addClass('is-show');
		// 	$('.result-content.empty-result').removeClass('is-show');
		// }

		projects.$hb.animate({
			'scrollTop' : $('.result-content').offset().top - $(common._lHeader).height()
		});
		
		if ( projects.device() !== 'Mobile') {
			pageObj.masonry();
		}
	}

	projects.$w.load(function(){
	});

	projects.$d.ready(function(){
		// $(pageObj._keyword).on('click', function(){
		// 	$(this).addClass('is-curr').parent().siblings().find(pageObj._keyword).removeClass('is-curr');

		// 	pageObj.showResult();
		// });

		// $(pageObj._search).on('click', function(){
		// 	pageObj.showResult();
		// });

		if ( projects.device() !== 'PC') {
			$('.not-here').on('click', function(){
				$(this).addClass('is-touch');
			});
		}
	});

	projects.$w.on('scroll' , function(){
	});

	projects.$w.resize(function(){
	});

	if ( ! window.pageObj ) {
		window.pageObj = pageObj;
	}
}(window, document, $));