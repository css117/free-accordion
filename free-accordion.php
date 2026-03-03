<?php
/**
 * Plugin Name:       Free Accordion
 * Plugin URI:        https://github.com/css117/free-accordion
 * Description:       Lightweight, freely positioned Gutenberg accordion blocks.
 * Version:           0.1.0
 * Author:            Claude.ai & Giboo.fr
 * License:           GPL-2.0-or-later
 * Text Domain:       free-accordion
 * Domain Path:       /languages
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Recursively flattens an array of parsed blocks.
 * Used in render.php of the child block to retrieve the attributes of the parent group.
 *
 * @param  array $blocks  Retruned table by parse_blocks().
 * @return array
 */
function _fa_flatten_blocks( array $blocks ): array {
	$flat = [];
	foreach ( $blocks as $block ) {
		$flat[] = $block;
		if ( ! empty( $block['innerBlocks'] ) ) {
			$flat = array_merge( $flat, _fa_flatten_blocks( $block['innerBlocks'] ) );
		}
	}
	return $flat;
}

/**
 * Register scripts and blocks.
 */
function free_accordion_register_blocks() {
    register_block_type( __DIR__ . '/blocks/free-accordion' );
    register_block_type( __DIR__ . '/blocks/free-accordion-item' );
}
add_action( 'init', 'free_accordion_register_blocks' );

/**
 * Load language file
 */
add_action( 'init', function() {
    load_plugin_textdomain( 'free-accordion', false, dirname( plugin_basename( __FILE__ ) ) . '/languages' );
} );