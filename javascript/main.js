(function(){	// protect the lemmings!

	var $content = $('#content');
	var ref = new Firebase( fireConfig.refUrl )

	Routes.register('/signin', onSignIn);
	Routes.register('/signup', onSignUp);
	// Routes.register('/user', onUserId);
	//Use this route.register when you figure out what :id does
	Routes.register('/user/:provider/:id', onUserId);
	
	Routes.init('signup');

	// ROUTE HANDLERS	
	function onSignIn() {
		SignIn.init( $content );
	}

	function onSignUp() {
		SignUp.init( $content, ref );
	}

	function onUserId( providerid, userid ) {
		User.init( $content, providerid, userid, ref );
	}


})();


// function foo() {
// }
// foo();
// 