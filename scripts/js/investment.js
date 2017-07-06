(function (window, document, jQuery, undefined) {
	'use strict';

	var pageObj = new page();

	function page() {
		this._category    = '.jQ-category';
		this._curr        = '.jQ-curr';
		this._mainContent = '.main-content';
	}

	projects.$w.load(function(){
	});

	projects.$d.ready(function(){
		if (projects.$w.width() >= 1024) {
			$(pageObj._mainContent).css('min-height', $(pageObj._category).height());
		}

		$(pageObj._curr).text($('.category-list .is-curr').eq(-1).text());

		$(pageObj._category).on('click', function(){
			if (projects.$w.width() < 740) {
				$(this).addClass('is-active');
				$(common._sudMenu).removeClass('is-active');
				common.offClick(pageObj._category);
			} else if (projects.$w.width() >= 1024) {
				if (navigator.userAgent.indexOf('MSIE 9') > 0) {
					$(pageObj._mainContent).css('min-height', $(this).height());
				} else {
					$(this).on('webkitTransitionEnd oTransitionend oTransitionEnd msTransitionEnd transitionend', function(){
						$(this).off('webkitTransitionEnd oTransitionend oTransitionEnd msTransitionEnd transitionend');
						$(pageObj._mainContent).css('min-height', $(this).height());
					});
				}
			}
		});

		$(pageObj._curr).on('click', function(){
			if ($(pageObj._category).hasClass('is-active')) {
				$(pageObj._category).removeClass('is-active');

				return false;
			}
		});

		$(pageObj._category + ' .b-link').on('click', function(){
			if ($(this).next().length >= 1) {
				$(this).toggleClass('is-active');
			}
			$(this).parent().siblings().find('.b-link').removeClass('is-active');
		});
	});

	if ( ! window.pageObj ) {
		window.pageObj = pageObj;
	}
}(window, document, $));