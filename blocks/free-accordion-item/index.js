import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, InnerBlocks } from '@wordpress/block-editor';
import { PanelBody, SelectControl, ToggleControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';

/**
 * Bloc fils : free-accordion/accordion-item
 *
 * Un seul InnerBlocks avec deux core/group verrouillés en structure :
 *  - premier  core/group → zone toggler  (ce qu'on clique)
 *  - second   core/group → zone contenu  (ce qui se révèle)
 *
 * L'utilisateur peut mettre ce qu'il veut dans chaque groupe,
 * mais ne peut pas supprimer ou réorganiser les deux groupes eux-mêmes.
 */

function useAccordionGroups() {
	return useSelect( ( select ) => {
		const { getBlocksByType } = select( 'core/block-editor' );
		const parentBlocks = getBlocksByType( 'free-accordion/accordion' );

		const options = [
			{
				label: __( '— Aucun groupe —', 'free-accordion' ),
				value: '',
			},
		];

		parentBlocks.forEach( ( block ) => {
			const label = block.attributes.label
				? block.attributes.label
				: block.clientId;

			options.push( {
				label,
				value: block.clientId,
			} );
		} );

		return options;
	}, [] );
}

/**
 * Template verrouillé : deux core/group, structure fixe, contenu libre.
 * Le premier = toggler, le second = contenu révélé.
 */
const ITEM_TEMPLATE = [
	[
		'core/group',
		{
			className: 'fa-item__toggler',
			metadata: { name: __( 'Toggler', 'free-accordion' ) },
		},
		[
			[ 'core/paragraph', { placeholder: __( 'Texte du toggler, ou remplacez ce bloc par une image, un titre…', 'free-accordion' ) } ],
		],
	],
	[
		'core/group',
		{
			className: 'fa-item__content',
			metadata: { name: __( 'Contenu révélé', 'free-accordion' ) },
		},
		[
			[ 'core/paragraph', { placeholder: __( 'Contenu qui sera révélé au clic…', 'free-accordion' ) } ],
		],
	],
];

export default function Edit( { attributes, setAttributes } ) {
	const { parentGroup, openByDefault } = attributes;
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
						onChange={ ( val ) => setAttributes( { parentGroup: val } ) }
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

				{ /* Indicateur de groupe dans l'éditeur */ }
				<div className="free-accordion-item-group-badge">
					{ parentGroup
						? <>
							{ __( '↑ Groupe : ', 'free-accordion' ) }
							<strong>
								{ groupOptions.find( o => o.value === parentGroup )?.label || parentGroup }
							</strong>
						</>
						: <em>{ __( '↑ Aucun groupe rattaché', 'free-accordion' ) }</em>
					}
				</div>

				{ /*
				  * templateLock="all" : l'utilisateur ne peut pas
				  * supprimer, déplacer ou ajouter de blocs au niveau
				  * des deux core/group racines.
				  * À l'intérieur de chaque group, tout est libre.
				  */ }
				<InnerBlocks
					template={ ITEM_TEMPLATE }
					templateLock="all"
					__experimentalCaptureToolbars={ true }
				/>

			</div>
		</>
	);
}
