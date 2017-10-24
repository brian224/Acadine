(function (window, document, jQuery, undefined) {
    'use strict';

    var memberObj = new page();

    function page() {
        this._resand = '.jQ-resand';
    }

    projects.$w.load(function(){
    });

    projects.$d.ready(function(){
        projects.validate({
            event          : 'focusout',
            invalidHandler : common.validateHandler,
            selfMethod     : function() {
                /* password checked */
                jQuery.validator.addMethod('passwordrule' , function (value, elem, params) {
                    var _password = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
                    return this.optional(elem) || ( _password.test(value) );
                });

                /* passwoed double checked */
                jQuery.validator.addMethod('passwordcheck' , function (value, elem, params) {
                    var _regex = {
                        _class : /passwordcheck\sfrom\s\S+/,
                        _name  : /\S+$/
                    }
                    var $name  = jQuery('[name="'+_regex._name.exec(_regex._class.exec(jQuery(elem)[0].className)[0])[0]+'"]');
                    
                    return $name.val() === value;
                });

                jQuery.validator.addClassRules({
                    'passwordrule' : {
                        passwordrule : true
                    },
                    'passwordcheck' : {
                        passwordcheck : true
                    }
                });
            }
        });

        $(memberObj._resand).on('click', function(){
            $(common._lBody).attr('data-switch', 2);
        });
    });

    if ( ! window.memberObj ) {
        window.memberObj = memberObj;
    }
}(window, document, $));