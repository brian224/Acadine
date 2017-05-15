(function (window, document, jQuery, undefined) {
	'use strict';

	var pageObj = new page();

	function page() {
		this._item = '.list-item';
	}

	projects.$w.load(function(){
		$('.social-list').masonry({
			itemSelector: pageObj._item,
			columnWidth: '.item-sizer',
			gutter: 20
		});
	});

	projects.$d.ready(function(){
		$(pageObj._item).each(function(){
			var _decodeUrl = decodeURI($(this).data('url')),
				_width     = _decodeUrl.split('width="')[1].split('"')[0],
				_height    = _decodeUrl.split('height="')[1].split('"')[0],
				_newHeight = (_height / _width * 350)|0;

			$(this).html(_decodeUrl.replace(new RegExp(_width , 'g'),'350').replace(new RegExp(_height, 'g'), _newHeight));

			console.log($(this).find('iframe')[0].contentWindow.postMessage(document.querySelector("html").scrollHeight, 'http://www.feds'));
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