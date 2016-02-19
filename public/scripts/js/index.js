(function (window , document , jQuery , undefined) {
    'use strict';

    var Index = {
        Load : {
            Random    : null,
            Numbers   : 0,
            RandomVal : [11 , 26 , 32 , 49 , 53 , 67 , 74 , 82],
            Timer     : 10,
            SetTimer  : null,
            GetRandom : function() {
                var $this = this;

                $this.Random = $this.RandomVal[Math.floor(Math.random() * $this.RandomVal.length)];
            },
            Start : function() {
                var $this = this;

                window.clearTimeout($this.SetTimer);

                $this.SetTimer = setTimeout(function(){
                    if ( $this.Numbers <= $this.Random ) {
                        $this.Numbers += 3;
                        $this.Start();
                    } else {
                        $this.Numbers = $this.Random;
                        setTimeout(function(){
                            $this.Finish();
                        } , 1000);
                    }

                    jQuery('.jQ-load > div > span > em').text($this.Numbers);
                } , $this.Timer);
            },
            Finish : function() {
                var $this = this;

                window.clearTimeout($this.SetTimer);

                $this.SetTimer = setTimeout(function(){
                    if ( $this.Numbers < 100 ) {
                        $this.Numbers += 5;
                        $this.Finish();
                    } else {
                        $this.Numbers = 100;
                        jQuery('.jQ-load').addClass(jQuery('.jQ-load').data('hide'));
                        Projects.Factory.SliceBox.Init('.jQ-slider-3D');
                        Index.SliceBox.GetVideo();

                        jQuery('.jQ-load').bind(Projects.Factory.Dynamic , function(){
                            jQuery('.jQ-load').remove();
                        });
                    }

                    jQuery('.jQ-load > div > span > em').text($this.Numbers);
                } , $this.Timer);
            }
        },
        SliceBox : {
            OnClick : function(e) {
                if ( Projects.Factory.UserAgent === 'PC' ) {
                    e.preventDefault();
                }
                // else {
                //     // if ( jQuery(Element).find('> *:first')[0].nodeName === 'VIDEO' ) {
                //     //     // window.open(jQuery(Element).find('> *:first source').attr('src') , '_blank');
                //     //     jQuery(Element).find('> *:first').addClass(jQuery('.jQ-slider-3D').data('show')).removeClass(jQuery('.jQ-slider-3D').data('tablet'));
                //     //     Projects.Factory.SliceBox.Video = jQuery(Element).find('> *:first')[0];
                //     //     Projects.Factory.SliceBox.Play();
                //     // }
                // }
            },
            GetVideo : function() {
                if ( Projects.Factory.UserAgent !== 'PC' ) {
                    for ( var i = 0 , $elem = jQuery('.jQ-slider-3D').find('.m-slider-item') ; i < $elem.length ; i ++ ) {
                        if ( $elem.eq(i).find('.m-slider-media').find('> *:first')[0].nodeName === 'VIDEO' ) {
                            $elem.eq(i).find('.m-slider-media').replaceWith(jQuery('<a href="'+ $elem.eq(i).find('> *:first source').attr('src') +'" class="m-slider-media" target="_blank">' + $elem.eq(i).find('.m-slider-media').html() + '</a>'))
                            $elem.eq(i).find('.m-slider-media').find('> *:first').addClass(jQuery('.jQ-slider-3D').data('tablet'));
                        }
                    };
                }
            }
        }
        
    };

    jQuery('.jQ-arrow').on('click' , function(){
        if ( jQuery(this).hasClass('is-prev') ) {
            Projects.Factory.SliceBox.Prev('.jQ-slider-3D');
        } else {
            Projects.Factory.SliceBox.Next('.jQ-slider-3D');
        }
    });

    jQuery('.jQ-media').on('click' , function(e){
        // Index.SliceBox.OnClick(e , this);
        if ( Projects.Factory.UserAgent === 'PC' ) {
            e.preventDefault();
        }
    });

    jQuery(document).ready(function(){
        Index.Load.GetRandom();
        Index.Load.Start();
    });

    jQuery(window).load(function(){
        // Projects.Factory.SliceBox.Init('.jQ-slider-3D');
    });
}(window, document, jQuery));