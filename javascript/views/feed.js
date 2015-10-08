
var Feed = (function() { 

	var __TEMPLATE__= '#feed',
		compiled = _.template ( $(__TEMPLATE__).html() ),
		cardCompiled = _.template( $( '#card' ).html() ),
		ref = null; 

	function _onUserValue (snapshot) {
		$cardHolder = $('.js-card-holder');
		$cardHolder.empty();

		//forEach passes through a childAction - basically a function which does something to each element
		//here we can define that function
		snapshot.forEach(function( a ){
			//**Q** not sure the the syntax of RHS of expression. is cardCompiled a function?
			var $card = $( cardCompiled( a.val() ) );
			//write to the DOM, each card
			$cardHolder.prepend( $card );

		});

	}

	var _obj = {};
	
	
	_obj.init = function init( domEl, passed_in_ref ) {
		domEl.empty().append( compiled() );
		ref = passed_in_ref;

		//fire once loaded and then listen for changes to the DB, 
		FirebaseHandler.on(
			FirebaseHandler.getChild( ref, ['feed']),
			"value",
			//what to do when loaded first time, or detect changes to db
			_onUserValue
		);

	}
	console.log (_obj);
	return _obj;

})();
console.log( Feed )
