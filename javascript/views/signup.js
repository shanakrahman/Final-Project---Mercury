var SignUp = (function() {

	var __TEMPLATE__ = '#signup',
		compiled = _.template(  $( __TEMPLATE__ ).html() );


	var _obj = {};

	_obj.init = function init( domEl ) {
		domEl.empty().append( compiled({name: 'moe'}) );
	}
	
	return _obj;

})(); // Module Pattern


