(function (window , document , jQuery , undefined) {
    'use strict';

    Projects.Factory.GetUserAgent();

    jQuery('.jQ-nav').on('click' , '.jQ-nav-ctrl' , function(e){
        e.preventDefault();
        Projects.Factory.Nav.OnClick(this);
    });

    Projects.Factory.D.ready(function(){
        Projects.Factory.MCustomScrollbar.Init('body');
    });

}(window, document, jQuery));