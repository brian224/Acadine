(function (window , document , jQuery , undefined) {
    'use strict';

    // var Index = {

    // };

    jQuery('.jQ-arrow').on('click' , function(){
        if ( jQuery(this).hasClass('is-prev') ) {
            Projects.Factory.SliceBox.Prev('.jQ-slider-3D');
        } else {
            Projects.Factory.SliceBox.Next('.jQ-slider-3D');
        }
    });

    jQuery(document).ready(function(){
        Projects.Factory.SliceBox.Init('.jQ-slider-3D');
    });

    jQuery(window).load(function(){
        // Projects.Factory.SliceBox.Init('.jQ-slider-3D');
    });
}(window, document, jQuery));