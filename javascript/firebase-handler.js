var FirebaseHandler = (function() {

	var __ = {};

	__.getChild = function getChild( ref, arr ) {
		//arr.join will join the array elements with '/' to complete the url location
		return ref.child( arr.join('/') );
	}


	__.logIn = function login( ref, type, callback ) {
		ref.authWithOAuthPopup( type, callback );
	}

	//function that handles setting to the DB
	__.set = function set( ref, valueToSet, callback ) {
		ref.set( valueToSet, callback );
	}

	//function that pushes 
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

//**Q** whats the difference between writing this and
//not declaring __ and just writing function getChild
//could it not be still called with FirebaseHandler.getChild?


