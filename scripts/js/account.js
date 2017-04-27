(function (window, document, jQuery, undefined) {
	'use strict';

	var pageObj = new page();

	function page() {
		this._category   = '.jQ-category';
		this._curr       = '.jQ-curr';
		this._datepicker = '.jQ-datepicker';
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
	}

	projects.$w.load(function(){
	});

	projects.$d.ready(function(){
		if (projects.$w.width() >= 1024) {
			$('.main-content').css('min-height', $(pageObj._category).height());
		}

		if (projects._HREF.split('#')[1] !== undefined) {
			pageObj.tabSwitch(projects._HREF.split('#')[1]);
		}

		$(pageObj._curr).text($('.category-list .is-curr').text());

		if ($(pageObj._datepicker).length !== 0) {
			$(pageObj._datepicker).DatePicker();
		}

		$(pageObj._category).on('click', function(){
			if (projects.$w.width() < 740) {
				$(this).addClass('is-active');
				$(common._sudMenu).removeClass('is-active');
				common.offClick(pageObj._category);
			}
		});

		$(pageObj._category + ' .b-link').on('click', function(){
			if ($(this).next().length >= 1) {
				$(this).toggleClass('is-active');
			}
		});
	});

	if ( ! window.pageObj ) {
		window.pageObj = pageObj;
	}
}(window, document, $));