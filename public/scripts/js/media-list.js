(function (window , document , jQuery , undefined) {
    'use strict';

    Projects.Factory.D.ready(function(){
        Projects.Factory.MCustomScrollbar.Init('body' , Projects.Factory.MCustomScrollbar.Translate);
        Projects.Factory.OwlCarousel.Init('.jQ-slider');
    });
}(window, document, jQuery));