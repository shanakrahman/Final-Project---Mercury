//We use this notation when we want to protect the variable scope, however we still want to 
//access certain functions within here 
var SignUp = (function() {


	//declare variables needed for underscore
	var __TEMPLATE__ = '#signup',
		compiled = _.template(  $( __TEMPLATE__ ).html() ),
		ref = null;

		//we want to save the user's information into the DB
	function _onLogIn( error, authData ) {
		console.log (authData);

		if ( error ) {
			// do something in the DOM

			return;
		}

		// if we are here, no error

		//**Q** why use set here instead of push? Don't we want to save the users credentials?
		FirebaseHandler.set(
			// ref to where to set. **Q** what is authData.uid? 
			FirebaseHandler.getChild( ref, ['users', authData.uid, 'profile'] ), 
			// value to set. This is the object that stores all the user profile data (returned from twitter)
			authData.twitter.cachedUserProfile,									
			// what happens when updated? 
			_onUserUpdated( authData )											
		);

	}

	function _onUserUpdated( authData ) {

		return function( error ) {
			// var uid = authData.uid.split(':').pop();
			console.log( error );
			//set the URL via route function setRoute
			Routes.setRoute('user/'+authData.uid.replace(':', '/'));

		}
	}

	//**Q** does this notation mean anythin specific? _obj?
	var _obj = {};

	//**Q** not sure why we use this notation. In main.js, we call SignUp.init,
	//does that refer to this function? What is _obj? Is it an instance of SignUp?
	_obj.init = function init( domEl, passed_in_ref ) {
		//empty $content
		domEl.empty().append( compiled() );

		ref = passed_in_ref;

		$('.js-authenticate').on('click', function( e ) {
			e.preventDefault();

			//function in firebase-handler which launches o-auth login 
			//pass through _onLogIn which is a callback
			FirebaseHandler.logIn( ref, 'twitter', _onLogIn );
		});
	}
	
	//**Q** why do we return _obj? 
	return _obj;

})(); // Module Pattern


