<?php
/**
 * Front-end rendering — child block free-accordion/accordion-item
 */

$parent_group = ! empty( $attributes['parentGroup'] )  ? esc_attr( $attributes['parentGroup'] ) : '';
$open_default = ! empty( $attributes['openByDefault'] );

// Retrieves the options from the parent group.
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
			$animated = isset( $b['attrs']['animated'] ) ? (bool) $b['attrs']['animated'] : true;
			$exclusive = ! empty( $b['attrs']['exclusive'] );
			break;
		}
	}
}

// CSS classes.
$classes = [ 'fa-item' ];
if ( $open_default ) $classes[] = 'fa-item--open';
if ( $animated )     $classes[] = 'fa-item--animated';

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
	<?php echo $content; ?>
</div>