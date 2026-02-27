const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const path = require( 'path' );

module.exports = {
	...defaultConfig,
	entry: {
		'blocks/free-accordion/index'   : './blocks/free-accordion/index.js',
		'blocks/free-accordion/frontend': './blocks/free-accordion/frontend.js',
		'blocks/free-accordion-item/index': './blocks/free-accordion-item/index.js',
	},
	output: {
		...defaultConfig.output,
		path: path.resolve( __dirname, 'build' ),
	},
};
