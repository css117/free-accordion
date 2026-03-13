const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const path          = require( 'path' );
const CopyPlugin    = require( 'copy-webpack-plugin' );

module.exports = {
	...defaultConfig,
	entry: {
		'blocks/free-accordion/index'     : './blocks/free-accordion/index.js',
		'blocks/free-accordion-item/frontend' : './blocks/free-accordion-item/frontend.js',
		'blocks/free-accordion-item/index': './blocks/free-accordion-item/index.js',
	},
	output: {
		...defaultConfig.output,
		path: path.resolve( __dirname, 'build' ),
	},
	plugins: [
		...defaultConfig.plugins,
		new CopyPlugin( {
			patterns: [
				{ from: 'blocks/free-accordion/style.css',        to: 'blocks/free-accordion/style.css' },
				{ from: 'blocks/free-accordion/editor.css',       to: 'blocks/free-accordion/editor.css' },
				{ from: 'blocks/free-accordion-item/style.css',   to: 'blocks/free-accordion-item/style.css' },
				{ from: 'blocks/free-accordion-item/editor.css',  to: 'blocks/free-accordion-item/editor.css' },
			],
		} ),
	],
};