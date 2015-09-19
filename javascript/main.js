(function(){	// protect the lemmings!

	var $content = $('#content');

	Routes.register('/signin', onSignIn);
	Routes.register('/signup', onSignUp);
	Routes.register('/user/:id', onUserId);

	Routes.init('signin');

	// ROUTE HANDLERS	
	function onSignIn() {
		SignIn.init( $content );
	}

	function onSignUp() {
		SignUp.init( $content );
	}

	function onUserId( userid ) {
		User.init( $content, userid );
	}


})();


// function foo() {
// }
// foo();