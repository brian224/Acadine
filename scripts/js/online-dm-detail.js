(function (window, document, jQuery, undefined) {
	'use strict';

	var pageObj = new page();

	function page() {
		this._defaultWidth = ($(window).width() < 1000) ? 'MT' : 'P';
		this._display      = '';
		this._autoCenter   = false;
		this._width        = 0;
		this._height       = 0;
		this._totalPage    = $('.thumbnails img').length;
		this._mViewport    = '.magazine-viewport';
		this._magazine     = '.magazine';
		this.escTip;
		this._bookPlaying
	}

	page.prototype.prepare = function() {
		if (projects.$w.width() < 1000) {
			pageObj._display = 'single';
			pageObj._width   = '80vw';
			pageObj._height  = 544 / 385 * 80 + 'vw';
		} else {
			pageObj._display    = 'double';
			pageObj._autoCenter = true;
			pageObj._width      = 770;
			pageObj._height     = 544;
		}

		$(pageObj._magazine).turn({
			// acceleration: !isChrome(),
			autoCenter : pageObj._autoCenter,
			display    : pageObj._display,
			duration   : 1000,
			elevation  : 100,
			gradients  : true,
			width      : pageObj._width,
			height     : pageObj._height,
			pages      : pageObj._totalPage,
			when       : {
				turning: function(event, page, view) {
					var book        = $(this),
						currentPage = book.turn('page'),
						pages       = book.turn('pages');
			
					history.pushState(null, null, window.location.href.split('#')[0] + '#page' + page);

					disableControls(page);

					if ($(window).width() < 1000) {
						$('.thumbnails .page-'+currentPage).removeClass('current');
						$('.thumbnails .page-'+page).addClass('current');
					} else {
						$('.thumbnails .page-'+currentPage).parents('li').removeClass('current');
						$('.thumbnails .page-'+page).parents('li').addClass('current');
					}

					if (view[0] === 0) {
						$('.jQ-pages').text(view[1] + '/' + pageObj._totalPage);
					} else if (view[1] === 0 || view[1] === undefined) {
						$('.jQ-pages').text(view[0] + '/' + pageObj._totalPage);
					} else {
						$('.jQ-pages').text(view[0] + '~' + view[1] + '/' + pageObj._totalPage);
					}
				},
				turned: function(event, page, view) {
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
				missing: function (event, pages) {
					for (var i = 0; i < pages.length; i++) addPage(pages[i], $(this));
				}
			}
		});
	}

	page.prototype.autoplayBook = function() {
		if ($('.autoplay').hasClass('playing')) {
			pageObj._bookPlaying = setTimeout(function(){
				$(pageObj._magazine).turn('next');

				if ($('.thumbnails li').length === $('.thumbnails .current').index() + 1) {
					clearTimeout(pageObj._bookPlaying);
				} else {
					pageObj.autoplayBook();
				}
			}, 3000);
		} else {
			clearTimeout(pageObj._bookPlaying);
		}
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

					if ($(window).width() < 1000) {
						$('.container').draggable();
						$('.container').draggable('enable');
					}
				},
				zoomOut: function () {
					$('.exit-message').hide();
					$('.zoom-icon').removeClass('zoom-icon-out').addClass('zoom-icon-in');

					if ($(window).width() < 1000) {
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
		} else {
			if ($(pageObj._magazine).turn('is')) $(pageObj._magazine).turn('page', 1);
		}

		$('.thumbnails').click(function(event) {
			var page;

			if (event.target && (page=/page-([0-9]+)/.exec($(event.target).attr('class'))) ) {
				$(pageObj._magazine).turn('page', page[1]);
			}

			if ($(window).width() < 1000) {
				$('.thumbnails').removeClass('show');
			}
		});

		$('.thumbnails li').on($.mouseEvents.over, function() {
			$(this).addClass('thumb-hover');
		}).on($.mouseEvents.out, function() {
			$(this).removeClass('thumb-hover');
		});

		$('.next-button').on($.mouseEvents.over, function() {
			$(this).addClass('next-button-hover');
		}).on($.mouseEvents.out, function() {
			$(this).removeClass('next-button-hover');
		}).on($.mouseEvents.down, function() {
			$(this).addClass('next-button-down');
		}).on($.mouseEvents.up, function() {
			$(this).removeClass('next-button-down');
		}).on('click', function() {
			$(pageObj._magazine).turn('next');
		});

		$('.previous-button').on($.mouseEvents.over, function() {
			$(this).addClass('previous-button-hover');
		}).on($.mouseEvents.out, function() {
			$(this).removeClass('previous-button-hover');
		}).on($.mouseEvents.down, function() {
			$(this).addClass('previous-button-down');
		}).on($.mouseEvents.up, function() {
			$(this).removeClass('previous-button-down');
		}).on('click', function() {
			$(pageObj._magazine).turn('previous');
		});

		$('.first-button').on('click', function() {
			$(pageObj._magazine).turn('page', 1);
		});

		$('.last-button').on('click', function() {
			$(pageObj._magazine).turn('page', pageObj._totalPage);
		});

		$('.zoom-icon').on('mouseover', function() { 
			if ($(this).hasClass('zoom-icon-in'))
				$(this).addClass('zoom-icon-in-hover');
			if ($(this).hasClass('zoom-icon-out'))
				$(this).addClass('zoom-icon-out-hover');
		}).on('mouseout', function() { 
			 if ($(this).hasClass('zoom-icon-in'))
				$(this).removeClass('zoom-icon-in-hover');
			if ($(this).hasClass('zoom-icon-out'))
				$(this).removeClass('zoom-icon-out-hover');
		}).on('click', function() {
			if ($(this).hasClass('zoom-icon-in'))
				$(pageObj._mViewport).zoom('zoomIn');
			else if ($(this).hasClass('zoom-icon-out'))	
				$(pageObj._mViewport).zoom('zoomOut');
		});

		$('.show-list').on('click', function() {
			$('.thumbnails').toggleClass('show');
		});

		$('.autoplay').on('click', function() {
			$(this).toggleClass('playing');
			pageObj.autoplayBook();
		});
	});

	if ( ! window.pageObj ) {
		window.pageObj = pageObj;
	}
}(window, document, $));