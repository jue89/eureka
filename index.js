'use strict';

let fireup = require( 'fire-up' ).newInjector( {
	basePath: __dirname,
	modules: [
		'./config/*.js',
		'./core/*.js',
		'./services/*.js'
	]
} );

// Override injected modules
let override = [];

// Get config
if( process.env.CONFIG ) override.push( "config:" + process.env.CONFIG );

// And here we go !
fireup( 'services', { use: override } ).then( ( shutdownServices ) => {

	function shutdown() {
		shutdownServices().then( () => process.exit( 0 ) );
	}

	// If we cought INT or TERM signal, shutdown the whole thing ...
	process.once( 'SIGINT', shutdown ).once( 'SIGTERM', shutdown );

} );
