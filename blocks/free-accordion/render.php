<?php
/**
 * Front-end rendering — parent block free-accordion/accordion
 *
 * This block no longer has its own DOM rendering: its options are carried
 * directly by each child block.
 * It only generates the show all / hide all buttons if defined.
 */

$group_id   = ! empty( $attributes['groupId'] )      ? esc_attr( $attributes['groupId'] )     : '';
$label_show = ! empty( $attributes['labelShowAll'] )  ? esc_html( $attributes['labelShowAll'] ) : '';
$label_hide = ! empty( $attributes['labelHideAll'] )  ? esc_html( $attributes['labelHideAll'] ) : '';

// Nothing to return if there are no buttons.
if ( ! $group_id || ( ! $label_show && ! $label_hide ) ) {
	return;
}

?>
<div class="fa-group-controls" data-fa-controls="<?php echo $group_id; ?>"
    <?php if ( ! empty( $attributes['globalControl'] ) ) : ?>
        data-fa-global="true"
    <?php endif; ?>
>
	<?php if ( $label_show ) : ?>
		<button type="button" class="fa-btn-show-all">
			<?php echo $label_show; ?>
		</button>
	<?php endif; ?>
	<?php if ( $label_hide ) : ?>
		<button type="button" class="fa-btn-hide-all">
			<?php echo $label_hide; ?>
		</button>
	<?php endif; ?>
</div>
