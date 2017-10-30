(function (window, document, jQuery, undefined) {
	'use strict';

	var pageObj = new page();

	function page() {
		this._passiveOwl = '.jQ-passive-owl';
		this._btnPrev    = '.jQ-btn-prev';
		this._btnNext    = '.jQ-btn-next';
	}

	page.prototype.owlSetting = function() {
		$(pageObj._passiveOwl).each(function(){
			for (var i = 0; i < $(this).find('.item').length; i++) {
				$(this).find('.item').eq(i).attr('data-index', i);
			}
		});

		projects.owlCarousel(pageObj._passiveOwl);
		$(pageObj._btnPrev).addClass('disabled');
	}

	page.prototype.owlSync = function() {
		$(pageObj._passiveOwl).on('dragged.owl.carousel' , function(){
			var _idx = $(this).find('.active .item').data('index');

			if ($(this).hasClass('mascot-list')) {
				projects.owlGoto('.desc-list', _idx, 400);
			} else {
				projects.owlGoto('.mascot-list', _idx, 400);				
			}
		});
	}

	projects.$w.load(function(){
		$(pageObj._passiveOwl).on('translated.owl.carousel' , function(){
			var _idx    = $(this).find('.active .item').data('index'),
				_length = $(this).find('.item').length;

			if (_idx === _length - 1) {
				$(pageObj._btnNext).addClass('disabled');
			} else if (_idx === 0) {
				$(pageObj._btnPrev).addClass('disabled');
			} else {
				$(pageObj._btnNext).removeClass('disabled');
				$(pageObj._btnPrev).removeClass('disabled');
			}
		});
	});

	projects.$d.ready(function(){
		pageObj.owlSetting();

		if ( projects.device() !== 'PC') {
			pageObj.owlSync();
		}

		$(pageObj._btnPrev).on('click', function(){
			projects.owlPrev(pageObj._passiveOwl);
		});

		$(pageObj._btnNext).on('click', function(){
			projects.owlNext(pageObj._passiveOwl);
		});

		$(common._tab).on('click', function(){
			if ($(this).hasClass('sunny-baby')) {
				$('.content-wrap').addClass('add-bg');
			} else {
				$('.content-wrap').removeClass('add-bg');
			}
		});
	});

	if ( ! window.pageObj ) {
		window.pageObj = pageObj;
	}
}(window, document, $));