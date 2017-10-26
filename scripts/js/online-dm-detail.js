(function (window, document, jQuery, undefined) {
	'use strict';

	var pageObj = new page();

	function page() {
		this._defaultWidth = (projects.device() !== 'PC') ? 'MT' : 'P';
		this._display      = '';
		this._autoCenter   = false;
		this._testValue    = false;
		this._mViewport    = '.magazine-viewport';
		this._container    = '.container';
		this._magazine     = '.magazine';
		this._thumbnails   = '.thumbnails';
		this._fullScreen   = '.jQ-full-screen';
		this._totalPage    = $(this._thumbnails + ' img').length;
		this._userAgent    = navigator.userAgent || navigator.vendor || window.opera;
		this._iOS          = /iPad|iPhone|iPod/.test( this._userAgent ) && ! window.MSStream;
		this._largeWidth   = 2214; // 放大倍率 (px)
		this._imgSrc       = $(this._thumbnails + ' img').attr('src');
		this._imgSrcArray  = this._imgSrc.split('/');
		this._newImage     = new Image;
		this._aspectRatio  = 0;
		this.escTip;
		this._bookPlaying
	}

	page.prototype.prepare = function() {
		pageObj._newImage.src = pageObj._imgSrc;
		pageObj._aspectRatio = pageObj._newImage.width / pageObj._newImage.height;

		if (projects.device() !== 'PC') {
			$(pageObj._container).width(pageObj._aspectRatio * $(pageObj._mViewport).height());
			pageObj._display = 'single';
		} else {
			$(pageObj._container).width(pageObj._aspectRatio * $(pageObj._mViewport).height() * 2);
			$(pageObj._magazine).css('left', (- $(pageObj._container).width() / 2));
			pageObj._display    = 'double';
			pageObj._autoCenter = true;
		}

		$(pageObj._magazine).turn({
			// acceleration: !isChrome(),
			autoCenter : pageObj._autoCenter,
			display    : pageObj._display,
			duration   : 1000,
			elevation  : 100,
			gradients  : true,
			width      : $(pageObj._container).width(),
			height     : $(pageObj._mViewport).height(),
			pages      : pageObj._totalPage,
			when       : {
				turning : function(event, page, view) {
					var book        = $(this),
						currentPage = (book.turn('page') >= 10) ? book.turn('page') : '0' + book.turn('page'),
						pages       = (book.turn('pages') >= 10) ? book.turn('pages') : '0' + book.turn('pages'),
						newPage     = (page >= 10) ? page : '0' + page;
			
					if (typeof(history.pushState) !== 'undefined') {
						history.pushState(null, null, window.location.href.split('#')[0] + '#page' + page);
					}

					disableControls(page);

					if (projects.device() !== 'PC') {
						$('.thumbnails .page-' + currentPage).parent('figure').removeClass('current');
						$('.thumbnails .page-' + newPage).parent('figure').addClass('current');
					} else {
						$('.thumbnails .page-' + currentPage).parents('li').removeClass('current');
						$('.thumbnails .page-' + newPage).parents('li').addClass('current');
					}

					if (view[0] === 0) {
						$('.jQ-pages').text(view[1] + '/' + pageObj._totalPage);
					} else if (view[1] === 0 || view[1] === undefined) {
						$('.jQ-pages').text(view[0] + '/' + pageObj._totalPage);
					} else {
						$('.jQ-pages').text(view[0] + '~' + view[1] + '/' + pageObj._totalPage);
					}

					$(common._loading).addClass('is-hide');
				},
				turned  : function(event, page, view) {
					disableControls(page);

					$(this).turn('center');

					if (page==1) { 
						$(this).turn('peel', 'br');
					}

					if (view[0] === 0) {
						$('.jQ-pages').text(view[1] + '/' + pageObj._totalPage);
					} else if (view[0] === 1) {
						$('.jQ-pages').text(view[0] + '/' + pageObj._totalPage);
					}

					$(common._loading).addClass('is-hide');
				},
				missing : function (event, pages) {
					for (var i = 0; i < pages.length; i++) addPage(pages[i], $(this));
				}
			}
		});
	}

	page.prototype.toggleFullScreen = function(element) {
		var $elem = $(element);

		if ( ! pageObj._iOS ) {
			if ( ( document.fullScreenElement !== undefined && document.fullScreenElement === null ) ||
			( document.msFullscreenElement !== undefined && document.msFullscreenElement === null ) ||
			( document.mozFullScreen !== undefined && ! document.mozFullScreen ) ||
			( document.webkitIsFullScreen !== undefined && ! document.webkitIsFullScreen ) ) {
				// $elem.addClass('fullScreen');
				if ( $elem[0].requestFullScreen ) {
					$elem[0].requestFullScreen();
				} else if ( $elem[0].mozRequestFullScreen ) {
					$elem[0].mozRequestFullScreen();
				} else if ( $elem[0].webkitRequestFullScreen ) {
					$elem[0].webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
				} else if ( $elem[0].msRequestFullscreen ) {
					$elem[0].msRequestFullscreen();
				}
			} else {
				// $elem.removeClass('fullScreen');
				if ( document.cancelFullScreen ) {
					document.cancelFullScreen();
				} else if ( document.mozCancelFullScreen ) {
					document.mozCancelFullScreen();
				} else if ( document.webkitCancelFullScreen ) {
					document.webkitCancelFullScreen();
				} else if ( document.msExitFullscreen ) {
					document.msExitFullscreen();
				}
			}
		} else {
			$elem.toggleClass('fullScreen');
			$(pageObj._magazine).turn('destroy');
			pageObj.prepare();
			pageObj.zoomFunction();
			pageObj.anchorFunction();
		}
		// $(pageObj._magazine).turn('size', $(pageObj._container).width(), $(pageObj._container).height());
	}

	page.prototype.setNewSrc = function() {
		$(pageObj._thumbnails + ' img').each(function(){
			_newSrc.push($(this).attr('src'));
		});
	}

	page.prototype.zoomFunction = function() {
		$(pageObj._mViewport).zoom({
			flipbook : $(pageObj._magazine),
			max      : function() {
				if (projects.device() !== 'PC') {
					return pageObj._largeWidth / 2 / $(pageObj._magazine).width();
				} else {
					return pageObj._largeWidth / $(pageObj._magazine).width();
				}
			}, 
			when     : {
				swipeLeft  : function () {
					$(this).zoom('flipbook').turn('next');
				},
				swipeRight : function () {
					$(this).zoom('flipbook').turn('previous');
				},
				resize     : function(event, scale, page, pageElement) {
					// if (scale == 1)
					// 	loadSmallPage(page, pageElement);
					// else
					// 	loadLargePage(page, pageElement);
				},
				zoomIn     : function () {
					$(pageObj._magazine).removeClass('animated').addClass('zoom-in');
					$('.zoom-icon').removeClass('zoom-icon-in').addClass('zoom-icon-out');
					
					if (!window.escTip && !$.isTouch) {
						pageObj.escTip = true;

						$('<div />', {'class': 'exit-message'}).html('<div>Press ESC to exit</div>').appendTo($('body')).delay(2000).animate({opacity:0}, 500, function() {
							$(this).remove();
						});
					}

					if (projects.device() !== 'PC') {
						$(pageObj._container).draggable();
						$(pageObj._container).draggable('enable');
					}
				},
				zoomOut    : function () {
					if (projects.device() === 'PC') {
						$(pageObj._magazine).turn('options').width = pageObj._aspectRatio * $(pageObj._container).height() * 2;
					} else {
						$(pageObj._magazine).turn('options').width = pageObj._aspectRatio * $(pageObj._container).height();
						$(pageObj._container).attr('style', '').draggable('disable');
						$(pageObj._container).width(pageObj._aspectRatio * $(pageObj._mViewport).height());
					}
					$(pageObj._magazine).turn('options').height = $(pageObj._mViewport).height();
					$('.exit-message').hide();
					$('.zoom-icon').removeClass('zoom-icon-out').addClass('zoom-icon-in');

					setTimeout(function(){
						$(pageObj._magazine).addClass('animated').removeClass('zoom-in');
						resizeViewport();
					}, 0);
				}
			}
		});
	}

	page.prototype.anchorFunction = function() {
		if (window.location.href.split('#page')[1] !== undefined) {
			if ($(pageObj._magazine).turn('is')) $(pageObj._magazine).turn('page', window.location.href.split('#page')[1]);
			if (projects.device() !== 'PC') {
				$('.thumbnails .page-' + window.location.href.split('#page')[1]).parent('figure').addClass('current');
			} else {
				$('.thumbnails .page-' + window.location.href.split('#page')[1]).parents('li').addClass('current');
			}
		} else {
			if ($(pageObj._magazine).turn('is')) $(pageObj._magazine).turn('page', 1);
			if (projects.device() !== 'PC') {
				$('.thumbnails .page-01').parent('figure').addClass('current');
			} else {
				$('.thumbnails .page-01').parents('li').addClass('current');
			}
		}
	}

	projects.$w.load(function(){
	});

	projects.$d.ready(function(){
		pageObj.setNewSrc();
		pageObj.prepare();
		pageObj.zoomFunction();
		pageObj.anchorFunction();

		if ($.isTouch)
			$(pageObj._mViewport).on('zoom.doubleTap', zoomTo);
		else
			$(pageObj._mViewport).on('zoom.tap', zoomTo);

		$(document).keydown(function(e){
			var previous = 37, next = 39, esc = 27;

			switch (e.keyCode) {
				case previous:
					$(pageObj._magazine).turn('previous');
					e.preventDefault();
				break;
				case next:
					$(pageObj._magazine).turn('next');
					e.preventDefault();
				break;
				case esc:
					$(pageObj._mViewport).zoom('zoomOut');
					e.preventDefault();
				break;
			}
		});

		$(pageObj._thumbnails).click(function(event) {
			var page;

			if (event.target && (page=/page-([0-9]+)/.exec($(event.target).attr('class'))) ) {
				$(pageObj._magazine).turn('page', page[1]);
			}

			$(pageObj._thumbnails).removeClass('show');
			$('.jQ-show-list').removeClass('is-active');
		});

		$('.next-button').on('click', function() {
			$(pageObj._magazine).turn('next');
		});

		$('.previous-button').on('click', function() {
			$(pageObj._magazine).turn('previous');
		});

		$('.first-button').on('click', function() {
			$(pageObj._magazine).turn('page', 1);
		});

		$('.last-button').on('click', function() {
			$(pageObj._magazine).turn('page', pageObj._totalPage);
		});

		$('.zoom-icon').on('click', function() {
			if ($(this).hasClass('zoom-icon-in'))
				$(pageObj._mViewport).zoom('zoomIn');
			else if ($(this).hasClass('zoom-icon-out'))	
				$(pageObj._mViewport).zoom('zoomOut');
		});

		$('.jQ-show-list').on('click', function() {
			$(pageObj._thumbnails).toggleClass('show');
			$(this).toggleClass('is-active');
		});

		$(pageObj._fullScreen).on('click', function() {
			pageObj.toggleFullScreen('.main-content');
			// $(pageObj._mViewport).zoom('zoomOut');
		});

		$(pageObj._magazine).dblclick(function(){
			$(pageObj._mViewport).zoom('zoomOut');
		});

		projects.$d.on('webkitfullscreenchange mozfullscreenchange fullscreenchange msfullscreenchange', function(e) {
			pageObj._testValue = !pageObj._testValue;

			$('.main-content').toggleClass('fullScreen');
			$(pageObj._fullScreen).toggleClass('is-active');
			$(pageObj._magazine).turn('destroy');
			pageObj.prepare();
			pageObj.zoomFunction();
			pageObj.anchorFunction();
		});
	});

	projects.$w.resize(function(){
		if (projects.device() === 'PC' && pageObj._testValue === false) {
			$(pageObj._container).width(pageObj._aspectRatio * $(pageObj._mViewport).height() * 2);
			$(pageObj._magazine).css('left', (- $(pageObj._container).width() / 2));
			pageObj._display = 'double';
		}

		if ((pageObj._defaultWidth === 'MT' && projects.$w.width() >= 1000) || (pageObj._defaultWidth === 'P' && projects.$w.width() < 1000)) {
			$(pageObj._magazine).turn('destroy');
			pageObj.prepare();

			pageObj._defaultWidth = (projects.$w.width() < 1000) ? 'MT' : 'P';
		}
		$(pageObj._magazine).turn('size', $(pageObj._container).width(), $(pageObj._container).height());
	});

	if ( ! window.pageObj ) {
		window.pageObj = pageObj;
	}
}(window, document, $));