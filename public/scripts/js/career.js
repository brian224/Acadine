(function (window , document , jQuery , undefined) {
    'use strict';

    var Career = {
        Path    : '/public/scripts/js/career.json',
        Dates   : null,
        Options : [[] , [] , []],
        Model : {
            Locations  : null,
            Department : null,
            Positions  : null
        },
        Clone : {
            Accordion      : jQuery('.jQ-accordion .m-accordion-bd > ul > li').clone(),
            AccordionItem  : jQuery('.jQ-accordion-item > div > ul > li').clone(),
            Item           : jQuery('.jQ-item > ul > li').clone(),
            Department     : jQuery('select[name="Department"]').find('option').eq(0).clone(),
            Positions      : jQuery('select[name="Positions"]').find('option').eq(0).clone()
        },
        GetApi : function() {
            var $this = this;

            jQuery.get($this.Path , function(data){
                $this.Dates = data;
            }).then(function(data){
                for ( var i = 0 ; i < data.length ; i ++ ) {
                    if ( $this.Options[0].length === 0 ) {
                        $this.Options[0].push(jQuery.trim(data[i].locations).toLowerCase());
                        jQuery('select[name="Location"]').append('<option value="' + data[i].locations + '">'+ data[i].locations +'</option>');
                    } else {
                        if ( jQuery.inArray(jQuery.trim(data[i].locations).toLowerCase() , $this.Options[0]) === -1 ) {
                            $this.Options[0].push(jQuery.trim(data[i].locations).toLowerCase());
                            jQuery('select[name="Location"]').append('<option value="' + data[i].locations + '">'+ data[i].locations +'</option>');
                        }
                    }
                };
            });
        },
        LocationsChange : function(Trim) {
            var $this = this;

            $this.Options[1] = [];

            for ( var i = 0 ; i < $this.Dates.length ; i ++ ) {
                if ( $this.Dates[i].locations === $this.Model.Locations ) {
                    Trim = jQuery.trim($this.Dates[i].depts).replace(/\s/g,'').toLowerCase();

                    if ( $this.Options[1].length === 0 ) {
                        $this.Options[1].push(Trim);
                        jQuery('select[name="Department"]').append('<option value="' + $this.Dates[i].depts + '">'+ $this.Dates[i].depts +'</option>');
                    } else {
                        if ( jQuery.inArray(Trim , $this.Options[1]) === -1 ) {
                            $this.Options[1].push(Trim);
                            jQuery('select[name="Department"]').append('<option value="' + $this.Dates[i].depts + '">'+ $this.Dates[i].depts +'</option>');
                        }
                    }

                    $this.Options[2].push($this.Dates[i]);
                }
            };
        },
        DepasChange : function() {
            var $this = this;

            for ( var i = 0 ; i < $this.Dates.length ; i ++ ) {
                if ( $this.Dates[i].locations === $this.Model.Locations && $this.Dates[i].depts === $this.Model.Department ) {
                    jQuery('select[name="Positions"]').append('<option value="' + $this.Dates[i].positions + '">'+ $this.Dates[i].positions +'</option>');
                    $this.Options[2].push($this.Dates[i]);
                }
            };
        },
        PositionsChange : function() {
            var $this = this;

            for ( var i = 0 ; i < $this.Dates.length ; i ++ ) {
                if ( $this.Dates[i].locations === $this.Model.Locations && $this.Dates[i].depts === $this.Model.Department && $this.Dates[i].positions === $this.Model.Positions ) {
                    $this.Options[2].push($this.Dates[i]);
                }
            };
        },
        OnChange : function(Element){
            var $this  = this;
            var $trim  = null;
            var $title = [];
            
            jQuery('select[name='+Element+'').on('change' , function(e){
                jQuery('.jQ-accordion .m-accordion-bd > ul').empty().append($this.Clone.Accordion);
                $title           = [];
                $this.Options[2] = [];

                if ( Element === 'Location' ) {
                    jQuery('select[name="Department"]').empty().append($this.Clone.Department);
                    jQuery('select[name="Positions"]').empty().append($this.Clone.Positions);

                    if ( jQuery(this).val() ) {
                        $this.Model.Locations = jQuery(this).val();
                        jQuery('.jQ-accordion').removeClass(jQuery('.jQ-accordion').data('hide'));
                        $this.LocationsChange($trim);
                    } else {
                        $this.Model.Locations = null;
                        jQuery('.jQ-accordion').addClass(jQuery('.jQ-accordion').data('hide'));
                    }
                } else if ( Element === 'Department' ) {
                    jQuery('select[name="Positions"]').empty().append($this.Clone.Positions);
                    
                    if ( jQuery(this).val() ) {
                        $this.Model.Department = jQuery(this).val();
                        $this.DepasChange();
                    } else {
                        $this.Model.Department = null;
                        $this.LocationsChange($trim);
                    }
                } else if ( Element === 'Positions' ) {
                    if ( jQuery(this).val() ) {
                        $this.Model.Positions = jQuery(this).val();
                        $this.PositionsChange();
                    } else {
                        $this.Model.Positions = null;
                        $this.DepasChange();
                    }
                }
                
                jQuery('.jQ-accordion-item > div > ul').empty();

                for ( var i = 0 , $splititle = jQuery('.jQ-accordion').data('title').split('/') ; i < $splititle.length ; i ++ ) {
                    $title.push([]);

                    jQuery('.jQ-accordion-item > div > ul').append($this.Clone.AccordionItem);
                    $this.Clone.AccordionItem = jQuery($this.Clone.AccordionItem).clone();

                    for ( var j = 0 , $split = jQuery.trim($splititle[i]).split(',') ; j < $split.length ; j ++ ) {
                        $title[i].push(jQuery.trim($split[j]));
                    };

                    jQuery('.jQ-accordion-item > div > ul > li').eq(i).find('h3').text($title[i][0]);
                };

                for ( var i = 0 ; i < $this.Options[2].length ; i ++ ) {
                    jQuery('.jQ-accordion .m-accordion-bd > ul').append($this.Clone.Accordion);
                    $this.Clone.Accordion = jQuery($this.Clone.Accordion).clone();
                    jQuery('.jQ-accordion .m-accordion-bd > ul > li').eq(i).find('.jQ-accordion-ctrl em').text($this.Options[2][i].positions);
                    if ( $this.Options[2][i].desc ) {
                        jQuery('.jQ-accordion-item:eq('+ i +') > div > .b-p').text($this.Options[2][i].desc);
                    } else {
                        jQuery('.jQ-accordion-item:eq('+ i +') > div > .b-p').remove();
                    }

                    jQuery('.jQ-accordion-item:eq('+ i +') > div .jQ-button').attr('href' , $this.Options[2][i].email ? ( jQuery('.jQ-accordion-item:eq('+ i +') > div .jQ-button').attr('href') + $this.Options[2][i].email ) : 'javascript:;');

                    for ( var j = 0 , $splititle = jQuery('.jQ-accordion').data('title').split('/') ; j < $splititle.length ; j ++ ) {
                        for( var k in $this.Options[2][i] ) {
                            if ( k === $title[j][1] ) {
                                for ( var l = 0 , $k = $this.Options[2][i][k].split('\n') ; l < $k.length ; l ++ ) {
                                    if ( l !== 0 ) {
                                        jQuery('.jQ-accordion .m-accordion-bd > ul > li:eq('+ i +') .jQ-item:eq('+ j +') > ul').append($this.Clone.Item);
                                        $this.Clone.Item = jQuery($this.Clone.Item).clone();
                                    }
                                    if ( $this.Options[2][i][k] ) {
                                        jQuery('.jQ-accordion .m-accordion-bd > ul > li:eq('+ i +') .jQ-item:eq('+ j +') > ul > li').eq(l).text($k[l]);
                                    } else {
                                        jQuery('.jQ-accordion .m-accordion-bd > ul > li:eq('+ i +') .jQ-item:eq('+ j +')').addClass(jQuery('.jQ-accordion').data('hide'));
                                    }
                                };
                            }
                        }
                    }
                };
            });
        }
    }

    Projects.Factory.D.ready(function(){
        Projects.Factory.MCustomScrollbar.Init('body' , Projects.Factory.MCustomScrollbar.Translate);
        Projects.Factory.OwlCarousel.Init('.jQ-slider');
        Career.GetApi();
        Career.OnChange('Location');
        Career.OnChange('Department');
        Career.OnChange('Positions');
    });
}(window, document, jQuery));