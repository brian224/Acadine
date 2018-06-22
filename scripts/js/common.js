(function (window, document, jQuery, undefined) {
	'use strict';

	var common = new page();
	var _en;

	function page() {
		this._lBody        = '.l-body';
		this._lHeader      = '.l-header';
		this._lContent     = '.l-content';
		this._lSidePopup   = '.l-side .popup-function';
		this._owl          = '.jQ-owl';
		this._countHeight  = '.jQ-count-height';
		this._btnTop       = '.jQ-top';
		this._select       = '.jQ-select';
		this._menu         = '.jQ-menu';
		this._subMenu      = '.jQ-sub-menu';
		this._sideMenu     = '.jQ-side-menu';
		this._video        = '.jQ-video';
		this._mute         = '.jQ-mute';
		this._tab          = '.jQ-tab';
		this._btnAccordion = '.jQ-btn-accordion';
		this._checkbox     = '.jQ-checkbox';
		this._radio        = '.jQ-radio';
		this._calc         = '.jQ-calc';
		this._tagSelect    = '.jQ-tag-select';
		this._share        = '.jQ-share';
		this._browserAdj   = '.jQ-browserAdj';
		this._adjHeight    = '.jQ-adjHeight';
		this._clearInput   = '.jQ-clear-input';
		this._openBox      = '.jQ-open-box';
		this._closeBox     = '.jQ-close-box';
		this._btnFunc      = '.jQ-btn-func';
		this._btnMarquee   = '.jQ-btn-marquee';
		this._langSwitch   = '.jQ-lang-switch';
		this._closePopup   = '.jQ-close-popup';
		this._sendMsg      = '.jQ-send-msg';
		this._btnSearch    = '.jQ-btn-search';
		this._btnOpen      = '.jQ-open-calendar';
		this._btnClose     = '.jQ-close-calendar';
		this._btnFinish    = '.jQ-finish';
		this._btnNext      = '.jQ-next';
		this._loading      = '.jQ-loading';
		this._waitOwl      = '.jQ-wait-owl';
		this._addingWrap   = '.m-adding-wrap';
		this._shortcutWrap = '.shortcut-wrap';
		this._teachOwl     = '.teach-owl';
		this._teachWrap    = '.m-teach';
		this._leavePage    = false;
		this._animateSpeed = 400;
		this._masonryLoad  = false;
		this._filter = {
			_frame     : '.jQ-selectFrame',
			_element   : '.jQ-selectTarget',
			_serialize : null
		};
		this._county = '.jQ-county';
	};

	// 取代有 {{ * }} 的內容
	page.prototype.Angular = function(element, callback) {
		var _elem = typeof(element) === 'object' ? $(element) : element;
		var _matchFn = function(angularelem) {
			var _html  = angularelem;
			var _match = _html.match(/{{\s*(\w*|.*)\s*[^\s]+\s*}}/g);

			if ( _match ) {
				for ( var j = 0 ; j < _match.length ; j ++ ) {
					var _regexItem = _match[j],
						_regexec   = /(?![{{]).*(?=}})/i.exec(_regexItem)[0].replace(/\s+/g , '');

					_html = _html.replace( new RegExp( _regexItem , 'g') , eval(_regexec) );
				}

				if ( typeof(callback) === 'function' ) {
					if ( typeof(element) === 'object' ) {
						callback($(_html)[0]);
					} else {
						callback(_html);
					}
				}
			}
		}

		if ( typeof(element) === 'object' ) {
			for ( var i = 0 ; i < _elem.length ; i ++ ) {
				_matchFn(_elem.eq(i)[0].outerHTML);
			}
		} else {
			_matchFn(_elem);
		}
	};

	// 取得有 {{ * }} 的結構
	page.prototype.AngularDate = function() {
		var _regex = {
			_brackets : /{{\s*(\w*|.*)\s*[^\s]+\s*}}/,
			_tagNames : /^\<.*\>/
		};
		var $tags = $(common._lBody).find('*');

		for ( var i = 0 ; i < $tags.length ; i ++ ) {
			var _match = $tags.eq(i)[0].outerHTML.match(_regex._brackets);
			if ( _match && _regex._tagNames.exec(_match['input'])[0].match(_regex._brackets) ) {
				for (var _key in $tags.eq(i).data() ) {
					if ( $tags.eq(i).data()[_key].match(_regex._brackets) ) {
						if ( ! $tags.eq(i).data('angular') ) {
							$tags.eq(i).data('angular', $tags.eq(i).data()[_key]);
						}
					}
				}
			}
		}
	};

	// 重組所有表單有 {{ * }} 的資料
	page.prototype.serialize = function(elem) {
		var $group      = elem.parents(common._filter._frame),
			$formTarget = $group.find(common._filter._element);
		// var _regex     = /(?:[^\/]+\/.+\/|.*[?&])/;
		var _valueArr  = [],
			_serialize = [];
		var _push = function(index) {
			var _name = $formTarget.eq(index).attr('name'),
				_value = $formTarget.eq(index).val();

			if ( $.inArray(_name , _valueArr) === -1 ) {
				_valueArr.push( _name );
				_serialize.push((_name + '=' + _value));
			}
		};

		for ( var i = 0; i < $formTarget.length; i ++ ) {
			if ( ( $formTarget.eq(i)[0].type === 'radio' || $formTarget.eq(i)[0].type === 'checkbox' ) ) {
				if ( $formTarget.eq(i).prop('checked') ) {
					_push(i);
				}
			} else if ( $formTarget.eq(i).attr('name') && ( $formTarget.eq(i)[0].type !== 'radio' || $formTarget.eq(i)[0].type !== 'checkbox' ) ) {
				_push(i);
			}
		}

		common._filter._serialize = _serialize.join('&');
	};

	// include 資料
	page.prototype.include = function(self) {
		var $target = $(self.data('target'));
		var _href   = self.data('url');

		if ( ! _href ) return false;

		$target.load(_href, function(e){
			if (self.data('callback')) {
				eval(self.data('callback'));
			}
		});
	};

	// 縣市區域綁定資料
	page.prototype.countyArea = function() {
		var _regex = {
			_connect : /connect\s\S+/i,
			_area    : /\S+$/i
		};
		var $county = $(common._county);
		
		if ( $county.length !== 0 ) {
			for ( var i = 0; i < $county.length; i ++ ) {
				var _areaName = _regex._area.exec(_regex._connect.exec($county.eq(i)[0].className)[0])[0];
				var _filter   = $county.eq(i).data('filter') ? $county.eq(i).data('filter').replace(/\s/g, '').split(',') : [],
					_value    = $county.eq(i).data('value') ? $county.eq(i).data('value') : null;

				$county.eq(i).data('area', _areaName);
				$county.eq(i).data('area-text', $('[name="'+_areaName+'"]').find('option').eq(0).text());

				for ( var j = 0 ; j < _area.length ; j ++ ) {
					if ( $.inArray(_area[j].county , _filter) === -1 ) {
						var $cloneCounty = $county.eq(i).find('option').eq(0).clone();

						$cloneCounty.text(_area[j].county);
						$cloneCounty.val(_area[j].county);
						if ( _value && _value === $cloneCounty.val() ) {
							$cloneCounty.prop('selected', true);
						}
						$cloneCounty.data('index', j);
						$county.eq(i).append($cloneCounty);
					}
				}
			}

			common.countyChange();
		}
	};

	page.prototype.countyChange = function() {
		var $county = $(common._county);
		
		for ( var i = 0; i < $county.length; i ++ ) {
			$county.eq(i).on('change', function(e){
				var $self      = $(this);
				var _value     = $self.val(),
					_index     = $self.find('option:selected').data('index'),
					_areaText  = $self.data('area-text');
				var $area      = $('[name="'+$self.data('area')+'"]');
				var _areaValue = $area.data('value') ? $area.data('value') : null;
				var _format    = $area.data('format') ? $area.data('format').replace(/\s/g, '').split(',') : null;

				$($area).prop('disabled', false).empty().append('<option>'+_areaText+'</option>');

				if ( _value ) {
					for ( var i = 0 , _areaDate = _area[_index].area ; i < _areaDate.length ; i ++ ) {
						var $cloneArea = $area.find('option').eq(0).clone();

						if ( _format ) {
							if ( _format[0] !== 'zip' ) {
								$cloneArea.text(_areaDate[i].district);
							} else {
								$cloneArea.text(_areaDate[i][_format[0]]);
							}

							if ( _format[1] !== 'zip' ) {
								$cloneArea.val(_areaDate[i].district);
							} else {
								$cloneArea.val(_areaDate[i][_format[1]]);
							}
						} else {
							$cloneArea.text(_areaDate[i].district);
							$cloneArea.val(_areaDate[i].zip);
						}

						if ( _areaValue && _areaValue === $cloneArea.val() ) {
							$cloneArea.prop('selected', true);
						}
						$($area).append($cloneArea);
					};
				} else {
					$($area).prop('disabled', true);
				}
			});

			if ( $county.eq(i).val() ) {
				$county.eq(i).trigger('change');
			}
		}
	};

	// header 仿下拉選單
	page.prototype.selectUI = function() {
		$(common._select).each(function(){
			var $this = $(this),
				_val  = '';

			if ($this.find('.is-selected').length !== 0) {
				if ($this.data('structure') === 'html') {
					_val = $this.find('.is-selected').html();
				} else {
					_val = $this.find('.is-selected').text();
				}
			} else {
				if ($this.data('structure') === 'html') {
					_val = $this.find('.list').eq(0).html();
				} else {
					_val = $this.find('.list').eq(0).text();
				}
			}

			$this.find('.m-selected-item').html(_val);

			$this.on('click', function(){
				$this.toggleClass('is-active');

				common.offClick(common._select);
			});

			$this.find('.list').on('click', function(){
				$(this).addClass('is-selected').siblings().removeClass('is-selected');

				if ($this.data('structure') === 'html') {
					$this.find('.m-selected-item').html($(this).html());
				} else {
					$this.find('.m-selected-item').html($(this).text());
				}
			});
		});
	}

	// 首次使用教學
	page.prototype.teachLesson = function() {
		if (localStorage.getItem('teach-lesson') !== 'true' && $(common._teachWrap).length !== 0) {
			$(common._lBody).addClass('show-teach');
		}
	}

	// 點擊目標區域以外的地方可關閉目標區域
	page.prototype.offClick = function(_target) {
		projects.$d.off('click').on('click' , function(e){
			e.stopPropagation();

			if (_target === '.m-lightbox-content') {
				// 關閉 lightbox
				e.stopPropagation();

				if (!$(e.target).is(common._openBox + ', ' + common._openBox + ' *,' + _target + ', ' + _target + ' *') && $(e.target).data('callback') !== true && $(common._lBody).hasClass('show-lightbox')) {
					common.closeBoxEvent();
				}
			} else if (_target === '.jQ-category') {
				if (!$(e.target).is(_target + ', ' + _target + ' *')) {
					$(_target).removeClass('is-active');
				}
			} else if (_target === '.popup-function') {
				if (!$(e.target).is(_target + ', ' + _target + ' *, ' + common._btnFunc + ', ' + common._btnFunc + ' *')) {
					$(_target).prev().removeClass('show-func');
					$(common._lBody).removeClass('has-filter');
				}
			} else if (_target === common._select) {
				if (!$(e.target).is(_target + ', ' + _target + ' *')) {
					$(_target).removeClass('is-active');
				}
			} else if (_target === '.calendar-box') {
				if (!$(e.target).is(_target + ', ' + _target + ' *, ' + common._addingWrap + ', ' + common._addingWrap + ' *')) {
					$(common._addingWrap).removeClass('is-open');
				}
			}
		});
	}

	// 捲到頁尾時觸發的事件
	page.prototype.showFooter = function() {
		var _totalH  = (projects._browsers.msie && projects._browsers.version === 9) ? projects.$b.height() : projects.$hb.height(),
			_cutH    = projects.$w.height(),
			_scrollH = projects.$w.scrollTop();

		if (_totalH <= _cutH + Math.ceil(_scrollH)) {
			$(common._lBody).addClass('show-footer');

			if ($(common._lBody).hasClass('branch') && !common._masonryLoad && localStorage.getItem('teach-lesson') === 'true') {
				var $item = $(pageObj._masonryArray.join(''));

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
				_middle = Math.ceil($list.length / _column),
				_eu;

			if ($list.length === _column) {
				_eu = $list.length;
			} else {
				_eu = _middle;
			}

			for (var i = 0; i <= _eu; i++) {
				$(this).find('> .list:lt(' + _middle + ')').wrapAll('<div class="list-block"></div>');
			}
		});
	}

	// 捲動暫停影片
	page.prototype.pauseVideo = function() {
		$(common._video).each(function(){
			if ($(this).offset().top + $(this).height() <= projects.$w.scrollTop() + parseInt($(common._lContent).css('padding-top'), 10) || common._leavePage === true) {
				for (var i = 0; i < projects._media._player.length; i++) {
					if ( ! projects._media._player[i].getPlayerState ) return false;
					if (projects._media._player[i].getPlayerState() === 1) {
						projects._media._player[i].pauseVideo();
					}

					$('[data-media]').eq(i).attr('data-media' , $('[data-media]').eq(i).attr('data-media').replace(/autoplay=1/ , 'autoplay=0'));
				}
			// } else if ($(this).parents('.owl-item').hasClass('active')) {
			//  for (var i = 0; i < projects._media._player.length; i++) {
			//      if ( ! projects._media._player[i].getPlayerState ) return false;
			//      if (projects._media._player[i].getPlayerState() === 2) {
			//          projects._media._player[i].playVideo();
			//          $('[data-media]').eq(i).attr('data-media' , $('[data-media]').eq(i).attr('data-media').replace(/autoplay=0/ , 'autoplay=1'));
			//      }
			//  }
			}
		});
	}

	// 重回視窗繼續影片
	page.prototype.returnPage = function() {
		$(common._video).each(function(){
			if ($(this).parents('.owl-item').hasClass('active') && $(this).offset().top + $(this).height() > projects.$w.scrollTop() + parseInt($(common._lContent).css('padding-top'), 10)) {
				for (var i = 0; i < projects._media._player.length; i++) {
					if ( ! projects._media._player[i].getPlayerState ) return false;
					if (projects._media._player[i].getPlayerState() === 2 && !$(this).hasClass('is-pause')) {
						projects._media._player[i].playVideo();
						$('[data-media]').eq(i).attr('data-media' , $('[data-media]').eq(i).attr('data-media').replace(/autoplay=0/ , 'autoplay=1'));
					}
				}
			}
		});
	}

	page.prototype.touchLock = function(_scrollTop) {
		$(common._owl).on('touchmove touchend', function(e){
			projects.$w.scrollTop(_scrollTop);
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

	// pc tab 到 M 版變成 <select>
	page.prototype.changeToSelect = function() {
		$(common._tagSelect).each(function(){
			var $this = $(this),
				_str  = '<select class="m-selection">',
				_icon = [],
				_idx  = $this.find('.is-curr').length !== 0 ? $this.find('.is-curr').parent().index() : 0;

			for (var i = 0; i < $this.find('a, button').length; i++) {
				$this.find('a, button').eq(i).addClass('funcTarget');
			}

			for (var i = 0; i < $('.funcTarget').length; i++) {
				if ($('.funcTarget').eq(i).prop('tagName').toLowerCase() === 'a') {
					_str += '<option value="' + $('.funcTarget').eq(i).attr('href') + '" data-hushtag="' + $('.funcTarget').eq(i).attr('data-hushtag') + '">' + $('.funcTarget').eq(i).text() + '</option>';
				} else if ($('.funcTarget').eq(i).prop('tagName').toLowerCase() === 'button' && !$('.funcTarget').eq(i).hasClass('catalog-more')) {
					_str += '<option value="" class="jQ-tab" data-hushtag="' + $('.funcTarget').eq(i).attr('data-hushtag') + '" data-main="' + $('.funcTarget').eq(i).attr('data-main') + '">' + $('.funcTarget').eq(i).text() + '</option>';
				}
			}

			_str += '</select>';

			// 特例：美食首頁
			if ($this.data('case') === 'food') {
				for (var i = 0; i < $this.find('> *').length; i++) {
					_icon.push($this.find('> *').eq(i).find('.icon-wrap')[0].outerHTML);
				}

				_str += '<div class="m-selected-item b-hide-dt b-text-center"></div>';

				$this.html(_str + _icon[_idx]).find('option').eq(_idx).attr('selected', 'selected');
				$this.find('.m-selected-item').text($this.find('option').eq(_idx).text());
			} else {
				$this.html(_str).find('option').eq(_idx).attr('selected', 'selected');
			}

			$this.on('change', '.m-selection', function(){
				var _idx   = $(this).find('option:selected').index(),
					_url   = window.location.href,
					_regex = /(tab=).*?(&|$)/,
					_value = '';

				if ($this.data('case') === 'food') {
					$(this).siblings('.icon-wrap').remove();
					$(this).siblings('.m-selected-item').text($(this).find('option:selected').text());
					$(this).parent().append(_icon[_idx]);
				}

				$(this).parents('.m-tab-wrap').siblings('.m-tab-content').children('.content-list').eq(_idx).addClass('is-curr').siblings().removeClass('is-curr');

				if ($(this).find('option:selected').attr('data-hushtag') !== undefined && history.pushState !== undefined) {
					if (_url.split('?')[1] === undefined) {
						history.pushState('' , document.title , _url + '?tab=' + $(this).find('option:selected').attr('data-hushtag'));
					} else if (_url.split('?')[1] !== undefined && _url.split('tab=')[1] === undefined) {
						history.pushState('' , document.title , _url + '&tab=' + $(this).find('option:selected').attr('data-hushtag'));
					} else if (_url.split('?')[1] !== undefined && _url.split('tab=')[1] !== undefined) {
						_value = _regex.exec(_url)[2] === '&' ? $(this).find('option:selected').attr('data-hushtag') + '&' : $(this).find('option:selected').attr('data-hushtag');

						history.pushState('' , document.title , _url.replace(_regex, '$1' + _value));
					}
				}
			});
		});
	}

	// FB 分享另開小視窗
	page.prototype.openWin = function(element) {
		var _top      = element.data('height') ? ( ( window.screen.availHeight - element.data('height') ) / 2 ) : ( ( window.screen.availHeight - 600 ) / 2 ),
			_left     = element.data('width') ? ( ( window.screen.availLeft || window.screenX ) + ( projects.$d.width() / 2 ) ) - ( element.data('width') / 2 ) : ( ( window.screen.availLeft || window.screenX ) + ( projects.$d.width() / 2 ) ) - ( 600 / 2 ),
			_width    = element.data('width') || 600,
			_height   = element.data('height')  || 600,
			_menubar  = element.data('menu-bar')  || 'no',
			_titlebar = element.data('title-bar') || 'no',
			_status   = element.data('status') || 'no';

		window.open('' + element.attr('href') + '' , '' , 'top=' + _top + ', left=' + _left + ', width=' + _width + ', height=' + _height + ', menubar=' + _menubar + ', titlebar=' + _titlebar + ', status=' + _status + '' , false);
	}

	page.prototype.totalHeight = function() {
		$(common._browserAdj).each(function(){
			var $adjHeight = $(this).find(common._adjHeight);
			
			$adjHeight.attr('style', '');

			if (navigator.userAgent.indexOf('MSIE 9') > 0) {
				var _maxHeight = 0;

				$adjHeight.each(function(){
					if (_maxHeight < $(this).height()) {
						_maxHeight = $(this).height();
					}
				});
				
				$adjHeight.each(function(){
					$(this).height(_maxHeight);
				});
			// } else {
			// 	$adjHeight.each(function(){
			// 		$(this).height($(this).parent().height());
			// 	});
			}
		});
	}

	page.prototype.tabSwitch = function(_anchor, _accordion) {
		$(common._tab).each(function(){
			if ($(this).hasClass(_anchor) || $(this).data('hushtag') === _anchor) {
				var $this = $(this),
					_main = parseInt($this.data('main'), 10),
					_sub  = parseInt($this.data('sub'), 10);

				if (_main !== undefined) {
					$('.l-main .main-tab > .m-tab-wrap > .tab-list').eq(_main).find(common._tab).trigger('click');
				}

				if (_sub !== undefined) {
					$this.parents('.sub-tab').find('> .m-tab-wrap > .tab-list').eq(_sub).find(common._tab).trigger('click');
				}

				setTimeout(function(){
					$this.trigger('click');
					if ($('[data-hushtag="' + _anchor + '"]').parent().parent().hasClass('jQ-tag-select') && projects.device() === 'Mobile') {
						$('[data-hushtag="' + _anchor + '"]').prop('selected', 'selected');
						$this.parents('.m-tab-wrap').siblings('.m-tab-content').children('.content-list').eq($this.index()).addClass('is-curr').siblings().removeClass('is-curr');
					}
				}, 0);

				if (_accordion !== undefined) {
					$(common._btnAccordion + '[data-hushtag="' + _accordion + '"]').trigger('click');
				}
			}
		});

		projects.$w.animate({
			'scrollTop' : $(common._lContent + ' .main-tab').offset().top - $(common._lHeader).height()
		}, common._animateSpeed);
	}

	page.prototype.openBoxEvent = function() {
		$(common._lBody).addClass('show-lightbox');
		common.offClick('.m-lightbox-content');
	}

	page.prototype.closeBoxEvent = function() {
		if (navigator.userAgent.indexOf('MSIE 9') > 0) {
			$(common._lBody).removeClass('show-lightbox');
		} else {
			$(common._lBody).addClass('fade-out').on('webkitAnimationEnd oAnimationend oAnimationEnd msAnimationEnd animationend', function(){
				$(common._lBody).removeClass('show-lightbox fade-out').off('webkitAnimationEnd oAnimationend oAnimationEnd msAnimationEnd animationend');
			});
		}

		if ($('.m-lightbox-content form').length !== 0) {
			$('.m-lightbox-content form').validate().resetForm();
		}
	}

	// page.prototype.sendServiceMsg = function() {
	//     var $chatWrap = $('.chat-wrap');

	//     $chatWrap.append('<div class="msg-wrap user b-clearfix"><figure class="head-img-wrap img-wrap b-float-right"><img src="../../content/img/shared/heads/user.png" alt=""></figure><p class="msg-wording b-inline b-float-right b-text-left">' + $(common._sendMsg + ' .m-inputbox').val() + '</p></div>');
	//     $(common._sendMsg + ' .m-inputbox').val('');
	//     $('.function-bd').scrollTop($chatWrap[0].scrollHeight);
	// }

	page.prototype.mobileHeaderReset = function() {
		var _str = $(common._shortcutWrap)[0].outerHTML;

		$(common._shortcutWrap).remove();
		$('.header-wrap').append(_str);
	}

	// 加入 / 取消 收藏事件
	page.prototype.btnFavorite = function(elem, decide) {
		if (decide === true) {
			$(elem).addClass('is-add show-text').find('.text').text('已加入收藏');
		} else {
			$(elem).removeClass('is-add').addClass('show-text').find('.text').text('已取消收藏');
		}

		$(elem).find('.text').delay(1500).queue(function(){
			$(this).dequeue();
			$(elem).removeClass('show-text');
		});
	}

	// 加入 / 取消 行事曆事件
	page.prototype.btnGoogleCalendsr = function(elem) {
		$(elem).parent('.calendar-box').prev('.btn-calendar').addClass('is-add');
		alert('已加入行事曆');
		$(elem).parent().parent(common._addingWrap).removeClass('is-open');
	}

	page.prototype.validateHandler = function(event, validator) {
		for ( var _key in validator.invalid ) {
			if ( validator.invalid[_key] !== undefined ) {
				$('.m-radio[name="' + _key + '"]').parent('.m-box-holder.is-radio').addClass('error');
				$('.m-checkbox[name="' + _key + '"]').parent('.m-box-holder.is-checkbox').addClass('error');
			}
		}
	}

	page.prototype.owlDelay = function() {
		$(common._waitOwl).each(function(){
			if (($(this).find('> *').length > parseInt($(this).attr('data-items-md'), 10) && projects.device() === 'PC') || ($(this).find('> *').length > parseInt($(this).attr('data-items-sm'), 10) && projects.device() === 'Tablet') || ($(this).find('> *').length > parseInt($(this).attr('data-items-xs'), 10) && projects.device() === 'Mobile')) {
				projects.owlCarousel($(this));
			}
		});
	}

	page.prototype.popupMiddle = function(elem) {
		elem.css('margin-top', - (elem.find('.function-wrap').outerHeight() / 2));
	}

	projects.$w.load(function(){
		if (!$(common._lBody).hasClass('show-teach')) {
			common.showFooter();
		}

		projects.owlCarousel(common._owl);
	});

	$(common._lBody).on('change', common._filter._element, function(e){
		var $self = $(this),
			$tags = $self.parents(common._filter._frame).find('*');

		if ( $tags.is('[data-url]') ) {
			common.serialize($self);
			for ( var i = 0 ; i < $tags.length; i ++) {
				if ( $tags.eq(i).is('[data-url]') ) {
					common.Angular($tags.eq(i).data('angular'), function(elem){
						// _href = elem;
						$tags.eq(i).removeData('url').data('url', elem);
					});
				}
			}
			common.include($self);
		}
	});

	projects.$d.ready(function(){
		common.AngularDate();
		common.headerHeight();
		common.selectInputCheck();
		// common.teachLesson();

		// 網址有 # 可定位頁籤
		if (projects._HREF.split('tab=')[1] !== undefined && projects._HREF.split('accordion=')[1] !== undefined && $(common._lContent + ' .main-tab').length !== 0 && $(common._lContent + ' .m-accordion').length !== 0) {
			common.tabSwitch(decodeURI(projects._HREF.split('tab=')[1].split('&')[0]), decodeURI(projects._HREF.split('accordion=')[1].split('&')[0]));
		} else if (projects._HREF.split('tab=')[1] !== undefined && projects._HREF.split('accordion=')[1] === undefined && $(common._lContent + ' .main-tab').length !== 0) {
			common.tabSwitch(decodeURI(projects._HREF.split('tab=')[1].split('&')[0]));
		}

		if (sessionStorage.getItem('marquee') === 'readed' && $(common._lHeader).hasClass('show-marquee')) {
			$(common._lHeader).removeClass('show-marquee');
			$('.marquee-wrap').remove();
		}

		if (projects.device() === 'Mobile') {
			if ($(common._shortcutWrap).length !== 0) {
				common.mobileHeaderReset();
			}
			
			$(common._owl).on('drag.owl.carousel', function(){
				common.touchLock(projects.$w.scrollTop());
			});

			$(common._owl).on('translated.owl.carousel', function(){
				$(common._owl).off('touchmove touchend');
			});

			// $(common._sideMenu).removeClass('is-active');
			
			if ($(common._tagSelect).length !== 0) {
				common.changeToSelect();
			}

			if ($(common._lHeader).hasClass('show-marquee')) {
				$(common._lContent).css('padding-top', $('.marquee-wrap').outerHeight() + parseInt($(common._lContent).css('padding-top'), 10));
			}
		}

		// 不支援 flex 撐高滿版補充事件
		if (((projects._browsers.safari === true && projects._browsers.chrome === false) || navigator.userAgent.indexOf('MSIE 9') > 0) && projects.device() !== 'Mobile') {
			common.totalHeight();
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

		if ($(common._waitOwl).length !== 0) {
			common.owlDelay();
		}

		common.selectUI();

		// $(common._owl).each(function(){
		// 	if ($(this).data('autoplay') === true && $(this).find('.item').length !== 0) {
		// 		for (var i = 0; i < $(this).find('.item').length; i++) {
		// 			$(this).find('.item').eq(i).attr('data-index', i);
		// 		}

		// 		$(this).on('translated.owl.carousel' , function(){
		// 			if ($(this).find('.active .item').data('index') === $(this).find('.owl-item').length - 1) {
		// 				$(this).delay(5000).queue(function() {
		// 					$(this).dequeue();
		// 					$(this).trigger('to.owl', 0);
		// 				});
		// 			}
		// 		});
		// 	}
		// });

		// 結束首次教學
		$(common._btnFinish).on('click', function(){
			localStorage.setItem('teach-lesson', true);

			$(common._lBody).addClass('fade-out').on('webkitAnimationEnd oAnimationend oAnimationEnd msAnimationEnd animationend', function(){
				$(common._lBody).removeClass('show-teach').off('webkitAnimationEnd oAnimationend oAnimationEnd msAnimationEnd animationend');
				$(common._teachWrap).remove();
			});
		});

		// 教學下一步
		$(common._btnNext).on('click', function(){
			if (projects.device() !== 'Mobile') {
				$(common._teachWrap).attr('data-step', $(this).data('next'));
			} else {
				projects.owlNext(common._teachOwl);
			}
		});

		projects.owlEvents(common._teachOwl, 'changed.owl.carousel' , function(event){
			var _index = event.item.index;

			if (_index === event.item.count - 1) {
				$(common._teachOwl).next('.btn-wrap').addClass('end-owl');
			} else {
				$(common._teachOwl).next('.btn-wrap').removeClass('end-owl');
			}
		});

		$(common._btnTop).on('click', function(){
			projects.$hb.animate({'scrollTop': 0}, common._animateSpeed);

			if ($(common._lBody).hasClass('index')) {
				$(common._lBody).attr('data-cut', 1);
				$('.pagination').find('.cut-dot .list').removeClass('is-curr').eq(0).addClass('is-curr');
			}
		});

		$(common._menu).on('click', function(){
			$(common._lHeader + ' .header-wrap').toggleClass('is-active');
		});

		$(common._langSwitch).on('click', function(){
			if (projects.device() === 'Mobile') {
				$(this).parent().toggleClass('is-active');
			}
		});

		$(common._sideMenu).on('click', function(){
			if (projects.device() === 'Mobile' && $('.function-list').hasClass('hide-menu')) {
				$('.function-list').removeClass('hide-menu');
				$('.show-func').removeClass('show-func');
				$(common._lBody).removeClass('has-filter');
			} else {
				$(this).toggleClass('is-active');

				if ($(this).hasClass('is-active')) {
					$('.collapse-wrap').on('webkitTransitionEnd oTransitionend oTransitionEnd msTransitionEnd transitionend', function(){
						$(this).off('webkitTransitionEnd oTransitionend oTransitionEnd msTransitionEnd transitionend');
						$(common._lBody).addClass('is-padding-arrow');
					});
				} else {
					$(common._lBody).removeClass('is-padding-arrow');
				}
			}
		});

		$(common._subMenu).on('click', function(){
			if (projects.device() === 'Mobile') {
				$(this).toggleClass('is-curr');
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
			var _idx = $(this).prevAll(common._video).find('.m-youtube-append').attr('id').split('m-youtube-')[1];

			if ($(this).hasClass('is-mute')) {
				$(this).removeClass('is-mute');
				projects._media._player[_idx].unMute();
			} else {
				$(this).addClass('is-mute');
				projects._media._player[_idx].mute();
			}
		});

		$(common._tab).on('click', function(){
			var _idx   = $(this).parent().index(),
				_url   = window.location.href,
				_regex = /(tab=).*?(&|$)/,
				_value = '';

			$(this).addClass('is-curr').parent().siblings().find(common._tab).removeClass('is-curr');
			$(this).parents('.m-tab-wrap').siblings('.m-tab-content').children('.content-list').eq(_idx).addClass('is-curr').siblings().removeClass('is-curr');

			if ($(this).attr('data-hushtag') !== undefined && history.pushState !== undefined) {
				if (_url.split('?')[1] === undefined) {
					history.pushState('' , document.title , _url + '?tab=' + $(this).attr('data-hushtag'));
				} else if (_url.split('?')[1] !== undefined && _url.split('tab=')[1] === undefined) {
					history.pushState('' , document.title , _url + '&tab=' + $(this).attr('data-hushtag'));
				} else if (_url.split('?')[1] !== undefined && _url.split('tab=')[1] !== undefined) {
					_value = _regex.exec(_url)[2] === '&' ? $(this).attr('data-hushtag') + '&' : $(this).attr('data-hushtag');

					history.pushState('' , document.title , _url.replace(_regex, '$1' + _value));
				}
			}

			if ($(common._browserAdj).length !== 0) {
				common.totalHeight();
			}

			if ($(common._lBody).hasClass('foods-index') && $(this).data('kv-switch') === true) {
				$('.kv-tab-content').children('.content-list').eq(_idx).addClass('is-curr').siblings().removeClass('is-curr');
			}
		});

		$(common._btnAccordion).on('click', function(){
			var _url   = window.location.href,
				_regex = /(accordion=).*?(&|$)/,
				_value = '';

			$(this).parents('.m-accordion').toggleClass('is-open');

			if ( projects.device() === 'PC') {
				$(this).parents('.m-accordion').siblings().removeClass('is-open');
			}

			if ($(this).attr('data-hushtag') !== undefined && history.pushState !== undefined) {
				if (_url.split('?')[1] === undefined) {
					history.pushState('' , document.title , _url + '?accordion=' + $(this).attr('data-hushtag'));
				} else if (_url.split('?')[1] !== undefined && _url.split('accordion=')[1] === undefined) {
					history.pushState('' , document.title , _url + '&accordion=' + $(this).attr('data-hushtag'));
				} else if (_url.split('?')[1] !== undefined && _url.split('accordion=')[1] !== undefined) {
					_value = _regex.exec(_url)[2] === '&' ? $(this).attr('data-hushtag') + '&' : $(this).attr('data-hushtag');

					history.pushState('' , document.title , _url.replace(_regex, '$1' + _value));
				}
			}
		});

		$(common._lBody).on('click', common._checkbox, function(){
			if ($(this).data('select-all') === true) {
				var _name = $(this).data('gruop-name');

				if ($(this).find('input[type="checkbox"]:checked').length === 0) {
					$(this).addClass('is-checked').find('input[type="checkbox"]').prop('checked', true);
					$('[data-select-name="' + _name + '"]').addClass('is-checked').find('input[type="checkbox"]').prop('checked', true);
				} else {
					$(this).removeClass('is-checked').find('input[type="checkbox"]').prop('checked', false);
					$('[data-select-name="' + _name + '"]').removeClass('is-checked').find('input[type="checkbox"]').prop('checked', false);
				}
			} else {
				if ($(this).find('input[type="checkbox"]:checked').length === 0) {
					$(this).addClass('is-checked').find('input[type="checkbox"]').prop('checked', true);
					$(this).find('.is-checkbox').removeClass('error');
					$(this).find('.is-error').text('');
				} else {
					$(this).removeClass('is-checked').find('input[type="checkbox"]').prop('checked', false);
				}
			}
		});

		$(common._lBody).on('click', common._radio, function(){
			if($(this).find('input[type="radio"]:checked').length !== 0) {
				var _name = $(this).find('input[type="radio"]:checked').attr('name');

				$('input[type="radio"][name="' + _name + '"]').parents(common._radio).removeClass('is-checked');
				$('input[type="radio"][name="' + _name + '"]').parent().removeClass('error');
				$(this).addClass('is-checked');
			}

			if($(this).parent().hasClass('deliver-method')) {
				if($(this).data('deliver') === 'store') {
					$(this).parent().addClass('is-store').find('.m-selection').prop('disabled', '');
				} else {
					$(this).parent().removeClass('is-store').find('.m-selection').prop('disabled', 'disabled');
				}
			}

			if($(this).parents('.m-tab-wrap').hasClass('invoice-selection')) {
				$(this).parents('.m-tab-wrap').next('.m-tab-content').find('.content-list').find('input, select').prop('disabled', 'disabled');
				$(this).parents('.m-tab-wrap').next('.m-tab-content').find('.content-list').eq($(this).parent().index()).find('input, select').prop('disabled', '');
			}
		});

		$(common._lBody).on('click', common._calc, function(){
			var _val = parseInt($(this).siblings('.m-box-holder').find('.m-inputbox').val(), 10);

			if ($(this).data('calc') === 'minus') {
				_val <= 2 ? $(this).siblings('.m-box-holder').find('.m-inputbox').val(1) : $(this).siblings('.m-box-holder').find('.m-inputbox').val(_val - 1);
			} else {
				_val >= 99 ? $(this).siblings('.m-box-holder').find('.m-inputbox').val(99) : $(this).siblings('.m-box-holder').find('.m-inputbox').val(_val + 1);
			}
		});

		$(common._lBody).on('input', '.is-calc .m-inputbox', function(){
			if (parseInt($(this).val(), 10) > 99) {
				$(this).val(99);
			} else if (parseInt($(this).val(), 10) < 1) {
				$(this).val(1);
			}
		});

		$(common._clearInput).on('click', function(){
			$('.jQ-clear-area .m-inputbox').val('');
		});

		$(common._share).on('click' , function(e){
			e.preventDefault();
			common.openWin($(this));
		});

		$(common._openBox).on('click' , function(){
			common.openBoxEvent();
		});

		$(common._closeBox).on('click' , function(){
			common.closeBoxEvent();
		});

		$(common._btnFunc).on('click' , function(){
			if ($(this).hasClass('show-func')) {
				$(this).removeClass('show-func');
			} else {
				$('.show-func').removeClass('show-func');
				$(this).addClass('show-func');
			}

			if ($(this).data('sidebar-close') === true) {
				$(common._sideMenu).removeClass('is-active');
			}

			if ($(this).data('place') !== 'aside') {
				$(common._lBody).removeClass('is-padding-arrow');
			} else if ($(this).data('place') === 'aside' && !$(this).next().hasClass('align-bottom') && projects.device() !== 'Mobile'){
				common.popupMiddle($(this).next());
			}

			if($(common._addingWrap).hasClass('is-open')) {
				$(common._addingWrap).removeClass('is-open');
			}

			if (projects.device() === 'Mobile') {
				if ($(this).data('place') === 'aside') {
					$(this).parents('.function-list').addClass('hide-menu');
					$(common._lBody).addClass('has-filter');
				} else {
					$('.quick-list .is-active').removeClass('is-active');
				}
			}

			common.offClick('.popup-function');
		});

		$(common._closePopup).on('click' , function(){
			$(this).parents('.popup-function').prev().removeClass('show-func');
			
			if (projects.device() === 'Mobile') {
				$('.function-list').removeClass('hide-menu');
				$(common._lBody).removeClass('has-filter');
			}
		});

		$(common._btnMarquee).on('click' , function(){
			$(common._lHeader).removeClass('show-marquee');
			sessionStorage.setItem('marquee', 'readed');

			if (projects.device() === 'Mobile') {
				$(common._lContent).css('padding-top', '');
			}
		});

		$(common._btnSearch).on('click' , function(){
			if ($(this).prev('input').val() !== '') {
				window.location.href = $(this).data('url') + '?q=' + $(this).prev('input').val();
			}
		});

		$(common._lBody).on('click', common._btnOpen, function(){
			if ($(this).parent(common._addingWrap).hasClass('is-open')) {
				$(this).parent(common._addingWrap).removeClass('is-open');
			} else {
				$(common._addingWrap).removeClass('is-open');
				$(this).parent(common._addingWrap).addClass('is-open');
				common.offClick('.calendar-box');

				if (projects.$w.scrollTop() > $(this).next('.calendar-box').offset().top - $(common._lHeader).height()) {
					projects.$hb.animate({
						'scrollTop' : $(this).next('.calendar-box').offset().top - $(common._lHeader).height()
					}, common._animateSpeed);
				}
			}

			$('.show-func').removeClass('show-func');
		});

		$(common._lBody).on('click', common._btnClose, function(){
			$(this).parent().parent(common._addingWrap).removeClass('is-open');
		});

		// $(common._sendMsg + ' .btn-send').on('click' , function(){
		//  common.sendServiceMsg();
		// });

		$(common._tagSelect).on('change', 'select', function(){
			if($(this).val() !== '' && $(this).val() !== 'javascript:;' && $(this).val() !== '#') {
				window.location.href = $(this).val();
			}
		});

		$('input, textarea, select').on('focus', function(){
			$(this).attr('data-focus', 'here');
		});

		$('input, textarea, select').on('blur', function(){
			$(this).attr('data-focus', '');
		});

		projects.$d.keydown(function(e){
			if (e.keyCode === 27 && $(common._lBody).hasClass('show-lightbox')) {
				common.closeBoxEvent();
			}
			// if (e.keyCode === 13 && $('.customer-service').prev().hasClass('show-func')) {
			//  common.sendServiceMsg();
			// }
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
			if (projects.$w.width() > projects.$w.height() && $('[data-focus=here]').length === 0) {
				alert('建議您使用直向瀏覽，將擁有最佳的瀏覽體驗。');
			}

			if ($(common._tagSelect).length !== 0 && $(common._tagSelect).children().prop('tagName').toLowerCase() !== 'select') {
				common.changeToSelect();
			}
		}
	});

	if ( ! window.common ) {
		window.common = common;
	}
}(window, document, $));