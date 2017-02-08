(function (window, document, jQuery, undefined) {
	'use strict';

	var pageObj = new page();

	function page() {
		this._tagSelect = '.jQ-tag-select';
	}

	page.prototype.changeToSelect = function() {
		$(pageObj._tagSelect).each(function(){
			var $this = $(this),
				_str  = '<select class="m-selection">',
				_idx  = $this.find('.is-curr').parent().index();

			for (var i = 0; i < $this.children().length; i++) {
				_str += '<option>' + $this.children().eq(i).text() + '</option>';
			}

			_str += '</select>';

			$this.html(_str).find('option').eq(_idx).attr('selected', 'selected');

			$this.on('change', '.m-selection', function(){
				var _idx = $(this).find('option:selected').index();

				$(this).parents('.m-tab-wrap').siblings('.m-tab-content').children('.content-list').eq(_idx).addClass('is-curr').siblings().removeClass('is-curr');
			});
		});
	}

	projects.$w.load(function(){
	});

	projects.$d.ready(function(){
		if ( projects.device() === 'Mobile' && $(pageObj._tagSelect).length !== 0) {
			pageObj.changeToSelect();
		}
	});

	projects.$w.on('scroll' , function(){
	});

	projects.$w.resize(function(){
		if ( projects.device() === 'Mobile' && $(pageObj._tagSelect).length !== 0 && $(pageObj._tagSelect).children().prop('tagName').toLowerCase() !== 'select') {
			pageObj.changeToSelect();
		}
	});

	if ( ! window.pageObj ) {
		window.pageObj = pageObj;
	}
}(window, document, $));