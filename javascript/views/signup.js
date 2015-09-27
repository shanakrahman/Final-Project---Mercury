var SignUp = (function() {

	var __TEMPLATE__ = '#signup',
		compiled = _.template(  $( __TEMPLATE__ ).html() ),
		ref = null;


	function _onLogIn( error, authData ) {

		if ( error ) {
			// do something in the DOM

			return;
		}
console.log( authData )
		// if we are here, no error

		FirebaseHandler.set(
			FirebaseHandler.getChild( ref, ['users', authData.uid, 'profile'] ), // ref
			authData.twitter.cachedUserProfile,									 // value to set
			_onUserUpdated( authData )											// what happens when updated?
		);

	}

	function _onUserUpdated( authData ) {

		return function( error ) {
			// var uid = authData.uid.split(':').pop();
			console.log( error );
			Routes.setRoute('user/'+authData.uid.replace(':', '/'));

		}
	}


	var _obj = {};

	_obj.init = function init( domEl, passed_in_ref ) {
		domEl.empty().append( compiled() );

		ref = passed_in_ref;

		$('.js-authenticate').on('click', function( e ) {
			e.preventDefault();

			FirebaseHandler.logIn( ref, 'twitter', _onLogIn );
		});
	}
	
	return _obj;

})(); // Module Pattern


