var FirebaseHandler = (function() {

	var __ = {};

	__.getChild = function getChild( ref, arr ) {
		return ref.child( arr.join('/') );
	}


	__.logIn = function login( ref, type, callback ) {
		ref.authWithOAuthPopup( type, callback );
	}

	__.set = function set( ref, valueToSet, callback ) {
		ref.set( valueToSet, callback );
	}

	__.push = function push( ref, valueToSet, callback ) {
		if ( typeof callback !== "function" ) {
			callback = function() {};
		}
		ref.push(valueToSet, callback );
	}

	__.on = function on( ref, eventName, callback ) {
		ref.off( eventName );
		ref.on( eventName, callback );
	}

	__.once = function once( ref, eventName, callback ) {
		ref.once( eventName, callback );
	}
	return __;

})(); // Module Pattern


