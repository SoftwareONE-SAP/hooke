/**
 * HTTP Interface
 */

/**
 * Require Dependancies
 */
var Fiber   = Npm.require('fibers'),
	url     = Npm.require('url'),
	bodyParser = Npm.require('body-parser');

/**
 * Delcare the route policy
 */
RoutePolicy.declare("/_hooke", 'network');

/**
 * Assign the body persers to run during a /_hooke/ call
 */
WebApp.connectHandlers
	.use("/_hooke/", bodyParser.urlencoded({extended: false}))
	.use("/_hooke/", bodyParser.json())
/**
 * Add the middleware to the application
 *
 * @todo Move this use functionality to the Hooke.use method
 *       to only intercent or use libraries during a /_hooke/
 *       call.
 */
WebApp.connectHandlers.use("/_hooke/", function(req, res, next) {
	// Need to create a Fiber since we're using synchronous http calls and nothing
	// else is wrapping this in a fiber automatically
	
	Fiber(function() {
		/**
		 * Split the url up into it's segments, removing
		 * /_hooke/ from the start of hte url
		 */
		var componants = req._parsedUrl.pathname.replace("/_hooke/", "").split("/");

		/**
		 * Check to see if we have a hooke for this request
		 */
		if(!Hooke.has(componants[0], req.method)) {
			return next(new Error("Not found"));
		}

		/**
		 * Call the hook
		 */
		return Hooke._handle(componants[0], req.method, req, res, next);
	}).run();
});