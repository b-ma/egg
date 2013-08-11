(function( $, window, document, undefined ) {
    var pluginName = 'egg',
        defaultCallback = function(){ alert('petit poney !'); },
        defaults = {
            // up, up, down, down, left, right, left, right, B, A
            keyCodes : [38, 38, 40, 40, 37, 39, 37, 39, 66, 65 ],
            delay : 1000,
            trace : false
        }
    ;


    var Plugin = function( elm, options, callback ) {
        this._name = pluginName;
        this._elm = elm;
        this._config = $.extend( defaults, options );

        this._callback = callback || defaultCallback;
        this.currentIndex = 0;

        this.init();
    };

    Plugin.prototype = {
        init : function() {
            var that = this;

            this._maxIndex = this._config.keyCodes.length;
            this.codeCollection = [];
            this.timeoutId;

            $( window ).keyup( function( e ) {
                var code = e.keyCode ? e.keyCode : e.which;

                if ( that._config.trace ) {
                    that.trace( code );
                    return;
                }

                if ( code === that._config.keyCodes[that.currentIndex] ) {
                    that.test( code );
                } else {
                    that.clear();
                }
            });
        },

        trace : function( keyCode ) {
            this.codeCollection.push( code );
            console.log( this.codeCollection );
        },

        test : function( code ) {
            var that = this;

            clearTimeout( that.timeoutId );
            this.currentIndex = this.currentIndex + 1;

            if ( that.currentIndex === that._maxIndex ) {
                this.clear();
                this._callback.apply( this._elm );
            }

            this.timeoutId = setTimeout( function() {
                that.clear();
            }, this._config.delay );
        },

        clear : function() {
            this.currentIndex = 0;
        }

    };

    var createInstance = function ( elm, options, callback ) {
        if ( !$.data( elm, 'plugin_' + pluginName ) ) {
            if ( typeof options === 'function' )  {
               var callback = options;
               var options = {};
            }
            $.data( elm, 'plugin_' + pluginName, new Plugin( elm, options, callback ) );
        }
    };

    $[pluginName] = function( options, callback ) {
       createInstance( document, options, callback );
    }

    $.fn[pluginName] = function( options, callback ) {
        return this.each( function() {
            createInstance( this, options, callback );
        });
    }

}( jQuery, window, document ));
