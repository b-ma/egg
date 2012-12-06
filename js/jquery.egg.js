(function( $, window, document, undefined ) {
    var pluginName = 'egg',
		currentIndex = 0,
		defaultCallback = function(){ alert('petit poney !'); }
		defaults = {
			// up, up, down, down, left, right, left, right, B, A
			keyCodes : [38, 38, 40, 40, 37, 39, 37, 39, 66, 65 ],
			delay : 1000,
			trace : false,
		}
	;
	
	var clear = function() {
		currentIndex = 0;
	}
	
	var plug = function( options, callback ) {
	
		var _config = $.extend( defaults, options ),
			_callback = callback || defaultCallback,
			_maxIndex = _config.keyCodes.length,
			codeCollection = [],
			code,
			timeoutId
		;
		
        $( window ).keyup( function( e ) {
			code = e.keyCode ? e.keyCode : e.which;
		
			if ( _config.trace ) {
				codeCollection.push( code );
				console.log( codeCollection );
				return;
			}
			
            if ( code === _config.keyCodes[currentIndex] ) {
                clearTimeout( timeoutId );
                currentIndex = currentIndex + 1;
				
                if ( currentIndex === _maxIndex ) {
                    clear();
                    _callback();
                }
                
                timeoutId = setTimeout( function() {
                    clear();
                }, _config.delay );
            } else {
                clear();
			}
        }); 
	}
    
	// can be improved
    $[pluginName] = function( arg1, arg2 ) { 
		if ( typeof arg1 === 'object' && typeof arg2 === 'function' ) {
			plug( arg1, arg2 );
		} else if ( typeof arg1 === 'function' ) {
			plug( {}, arg1 );
		}
    }
	
}( jQuery, window, document ));