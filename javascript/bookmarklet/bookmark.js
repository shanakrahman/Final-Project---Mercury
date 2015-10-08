(function(){

	var href = window.location.href;
	var title = document.title;

	var iframe = document.createElement( 'iframe' );
	iframe.src="http://localhost:8000/bookmark.html?href="+href+'&title='+title;
	document.body.appendChild( iframe );

})();