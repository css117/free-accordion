import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, ToggleControl } from '@wordpress/components';
import { useEffect } from '@wordpress/element';
import { registerBlockType } from '@wordpress/blocks';
import metadata from './block.json';

/**
 * Parent block: free-accordion/accordion
 *
 * In the editor, this block displays a visual placeholder only.
 * It renders nothing on the front end (save returns null → PHP render).
 */
function Edit( { attributes, setAttributes, clientId } ) {
	const { label, labelShowAll, labelHideAll, exclusive, animated, globalControl } = attributes;

	// Generates a stable ID once at creation time.
	useEffect( () => {
		if ( ! attributes.groupId ) {
			const uid = 'fa-' + Math.random().toString(36).slice(2, 9);
			setAttributes( { groupId: uid } );
		}
	}, [] );

	const blockProps = useBlockProps( {
		className: 'free-accordion-group-placeholder',
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Free Accordion group', 'free-accordion' ) }
					initialOpen={ true }
				>
					<TextControl
						label={ __( 'Group label', 'free-accordion' ) }
						help={ __( 'For editor use only. Not displayed on the site.', 'free-accordion' ) }
						value={ label }
						onChange={ ( val ) => setAttributes( { label: val } ) }
					/>
					<p className="free-accordion-group-id">
						{ __( 'Technical ID: ', 'free-accordion' ) }
						<code>{ attributes.groupId || clientId }</code>
					</p>
				</PanelBody>

				<PanelBody
					title={ __( 'Show all / Hide all buttons', 'free-accordion' ) }
					initialOpen={ false }
				>
					<TextControl
						label={ __( 'Show all label', 'free-accordion' ) }
						help={ __( 'Leave empty to hide the button.', 'free-accordion' ) }
						value={ labelShowAll }
						onChange={ ( val ) => setAttributes( { labelShowAll: val } ) }
					/>
					<TextControl
						label={ __( 'Hide all label', 'free-accordion' ) }
						help={ __( 'Leave empty to hide the button.', 'free-accordion' ) }
						value={ labelHideAll }
						onChange={ ( val ) => setAttributes( { labelHideAll: val } ) }
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Behavior', 'free-accordion' ) }
					initialOpen={ false }
				>
					<ToggleControl
						label={ __( 'Collapse others', 'free-accordion' ) }
						help={ exclusive
							? __( 'Opening an item collapses the others in the group.', 'free-accordion' )
							: __( 'Multiple items can be open at the same time.', 'free-accordion' )
						}
						checked={ exclusive }
						onChange={ ( val ) => setAttributes( { exclusive: val } ) }
					/>
					<ToggleControl
						label={ __( 'Animate opening', 'free-accordion' ) }
						help={ animated
							? __( 'CSS transition enabled (drawer effect).', 'free-accordion' )
							: __( 'Instant show/hide.', 'free-accordion' )
						}
						checked={ animated }
						onChange={ ( val ) => setAttributes( { animated: val } ) }
					/>
					<ToggleControl
						label={ __( 'Global control', 'free-accordion' ) }
						help={ globalControl
							? __( 'This group controls all accordions on the page.', 'free-accordion' )
							: __( 'This group only controls its own items.', 'free-accordion' )
						}
						checked={ globalControl }
						onChange={ ( val ) => setAttributes( { globalControl: val } ) }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<span className="free-accordion-group-badge">
					{ __( '⚙ Accordion — group: ', 'free-accordion' ) }
					<strong>{ label || attributes.groupId || clientId }</strong>
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