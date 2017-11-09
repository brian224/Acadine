(function (window, document, jQuery, undefined) {
	'use strict';

	var indexObj = new index();

	function index() {
		this._quickList     = '.quick-list';
		this._lNav          = '.l-nav';
		this._lFooter       = '.l-footer';
		this._mCut          = '.m-cut';
		this._pagination    = '.pagination';
		this._slideDown     = '.jq-slide-down';
		this._slideCut      = '.jq-slide-cut';
		this._subOwl        = '.sub-owl';
		this._locationList  = '.location-list';
		this._sectionIndex  = 0;
		this._sectionScroll = true;
		this._once          = true;
		this._mCutHeight    = projects.$w.height();
		this._isYouTube;
	}

	// 在 l-side 中產生每 cut/section 的控制點
	index.prototype.checkCutLength = function() {
		if ($(indexObj._mCut).length > 1) {
			var _str = '';

			for (var i = 0; i < $(indexObj._mCut).length; i++) {
				_str += '<li class="list"><button class="btn-dot jq-slide-cut"></button></li>';
			}
			$(indexObj._pagination).find('.cut-dot').html(_str).find('> *').eq(0).addClass('is-curr');
			projects.$hb.animate({'scrollTop': 0}, 50);
		}
	}

	index.prototype.slideCut = function(n, direct) {
		var _quickListHeight = $(indexObj._quickList).height(),
			_lNavHeight      = $(indexObj._lNav).height(),
			_lFooterHeight   = $(indexObj._lFooter).height();

		if (n === 0) {
			// 第一 cut
			projects.$hb.animate({'scrollTop': 0}, common._animateSpeed*2);
		} else if (n === $(indexObj._mCut).length - 1) {
			// 最後一 cut
			if (direct !== -1) {
				// 用按的
				if (projects._browsers.msie && projects._browsers.version === 11) {
					projects.$hb.animate({'scrollTop': $(indexObj._mCut).eq(n).offset().top - _lNavHeight + _lFooterHeight + _quickListHeight * ($(indexObj._mCut).length - 2)}, common._animateSpeed).animate({'scrollTop': $(indexObj._mCut).eq(n).offset().top - _lNavHeight + _lFooterHeight + _quickListHeight * ($(indexObj._mCut).length - 2) + 400}, common._animateSpeed*2);
				} else {
					projects.$hb.animate({'scrollTop': $(indexObj._mCut).eq(n).offset().top - _lNavHeight + _lFooterHeight + _quickListHeight * ($(indexObj._mCut).length - 2)}, common._animateSpeed*2);
				}
			} else {
				if (projects._browsers.msie && projects._browsers.version === 11) {
					if (parseInt($(common._lBody).attr('data-cut'), 10) !== $(indexObj._mCut).length) {
						projects.$hb.animate({'scrollTop': $(indexObj._mCut).eq(n).offset().top - _lNavHeight + _lFooterHeight}, common._animateSpeed).animate({'scrollTop': $(indexObj._mCut).eq(n).offset().top - _lNavHeight + _lFooterHeight + 400}, common._animateSpeed*2);
					}
				} else {
					projects.$hb.animate({'scrollTop': $(indexObj._mCut).eq(n).offset().top - _lNavHeight + _lFooterHeight}, common._animateSpeed*2);
				}
			}
		} else {
			if (direct < -1) {
				projects.$hb.animate({'scrollTop': $(indexObj._mCut).eq(n).offset().top - _lNavHeight + _quickListHeight}, common._animateSpeed*2);
			} else if (direct < 0 && direct >= -1) {
				projects.$hb.animate({'scrollTop': $(indexObj._mCut).eq(n).offset().top - _lNavHeight}, common._animateSpeed*2);
			} else if (direct > 1) {
				projects.$hb.animate({'scrollTop': $(indexObj._mCut).eq(n).offset().top - _lNavHeight + _lFooterHeight}, common._animateSpeed*2);
			} else {
				// 往回捲
				if (n === $(indexObj._mCut).length - 2) {
					// 倒數第二 cut
					projects.$hb.animate({'scrollTop': $(indexObj._mCut).eq(n).offset().top - _lNavHeight + (_lFooterHeight * n)}, common._animateSpeed*2);
				} else {
					projects.$hb.animate({'scrollTop': $(indexObj._mCut).eq(n).offset().top - _lNavHeight + (_lFooterHeight * (n - 1))}, common._animateSpeed*2);
				}
			}
		}

		if (direct > 0) {
			// 往回捲
			$(common._lBody).addClass('scrollUp').removeClass('scrollDown');
		} else {
			$(common._lBody).addClass('scrollDown').removeClass('scrollUp');
		}

		$(indexObj._pagination).find('.cut-dot .list').removeClass('is-curr').eq(n).addClass('is-curr');

		if (indexObj._isYouTube && n !== 0 && typeof projects._media._player.pauseVideo !== 'undefined') {
			projects._media._player.pauseVideo();
		} else if (indexObj._isYouTube && n === 0 && typeof projects._media._player.playVideo !== 'undefined' && projects.device() === 'PC') {
			projects._media._player.playVideo();
		}

		$(common._lBody).attr('data-cut', n + 1);
	}

	index.prototype.mousewheel = function() {
		projects.mousewheel(projects.$hb, function(e){
			if (!$(e.target).is('.sub-menu, .sub-menu *, .search-result-list, .search-result-list *, .popup-function, .popup-function *')) {
				e.preventDefault();
				e.stopPropagation();

				if (indexObj._sectionScroll) {
					indexObj._sectionScroll = false;
					indexObj._sectionIndex = $(indexObj._pagination).find('.cut-dot .list.is-curr').index();

					if ( e.deltaY < 0 ) {
						indexObj._sectionIndex ++;
					} else {
						indexObj._sectionIndex --;
					}

					if ( indexObj._sectionIndex >= ( $(indexObj._mCut).length - 1 ) ) {
						indexObj._sectionIndex = ( $(indexObj._mCut).length - 1 );
					} else if ( indexObj._sectionIndex <= 0 ) {
						indexObj._sectionIndex = 0;
					}

					if (projects._ISMAC) {
						var _speed = 1400;
					} else {
						var _speed = common._animateSpeed;
					}

					indexObj.slideCut(indexObj._sectionIndex, e.deltaY);

					setTimeout(function(){
						indexObj._sectionScroll = true;
					}, _speed + 100);
				}
			}
		});
	}

	//
	index.prototype.iniBranchList = function (latitude, longitude) {
		// $(indexObj._locationList).html('');

		var _latitude   = latitude, // 緯度
			_longitude  = longitude, // 經度
			_url        = $('#gpsLocation').val(),
			_branchList = '';

		$.ajax({
			type: 'GET',
			url: _url + '?GpsX=' + _longitude + '&GpsY=' + _latitude,
			dataType: 'json',
			success: function (data) {
				if (_longitude == 0 && _latitude == 0) {
					$('.jQ-brandlist-head').html('請選擇要進入的分店，由北至南排序如下：');
					$('.jQ-brandlist-note').html('');
					
					for (var i = 0; i < data.length; i++) {
						_branchList += '<li class="list"><a href="' + data[i].Url + '" class="b-link b-block b-bold-sm"><em class="name">' + data[i].Name + '</em></a></li>'
					}
				} else {
					$('.jQ-brandlist-head').html('請選擇要進入的分店，依距離遠近排序如下：');
					$('.jQ-brandlist-note').html('* 貼心提醒 : 公里數為直線定位距離，並非行駛距離');

					for (var i = 0; i < data.length; i++) {
						_branchList += '<li class="list"><a href="' + data[i].Url + '" class="b-link b-block b-bold-sm"><em class="name">' + data[i].Name + '</em><span class="distance">' + data[i].Distance.toFixed(2) + 'km</span></a></li>'
					}
				}

				$(indexObj._locationList).html(_branchList);
			},
			complete: function (data) {
			}
		});
	}

	// 取得 GPS 定位
	index.prototype.geolocation = function () {
		var defaultbranchurl = $('#defaultBranchUrl').val();
		if (defaultbranchurl) {
			window.location.href = defaultbranchurl;
		}
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function (position) {
				indexObj.iniBranchList(position.coords.latitude, position.coords.longitude);
			}, function () {
				indexObj.iniBranchList(0, 0);
			});
		} else {
			alert("Browser doesn't support Geolocation");
		}
	}

	// 取得縮放倍率
	index.prototype.onresize = function() {
		if (detectZoom.device() >= 1.5) {
			$(common._lBody).addClass('scale-150');
		} else if (detectZoom.device() >= 1.25) {
			$(common._lBody).addClass('scale-125');
		}
	}

	projects.$w.load(function(){
		if (projects._browsers.msie) {
			setTimeout(function(){
				indexObj.checkCutLength();
			}, 500);
		} else {
			indexObj.checkCutLength();
		}

		$(common._owl).each(function(){
			$(this).on('translated.owl.carousel' , function(e){
				if ($(this).find('.active .item').hasClass('is-dark')) {
					$(this).addClass('is-dark').removeClass('is-light');
				} else {
					$(this).addClass('is-light').removeClass('is-dark');
				}
			});
		});

		// 社群瀑布流
		$('.social-wall').masonry({
			itemSelector: '.list-item',
			columnWidth: '.item-sizer',
			gutter: 20
		});

		$(indexObj._slideDown).on('click', function(){
			indexObj.slideCut(1);
		});

		$(indexObj._pagination).on('click', indexObj._slideCut, function(){
			indexObj.slideCut($(this).parent('.list').index(), $(this).parent().siblings('.is-curr').index() - $(this).parent().index());
		});

		$(indexObj._subOwl + ' .arrow').each(function(){
			$(this).css('border-bottom-color', $(this).parents('.item').css('background-color'));
		});

		$(common._owl).hover(function(){
			$(this).trigger('stop.owl.autoplay');
		}, function(){
			$(this).trigger('play.owl.autoplay', [5000]);
		});
	});

	projects.$d.ready(function(){
		indexObj.onresize();

		if ( projects.device() === 'PC' ) {
			indexObj.mousewheel();
			indexObj.iniBranchList(0, 0);
		} else {
			indexObj.geolocation();
			$(common._select).removeClass('m-replace-select');
		}
	});

	projects.$w.on('scroll' , function(){
		if ( projects.device() === 'PC' ) {
			indexObj.mousewheel();
		}
	});

	projects.$b.on('touchmove', function(e) {
		var _scrollTop;

		if (projects._ISIPHONE) {
			_scrollTop = $(common._lBody).scrollTop();
		} else {
			_scrollTop = projects.$w.scrollTop();
		}

		$(indexObj._pagination).find('.cut-dot .list').removeClass('is-curr').eq(Math.floor(_scrollTop / projects.$w.height())).addClass('is-curr');
	});

	projects.$w.resize(function(){
		if ( projects.device() !== 'Mobile') {
			window.location.reload();
			// $(common._owl).trigger('destory.owl.carousel');
			// projects.owlCarousel(common._owl);
		}
	});

	if ( ! window.indexObj ) {
		window.indexObj = indexObj;
	}
}(window, document, $));