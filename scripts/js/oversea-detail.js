(function (window, document, jQuery, undefined) {
	'use strict';

	var pageObj = new page();

	function page() {
		this._hover    = '.jQ-hover';
		this._loadMore = '.jQ-load-more';
		this._btnMore  = '.jQ-btn-more';
		this._array    = [];
		this._pinned   = false;
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

				console.log(_main + ' , ' + _sub);
			}
		});
	}

	page.prototype.pinList = function() {
		$('.pin-list ' + pageObj._hover).each(function(){
			pageObj._array.push($(this).next().html());
		});

		$('.attractions-list ' + pageObj._hover).each(function(){
			$(this).after(pageObj._array[parseInt($(this).data('index'), 10) - 1]);
		});

		pageObj._pinned = true;
	}

	projects.$w.load(function(){
	});

	projects.$d.ready(function(){
		pageObj.tabSwitch(projects._HREF.split('#')[1]);
		
		if ( projects.device() === 'Mobile' ) {
			pageObj.pinList();

			$('.attractions-list ' + pageObj._hover).on('click', function(){
				var _idx = $(this).data('index');

				$(pageObj._hover).removeClass('is-show');
				$(this).addClass('is-show');

				$('.pin-list ' + pageObj._hover).each(function(){
					if ($(this).data('index') === _idx) {
						$(this).addClass('is-show');
					} else {
						$(this).removeClass('is-show');
					}
				});
			});

			$('.pin-list ' + pageObj._hover).on('click', function(){
				var _idx = $(this).data('index');

				$(pageObj._hover).removeClass('is-show');
				$(this).addClass('is-show');

				$('.attractions-list ' + pageObj._hover).each(function(){
					if ($(this).data('index') === _idx) {
						$(this).addClass('is-show');
					} else {
						$(this).removeClass('is-show');
					}
				});
			});
		} else {
			$(pageObj._hover).on('click', function(){
				$(this).toggleClass('is-show');
			});

			$(pageObj._hover).on('mouseover', function(){
				var _idx = $(this).data('index');

				$(pageObj._hover).each(function(){
					if ($(this).data('index') === _idx) {
						$(this).addClass('is-show');
					} else {
						$(this).removeClass('is-show');
					}
				});
			});

			$('.attractions-info').hover(function(){
				$(this).prev().addClass('is-show');
			}, function(){
				$(this).prev().removeClass('is-show');
			});
		}

		$(pageObj._btnMore).on('click', function(){
			var _item = '<li class="item-list"><a href="javascript:;" class="b-link"><figure class="img-wrap"><img src="../../content/img/oversea-detail/souvenir/sub/02.jpg" alt="BRIT RHYTHM WOMEN 2 EDT金屬搖滾風格女性淡香水"><figcaption class="desc b-hide-text">BRIT RHYTHM WOMEN 2 EDT金屬搖滾風格女性淡香水</figcaption></figure></a><div class="item-info"><em class="brand">BURBERRY</em><a href="javascript:;" class="b-link"><h3 class="item-title">BRIT RHYTHM WOMEN 2 EDT金屬搖滾風格女性淡香水</h3></a><p class="desc">英文商品說明英文商品說明英文商品說明英文商品說明英文商品說明英文商品說明</p><span class="info-title">Location</span><ul class="localtion-list"><li class="list"><span class="name">寶慶遠百1F</span><a href="tel:0289648402" class="tel-link">(02)8964-8402</a></li><li class="list"><span class="name">板橋遠百1F</span><a href="tel:0289648402" class="tel-link">(02)8964-8402</a></li><li class="list"><span class="name">板橋大遠百1F</span><a href="tel:0289648402" class="tel-link">(02)8964-8402</a></li></ul></div></li><li class="item-list"><a href="javascript:;" class="b-link"><figure class="img-wrap"><img src="../../content/img/oversea-detail/souvenir/sub/03.jpg" alt="OMNIA INDIAN GARNET EDT 65ML 晶燦女性淡香水"><figcaption class="desc b-hide-text">OMNIA INDIAN GARNET EDT 65ML 晶燦女性淡香水</figcaption></figure></a><div class="item-info"><em class="brand">BVLGARI</em><a href="javascript:;" class="b-link"><h3 class="item-title">OMNIA INDIAN GARNET EDT 65ML 晶燦女性淡香水</h3></a><p class="desc">英文商品說明英文商品說明英文商品說明英文商品說明英文商品說明英文商品說明</p><span class="info-title">Location</span><ul class="localtion-list"><li class="list"><span class="name">寶慶遠百1F</span><a href="tel:0289648402" class="tel-link">(02)8964-8402</a></li><li class="list"><span class="name">板橋遠百1F</span><a href="tel:0289648402" class="tel-link">(02)8964-8402</a></li><li class="list"><span class="name">板橋大遠百1F</span><a href="tel:0289648402" class="tel-link">(02)8964-8402</a></li></ul></div></li><li class="item-list"><a href="javascript:;" class="b-link"><figure class="img-wrap"><img src="../../content/img/oversea-detail/souvenir/sub/04.jpg" alt="BRIT SHEER WOMEN EDT 100ML 粉紅風格女性淡香水"><figcaption class="desc b-hide-text">BRIT SHEER WOMEN EDT 100ML 粉紅風格女性淡香水</figcaption></figure></a><div class="item-info"><em class="brand">BURBERRY</em><a href="javascript:;" class="b-link"><h3 class="item-title">BRIT SHEER WOMEN EDT 100ML 粉紅風格女性淡香水</h3></a><p class="desc">英文商品說明英文商品說明英文商品說明英文商品說明英文商品說明英文商品說明</p><span class="info-title">Location</span><ul class="localtion-list"><li class="list"><span class="name">寶慶遠百1F</span><a href="tel:0289648402" class="tel-link">(02)8964-8402</a></li><li class="list"><span class="name">板橋遠百1F</span><a href="tel:0289648402" class="tel-link">(02)8964-8402</a></li><li class="list"><span class="name">板橋大遠百1F</span><a href="tel:0289648402" class="tel-link">(02)8964-8402</a></li></ul></div></li>';

			$(pageObj._loadMore).addClass('show-hide-items').append(_item);
		});
	});

	projects.$w.on('scroll' , function(){
	});

	projects.$w.resize(function(){
		if ( projects.device() === 'Mobile' && pageObj._pinned === false) {
			pageObj.pinList();
		}
	});

	if ( ! window.pageObj ) {
		window.pageObj = pageObj;
	}
}(window, document, $));