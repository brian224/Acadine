(function (window, document, jQuery, undefined) {
	'use strict';

	var common = new page();
	var _en;

	function page() {
		this._lBody        = '.l-body';
		this._lHeader      = '.l-header';
		this._owl          = '.jQ-owl';
		this._countHeight  = '.jQ-count-height';
		this._btnTop       = '.jQ-top';
		this._select       = '.jQ-select';
		this._menu         = '.jQ-menu';
		this._sudMenu      = '.jQ-side-menu';
		this._video        = '.jQ-video';
		this._mute         = '.jQ-mute';
		this._tab          = '.jQ-tab';
		this._like         = '.jQ-like';
		this._calendar     = '.jQ-calendar';
		this._btnAccordion = '.jQ-btn-accordion';
		this._checkbox     = '.jQ-checkbox';
		this._radio        = '.jQ-radio';
		this._calc         = '.jQ-calc';
		this._tagSelect    = '.jQ-tag-select';
		this._leavePage    = false;
		this._animateSpeed = 400;
		this._masonryLoad  = false;
	}

	// header 仿下拉選單
	page.prototype.selectUI = function() {
		$(common._select).each(function(){
			var $this = $(this),
				_val  = '';

			if ($this.find('.is-selected').length !== 0) {
				_val = $this.find('.is-selected').text();
			} else {
				_val = $this.find('.list').eq(0).text();
			}

			$this.find('.m-selected-item').html(_val);

			$this.on('click', function(){
				$this.toggleClass('is-active');

				common.offClick(common._select);
			});

			$this.find('.list').on('click', function(){
				$(this).addClass('is-selected').siblings().removeClass('is-selected');
				$this.find('.m-selected-item').html($(this).text());
			});
		});
	}

	// 點擊目標區域以外的地方可關閉目標區域
	page.prototype.offClick = function(_target) {
		projects.$d.off('click').on('click' , function(e){
			e.stopPropagation();

			if (!$(e.target).is(_target + ', ' + _target + ' *')) {
				$(_target).removeClass('is-active');
			}
		});
	}

	// 捲到頁尾時觸發的事件
	page.prototype.showFooter = function() {
		var _totalH  = (projects._browsers.msie && projects._browsers.version === 9) ? projects.$b.height() : projects.$hb.height(),
			_cutH    = projects.$w.height(),
			_scrollH = (projects._browsers.chrome || projects._browsers.safari) ? projects.$b.scrollTop() : projects.$hb.scrollTop();

		if (_totalH <= _cutH + Math.ceil(_scrollH)) {
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

			for (var i = 0; i <= _middle; i++) {
				$(this).find('> .list:lt(' + _middle + ')').wrapAll('<div class="list-block"></div>');
			}
		});
	}

	// 捲動暫停影片
	page.prototype.pauseVideo = function() {
		$(common._video).each(function(){
			if ($(this).offset().top + $(this).height() < projects.$w.scrollTop() + parseInt($('.l-content').css('padding-top'), 10) || common._leavePage === true) {
				for (var i = 0; i < projects._media._player.length; i++) {
					if ( ! projects._media._player[i].getPlayerState ) return false;
					if (projects._media._player[i].getPlayerState() === 1) {
						projects._media._player[i].pauseVideo();
					}

					$('[data-media]').eq(i).attr('data-media' , $('[data-media]').eq(i).attr('data-media').replace(/autoplay=1/ , 'autoplay=0'));
				}
			} else if ($(this).parents('.owl-item').hasClass('active')) {
				for (var i = 0; i < projects._media._player.length; i++) {
					if ( ! projects._media._player[i].getPlayerState ) return false;
					if (projects._media._player[i].getPlayerState() === 2) {
						projects._media._player[i].playVideo();
						$('[data-media]').eq(i).attr('data-media' , $('[data-media]').eq(i).attr('data-media').replace(/autoplay=0/ , 'autoplay=1'));
					}
				}
			}
		});
	}

	// 重回視窗繼續影片
	page.prototype.returnPage = function() {
		$(common._video).each(function(){
			if ($(this).parents('.owl-item').hasClass('active') && $(this).offset().top + $(this).height() > projects.$w.scrollTop() + parseInt($('.l-content').css('padding-top'), 10)) {
				for (var i = 0; i < projects._media._player.length; i++) {
					if ( ! projects._media._player[i].getPlayerState ) return false;
					if (projects._media._player[i].getPlayerState() === 2) {
						projects._media._player[i].playVideo();
						$('[data-media]').eq(i).attr('data-media' , $('[data-media]').eq(i).attr('data-media').replace(/autoplay=0/ , 'autoplay=1'));
					}
				}
			}
		});
	}

	page.prototype.touchLock = function(_scrollTop) {
		$(common._owl).on('touchmove touchend', function(e){
			projects.$b.scrollTop(_scrollTop);
		});
	}

	page.prototype.selectInputCheck = function() {
		if($('input[type="radio"]:checked').length !== 0) {
			$(common._radio).each(function(){
				if($(this).find('input[type="radio"]:checked').length !== 0) {
					var _name = $(this).find('input[type="radio"]:checked').attr('name');

					$('input[type="radio"][name="' + _name + '"]').parents(common._radio).removeClass('is-checked');
					$(this).addClass('is-checked');
				}
			});
		}
	}

	page.prototype.changeToSelect = function() {
		$(common._tagSelect).each(function(){
			var $this = $(this),
				_str  = '<select class="m-selection">',
				_idx  = $this.find('.is-curr').length !== 0 ? $this.find('.is-curr').parent().index() : 0;

			for (var i = 0; i < $this.find('a.b-link').length; i++) {
				_str += '<option>' + $this.find('a.b-link').eq(i).text() + '</option>';
			}

			_str += '</select>';

			$this.html(_str).find('option').eq(_idx).attr('selected', 'selected');

			$this.on('change', '.m-selection', function(){
				var _idx = $(this).find('option:selected').index();

				$(this).parents('.m-tab-wrap').siblings('.m-tab-content').children('.content-list').eq(_idx).addClass('is-curr').siblings().removeClass('is-curr');
			});
		});
	}

	projects.$w.load(function(){
		common.headerHeight();
		common.showFooter();
	});

	projects.$d.ready(function(){
		projects.owlCarousel(common._owl);
		common.selectInputCheck();

		if (projects.device() === 'Mobile') {
			$(common._owl).on('drag.owl.carousel', function(){
				common.touchLock($('body').scrollTop());
			});

			$(common._owl).on('translated.owl.carousel', function(){
				$(common._owl).off('touchmove touchend');
			});

			$(common._sudMenu).removeClass('is-active');
			
			if ($(common._tagSelect).length !== 0) {
				common.changeToSelect();
			}
		}

		// 有影片才觸發偵聽事件
		if ($(common._video).length !== 0) {
			window.onblur = window.onfocusout = window.onpagehide = function(){
				common._leavePage = true;
				common.pauseVideo();
			}

			window.onfocus = window.onfocusin = window.onpageshow = function(){
				common._leavePage = false;
				common.returnPage();
			}
		}

		common.selectUI();

		$(common._btnTop).on('click', function(){
			projects.$hb.animate({'scrollTop': 0}, common._animateSpeed);

			if ($(common._lBody).hasClass('index')) {
				$(common._lBody).attr('data-cut', 1);
				$('.pagination').find('.cut-dot .list').removeClass('is-curr').eq(0).addClass('is-curr');
			}
		});

		$(common._menu).on('click', function(){
			$(common._lHeader).toggleClass('is-active');
		});

		$(common._sudMenu).on('click', function(){
			$(this).toggleClass('is-active');

			if ($(this).hasClass('is-active')) {
				$('.collapse-wrap').on('webkitTransitionEnd oTransitionend oTransitionEnd msTransitionEnd transitionend', function(){
					$(this).off('webkitTransitionEnd oTransitionend oTransitionEnd msTransitionEnd transitionend');
					$(common._lBody).addClass('is-padding-arrow');
				});
			} else {
				$(common._lBody).removeClass('is-padding-arrow');
			}
		});

		$(common._video).on('click', function(){
			if ($(this).parents('.owl-item').hasClass('active')) {
				var _idx = $(this).find('.m-youtube-append').attr('id').split('m-youtube-')[1];

				if (projects._media._player[_idx].getPlayerState() !== 1) {
					$(this).removeClass('is-pause');
					$(this).parent().attr('data-media' , $(this).parent().attr('data-media').replace(/autoplay=0/ , 'autoplay=1'));
					projects._media._player[_idx].playVideo();
				} else {
					$(this).addClass('is-pause');
					$(this).parent().attr('data-media' , $(this).parent().attr('data-media').replace(/autoplay=1/ , 'autoplay=0'));
					projects._media._player[_idx].pauseVideo();
				}
			}
		});

		$(common._mute).on('click', function(){
			var _idx = $(this).prev(common._video).find('.m-youtube-append').attr('id').split('m-youtube-')[1];

			if ($(this).hasClass('is-mute')) {
				$(this).removeClass('is-mute');
				projects._media._player[_idx].unMute();
			} else {
				$(this).addClass('is-mute');
				projects._media._player[_idx].mute();
			}
		});

		$(common._tab).on('click', function(){
			var _idx = $(this).parent().index();

			$(this).addClass('is-curr').parent().siblings().find(common._tab).removeClass('is-curr');
			$(this).parents('.m-tab-wrap').siblings('.m-tab-content').children('.content-list').eq(_idx).addClass('is-curr').siblings().removeClass('is-curr');
		});

		$(common._like + ', ' + common._calendar).on('click', function(){
			$(this).toggleClass('is-add');
		});

		$(common._btnAccordion).on('click', function(){
			$(this).parents('.m-accordion').toggleClass('is-open');

			if ( projects.device() === 'PC') {
				$(this).parents('.m-accordion').siblings().removeClass('is-open');
			}
		});

		$(common._checkbox).on('click', function(){
			if($(this).find('input[type="checkbox"]:checked').length !== 0) {
				$(this).addClass('is-checked');
			} else {
				$(this).removeClass('is-checked');
			}
		});

		$(common._radio).on('click', function(){
			if($(this).find('input[type="radio"]:checked').length !== 0) {
				var _name = $(this).find('input[type="radio"]:checked').attr('name');

				$('input[type="radio"][name="' + _name + '"]').parents(common._radio).removeClass('is-checked');
				$(this).addClass('is-checked');
			}

			if($(this).parent().hasClass('deliver-method')) {
				if($(this).find('input[type="radio"]').val() === 'store') {
					$(this).parent().addClass('is-store');
				} else {
					$(this).parent().removeClass('is-store');
				}
			}
		});

		$(common._calc).on('click', function(){
			var _val = parseInt($(this).siblings('.m-box-holder').find('.m-inputbox').val(), 10);

			if ($(this).data('calc') === 'minus') {
				_val <= 2 ? $(this).siblings('.m-box-holder').find('.m-inputbox').val(1) : $(this).siblings('.m-box-holder').find('.m-inputbox').val(_val - 1);
			} else {
				$(this).siblings('.m-box-holder').find('.m-inputbox').val(_val + 1);
			}
		});
	});

	projects.$w.on('scroll' , function(){
		common.showFooter();
		common.pauseVideo();
	});

	projects.$w.resize(function(){
		if (projects.device() !== 'Mobile') {
			common.showFooter();
		} else {
			if ($(common._tagSelect).length !== 0 && $(common._tagSelect).children().prop('tagName').toLowerCase() !== 'select') {
				common.changeToSelect();
			}
		}
	});

	if ( ! window.common ) {
		window.common = common;
	}
}(window, document, $));