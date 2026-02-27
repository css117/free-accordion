<?php
/**
 * Rendu front-end — bloc fils free-accordion/accordion-item
 */

$parent_group = ! empty( $attributes['parentGroup'] )  ? esc_attr( $attributes['parentGroup'] ) : '';
$open_default = ! empty( $attributes['openByDefault'] );

// Récupère les options du groupe parent.
$animated  = false;
$exclusive = false;

if ( $parent_group ) {
	$blocks = _fa_flatten_blocks( parse_blocks( get_the_content( null, false ) ) );

	foreach ( $blocks as $b ) {
		if (
			'free-accordion/accordion' === $b['blockName'] &&
			! empty( $b['attrs']['groupId'] ) &&
			$b['attrs']['groupId'] === $parent_group
		) {
			$animated  = ! empty( $b['attrs']['animated'] );
			$exclusive = ! empty( $b['attrs']['exclusive'] );
			break;
		}
	}
}

// Classes CSS
$classes = [ 'fa-item' ];
if ( $open_default ) $classes[] = 'fa-item--open';
if ( $animated )     $classes[] = 'fa-item--animated';

// Rendu des deux zones InnerBlocks
$toggler_html = '';
$content_html = '';
$i = 0;
foreach ( $block->inner_blocks as $inner ) {
	$rendered = ( new WP_Block( $inner->parsed_block ) )->render();
	if ( 0 === $i ) {
		$toggler_html = $rendered;
	} else {
		$content_html = $rendered;
	}
	$i++;
}

?>
<div
	class="<?php echo esc_attr( implode( ' ', $classes ) ); ?>"
	data-fa-item
	<?php if ( $parent_group ) : ?>
		data-fa-parent="<?php echo $parent_group; ?>"
		data-fa-exclusive="<?php echo $exclusive ? 'true' : 'false'; ?>"
		data-fa-animated="<?php echo $animated ? 'true' : 'false'; ?>"
	<?php endif; ?>
>
	<div class="fa-item__toggler" role="button" tabindex="0" aria-expanded="<?php echo $open_default ? 'true' : 'false'; ?>">
		<?php echo $toggler_html; ?>
	</div>
	<div class="fa-item__content"<?php if ( ! $open_default ) echo ' aria-hidden="true"'; ?>>
		<?php echo $content_html; ?>
	</div>
</div>
