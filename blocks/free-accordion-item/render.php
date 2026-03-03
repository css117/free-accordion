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
$extra_classes = ! empty( $attributes['className'] ) ? $attributes['className'] : '';

$classes = array_filter( [ 
    'fa-item',
    $open_default ? 'fa-item--open' : '',
    $animated ? 'fa-item--animated' : '',
    $extra_classes,
] );

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