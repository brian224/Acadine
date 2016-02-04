(function (window , document , jQuery , undefined) {
    'use strict';

    var About = {
        Article : {
            Elem : jQuery('.jQ-article')
        },
        MCustomScrollbar : {
            WHeight : ( Projects.Factory.W.height() / 1.5 ),
            CallBack : function(draggerTop , scrollTop) {



                // console.log(scrollTop);
                for ( var i = 0 ; i < About.Article.Elem.length ; i ++ ) {
                    // console.log(About.Article.Elem.eq(i).offset().top);

                    if ( scrollTop >= ( About.Article.Elem.eq(i).offset().top === 0 ? 0 : ( About.Article.Elem.eq(i).offset().top - About.MCustomScrollbar.WHeight ) ) && ( About.Article.Elem.eq(i).offset().top - scrollTop ) >= 0 && scrollTop < ( About.Article.Elem.eq(i).offset().top + About.Article.Elem.eq(i).outerHeight(true) ) ) {
                        About.Article.Elem.eq(i).addClass(About.Article.Elem.data('scroll')).parent().siblings().find('.jQ-article').removeClass(About.Article.Elem.data('scroll'));
                    }
                };
            }
        }
    }

    Projects.Factory.D.ready(function(){
        Projects.Factory.MCustomScrollbar.Init('body' , About.MCustomScrollbar.CallBack);
        Projects.Factory.OwlCarousel.Init('.jQ-slider');
    });

    Projects.Factory.W.load(function(){
        About.Article.Elem.eq(0).addClass(About.Article.Elem.data('scroll'));
    });
}(window, document, jQuery));