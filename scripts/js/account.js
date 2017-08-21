(function (window, document, jQuery, undefined) {
	'use strict';

	var pageObj = new page();

	function page() {
		this._category   = '.jQ-category';
		this._curr       = '.jQ-curr';
		this._datepicker = '.jQ-datepicker';
		this._btnClear   = '.jQ-clear';
		this._btnAdd     = '.jQ-add';
	}

	projects.$w.load(function(){
	});

	projects.$d.ready(function(){
		projects.validate({
			event : 'focusout'
		});

		if (projects.$w.width() >= 1024) {
			$('.main-content').css('min-height', $(pageObj._category).height());
		}

		$(pageObj._curr).text($('.category-list .is-curr').eq(-1).text());

		if ($(pageObj._datepicker).length !== 0) {
			$(pageObj._datepicker + ' .m-inputbox').DatePicker();
		}

		$(pageObj._category).on('click', function(){
			if (projects.$w.width() < 740) {
				$(this).addClass('is-active');
				$(common._sudMenu).removeClass('is-active');
				common.offClick(pageObj._category);
			} else if (projects.$w.width() >= 1024) {
				if (navigator.userAgent.indexOf('MSIE 9') > 0) {
					$('.main-content').css('min-height', $(this).height());
				} else {
					$(this).on('webkitTransitionEnd oTransitionend oTransitionEnd msTransitionEnd transitionend', function(){
						$(this).off('webkitTransitionEnd oTransitionend oTransitionEnd msTransitionEnd transitionend');
						$('.main-content').css('min-height', $(this).height());
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
		});

		$(pageObj._datepicker + ' .m-icon').on('click', function(){
			$(this).prev().find('.m-inputbox').trigger('click');

			return false;
		});

		$(pageObj._btnClear).on('click', function(){
			$('input, textarea').val('').prop('checked', false);
			$(common._checkbox + ', ' + common._radio).removeClass('is-checked');
		});

		$(pageObj._btnAdd).on('click', function(){
			$('.adding-wrap').addClass('is-open');
		});
	});

	if ( ! window.pageObj ) {
		window.pageObj = pageObj;
	}
}(window, document, $));