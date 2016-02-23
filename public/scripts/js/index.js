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
                        
                        jQuery('.jQ-load').bind(Projects.Factory.Dynamic , function(){
                            jQuery('.jQ-load').remove();
                        });
                    }

                    jQuery('.jQ-load > div > span > em').text($this.Numbers);
                } , $this.Timer);
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

    jQuery('.jQ-slider-3D').on('click' , '.jQ-media' , function(e){
        e.preventDefault();
        Projects.Factory.SliceBox.OnClick(this);
    });

    jQuery(document).ready(function(){
        Index.Load.GetRandom();
        Index.Load.Start();
        Projects.Factory.SliceBox.GetVideo();
    });
}(window, document, jQuery));