import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, InnerBlocks } from '@wordpress/block-editor';
import { PanelBody, SelectControl, ToggleControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { registerBlockType } from '@wordpress/blocks';
import metadata from './block.json';

/**
 * Bloc fils : free-accordion/accordion-item
 *
 * Un seul InnerBlocks libre — l'utilisateur y met ce qu'il veut.
 * Le lien avec le groupe parent se fait via parentGroup (clientId du bloc parent).
 */

function useAccordionGroups() {
	return useSelect( ( select ) => {
		const store = select( 'core/block-editor' );
		const parentBlocks = store.getBlocks().filter(
			b => b.name === 'free-accordion/accordion'
		);

		const options = [
			{ label: __( '— Aucun groupe —', 'free-accordion' ), value: '' },
		];
		
		parentBlocks.forEach( ( block ) => {
			const label = block.attributes.label
				? block.attributes.label
				: block.attributes.groupId;
			options.push( { label, value: block.attributes.groupId } );
		} );

		return options;
	}, [] );
}

function Edit( { attributes, setAttributes } ) {
	const { parentGroup, parentLabel, openByDefault } = attributes;
	const groupOptions = useAccordionGroups();

	const blockProps = useBlockProps( {
		className: 'free-accordion-item-editor',
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Groupe parent', 'free-accordion' ) }
					initialOpen={ true }
				>
					<SelectControl
						label={ __( 'Rattacher à l\'accordéon', 'free-accordion' ) }
						help={ groupOptions.length <= 1
							? __( 'Aucun bloc "Accordéon (groupe)" trouvé sur cette page.', 'free-accordion' )
							: __( 'Choisissez le groupe qui contrôle cet item.', 'free-accordion' )
						}
						value={ parentGroup }
						options={ groupOptions }
						onChange={ ( val ) => {
							const selected = groupOptions.find( o => o.value === val );
							setAttributes( {
								parentGroup: val,
								parentLabel: selected ? selected.label : '',
							} );
						} }
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Comportement', 'free-accordion' ) }
					initialOpen={ false }
				>
					<ToggleControl
						label={ __( 'Ouvert par défaut', 'free-accordion' ) }
						help={ openByDefault
							? __( 'Cet item est visible au chargement de la page.', 'free-accordion' )
							: __( 'Cet item est masqué au chargement de la page.', 'free-accordion' )
						}
						checked={ openByDefault }
						onChange={ ( val ) => setAttributes( { openByDefault: val } ) }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>

				{ /* Badge groupe */ }
				<div className="free-accordion-item-group-badge">
					{ parentGroup
						? <>
							{ __( '↑ Groupe : ', 'free-accordion' ) }
							<strong>{ parentLabel || __( '(sans étiquette)', 'free-accordion' ) }</strong>
						</>
						: <em>{ __( '↑ Aucun groupe rattaché', 'free-accordion' ) }</em>
					}
				</div>

				<InnerBlocks
					template={ [
						[ 'core/group', { 
							className: 'fa-item__toggler',
							layout: { type: 'default' },							
							metadata: { name: __( 'Toggler', 'free-accordion' )},
						}, [
							[ 'core/paragraph', {} ],
						] ],
						[ 'core/group', { 
							className: 'fa-item__content',
							layout: { type: 'default' },							
							metadata: { name: __( 'Contenu révélé', 'free-accordion' ) },
						}, [
							[ 'core/paragraph', {} ],
						] ],
					] }					
					templateLock={ false }
					__experimentalCaptureToolbars={ true }
				/>

			</div>
		</>
	);
}

registerBlockType( metadata, {
	edit: Edit,
	save: () => <InnerBlocks.Content />,
} );