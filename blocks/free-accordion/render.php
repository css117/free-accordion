<?php
/**
 * Rendu front-end — bloc parent free-accordion/accordion
 *
 * Ce bloc n'a plus de rendu DOM propre : ses options sont portées
 * directement par chaque bloc fils.
 * Il génère uniquement les boutons tout voir / tout cacher si définis.
 */

$group_id   = ! empty( $attributes['groupId'] )      ? esc_attr( $attributes['groupId'] )     : '';
$label_show = ! empty( $attributes['labelShowAll'] )  ? esc_html( $attributes['labelShowAll'] ) : '';
$label_hide = ! empty( $attributes['labelHideAll'] )  ? esc_html( $attributes['labelHideAll'] ) : '';

// Rien à rendre si pas de boutons.
if ( ! $group_id || ( ! $label_show && ! $label_hide ) ) {
	return;
}

?>
<div class="fa-group-controls" data-fa-controls="<?php echo $group_id; ?>">
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
