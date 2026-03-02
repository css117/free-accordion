/**
 * free-accordion — JS front-end
 *
 * Responsabilités :
 *  - ouvrir / fermer un item au clic sur son toggler
 *  - en mode exclusif, fermer les items frères du même groupe
 *  - gérer les boutons "tout voir" / "tout cacher"
 *  - mettre à jour les attributs ARIA
 *  - afficher un seul bouton de contrôle à la fois (tout voir OU tout cacher)
 *
 * Aucune dépendance. Vanilla JS pur.
 */

( function () {
	'use strict';

	// -----------------------------------------------------------------------
	// Helpers
	// -----------------------------------------------------------------------

	function getGroupOptions( item ) {
		return {
			exclusive : item.dataset.faExclusive === 'true',
			animated  : item.dataset.faAnimated  === 'true',
		};
	}

	function getSiblings( item ) {
		const groupId = item.dataset.faParent;
		if ( ! groupId ) return [];
		return Array.from(
			document.querySelectorAll( '[data-fa-item][data-fa-parent="' + groupId + '"]' )
		).filter( ( el ) => el !== item );
	}

	/**
	 * Met à jour la visibilité des boutons tout voir / tout cacher.
	 * Affiche "tout voir" si au moins un item est fermé, sinon "tout cacher".
	 */
	function updateControls( groupId ) {
		if ( ! groupId ) return;
		const controls = document.querySelector( '[data-fa-controls="' + groupId + '"]' );
		if ( ! controls ) return;

		const items = Array.from(
			document.querySelectorAll( '[data-fa-item][data-fa-parent="' + groupId + '"]' )
		);
		const allOpen = items.length > 0 && items.every( i => i.classList.contains( 'fa-item--open' ) );

		const btnShow = controls.querySelector( '.fa-btn-show-all' );
		const btnHide = controls.querySelector( '.fa-btn-hide-all' );

		if ( btnShow ) btnShow.classList.toggle( 'fa-btn--hidden', allOpen );
		if ( btnHide ) btnHide.classList.toggle( 'fa-btn--hidden', ! allOpen );
	}

	// -----------------------------------------------------------------------
	// Ouvrir / fermer
	// -----------------------------------------------------------------------

	function openItem( item ) {
		item.classList.remove( 'fa-item--closing' );
		item.classList.add( 'fa-item--open' );
		const toggler = item.querySelector( '.fa-item__toggler' );
		const content = item.querySelector( '.fa-item__content' );
		if ( toggler ) toggler.setAttribute( 'aria-expanded', 'true' );
		if ( content ) content.removeAttribute( 'aria-hidden' );
		updateControls( item.dataset.faParent );
	}

	function closeItem( item ) {
		if ( ! item.classList.contains( 'fa-item--open' ) ) return; // déjà fermé
		item.classList.remove( 'fa-item--open' );
		const animated = item.dataset.faAnimated === 'true';
		const content  = item.querySelector( '.fa-item__content' );
		const toggler  = item.querySelector( '.fa-item__toggler' );
		if ( toggler ) toggler.setAttribute( 'aria-expanded', 'false' );
		if ( animated ) {
			item.classList.add( 'fa-item--closing' );
			content.addEventListener( 'animationend', function handler() {
				item.classList.remove( 'fa-item--closing' );
				content.removeEventListener( 'animationend', handler );
			} );
		}
		if ( content ) content.setAttribute( 'aria-hidden', 'true' );
		updateControls( item.dataset.faParent );
	}

	function toggleItem( item ) {
		const opts   = getGroupOptions( item );
		const isOpen = item.classList.contains( 'fa-item--open' );

		if ( opts.exclusive && ! isOpen ) {
			getSiblings( item ).forEach( closeItem );
		}

		if ( isOpen ) {
			closeItem( item );
		} else {
			openItem( item );
		}
	}

	// -----------------------------------------------------------------------
	// Tout voir / tout cacher
	// -----------------------------------------------------------------------

	function showAll( groupId ) {
		document
			.querySelectorAll( '[data-fa-item][data-fa-parent="' + groupId + '"]' )
			.forEach( openItem );
	}

	function hideAll( groupId ) {
		document
			.querySelectorAll( '[data-fa-item][data-fa-parent="' + groupId + '"]' )
			.forEach( closeItem );
	}

	// -----------------------------------------------------------------------
	// Initialisation — état des boutons au chargement
	// -----------------------------------------------------------------------

	document.querySelectorAll( '[data-fa-controls]' ).forEach( function ( controls ) {
		updateControls( controls.dataset.faControls );
	} );

	// -----------------------------------------------------------------------
	// Délégation d'événements — un seul listener sur document
	// -----------------------------------------------------------------------

	document.addEventListener( 'click', function ( e ) {

		// Clic sur un toggler d'item
		const toggler = e.target.closest( '.fa-item__toggler' );
		if ( toggler ) {
			const item = toggler.closest( '[data-fa-item]' );
			if ( item ) toggleItem( item );
			return;
		}

		// Clic sur "tout voir"
		const btnShow = e.target.closest( '.fa-btn-show-all' );
		if ( btnShow ) {
			const controls = btnShow.closest( '[data-fa-controls]' );
			if ( controls ) showAll( controls.dataset.faControls );
			return;
		}

		// Clic sur "tout cacher"
		const btnHide = e.target.closest( '.fa-btn-hide-all' );
		if ( btnHide ) {
			const controls = btnHide.closest( '[data-fa-controls]' );
			if ( controls ) hideAll( controls.dataset.faControls );
			return;
		}
	} );

	// Accessibilité clavier : Enter et Espace sur les togglers
	document.addEventListener( 'keydown', function ( e ) {
		if ( e.key !== 'Enter' && e.key !== ' ' ) return;
		const toggler = e.target.closest( '.fa-item__toggler' );
		if ( toggler ) {
			e.preventDefault();
			const item = toggler.closest( '[data-fa-item]' );
			if ( item ) toggleItem( item );
		}
	} );

} )();