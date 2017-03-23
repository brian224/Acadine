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
		if (Math.round(Math.random()) === 0) {
			$('.result-content.empty-result').addClass('is-show');
			$('.result-content.has-result').removeClass('is-show');
		} else {
			$('.result-content.has-result').addClass('is-show');
			$('.result-content.empty-result').removeClass('is-show');
		}

		projects.$hb.animate({
			'scrollTop' : $('.result-content').offset().top - $(common._lHeader).height()
		});
		
		if ( projects.device() !== 'Mobile') {
			pageObj.masonry();
		}
	}

	page.prototype.tabSwitch = function(_anchor) {
		$(common._tab).each(function(){
			if ($(this).hasClass(_anchor)) {
				var _main = $(this).data('main'),
					_sub  = $(this).data('sub');

				if (_main !== undefined) {
					$('.main-tab > .m-tab-wrap > .tab-list').eq(_main).find(common._tab).trigger('click');
				}

				if (_sub !== undefined) {
					$(this).parents('.sub-tab').find('> .m-tab-wrap > .tab-list').eq(_sub).find(common._tab).trigger('click');
				}

				$(this).trigger('click');
			}
		});

		projects.$hb.animate({
			'scrollTop' : $('.main-tab').offset().top - $(common._lHeader).height()
		}, common._animateSpeed);

		if ((projects._browsers.safari === true && projects._browsers.chrome === false) || projects._browsers.msie === true) {
			common.totalHeight();
		}
	}

	projects.$w.load(function(){
	});

	projects.$d.ready(function(){
		if (projects._HREF.split('#')[1] !== undefined) {
			pageObj.tabSwitch(projects._HREF.split('#')[1]);
		}

		$(pageObj._keyword).on('click', function(){
			$(this).addClass('is-curr').parent().siblings().find(pageObj._keyword).removeClass('is-curr');

			pageObj.showResult();
		});

		$(pageObj._search).on('click', function(){
			pageObj.showResult();
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