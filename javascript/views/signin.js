var SignIn = (function() {

	var __TEMPLATE__ = '#signin',
		compiled = _.template(  $( __TEMPLATE__ ).html() );


	var _SignIn = {};

	_SignIn.init = function init( domEl ) {
		domEl.empty().append( compiled({name: 'moe'}) );
	}
	
	return _SignIn;

})(); // Module Pattern


