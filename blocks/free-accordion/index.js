import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, ToggleControl } from '@wordpress/components';
import { useEffect } from '@wordpress/element';
import { registerBlockType } from '@wordpress/blocks';
import metadata from './block.json';

/**
 * Bloc parent : free-accordion/accordion
 *
 * Côté éditeur, ce bloc affiche juste une zone de repère visuel.
 * Il ne rend rien côté front (save retourne null → rendu PHP).
 */
export default function Edit( { attributes, setAttributes, clientId } ) {
	const { label, labelShowAll, labelHideAll, exclusive, animated } = attributes;

	useEffect( () => {
    if ( ! attributes.groupId ) {
        // Génère un ID stable une seule fois à la création
        const uid = 'fa-' + Math.random().toString(36).slice(2,9);
        setAttributes( { groupId: uid } );
    }
    // Pas de dépendance à clientId — on ne régénère jamais
	}, [] );

	const blockProps = useBlockProps( {
		className: 'free-accordion-group-placeholder',
	} );

	return (
		<>
			{ /* Panneau latéral droit */ }
			<InspectorControls>
				<PanelBody
					title={ __( 'Groupe d\'accordéon', 'free-accordion' ) }
					initialOpen={ true }
				>
					<TextControl
						label={ __( 'Étiquette du groupe', 'free-accordion' ) }
						help={ __( 'Pour vous repérer dans l\'éditeur. Non affiché sur le site.', 'free-accordion' ) }
						value={ label }
						onChange={ ( val ) => setAttributes( { label: val } ) }
					/>
					<p className="free-accordion-group-id">
						{ __( 'ID technique : ', 'free-accordion' ) }
						<code>{ clientId }</code>
					</p>
				</PanelBody>

				<PanelBody
					title={ __( 'Boutons tout voir / tout cacher', 'free-accordion' ) }
					initialOpen={ false }
				>
					<TextControl
						label={ __( 'Libellé "Tout voir"', 'free-accordion' ) }
						help={ __( 'Laisser vide pour ne pas afficher le bouton.', 'free-accordion' ) }
						value={ labelShowAll }
						onChange={ ( val ) => setAttributes( { labelShowAll: val } ) }
					/>
					<TextControl
						label={ __( 'Libellé "Tout cacher"', 'free-accordion' ) }
						help={ __( 'Laisser vide pour ne pas afficher le bouton.', 'free-accordion' ) }
						value={ labelHideAll }
						onChange={ ( val ) => setAttributes( { labelHideAll: val } ) }
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Comportement', 'free-accordion' ) }
					initialOpen={ false }
				>
					<ToggleControl
						label={ __( 'Mode exclusif', 'free-accordion' ) }
						help={ exclusive
							? __( 'Ouvrir un item ferme les autres du groupe.', 'free-accordion' )
							: __( 'Plusieurs items peuvent être ouverts simultanément.', 'free-accordion' )
						}
						checked={ exclusive }
						onChange={ ( val ) => setAttributes( { exclusive: val } ) }
					/>
					<ToggleControl
						label={ __( 'Animer l\'ouverture', 'free-accordion' ) }
						help={ animated
							? __( 'Transition CSS activée (effet tiroir).', 'free-accordion' )
							: __( 'Affichage/masquage instantané.', 'free-accordion' )
						}
						checked={ animated }
						onChange={ ( val ) => setAttributes( { animated: val } ) }
					/>
				</PanelBody>
			</InspectorControls>

			{ /* Zone de repère dans l'éditeur */ }
			<div { ...blockProps }>
				<span className="free-accordion-group-badge">
					{ __( '⚙ Accordéon — groupe : ', 'free-accordion' ) }					
					<strong>{ label || attributes.groupId }</strong>
				</span>
				{ ( labelShowAll || labelHideAll ) && (
					<span className="free-accordion-group-buttons-preview">
						{ labelShowAll && <em>{ labelShowAll }</em> }
						{ labelShowAll && labelHideAll && ' / ' }
						{ labelHideAll && <em>{ labelHideAll }</em> }
					</span>
				) }
			</div>
		</>
	);
}

registerBlockType( metadata, { edit: Edit, save: () => null } );
