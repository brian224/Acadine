(function (window , document , jQuery , undefined) {
    'use strict';

    var Contact = {
        County : {
            Offset : {
                XMax : jQuery('.jQ-contact-frame').offset().left + jQuery('.jQ-contact-frame').width(),
                XMin : jQuery('.jQ-contact-frame').offset().left
            },
            OnClick : function(DataElem , Element) {
                var $this     = this;
                var $getClass = jQuery(DataElem).data('center');
                var $offset   = {
                    XMax : ( jQuery(Element).parent().offset().left + ( jQuery('.jQ-contact-items').width() / 2 ) ),
                    XMin : ( jQuery(Element).parent().offset().left - ( jQuery('.jQ-contact-items').width() / 2 ) )
                }

                if ( Projects.Factory.UserAgent !== 'Mobile' && Projects.Factory.W.width() > 768 ) {
                    if ( $this.Offset.XMax < $offset.XMax ) {
                        $getClass = jQuery(DataElem).data('right');
                    } else if ( $this.Offset.XMin > $offset.XMin ) {
                        $getClass = jQuery(DataElem).data('left');
                    }

                    jQuery(Element).next('.jQ-contact-items').addClass($getClass);

                    jQuery(Element).parent().siblings().find('.jQ-contact-items').removeClass(jQuery(DataElem).data('active'));
                    jQuery('.jQ-county').addClass(jQuery(DataElem).data('active'));
                    $this.OffClick(DataElem);

                    jQuery(Element).next('.jQ-contact-items').toggleClass(jQuery(DataElem).data('active'));
                } else {
                    if ( jQuery(Element).next('.jQ-contact-items').hasClass(''+ jQuery(DataElem).data('active') +'-sm') || jQuery(Element).next('.jQ-contact-items').hasClass(''+ jQuery(DataElem).data('active') +'-xs') ) {
                        jQuery(Element).next('.jQ-contact-items').removeClass(''+ jQuery(DataElem).data('active') +'-sm '+ jQuery(DataElem).data('active') +'-xs');
                    } else {
                        jQuery(Element).next('.jQ-contact-items').toggleClass(jQuery(DataElem).data('active'));
                    }    
                }
            },
            OffClick : function(DataElem) {
                var $this = this;
                
                Projects.Factory.D.on('click' , function(e){
                    e.stopPropagation();

                    if ( ! jQuery(e.target).is('.jQ-county , .jQ-county * , .jQ-contact-items , .jQ-contact-items *')) {
                        $this.OnClose(DataElem);
                        // jQuery('.jQ-contact-items').removeClass(jQuery(DataElem).data('active'));
                    }
                });
            },
            OnClose : function(DataElem) {
                jQuery('.jQ-contact-items').removeClass(jQuery(DataElem).data('active'));
                jQuery('.jQ-county').removeClass(jQuery(DataElem).data('active'));
            }
        }
    };

    jQuery('.jQ-county').on('click' , function(e){
        e.preventDefault();
        Contact.County.OnClick('.jQ-contact-frame' , this);
    });

    jQuery('.jQ-contact-close').on('click' , function(e){
        e.preventDefault();
        Contact.County.OnClose('.jQ-contact-frame');
    });

    jQuery(document).ready(function(){
        Projects.Factory.Clipboard.Init();
    });
}(window, document, jQuery));