(function (window, document, jQuery, undefined) {
	'use strict';

	var pageObj = new page();

	function page() {
		this._passiveOwl = '.jQ-passive-owl';
		this._totalPage  = '.jQ-total-page';
		this._nowPage    = '.jQ-now-page';
		this._btnPrev    = '.jQ-btn-prev';
		this._btnNext    = '.jQ-btn-next';
	}

	page.prototype.owlSetting = function() {
		if ($('.dm-list .item').length !== 0) {
			$(pageObj._passiveOwl).each(function(){
				for (var i = 0; i < $(this).find('.item').length; i++) {
					$(this).find('.item').eq(i).attr('data-index', i);
				}

				if ($(this).find('.item').length === 3) {
					$(this).addClass('count-three');
				} else if ($(this).find('.item').length === 2) {
					$(this).addClass('count-two');
				}
			});

			$(pageObj._nowPage).text($('.dm-list .item').eq(0).data('index') + 1);
			$(pageObj._totalPage).text($('.dm-list .item').length);
			projects.owlCarousel(pageObj._passiveOwl);
		}
	}

	page.prototype.owlSync = function() {
		$(pageObj._passiveOwl).on('dragged.owl.carousel' , function(){
			var _idx = $(this).find('.active .item').data('index');

			if ($(this).hasClass('dm-list')) {
				projects.owlGoto('.desc-list', _idx, 400);
			} else {
				projects.owlGoto('.dm-list', _idx, 400);				
			}
		});
	}

	projects.$w.load(function(){
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

		$('.dm-list .item').on('click', function(){
			if ($(this).parent().hasClass('active')) {
				window.location.href = $(this).data('url');
			} else {
				projects.owlGoto(pageObj._passiveOwl, $(this).data('index'), 400);
			}
		});
	});

	$(pageObj._passiveOwl).on('changed.owl.carousel' , function(){
		$(pageObj._nowPage).text($('.dm-list .active .item').data('index') + 1);
	});

	if ( ! window.pageObj ) {
		window.pageObj = pageObj;
	}
}(window, document, $));