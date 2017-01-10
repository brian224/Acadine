(function (window, document, jQuery, undefined) {
	'use strict';

	var common = new page();

	function page() {
		this._lBody        = '.l-body';
		this._owl          = '.jQ-owl';
		this._countHeight  = '.jQ-count-height';
		this._btnTop       = '.jQ-top';
		this._replaceTag   = '.jQ-replace-tag';
		this._menu         = '.jQ-menu';
		this._sudMenu      = '.jQ-side-menu';
		this._animateSpeed = 400;
		this._masonryLoad  = false;
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

			if ($(common._lBody).hasClass('branch') && !common._masonryLoad) {
				var $item = $('<li class="list-item"><a href="javascript:;" class="b-link from-instagram"><figure class="img-wrap"><img src="../../content/img/branch/social/09.jpg" alt=""><figcaption class="desc">是時候來點下午茶囉！ 喝茶也要很時尚是時候來點下午茶囉！ 喝茶也要很時尚是時候來點下午茶囉！ 喝茶也要很時尚</figcaption></figure></a></li><li class="list-item"><a href="javascript:;" class="b-link from-facebook"><figure class="img-wrap"><img src="../../content/img/branch/social/10.jpg" alt=""><figcaption class="desc">歡慶週年慶，小編極力爭取限量雲朵家族來店禮抽獎唷！【遠百IG限定活動】 完成下列兩個步驟，即符合抽獎資格 1. 追蹤遠百IG帳號 。</figcaption></figure></a></li><li class="list-item"><a href="javascript:;" class="b-link from-instagram"><figure class="img-wrap"><img src="../../content/img/branch/social/11.jpg" alt=""><figcaption class="desc">是時候來點下午茶囉！ 喝茶也要很時尚</figcaption></figure></a></li><li class="list-item"><a href="javascript:;" class="b-link from-facebook"><figure class="img-wrap"><img src="../../content/img/branch/social/12.jpg" alt=""><figcaption class="desc">歡慶週年慶，小編極力爭取限量雲朵家族來店禮抽獎唷！【遠百IG限定活動】 完成下列兩個步驟，即符合抽獎資格 1. 追蹤遠百IG帳號 。</figcaption></figure></a></li><li class="list-item"><a href="javascript:;" class="b-link from-instagram"><figure class="img-wrap"><img src="../../content/img/branch/social/13.jpg" alt=""><figcaption class="desc">是時候來點下午茶囉！ 喝茶也要很時尚</figcaption></figure></a></li><li class="list-item"><a href="javascript:;" class="b-link from-instagram"><figure class="img-wrap"><img src="../../content/img/branch/social/14.jpg" alt=""><figcaption class="desc">歡慶週年慶，小編極力爭取限量雲朵家族來店禮抽獎唷！【遠百IG限定活動】 完成下列兩個步驟，即符合抽獎資格 1. 追蹤遠百IG帳號 。</figcaption></figure></a></li><li class="list-item"><a href="javascript:;" class="b-link from-instagram"><figure class="img-wrap"><img src="../../content/img/branch/social/15.jpg" alt=""><figcaption class="desc">是時候來點下午茶囉！ 喝茶也要很時尚</figcaption></figure></a></li><li class="list-item"><a href="javascript:;" class="b-link from-instagram"><figure class="img-wrap"><img src="../../content/img/branch/social/16.jpg" alt=""><figcaption class="desc">歡慶週年慶，小編極力爭取限量雲朵家族來店禮抽獎唷！【遠百IG限定活動】 完成下列兩個步驟，即符合抽獎資格 1. 追蹤遠百IG帳號 。</figcaption></figure></a></li>');

				$('.social-wall').append($item).masonry('appended', $item);
				common._masonryLoad = true;
			}
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

	page.prototype.replaceTag = function() {
		$(common._replaceTag).each(function(){
			$(this).replaceWith('<select class="m-selection ' + $(this).attr('class') + '">' + $(this).html().replace(/li/g, 'option') + '</select>');
		});

		$(common._replaceTag).each(function(){
			$(this).wrapAll('<div class="m-box-holder is-selector"></div>');
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

		$(common._menu).on('click', function(){
			$(this).parents('.l-header').toggleClass('is-active');
		});

		$(common._sudMenu).on('click', function(){
			$(this).toggleClass('is-active');

			if ($(this).hasClass('is-active')) {
				$(common._lBody).addClass('is-padding-arrow');
			} else {
				$(common._lBody).removeClass('is-padding-arrow');
			}
		});

		if ( projects.device() === 'Mobile') {
			$(common._sudMenu).trigger('click');
		} else {
			common.replaceTag();
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