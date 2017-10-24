(function (window, document, jQuery, undefined) {
    'use strict';

    var cartObj = new page();

    function page() {
        this._creditCard = '.jQ-credit-card';
    }

    projects.$w.load(function(){
    });

    projects.$d.ready(function(){
        setTimeout(function(){
            common.countyArea();
            
            projects.validate({
                event : 'focusout'
            });

            $(cartObj._creditCard + ' .m-inputbox').on('keyup change', function(){
                if ($(this).val().length > 3) {
                    $(this).parent().next().find('.m-inputbox').focus();
                }
            });
        }, 50);
    });

    if ( ! window.cartObj ) {
        window.cartObj = cartObj;
    }
}(window, document, $));