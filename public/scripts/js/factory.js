(function (window , document , jQuery , undefined) {
    'use strict';

    var Projects = {
        Factory : {
            W            : jQuery(window),
            D            : jQuery(document),
            HB           : jQuery('html , body'),
            H            : jQuery('html'),
            B            : jQuery('body'),
            Device       : /Android|webOS|iPad|BlackBerry/i,
            OS           : null,
            DocumentOff  : 'click touchstart',
            Animationend : null,
            Dynamic      : null,
            UserAgent    : null,
            Href         : window.location.href,
            GetUserAgent : function() {
                var $this = this;

                if ( $this.W.width() < 768 ) {
                    $this.UserAgent = 'Mobile';
                } else {
                    if ( $this.Device.test(navigator.userAgent) ) {
                        $this.UserAgent = 'Tablet';
                    } else {
                        $this.UserAgent = 'PC';
                    }
                }

                $this.OS = $this.UserAgent !== 'PC' ? ( /iPad|iPhone|iPod/i.test(navigator.userAgent) ? 'IOS' : 'Android' ) : null;
                $this.Dynamic = $this.Device.test(navigator.userAgent) ? 'webkitAnimationEnd webkitTransitionEnd' : 'animationend transitionend';
            },
            Nav : {
                GetActive : function() {
                    for ( var i = 0 , $elem = jQuery('.jQ-nav').find(' > ul > li') ; i < $elem.length ; i ++ ) {

                        if ( $elem.eq(i).hasClass( jQuery('.jQ-nav').data('active') ) ) {
                            jQuery('.jQ-nav-bar').css({
                                'left'  : ($elem.eq(i).offset().left - jQuery('.jQ-nav').offset().left),
                                'width' : $elem.eq(i).find('> a').outerWidth()
                            });

                            if ( ! jQuery('.jQ-nav').hasClass( jQuery('.jQ-nav').data('load') ) ) {
                                jQuery('.jQ-nav').addClass( jQuery('.jQ-nav').data('load') );
                            }
                        }
                    };
                },
                OnClick : function(Element) {
                    jQuery('.jQ-nav-bar').one(Projects.Factory.Dynamic , function(){
                        if ( jQuery(Element).attr('href') !== '#' && jQuery(Element).attr('href') !== 'javascript:;' ) {
                            window.location = jQuery(Element).attr('href');
                        }
                    });
                },
                OnMouseOver : function(Element) {
                    jQuery('.jQ-nav-bar').css({
                        'left'  : (jQuery(Element).parent().offset().left - jQuery('.jQ-nav').offset().left),
                        'width' : jQuery(Element).outerWidth()
                    });
                },
                OnMouseOut : function() {
                    var $this = this;
                    var $timer = jQuery.noop();

                    window.clearTimeout($timer);

                        $this.GetActive();
                    $timer = setTimeout(function(){
                    } , 150);
                }
            },
            MCustomScrollbar : {
                Init : function(Element , CallBack) {
                    if ( Projects.Factory.UserAgent === 'PC' ) {
                        jQuery(Element).mCustomScrollbar({
                            scrollInertia : 1200,
                            mouseWheel    : {
                                scrollAmount : 600
                            }, 
                            callbacks : {
                                whileScrolling : function() {
                                    for ( var i = 0 , $elem = jQuery('.jQ-translate') ; i < $elem.length ; i ++ ) {
                                        $elem.eq(i).css('transform' , 'translate(0px , '+ ( ( ( this.mcs.draggerTop + ( i * $elem.outerHeight() * ( 0.975 / $elem.length ) * (-1) ) ) ) ) +'px)'); 
                                    };

                                    if ( CallBack ) {
                                        eval( CallBack( this.mcs.draggerTop , ( this.mcs.top * (-1) ) ) );
                                    }
                                }
                            }
                        });
                    }
                }
            },
            SliceBox : {
                SliceBox : null,
                Init : function(Element) {
                    var $this = this;

                    $this.SliceBox = jQuery(Element).slicebox({
                        orientation   : 'h',
                        cuboidsCount  : 1,
                        onReady       : function() {},
                        onAfterChange : function(pos) {}
                    });
                },
                Prev : function(Element) {
                    var $this = this;

                    $this.SliceBox.previous();
                    return false;
                },
                Next : function(Element) {
                    var $this = this;

                    $this.SliceBox.next();
                    return false;
                }
            },
            OwlCarousel : {
                Init : function(Element) {
                    var $this = this;

                    if ( jQuery(Element).length !== 0 ) {
                        $this.Setting(jQuery(Element));
                    }
                },
                Setting : function(Element) {
                    for ( var i = 0 ; i < Element.length ; i ++ ) {
                        Element.eq(i).owlCarousel({
                            mouseDrag  : Projects.Factory.UserAgent !== 'PC' ? ( ( Element.eq(i).data('mouse-drag') !== false ) ? true : false ) : false,
                            touchDrag  : ( Element.eq(i).data('touch-drag') !== false ) ? true : false,
                            pullDrag   : ( Element.eq(i).data('pull-drag') !== false ) ? true : false,
                            center     : ( Element.eq(i).data('center') !== true ) ? false : true,
                            responsive : {
                                0 : {
                                    items   : ( Element.eq(i).data('item-xs') && parseInt( Element.eq(i).data('item-xs') , 10 ) > 0 ) ? parseInt( Element.eq(i).data('item-xs') , 10 ) : 1,
                                    slideBy : ( Element.eq(i).data('item-xs') && parseInt( Element.eq(i).data('item-xs') , 10 ) > 0 ) ? parseInt( Element.eq(i).data('item-xs') , 10 ) : 1,
                                    nav     : Element.eq(i).data('item-xs') ? ( Element.eq(i).find('> *').length > parseInt( Element.eq(i).data('item-xs') , 10 ) ) ? ( ( Element.eq(i).data('nav-xs') !== true ) ? false : true ) : false : true,
                                    dots    : Element.eq(i).data('item-xs') ? ( Element.eq(i).find('> *').length > parseInt( Element.eq(i).data('item-xs') , 10 ) ) ? ( ( Element.eq(i).data('dots') !== true ) ? false : true ) : false : true
                                },
                                740 : {
                                    items   : ( Element.eq(i).data('item-sm') && parseInt( Element.eq(i).data('item-sm') , 10 ) > 0 ) ? parseInt( Element.eq(i).data('item-sm') , 10 ) : 1,
                                    slideBy : ( Element.eq(i).data('item-sm') && parseInt( Element.eq(i).data('item-sm') , 10 ) > 0 ) ? parseInt( Element.eq(i).data('item-sm') , 10 ) : 1,
                                    nav     : Element.eq(i).data('item-sm') ? ( Element.eq(i).find('> *').length > parseInt( Element.eq(i).data('item-sm') , 10 ) ) ? ( ( Element.eq(i).data('nav-sm') !== true ) ? false : true ) : false : true,
                                    dots    : Element.eq(i).data('item-sm') ? ( Element.eq(i).find('> *').length > parseInt( Element.eq(i).data('item-sm') , 10 ) ) ? ( ( Element.eq(i).data('dots') !== true ) ? false : true ) : false : true
                                },
                                960 : {
                                    items   : ( Element.eq(i).data('item-md') && parseInt( Element.eq(i).data('item-md') , 10 ) > 0 ) ? parseInt( Element.eq(i).data('item-md') , 10 ) : 1,
                                    slideBy : ( Element.eq(i).data('item-md') && parseInt( Element.eq(i).data('item-md') , 10 ) > 0 ) ? parseInt( Element.eq(i).data('item-md') , 10 ) : 1,
                                    nav     : Element.eq(i).data('item-md') ? ( Element.eq(i).find('> *').length > parseInt( Element.eq(i).data('item-md') , 10 ) ) ? ( ( Element.eq(i).data('nav-md') !== true ) ? false : true ) : false : true,
                                    dots    : Element.eq(i).data('item-md') ? ( Element.eq(i).find('> *').length > parseInt( Element.eq(i).data('item-md') , 10 ) ) ? ( ( Element.eq(i).data('dots') !== true ) ? false : true ) : false : true
                                }
                            },
                            loop              : ( Element.eq(i).data('loop') !== true ) ? false : true,
                            lazyLoad          : ( Element.eq(i).data('img-load') !== true ) ? false : true,
                            autoplay          : ( Element.eq(i).data('autoplay') !== true ) ? false : true,
                            autoplayTimeout   : Element.eq(i).data('timeout') ? Element.eq(i).data('timeout') : 5000,
                            navContainerClass : Element.eq(i).data('nav-class') ? Element.eq(i).data('nav-class') + '-ctrl' : 'm-slider-ctrl',
                            navClass          : [' ' + ( Element.eq(i).data('nav-class') ? Element.eq(i).data('nav-class') + '-arrow' : 'm-slider-arrow') + ' ' + ( Element.eq(i).data('nav-class') ? Element.eq(i).data('nav-class') + '-prev' : 'is-prev') + ' m-icon m-icon-angle-left', ' ' + (Element.eq(i).data('nav-class') ? Element.eq(i).data('nav-class') + '-arrow' : 'm-slider-arrow') + ' ' + ( Element.eq(i).data('nav-class' ) ? Element.eq(i).data('nav-class') + '-next' : 'is-next') + ' m-icon m-icon-angle-right'],
                            navText           : ['' , ''],
                            controlsClass     : 'm-slider-controls',
                            dotsClass         : Element.eq(i).data('nav-class') ? Element.eq(i).data('nav-class') + '-dots' : 'm-slider-dots ' + ( Element.eq(i).data('dots-position') !== 'relative' ? 'is-absolute' : 'is-relative') + '',
                            dotClass          : Element.eq(i).data('nav-class') ? Element.eq(i).data('nav-class') + '-dot' : 'm-slider-dot',
                            centerClass       : Element.eq(i).data('nav-class') ? Element.eq(i).data('nav-class') + '-center' : 'is-center',
                            activeClass       : Element.eq(i).data('active-class') ? Element.eq(i).data('active-class') + '-active' : 'is-active',
                            startPosition     : ( parseInt( Element.eq(i).data('start-position'), 10 ) > 0 ) ? parseInt( Element.eq(i).data('start-position'), 10 ) : 0
                        });
                    };
                },
                Events : function(Element , EventsName , Functions) {
                    jQuery(Element).on(EventsName , function(e){
                        Functions(e);
                    });
                }
            },
            FullImg : {
                EWidth  : null,
                EHeight : null,
                Element : jQuery('.jQ-full'),
                Init    : function(Browser) {
                    var $this    = this;
                    var $BWidth  = jQuery(Browser).outerWidth(),
                        $BHeight = jQuery(Browser).outerHeight();

                    for ( var i = 0 ; i < $this.Element.length ; i ++ ) {
                        $this.Element.eq(i).removeAttr('style');

                        $this.EWidth  = $this.Element.eq(i).width();
                        $this.EHeight = $this.Element.eq(i).height();

                        if ( ( $BHeight / $BWidth ) > ( $this.EHeight / $this.EWidth ) ) {
                            $this.Element.eq(i).css({
                                'margin-left' : ( parseInt( ( ( $BHeight / $this.EHeight ) * $this.EWidth ) , 10 ) - $BWidth ) / 2 * (-1) + 'px',
                                'width'       : parseInt( ( ( $BHeight / $this.EHeight ) * $this.EWidth ) , 10 )  + 'px',
                                'height'      : $BHeight + 'px'
                            });

                        } else {
                            $this.Element.eq(i).css({
                                'margin-top' : ( parseInt( ( ( $BWidth / $this.EWidth ) * $this.EHeight ) , 10 ) - $BHeight ) / 2 * (-1) + 'px',
                                'width'      : $BWidth + 'px',
                                'height'     : parseInt( ( ( $BWidth / $this.EWidth ) * $this.EHeight ) , 10 ) + 'px'
                            });
                        }
                    }
                }
            },
            Clipboard : {
                Element : null,
                Init : function() {
                    var $this = this;

                    $this.Element = new Clipboard('.jQ-copy');

                    $this.OnSuccess();
                    $this.OnError();
                    
                },
                OnSuccess : function() {
                    var $this = this;

                    $this.Element.on('success', function(e) {
                        console.log('success');
                        console.log(e);
                    });
                },
                OnError : function() {
                    var $this = this;

                    $this.Element.on('error', function(e) {
                        console.log('error');
                        console.log(e);
                    });
                }
            }
        }
    }

    if ( ! window.Projects ) {
        window.Projects = Projects;
    } else {
        window.Projects = $.extend({} , window.Projects , Projects);
    }
}(window, document, jQuery));