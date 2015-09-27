var User = (function() {

	var __TEMPLATE__ = '#user',
		compiled = _.template(  $( __TEMPLATE__ ).html() ),
		cardCompiled = _.template( $( '#card' ).html() ),
		ref = null;

	function _onUserSave( error ) {

		if ( error ) {
			// do something in the DOM
			console.log( error );
		} 		

		$('.js-article-title').val('');
		$('.js-article-url').val('');
	}

	function _onUserValue( snapshot ) {
		console.log(snapshot);
		$cardHolder = $('.js-card-holder');

		$cardHolder.empty();
		snapshot.forEach(function( a ) {
			console.log( a.val(), cardCompiled( a.val() ), $cardHolder )

			var $card = $( cardCompiled( a.val() ) );
			$cardHolder
				.prepend( $card );
				

		});

		$cardHolder.find('div:first').addClass('custom-card-style--added')
	}

	var _obj = {};

	_obj.init = function init( domEl, pid, id, passed_in_ref ) {
		domEl.empty().append( compiled() );

		ref = passed_in_ref;
		FirebaseHandler.on(
			FirebaseHandler.getChild( ref, ['users',pid+":"+id, 'links']),
			"value",
			_onUserValue
		);

		$('.js-add-article').off('click').on('click', function(e) {
			e.preventDefault();

			var articleObj = {
					title: $('.js-article-title').val(),
					url: $('.js-article-url').val(),
					uid: pid+':'+id
				} 
		
			FirebaseHandler.push(
				FirebaseHandler.getChild( ref, ['users',pid+":"+id, 'links']), 	//Ref
				articleObj, 													//what i am setting
				_onUserSave
			);

			FirebaseHandler.push(
				FirebaseHandler.getChild( ref, ['feed']), 	//Ref
				articleObj													//what i am settin
			);

		});
			
	}
	


	return _obj;

})(); // Module Pattern


