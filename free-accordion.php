<?php
/**
 * Plugin Name:       Free Accordion
 * Plugin URI:        https://github.com/your-repo/free-accordion
 * Description:       Blocs Gutenberg d'accordéon légers et librement placés dans la page.
 * Version:           0.1.0
 * Author:            Claude & Giboo.fr
 * License:           GPL-2.0-or-later
 * Text Domain:       free-accordion
 * Domain Path:       /languages
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Aplatit récursivement un tableau de blocs parsés.
 * Utilisé dans render.php du bloc fils pour retrouver les attributs du groupe parent.
 *
 * @param  array $blocks  Tableau retourné par parse_blocks().
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
 * Enregistrement des blocs au chargement de WordPress.
 */
function free_accordion_register_blocks() {
	register_block_type( __DIR__ . '/blocks/free-accordion' );
	register_block_type( __DIR__ . '/blocks/free-accordion-item' );
}
add_action( 'init', 'free_accordion_register_blocks' );
