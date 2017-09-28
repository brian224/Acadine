/*
 * Magazine sample
*/
var $magazine  = $('.magazine'),
	$mViewport = $('.magazine-viewport'),
	_newSrc    = [];

function addPage(page, book) {
	var id, pages = book.turn('pages');
	var element = $('<div />', {});

	// Add the page to the flipbook
	if (book.turn('addPage', element, page)) {
		// Add the initial HTML
		// It will contain a loader indicator and a gradient
		element.html('<div class="gradient"></div><div class="loader"></div>');

		// Load the page
		loadPage(page, element);
	}
}

function loadPage(page, pageElement) {
	// Create an image element
	var img = $('<img />');

	img.mousedown(function(e) {
		e.preventDefault();
	});

	img.load(function() {
		// Set the size
		$(this).css({width: '100%', height: '100%'});

		// Add the image to the page after loaded
		$(this).appendTo(pageElement);

		// Remove the loader indicator
		pageElement.find('.loader').remove();
	});

	// Load the page

	img.attr('src', _newSrc[page - 1]);
	// loadRegions(page, pageElement);
}

// Zoom in / Zoom out

function zoomTo(event) {
	setTimeout(function() {
		if ($mViewport.data().regionClicked) {
			$mViewport.data().regionClicked = false;
		} else {
			if ($mViewport.zoom('value')==1) {
				$mViewport.zoom('zoomIn', event);
			} else {
				$mViewport.zoom('zoomOut');
			}
		}
	}, 1);
}

// Load regions

function loadRegions(page, element) {
	$.getJSON('online-dm/'+page+'-regions.json').
		done(function(data) {

		$.each(data, function(key, region) {
			addRegion(region, element);
		});
	});
}

// Add region

function addRegion(region, pageElement) {
	var reg = $('<div />', {'class': 'region  ' + region['class']}),
		options = $magazine.turn('options'),
		pageWidth = options.width/2,
		pageHeight = options.height;

	reg.css({
		top: Math.round(region.y/pageHeight*100)+'%',
		left: Math.round(region.x/pageWidth*100)+'%',
		width: Math.round(region.width/pageWidth*100)+'%',
		height: Math.round(region.height/pageHeight*100)+'%'
	}).attr('region-data', $.param(region.data||''));

	reg.appendTo(pageElement);
}

// Process click on a region

function regionClick(event) {
	var region = $(event.target);

	if (region.hasClass('region')) {
		$mViewport.data().regionClicked = true;
		
		setTimeout(function() {
			$mViewport.data().regionClicked = false;
		}, 100);
		
		var regionType = $.trim(region.attr('class').replace('region', ''));

		return processRegion(region, regionType);
	}
}

// Process the data of every region

function processRegion(region, regionType) {

	data = decodeParams(region.attr('region-data'));

	switch (regionType) {
		case 'link' :
			window.open(data.url);
		break;
		case 'zoom' :
			var regionOffset = region.offset(),
				viewportOffset = $mViewport.offset(),
				pos = {
					x: regionOffset.left-viewportOffset.left,
					y: regionOffset.top-viewportOffset.top
				};

			$mViewport.zoom('zoomIn', pos);
		break;
		case 'to-page' :
			$magazine.turn('page', data.page);
		break;
	}

}

// Load large page

function loadLargePage(page, pageElement) {
	
	var img = $('<img />');

	img.load(function() {
		var prevImg = pageElement.find('img');
		$(this).css({width: '100%', height: '100%'});
		$(this).appendTo(pageElement);
		prevImg.remove();
		
	});

	// Loadnew page
	// img.attr('src', _newSrc +  page + '-large.jpg');
	img.attr('src', _newSrc[page - 1]);
}

// Load small page

function loadSmallPage(page, pageElement) {
	
	var img = pageElement.find('img');

	img.css({width: '100%', height: '100%'});

	img.unbind('load');
	// Loadnew page
	img.attr('src', _newSrc[page - 1]);
}

// http://code.google.com/p/chromium/issues/detail?id=128488

function isChrome() {
	return navigator.userAgent.indexOf('Chrome')!=-1;
}

function disableControls(page) {
	if (page==1)
		$('.previous-button, .first-button').addClass('hide');
	else
		$('.previous-button, .first-button').removeClass('hide');
				
	if (page==$magazine.turn('pages'))
		$('.next-button, .last-button').addClass('hide');
	else
		$('.next-button, .last-button').removeClass('hide');
}

// Set the width and height for the viewport

function resizeViewport() {
	var width = $(window).width(),
		height = $(window).height(),
		options = $magazine.turn('options');

	$magazine.removeClass('animated');

	$mViewport.zoom('resize');

	if ($magazine.turn('zoom') == 1) {
		var bound = calculateBound({
			width       : options.width,
			height      : options.height,
			boundWidth  : Math.min(options.width, width),
			boundHeight : Math.min(options.height, height)
		});

		if (bound.width%2 !== 0)
			bound.width -= 1;

		if (bound.width != $magazine.width() || bound.height != $magazine.height()) {

			$magazine.turn('size', bound.width, bound.height);

			if ($magazine.turn('page')==1)
				$magazine.turn('peel', 'br');
		}
	}

	var magazineOffset = $magazine.offset(),
		boundH         = height - magazineOffset.top - $magazine.height(),
		marginTop      = (boundH - $('.thumbnails > div').height()) / 2;

	if (magazineOffset.top < $('.made').height())
		$('.made').hide();
	else
		$('.made').show();

	$magazine.addClass('animated');
}

// Number of views in a flipbook

function numberOfViews(book) {
	return book.turn('pages') / 2 + 1;
}

// Current view in a flipbook

function getViewNumber(book, page) {
	return parseInt((page || book.turn('page'))/2 + 1, 10);
}

function moveBar(yes) {
	if (Modernizr && Modernizr.csstransforms) {
		$('#slider .ui-slider-handle').css({zIndex: yes ? -1 : 10000});
	}
}

function setPreview(view) {
	var previewWidth = 112,
		previewHeight = 73,
		previewSrc = 'online-dm/preview.jpg',
		preview = $(_thumbPreview.children(':first')),
		numPages = (view==1 || view==$('#slider').slider('option', 'max')) ? 1 : 2,
		width = (numPages==1) ? previewWidth/2 : previewWidth;

	_thumbPreview.
		addClass('no-transition').
		css({width: width + 15,
			height: previewHeight + 15,
			top: -previewHeight - 30,
			left: ($($('#slider').children(':first')).width() - width - 15)/2
		});

	preview.css({
		width: width,
		height: previewHeight
	});

	if (preview.css('background-image')==='' ||
		preview.css('background-image')=='none') {

		preview.css({backgroundImage: 'url(' + previewSrc + ')'});

		setTimeout(function(){
			_thumbPreview.removeClass('no-transition');
		}, 0);

	}

	preview.css({backgroundPosition:
		'0px -'+((view-1)*previewHeight)+'px'
	});
}

// decode URL Parameters

function decodeParams(data) {
	var parts = data.split('&'), d, obj = {};

	for (var i =0; i<parts.length; i++) {
		d = parts[i].split('=');
		obj[decodeURIComponent(d[0])] = decodeURIComponent(d[1]);
	}

	return obj;
}

// Calculate the width and height of a square within another square

function calculateBound(d) {
	var bound = {width: d.width, height: d.height};

	if (bound.width>d.boundWidth || bound.height>d.boundHeight) {
		var rel = bound.width/bound.height;

		if (d.boundWidth/rel>d.boundHeight && d.boundHeight*rel<=d.boundWidth) {
			bound.width = Math.round(d.boundHeight*rel);
			bound.height = d.boundHeight;
		} else {
			bound.width = d.boundWidth;
			bound.height = Math.round(d.boundWidth/rel);
		}
	}		
	return bound;
}