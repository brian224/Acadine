(function (window, document, jQuery, undefined) {
	'use strict';

	var pageObj = new page();

	function page() {
		this._separateUl = '.jQ-separate-ul';
	}

	projects.$w.load(function(){
	});

	projects.$d.ready(function(){
		if (projects._browsers.msie === true) {
			var _row    = $(pageObj._separateUl).data('row'),
				_length = $(pageObj._separateUl + ' .masonry-item').length,
				_count  = Math.ceil(_length / _row);

			for (var i = 0; i <= _count; i++) {
				$(pageObj._separateUl).find('> .masonry-item:lt(' + _count + ')').wrapAll('<div class="list-block"></div>');
			}
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