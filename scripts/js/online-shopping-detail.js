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

	page.prototype.tabSwitch = function(_anchor) {
		$(common._tab).each(function(){
			if ($(this).hasClass(_anchor)) {
				var _main = $(this).data('main'),
					_sub  = $(this).data('sub');

				if (_main !== undefined) {
					$('.main-tab > .m-tab-wrap > .tab-list').eq(_main).find(common._tab).trigger('click');
				}

				if (_sub !== undefined) {
					$(this).parents('.sub-tab').find('> .m-tab-wrap > .tab-list').eq(_sub).find(common._tab).trigger('click');
				}

				$(this).trigger('click');
			}
		});

		projects.$hb.animate({
			'scrollTop' : $('.main-tab').offset().top - $(common._lHeader).height()
		}, common._animateSpeed);
	}

	projects.$w.load(function(){
	});

	projects.$d.ready(function(){
		if ($(pageObj._photoList).length !== 0) {
			pageObj.photoOwl();
		}

		if (projects._HREF.split('#')[1] !== undefined) {
			pageObj.tabSwitch(projects._HREF.split('#')[1]);
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