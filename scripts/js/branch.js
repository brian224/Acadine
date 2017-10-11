(function (window, document, jQuery, undefined) {
	'use strict';

	var pageObj = new page();

	function page() {
		this._slideDown     = '.jq-slide-down';
		this._masonryLength = $('.social-wall .list-item').length;
		this._masonryArray  = [];
	}

	projects.$w.load(function(){
		// 取出一半的社群內容做為第二次瀑布流用
		if (pageObj._masonryLength > 8) {
			for (var i = 8; i < pageObj._masonryLength; i++) {
				var $this = $('.social-wall .list-item').eq(8);

				if ($this[0] !== undefined) {
					pageObj._masonryArray.push($this[0].outerHTML);
					$('.social-wall .list-item').eq(8).remove();
				}
			}

			$('.hidden-place').html(pageObj._masonryArray.join(''));
		}

		$('.social-wall').masonry({
			itemSelector: '.list-item',
			columnWidth: '.item-sizer',
			gutter: 20
		});
	});

	projects.$d.ready(function(){
		$(pageObj._slideDown).on('click', function(){
			projects.$hb.animate({
				'scrollTop' : $('.activity-cut').offset().top - $(common._lHeader).height()
			}, common._animateSpeed);
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