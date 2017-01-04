(function (window, document, jQuery, undefined) {
	'use strict';

	var common = new page();

	function page() {
		this._lBody        = '.l-body';
		this._owl          = '.jQ-owl';
		this._countHeight  = '.jQ-count-height';
		this._btnTop       = '.jQ-top';
		this._animateSpeed = 400;
	}

	// 點擊目標區域以外的地方可關閉目標區域
	page.prototype.offClick = function(_target) {
		projects.$d.off('click').on('click' , function(e){
			if (_target === '.m-search-bar' && $(_target).hasClass('is-show')) {
				e.stopPropagation();

				if (!$(e.target).is(common._search + ', ' + common._search + ' *,' + _target + ', ' + _target + ' *')) {
					$('.m-search-bar').removeClass('is-show');
				}
			} else if (_target === common._sitemap && $(_target).hasClass('is-active')) {
				// 關閉網站地圖
				e.stopPropagation();

				if (!$(e.target).is(common._quickList + ', ' + common._quickList + ' *,' + _target + ', ' + _target + ' *')) {
					$(common._sitemap).removeClass('is-active');
					$(common._quickList).animate({
						height: $(common._quickList).find('.list').height()
					}, common._animateSpeed);
				}
			} else if (_target === '.m-lightbox') {
				// 關閉 lightbox
				e.stopPropagation();

				if (!$(e.target).is(common._btnLightbox + ', ' + common._btnLightbox + ' *,' + _target + ', ' + _target + ' *') && $(common._lBody).hasClass('show-lightbox')) {
					$(common._lBody).addClass('close-lightbox').on('webkitAnimationEnd oAnimationend oAnimationEnd msAnimationEnd animationend', function(){
						$(common._lBody).removeClass('show-lightbox close-lightbox').off('webkitAnimationEnd oAnimationend oAnimationEnd msAnimationEnd animationend');
					});
				}
			}
		});
	}

	page.prototype.showFooter = function() {
		var _totalH  = projects.$hb.height(),
			_cutH    = projects.$w.height(),
			_scrollH = (projects._browsers.chrome) ? projects.$b.scrollTop() : projects.$hb.scrollTop();

		if (_totalH <= _cutH + _scrollH) {
			$(common._lBody).addClass('show-footer');
		} else if (_scrollH <= 70) {
			$(common._lBody).addClass('show-header');
		} else {
			$(common._lBody).removeClass('show-header show-footer');
		}
	}

	// 計算 header menu 高度
	page.prototype.headerHeight = function() {
		$(common._countHeight).each(function(){
			var $list   = $(this).find('.list'),
				_column = $(this).data('column'),
				_middle = Math.ceil($list.length / _column);

			for (var i = 0; i < _middle; i++) {
				$(this).find('> .list:lt(' + _middle + ')').wrapAll('<div class="list-block"></div>');
			}
		});
	}

	projects.$w.load(function(){
		common.headerHeight();
		common.showFooter();

		$(common._owl).each(function(){
			$(this).on('translated.owl.carousel' , function(e){
				if ($(this).find('.active .item').hasClass('is-dark')) {
					$(this).addClass('is-dark').removeClass('is-light');
				} else {
					$(this).addClass('is-light').removeClass('is-dark');
				}
			});
		});

		$(common._btnTop).on('click', function(){
			indexObj.slideCut(0);
		});
	});

	projects.$d.ready(function(){
		projects.owlCarousel(common._owl);
	});

	projects.$w.on('scroll' , function(){
		if ( projects.device() !== 'Mobile') {
			common.showFooter();
		}
	});

	projects.$w.resize(function(){
		if ( projects.device() !== 'Mobile') {
			common.showFooter();
		}
	});

	if ( ! window.common ) {
		window.common = common;
	}
}(window, document, $));