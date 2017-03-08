(function (window, document, jQuery, undefined) {
	'use strict';

	var pageObj = new page();

	function page() {
		this._photoList   = '.photo-slider';
		this._photoSwitch = '.jQ-photo-switch';
	}

	// 設定 data-index
	page.prototype.photoOwl = function(num) {
		$(pageObj._photoList).trigger('destroy.owl');

		$(pageObj._photoList).each(function(){
			var $this = $(this);

			for (var i = 0; i < $this.find(pageObj._photoSwitch).length; i++) {
				$this.find(pageObj._photoSwitch).eq(i).attr('data-index', i);
			}
		});

		projects.owlCarousel(pageObj._photoList);
	}

	projects.$w.load(function(){
	});

	projects.$d.ready(function(){
		if ($(pageObj._photoList).length !== 0) {
			pageObj.photoOwl();
		}

		$(pageObj._photoSwitch).on('click' , function(e){
			var _src = $(this).find('img').attr('src'),
				_idx = $(this).attr('data-index');

			$('.photo-hd img').attr('src', _src);
			$(pageObj._photoSwitch).each(function(){
				if ($(this).attr('data-index') === _idx) {
					$(this).addClass('is-curr');
				} else {
					$(this).removeClass('is-curr');
				}
			});

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