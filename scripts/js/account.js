(function (window, document, jQuery, undefined) {
	'use strict';

	var pageObj = new page();

	function page() {
		this._category   = '.jQ-category';
		this._curr       = '.jQ-curr';
		this._datepicker = '.jQ-datepicker';
	}

	projects.$w.load(function(){
	});

	projects.$d.ready(function(){
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
	});

	if ( ! window.pageObj ) {
		window.pageObj = pageObj;
	}
}(window, document, $));