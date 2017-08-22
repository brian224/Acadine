(function (window, document, jQuery, undefined) {
	'use strict';

	var pageObj = new page();

	function page() {
		this._category    = '.jQ-category';
		this._curr        = '.jQ-curr';
		this._datepicker  = '.jQ-datepicker';
		this._btnClear    = '.jQ-clear';
		// this._deliverInfo = '.jQ-deliver-info';
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

		// $(pageObj._deliverInfo).each(function(){
		// 	var _name     = $(this).data('name').split(''),
		// 		_addr     = $(this).data('address'),
		// 		_phone    = $(this).data('phone').split('');

		// 	if (_name.length > 2) {
		// 		_name.splice(1, 2, '*', '*');
		// 	} else {
		// 		_name.splice(1, 1, '*');
		// 	}
		// 	_phone.splice(4, 3, '*', '*', '*');

		// 	$(this).find('.info-name').text(_name.join(''));
		// 	$(this).find('.info-addr').text(_addr);
		// 	$(this).find('.info-phone').text(_phone.join(''));
		// });

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

		$(common._openBox).on('click' , function(){
			if ($(this).data('type') === 'add') {
				$('.lightbox-title').text('新增收件人');
				$('.m-lightbox-content .btn-link[type="submit"]').text('確定新增');
			} else if ($(this).data('type') === 'edit') {
				$('.lightbox-title').text('修改收件人資訊');
				$('.m-lightbox-content .btn-link[type="submit"]').text('確定修改');
			}
		});
	});

	if ( ! window.pageObj ) {
		window.pageObj = pageObj;
	}
}(window, document, $));