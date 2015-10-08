var User = (function() {

	//declare variables needed for underscore
	//aka whats required to inject underscore templates
	var __TEMPLATE__ = '#user',
		//This guy should only be called once, load in the ariticle form
		compiled = _.template(  $( __TEMPLATE__ ).html() ),
		//Underscore object for selecting cards
		cardCompiled = _.template( $( '#card' ).html() ),
		//*******Question: Why is this needed? 
		ref = null;


	//what to do once you submit an article
	//called as a callback below
	function _onUserSave( error ) {

		if ( error ) {
			// do something in the DOM
			console.log( error );
		} 		

		//Clear the fields, by writing nothing to each of them
		$('.js-article-title').val('');
		$('.js-article-url').val('');
	}
	//What to do after we detect a change to the FB. Handles the cases:
	// 1. User saves an article
	 
	// 2. Another user saves an article (or from different machine)
	//anytime you read from the database location, you receive a copy of that entire location db
	//The .on() function always passes a data snapshot to the event callbacks
	//In this case, the .on() function was looking at users/USERID/links, so we receive that entire db
	function _onUserValue( snapshot ) {
		// console.log(snapshot);
		
		//Select the div that will hold my template (The column)
		$cardHolder = $('.js-card-holder');

		//empty everything thats in there. write FRESH! 
		$cardHolder.empty();
		
		//lets loop through and write out each card
		//a is essentially the child element
		//and loop through?
		snapshot.forEach(function( a ) {
			// console.log( a.val(), cardCompiled( a.val() ), $cardHolder )

			//cardCompiled is an underscore object. Read up on this
			//this is where we insert 
			var $card = $( cardCompiled( a.val() ) );
			//write out all the cards on to the page, prepend
			$cardHolder.prepend( $card );
				

		});

		//inject transition (pulsate) CSS into the card that just got added
		$cardHolder.find('div:first').addClass('custom-card-style--added')
	}
	//Initialize the object. We create an object, so that we can create different methods 
	//against it. 
	var _obj = {};


	_obj.init = function init( domEl, pid, id, passed_in_ref ) {
		//dom.empty will empty whatever is in the page currently
		//**Q** what does .append(compiled()) do? 
		domEl.empty().append( compiled() );

		ref = passed_in_ref;

		//Listen for changes at a particular location, firebase on() function
		//With this, we will listen for any changes made to the list of articles
		//and automatically update the view anytime something new gets added
		FirebaseHandler.on(
			//Where we are listening - specifically the users/USERID/links
			//Refer to Firebasehandler.js - returns object full of links for user 
			FirebaseHandler.getChild( ref, ['users',pid+":"+id, 'links']),
			//value event, fire ones for initial state, and every time data changes
			"value",
			//Callback function on what to run after. Essentially, we want to update
			//the view with the new card
			_onUserValue
		);

		//Code to describe what should happen when you fill the article form
		//(add a title and url) and hit submit.
		//Lets make a jquery object on the submit button, and listen for a click event
		$('.js-add-article-submit').off('click').on('click', function(e) {
			//Lets prevent doing whatever is the default value
			//(we want to define what happens)
			e.preventDefault();

			//*******Likely need to add validation code here*******
			//Lets describe exactly what we want to save, the title and link
			var articleObj = {
					//What the user inputted as the article title
					title: $('.js-article-title-submit').val(),
					//What the user inputted as a URL.
					url: $('.js-article-url-submit').val(),
					//Lets also save the userID for that article save
					uid: pid+':'+id
				} 
			
			//Once the user hits submit, lets push to the firebase handler
			FirebaseHandler.push(
				//Ref to where we want to write to the DB, users/userID/links
				FirebaseHandler.getChild( ref, ['users',pid+":"+id, 'links']), 	
				//What we want to save, articleObj described above
				//is this is why we save the variables as an object, because it saves nicely in the db
				articleObj, 									
				//What to do after. Specifically we want the article to show up				
				_onUserSave
			);

			//lets also push the data to another list called feed
			//Feed will store all the articles stored by EVERY user
			FirebaseHandler.push(
				//Where we want to push. This case we want feed to be at the top
				//level, same as users
				FirebaseHandler.getChild( ref, ['feed']),
				//What to save 	
				articleObj	
				//******Question: No callback function, why and what happens? 								
			);

		});
			
	}
	

	//**Q**Why do we have to return an object? and where does it get returned to?
	return _obj;

})(); // Module Pattern


