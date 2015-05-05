/**
 * Create the namespace
 */
Hooke = {};

/**
 * Package API
 */
_.extend(Hooke, {

	/**
	 * List of Hook's
	 * @type {Object}
	 */
	_hookes: {},

	_handle: function(action, method, req, res, next) {
		/**
		 * Fetch the hook 
		 */
		var action = Hooke._hookes[action];

		/**
		 * Double check it has the method in the stack
		 */
		if(action.methods.indexOf(method) === -1) {
			return next(new Meteor.Error("hooke", "Action cannot be fired for method"));
		}

		/**
		 * Call the action handler
		 */
		action.callback.call(action.callback, req, res, next);
	},

	/**
	 * Add a Hook
	 */
	add: function(methods, action, callback) {
		/**
		 * Valdiate hte methods are ok
		 */
		if(!_.isString(methods) && !_.isArray(methods)) {
			throw new Meteor.Error("hooke", "Invalid methods declared.");
		}

		/**
		 * Cast to an array if a string is passed
		 */
		if(_.isString(methods)) {
			methods = [methods];
		}

		/**
		 * Convert to uppercase
		 */
		methods = _.map(methods, function(a){ return a.toUpperCase(); });

		if(action in Hooke._hookes) {
			throw new Meteor.Error("hooke", "Hook (" + action + ") already defined");
		}

		/**
		 * Valdiate the callback
		 */
		if(!_.isFunction(callback)) {
			throw new Meteor.Error("Callback for (" + action + ") needs to be a function.");
		}

		/**
		 * @todo Valdiate the callback and method
		 */
		Hooke._hookes[action] = {
			methods: methods,
			callback: callback
		}
	},

	/**
	 * Check to see if a hook has been declared
	 */
	has:function(action, method) {
		if((action in Hooke._hookes) === false) {
			return false;
		}

		/**
		 * Return true if the method matches
		 */
		return Hooke._hookes[action].methods.indexOf(
			method.toUpperCase()
		) > -1;
	},

	/**
	 * Add a GET Handler
	 * @param  {String}   action   Action Name
	 * @param  {Function} callback Callback to invoke
	 */
	get: function(action, callback) {
		return Hooke.add(["get"], action, callback);
	},

	/**
	 * Add a POST Handler
	 * @param  {String}   action   Action Name
	 * @param  {Function} callback Callback to invoke
	 */
	post: function(action, callback) {
		return Hooke.add(["post"], action, callback);
	},

	/**
	 * Add a DELETE Handler
	 * @param  {String}   action   Action Name
	 * @param  {Function} callback Callback to invoke
	 */
	delete: function(action, callback) {
		return Hooke.add(["delete"], action, callback);
	},

	/**
	 * Add a PUT Handler
	 * @param  {String}   action   Action Name
	 * @param  {Function} callback Callback to invoke
	 */
	put: function(action, callback) {
		return Hooke.add(["put"], action, callback);
	},

	/**
	 * Add a PATCH Handler
	 * @param  {String}   action   Action Name
	 * @param  {Function} callback Callback to invoke
	 */
	patch: function(action, callback) {
		return Hooke.add(["patch"], action, callback);
	}
});