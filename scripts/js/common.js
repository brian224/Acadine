(function (window, document, jQuery, undefined) {
	'use strict';

	var common = new page();

	function page() {
		this._lBody        = '.l-body';
		this._owl          = '.jQ-owl';
		this._countHeight  = '.jQ-count-height';
		this._btnTop       = '.jQ-top';
		this._lang         = '.jQ-lang-switch';
		this._replaceTag   = '.jQ-replace-tag';
		this._menu         = '.jQ-menu';
		this._sudMenu      = '.jQ-side-menu';
		this._animateSpeed = 400;
	}

	// 點擊目標區域以外的地方可關閉目標區域
	page.prototype.offClick = function(_target) {
		projects.$d.off('click').on('click' , function(e){
			e.stopPropagation();

			if (!$(e.target).is(_target + ', ' + _target + ' *')) {
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
	});

	projects.$d.ready(function(){
		projects.owlCarousel(common._owl);

		$(common._btnTop).on('click', function(){
			indexObj.slideCut(0);
		});

		$(common._lang).on('click', function(){
			$(this).toggleClass('is-active');
		});

		$(common._menu).on('click', function(){
			$(this).parents('.l-header').toggleClass('is-active');
			$(common._lang).removeClass('is-active');
		});

		$(common._sudMenu).on('click', function(){
			$(this).toggleClass('is-active');
		});

		if ( projects.device() === 'Mobile') {
			$(common._replaceTag).replaceWith('<ul class="visitor-center jQ-replace-tag">' + $(common._replaceTag).html().replace(/option/g, 'li') + '</ul>');
		}
	});

	projects.$w.on('scroll' , function(){
		if ( projects.device() !== 'Mobile') {
			common.showFooter();
		}
	});

	projects.$w.resize(function(){
		if ( projects.device() !== 'Mobile') {
			window.location.reload();
			common.showFooter();
		}
	});

	if ( ! window.common ) {
		window.common = common;
	}
}(window, document, $));