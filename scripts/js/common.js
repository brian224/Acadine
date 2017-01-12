(function (window, document, jQuery, undefined) {
	'use strict';

	var common = new page();

	function page() {
		this._lBody        = '.l-body';
		this._owl          = '.jQ-owl';
		this._countHeight  = '.jQ-count-height';
		this._btnTop       = '.jQ-top';
		// this._replaceTag   = '.jQ-replace-tag';
		this._select       = '.jQ-select';
		this._menu         = '.jQ-menu';
		this._sudMenu      = '.jQ-side-menu';
		this._video        = '.jQ-video';
		this._animateSpeed = 400;
		this._masonryLoad  = false;
	}

	// page.prototype.selectUI = function() {
	// 	$('select').each(function(i , v){
	// 		var $this = $('select').eq(i),
	// 			_text = $this.find('option:selected').text() || $this.find('option:eq(0)').text(); // 是否有預選項目

	// 		if ($this.parent().hasClass('selecter')) { // 重新append時
	// 			$this.unwrap();
	// 			$this.siblings().remove();
	// 		}
	// 		$this.wrap('<div id="select-'+i+'" class="selecter closed" />');
	// 		$this.css({'display': 'none'});
	// 		$('#select-'+i+'').append('<span class="selecter-selected">'+ _text +'</span>');

	// 		$('#select-'+i+'').append('<div class="selecter-options" style="display:none;"></div>');

	// 		$this.find('option').each(function(idx , val){
	// 			var _sta = '';

	// 			if ($(this).attr('disabled') === 'disabled') {
	// 				_sta += ' disabled'; // 如果不可選
	// 			}

	// 			if ($(this).attr('selected') === 'selected') {
	// 				_sta += ' selected'; // 如果是預選項目
	// 			}

	// 			$('#select-'+i+'').find('div').append('<span class="selecter-item'+_sta+'" data-value="'+ $this.find('option:eq('+idx+')').val() +'">'+ $this.find('option:eq('+idx+')').text() +'</span>');
	// 		});

	// 		$('#select-'+i+'').hover(function(){
	// 			$('#select-'+i+'').addClass('focus open').removeClass('closed').find('.selecter-options').css('display' , 'block');
	// 		} , function(){
	// 			$('#select-'+i+'').addClass('closed').removeClass('focus open').find('.selecter-options').css('display' , 'none');
	// 		});

	// 		$('#select-'+i+'').find('.selecter-item').on('click' , function(e){
	// 			var $this  = $(this),
	// 				$index = $(this).index();
	// 			$('#select-'+i+'').addClass('closed').removeClass('focus open').find('.selecter-options').css('display' , 'none');
	// 			if (!$this.hasClass('disabled')) { // 不可選時不做事
	// 				$('#select-'+i+'').find('.selecter-selected').addClass('selected').text($this.text());
	// 				$('#select-'+i+'').find('select option:eq('+ $index +')').prop('selected' , true);
	// 				$('#select-'+i+'').find('select').trigger('change');
	// 				$this.addClass('selected').siblings().removeClass('selected');
	// 			}
	// 		});
	// 	});
	// }

	// 點擊目標區域以外的地方可關閉目標區域
	page.prototype.offClick = function(_target) {
		projects.$d.off('click').on('click' , function(e){
			e.stopPropagation();

			if (!$(e.target).is(_target + ', ' + _target + ' *')) {
				$(_target).removeClass('is-active');
			}
		});
	}

	page.prototype.showFooter = function() {
		var _totalH  = (projects._browsers.msie && projects._browsers.version === 9) ? projects.$b.height() : projects.$hb.height(),
			_cutH    = projects.$w.height(),
			_scrollH = (projects._browsers.chrome || projects._browsers.safari) ? projects.$b.scrollTop() : projects.$hb.scrollTop();

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

	// page.prototype.replaceTag = function() {
	// 	$(common._replaceTag).each(function(){
	// 		$(this).replaceWith('<select class="m-selection ' + $(this).attr('class') + '">' + $(this).html().replace(/li/g, 'option') + '</select>');
	// 	});

	// 	$(common._replaceTag).each(function(){
	// 		$(this).wrapAll('<div class="m-box-holder is-selector"></div>');
	// 	});
	// }

	projects.$w.load(function(){
		common.headerHeight();
		common.showFooter();
	});

	projects.$d.ready(function(){
		projects.owlCarousel(common._owl);

		// projects.$w.on('touchmove', function(e){
		// 	console.log(e.pageX + ' , ' + e.pageY);
		// });

		$(common._select).on('click', function(){
			$(this).toggleClass('is-active');

			common.offClick(common._select);
		});

		$(common._btnTop).on('click', function(){
			projects.$hb.animate({'scrollTop': 0}, common._animateSpeed);
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

		$(common._video).on('click', function(){
			if ($(this).parents('.owl-item').hasClass('active')) {
				var _idx = $(this).find('.m-youtube-append').attr('id').split('m-youtube-')[1];

				if (projects._media._player[_idx].getPlayerState() === 2) {
					projects._media._player[_idx].playVideo();
				} else {
					projects._media._player[_idx].pauseVideo();
				}
			}
		});

		if ( projects.device() === 'Mobile') {
			$(common._sudMenu).trigger('click');
		} else {
			// common.replaceTag();
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