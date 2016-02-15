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

    jQuery('.jQ-media').on('click' , function(e){
        e.preventDefault();
        if ( jQuery(this).find('> *:first')[0].nodeName === 'VIDEO' ) {
            jQuery(this).find('> *:first').addClass('is-show');
            Projects.Factory.SliceBox.Video = jQuery(this).find('> *:first')[0];
            Projects.Factory.SliceBox.Play();
        }
    });

    jQuery(document).ready(function(){
        Projects.Factory.SliceBox.Init('.jQ-slider-3D');
    });

    jQuery(window).load(function(){
        // Projects.Factory.SliceBox.Init('.jQ-slider-3D');
    });
}(window, document, jQuery));