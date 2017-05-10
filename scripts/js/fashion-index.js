(function (window, document, jQuery, undefined) {
	'use strict';

	var pageObj = new page();

	function page() {
		this._separateUl = '.jQ-separate-ul';
	}

	page.prototype.flexInIE = function() {
		$(common._separateUl).each(function(){
			var _row    = $(this).data('row'),
				_length = $(this).finf('.masonry-item').length,
				_count  = Math.ceil(_length / _row);

			for (var i = 0; i <= _count; i++) {
				$(this).find('> .masonry-item:lt(' + _count + ')').wrapAll('<div class="list-block"></div>');
			}
		});
	}

	projects.$w.load(function(){
	});

	projects.$d.ready(function(){
		if (projects._browsers.msie === true) {
			pageObj.flexInIE();
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