(function(){

	// var href = window.location
	var base = window.location.search;
	base = base.slice(1);
	base = base.split('&');
	var argsObj = base.reduce(function(obj, curr){
		var bits = curr.split('=');

		obj[ bits[ 0 ] ] = bits[ 1 ];

		return obj;
	}, {});

	console.log( argsObj );

	var FirebaseHandler = (function() {

		var __ = {};

		__.getChild = function getChild( ref, arr ) {
			return ref.child( arr.join('/') );
		};

		__.logIn = function login( ref, type, callback ) {
			ref.authWithOAuthPopup( type, callback );
		};

		__.set = function set( ref, valueToSet, callback ) {
			ref.set( valueToSet, callback );
		};

		__.push = function push( ref, valueToSet, callback ) {
			if ( typeof callback !== "function" ) {
				callback = function() {};
			}
			ref.push(valueToSet, callback );
		};

		__.on = function on( ref, eventName, callback ) {
			ref.off( eventName );
			ref.on( eventName, callback );
		};

		__.once = function once( ref, eventName, callback ) {
			ref.once( eventName, callback );
		};

		return __;

	})();

	function getScriptAnd( url, varToCheck, callback ) {

		if ( !( varToCheck ) ) {
			var script = document.createElement( 'script' );
			
			document.body.appendChild( script );
			
			script.onload = callback;

			script.src = url;
		}
		else {
			callback();
		}

	};


	getScriptAnd( 
		'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js', 
		window.jQuery,
		function(){
			getScriptAnd(
				'https://cdn.firebase.com/js/client/2.2.1/firebase.js',
				window.Firebase,
				releasetheKraken
			);
		}
	);

	var ref;
	function releasetheKraken() {
		ref = new Firebase('https://brilliant-heat-2507.firebaseio.com');
		FirebaseHandler.logIn( ref, 'twitter', _onLogIn );

	}

	function _onLogIn( error, authData ) {
		
		if ( error ) {

			return;
		}


		FirebaseHandler.set(
			FirebaseHandler.getChild( ref, ['users', authData.uid, 'profile'] ), // ref
			authData.twitter.cachedUserProfile,									 // value to set
			_onUserUpdated( authData )											// what happens when updated?
		);

	}

	function _onUserUpdated( authData ) {

		return function( error ) {
			
			
			console.log( title, href );
		};
	}

})();