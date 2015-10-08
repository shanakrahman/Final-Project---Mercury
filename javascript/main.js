(function(){	// protect the lemmings!
	//Write this notation when you are trying to protect the scope of variables
	//And when you want code to start RIGHT AWAY


	//Lets make a jqery object out of the #content div, which is the div in the html which we
	//inject HTML into, via the respective view pages.
	var $content = $('#content');
	//Constructs a new Firebase reference from a full Firebase URL.
	//https://www.firebase.com/docs/web/api/firebase/constructor.html
	//fireConfig.refUrl is a reference to our firebase DB url
	var ref = new Firebase( fireConfig.refUrl )

	//****Question***These instructions get called right away right?
	//Is this behaviour of single page apps? AkA all the pages of the app are
	//Loaded right away? onSignIn is what initializes the page
	//Is this the core of a SPA where it itializes all pages
	Routes.register('/signin', onSignIn);
	Routes.register('/signup', onSignUp);
	//*****Q****How does the providor and ID urls get set? 
	Routes.register('/user/:provider/:id', onUserId);
	Routes.register('/feed', onFeed);
	
	Routes.init('signup');

	//ROUTE HANDLERS	
	//SignIn is the object that is made in the SignIn .js view file
	//.init is the function that starts the functionality of the page. Passed in variables are
	//described in that function declaration
	//We aren't really using onSignIn..
	function onSignIn() {
		SignIn.init( $content );
	}

	//onSignUp we need to pass through the $content jquery object, so that the program knows 
	//where to inject HTML. And ref so it knows where the DB is
	function onSignUp() {
		SignUp.init( $content, ref );
	}

	//*****Question****where does providorid and userid get passed from? How do they get into 
	//the init function? 
	//we pass $content, the providorid (is that twitter,facebook?) userid and ref to the DB
	//We pass in the user ID details so that the view can do specific things with that user
	//ie. write specifically to that user's DB
	function onUserId( providerid, userid ) {
		User.init( $content, providerid, userid, ref );
	}

	function onFeed () {
		console.log( Feed )
		Feed.init( $content, ref );
	}


})();


// function foo() {
// }
// foo();
// 