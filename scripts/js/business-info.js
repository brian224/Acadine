(function (window, document, jQuery, undefined) {
	'use strict';

	var pageObj = new page();

	function page() {
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
		if (projects._HREF.split('#')[1] !== undefined) {
			pageObj.tabSwitch(projects._HREF.split('#')[1]);
		}
	});

	projects.$w.on('scroll' , function(){
	});

	projects.$w.resize(function(){
	});

	if ( ! window.pageObj ) {
		window.pageObj = pageObj;
	}
}(window, document, $));