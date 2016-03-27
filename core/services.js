'use strict';
// Fire me up!

module.exports = {
	implements: 'services',
	inject: [ 'service:*' ]
};

module.exports.factory = function( services ) {

	// By requiring all services, they are kicked off ...
	// They will return shutdown methods

	return shutdown;

	function shutdown() {

		let deferred = [];

		// Go through all services and shut them down
		for( let s in services ) {

			// If the service hasn't returned a function, skip it
			if( typeof services[s] != 'function' ) continue;

			// Shutdown service
			let sd = services[s]();

			// If it returned a promise, we will add it to the deferred array
			if( sd instanceof Promise ) deferred.push( sd );

		}

		// Wait for all deferred shutdowns to be finished
		return Promise.all( deferred );

	}

};
