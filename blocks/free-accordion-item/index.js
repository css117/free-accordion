import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, InnerBlocks } from '@wordpress/block-editor';
import { PanelBody, SelectControl, ToggleControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { registerBlockType } from '@wordpress/blocks';
import metadata from './block.json';

/**
 * Child block: free-accordion/accordion-item
 */

function flattenBlocks( blocks ) {
	return blocks.reduce( ( acc, block ) => {
		acc.push( block );
		if ( block.innerBlocks && block.innerBlocks.length ) {
			acc.push( ...flattenBlocks( block.innerBlocks ) );
		}
		return acc;
	}, [] );
}

function useAccordionGroups() {
	return useSelect( ( select ) => {
		const store = select( 'core/block-editor' );
		const clientIds = store.getBlocksByName( 'free-accordion/accordion' );

		const options = [
			{ label: __( '— No group —', 'free-accordion' ), value: '' },
		];

		clientIds.forEach( ( clientId ) => {
			const block = store.getBlock( clientId );
			if ( ! block || ! block.attributes.groupId ) return;
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
					title={ __( 'Parent group', 'free-accordion' ) }
					initialOpen={ true }
				>
					<SelectControl
						label={ __( 'Attach to accordion', 'free-accordion' ) }
						help={ groupOptions.length <= 1
							? __( 'No "Free Accordion group" block found on this page.', 'free-accordion' )
							: __( 'Choose the group that controls this item.', 'free-accordion' )
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
					title={ __( 'Behavior', 'free-accordion' ) }
					initialOpen={ false }
				>
					<ToggleControl
						label={ __( 'Open by default', 'free-accordion' ) }
						help={ openByDefault
							? __( 'This item is visible on page load.', 'free-accordion' )
							: __( 'This item is hidden on page load.', 'free-accordion' )
						}
						checked={ openByDefault }
						onChange={ ( val ) => setAttributes( { openByDefault: val } ) }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>

				<div className="free-accordion-item-group-badge">
					{ parentGroup
						? <>
							{ __( '↑ Group: ', 'free-accordion' ) }
							<strong>{ parentLabel || __( '(no label)', 'free-accordion' ) }</strong>
						</>
						: <em>{ __( '↑ No group attached', 'free-accordion' ) }</em>
					}
				</div>

				<InnerBlocks
					template={ [
						[ 'core/group', {
							className: 'fa-item__toggler',
							layout: { type: 'default' },
							metadata: { name: __( 'Toggler', 'free-accordion' ) },
						}, [
							[ 'core/paragraph', {} ],
						] ],
						[ 'core/group', {
							className: 'fa-item__content',
							layout: { type: 'default' },
							metadata: { name: __( 'Revealed content', 'free-accordion' ) },
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