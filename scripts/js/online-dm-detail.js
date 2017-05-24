(function (window, document, jQuery, undefined) {
	'use strict';

	var pageObj = new page();

	function page() {
		this._defaultWidth = (projects.device() !== 'PC') ? 'MT' : 'P';
		this._display      = '';
		this._autoCenter   = false;
		this._mViewport    = '.magazine-viewport';
		this._magazine     = '.magazine';
		this._thumbnails   = '.thumbnails';
		this._fullScreen   = '.jQ-full-screen';
		this._totalPage    = $(this._thumbnails + ' img').length;
		this._iOS          = /iPad|iPhone|iPod/.test( this._userAgent ) && ! window.MSStream;
		this.escTip;
		this._bookPlaying
	}

	page.prototype.prepare = function() {
		if (projects.device() !== 'PC') {
			pageObj._display = 'single';
		} else {
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
			width      : $('.container').width(),
			height     : $('.container').height(),
			pages      : pageObj._totalPage,
			when       : {
				turning : function(event, page, view) {
					var book        = $(this),
						currentPage = (book.turn('page') >= 10) ? book.turn('page') : '0' + book.turn('page'),
						pages       = (book.turn('pages') >= 10) ? book.turn('pages') : '0' + book.turn('pages'),
						newPage     = (page >= 10) ? page : '0' + page;
			
					history.pushState(null, null, window.location.href.split('#')[0] + '#page' + page);

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
				},
				missing : function (event, pages) {
					for (var i = 0; i < pages.length; i++) addPage(pages[i], $(this));
				}
			}
		});
	}

	page.prototype.toggleFullScreen = function(element) {
		var $elem = $(element);

		// if ( ! pageObj._iOS ) {
			if ( ( document.fullScreenElement !== undefined && document.fullScreenElement === null ) ||
			( document.msFullscreenElement !== undefined && document.msFullscreenElement === null ) ||
			( document.mozFullScreen !== undefined && ! document.mozFullScreen ) ||
			( document.webkitIsFullScreen !== undefined && ! document.webkitIsFullScreen ) ) {
				$elem.addClass('fullScreen');
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
				$elem.removeClass('fullScreen');
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
		// }
		$(pageObj._magazine).turn('size', $('.container').width(), $('.container').height());
	}

	projects.$w.load(function(){
	});

	projects.$d.ready(function(){
		pageObj.prepare();

		$(pageObj._mViewport).zoom({
			flipbook: $(pageObj._magazine),
			max: function() { 
				return largeMagazineWidth()/$(pageObj._magazine).width();
			}, 
			when: {
				swipeLeft: function() {
					$(this).zoom('flipbook').turn('next');
				},
				swipeRight: function() {
					$(this).zoom('flipbook').turn('previous');
				},
				resize: function(event, scale, page, pageElement) {
					if (scale == 1)
						loadSmallPage(page, pageElement);
					else
						loadLargePage(page, pageElement);
				},
				zoomIn: function () {
					$(pageObj._magazine).removeClass('animated').addClass('zoom-in');
					$('.zoom-icon').removeClass('zoom-icon-in').addClass('zoom-icon-out');
					
					if (!window.escTip && !$.isTouch) {
						pageObj.escTip = true;

						$('<div />', {'class': 'exit-message'}).html('<div>Press ESC to exit</div>').appendTo($('body')).delay(2000).animate({opacity:0}, 500, function() {
							$(this).remove();
						});
					}

					if (projects.device() !== 'PC') {
						$('.container').draggable();
						$('.container').draggable('enable');
					}
				},
				zoomOut: function () {
					$('.exit-message').hide();
					$('.zoom-icon').removeClass('zoom-icon-out').addClass('zoom-icon-in');

					if (projects.device() !== 'PC') {
						$('.container').attr('style', '').draggable('disable');
					}

					setTimeout(function(){
						$(pageObj._magazine).addClass('animated').removeClass('zoom-in');
						resizeViewport();
					}, 0);
				}
			}
		});

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

		$(window).resize(function() {
			if ((pageObj._defaultWidth === 'MT' && $(window).width() >= 1000) || (pageObj._defaultWidth === 'P' && $(window).width() < 1000)) {
				$(pageObj._magazine).turn('destroy');
				pageObj.prepare();

				pageObj._defaultWidth = ($(window).width() < 1000) ? 'MT' : 'P';
			}
		});

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

		$(pageObj._thumbnails).click(function(event) {
			var page;

			if (event.target && (page=/page-([0-9]+)/.exec($(event.target).attr('class'))) ) {
				$(pageObj._magazine).turn('page', page[1]);
			}

			if ($(window).width() < 1000) {
				$(pageObj._thumbnails).removeClass('show');
			}
		});

		// $(pageObj._thumbnails + ' li').on('click', function() {
		// 	$(this).addClass('current').siblings().removeClass('current');
		// });

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
			$(this).toggleClass('is-active');
			$(pageObj._mViewport).zoom('zoomOut');
		});
	});

	if ( ! window.pageObj ) {
		window.pageObj = pageObj;
	}
}(window, document, $));