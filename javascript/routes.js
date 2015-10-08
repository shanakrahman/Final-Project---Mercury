// var Router = require('director').Router;
// We want to make Routes public and accessible globally
// **Q** why is routes written differently than Firebasehandler and all the views
// var SignUp = (function() {})();?

var Routes = {};

Routes.list = {};

Routes.register = function( route, fn ) {
    if ( typeof fn === "undefined" ) return;

    Routes.list[route]= fn;
}

Routes.init = function( defaultRoute ) {
    this.router = Router( this.list );
    this.router.init( defaultRoute );
}

Routes.getInstance = function() {
    return this.router;
}

Routes.setRoute = function( route ) {
    this.router.setRoute( route );
	} // wrapper on router.setRoute -- in case we ever switch to other router lib

// module.exports = Routes;