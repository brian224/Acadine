(function (window , document , jQuery , undefined) {
    'use strict';

    Projects.Factory.D.ready(function(){
        Projects.Factory.MCustomScrollbar.Init('body' , Projects.Factory.MCustomScrollbar.Translate);
    });

    jQuery(document).ready(function(){
        Projects.Factory.Clipboard.Init();
    });
}(window, document, jQuery));