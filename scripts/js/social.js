(function (window, document, jQuery, undefined) {
	'use strict';

	var pageObj = new page();

	function page() {
		this._socialList = '.social-list';
		this._item       = '.list-item';
		this._sizer      = '.item-sizer';
		this._sizerWidth = $(this._sizer).width();
		this._comparison = 0;
		this._backup     = 0;
	}

	page.prototype.getHeight = function() {
		setTimeout(function(){
			if(pageObj._comparison === $('.m-cut').height() && pageObj._backup === $('.m-cut').height() && pageObj._comparison === pageObj._backup && pageObj._comparison !== 0) {
				pageObj.masonry();
			} else {
				pageObj._backup = pageObj._comparison;
				pageObj._comparison = $('.m-cut').height();
				pageObj.getHeight();
			}
		}, 1000);
	}

	page.prototype.masonry = function() {
		$(pageObj._socialList).each(function(){
			if ($(this).parent('.content-list').hasClass('is-curr') && $(this).data('masonry-complete') !== true) {
				$(this).masonry({
					itemSelector: pageObj._item,
					columnWidth: pageObj._sizer,
					gutter: 20
				});

				$(this).attr('data-masonry-complete', true);
			}
		});
	}

	page.prototype.masonryMobileHeight = function() {
		$(pageObj._socialList).each(function(){
			if ($(this).parent('.content-list').hasClass('is-curr') && $(this).hasClass('fb-post')) {
				var $this      = $(this),
					_transform = $(this).css('transform').split('matrix(')[1].split(',')[0],
					_timer;

				pageObj._comparison = 0;
				pageObj._backup = 0;

				_timer = setTimeout(function(){
					if(pageObj._comparison === $('.m-cut').height() && pageObj._backup === $('.m-cut').height() && pageObj._comparison === pageObj._backup && pageObj._comparison !== 0) {
						$this.height(Math.ceil($this.height() * _transform));
					} else {
						pageObj._backup = pageObj._comparison;
						pageObj._comparison = $('.m-cut').height();
						_timer();
					}
				}, 1000);
			}
		});
	}

	projects.$w.load(function(){
		if (projects.device() !== 'Mobile') {
			pageObj.getHeight();
		} else {
			if (projects.$w.width() < 375) {
				pageObj.masonryMobileHeight();
			}
		}
	});

	projects.$d.ready(function(){
		$(common._tab).on('click', function(){
			if ($(this).data('masonry-bind') === true && projects.device() !== 'Mobile') {
				pageObj.getHeight();
			} else {
				if (projects.$w.width() < 375) {
					pageObj.masonryMobileHeight();
				}
			}
		});
	});

	projects.$w.on('scroll' , function(){
	});

	projects.$w.resize(function(){
	});

	if ( ! window.pageObj ) {
		window.pageObj = pageObj;
	}
}(window, document, $));