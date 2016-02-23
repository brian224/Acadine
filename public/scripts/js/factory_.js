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
                OnClick : function(Element) {
                    jQuery(Element).parent().toggleClass(jQuery('.jQ-nav').data('active'));
                }
            },
            MCustomScrollbar : {
                Init : function(Element) {
                    if ( Projects.Factory.UserAgent === 'PC' ) {
                        jQuery(Element).mCustomScrollbar({
                            scrollInertia : 1200,
                            mouseWheel    : {
                                scrollAmount : 600
                            }
                        });
                    }
                }
            },
        }
    }

    if ( ! window.Projects ) {
        window.Projects = Projects;
    } else {
        window.Projects = $.extend({} , window.Projects , Projects);
    }
}(window, document, jQuery));