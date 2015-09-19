var User = (function() {

	var __TEMPLATE__ = '#user',
		compiled = _.template(  $( __TEMPLATE__ ).html() );


	var _obj = {};

	_obj.init = function init( domEl, id ) {
		domEl.empty().append( compiled({name: 'moe', id: id}) );
	}
	
	return _obj;

})(); // Module Pattern


