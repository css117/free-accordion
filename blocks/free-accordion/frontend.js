/**
 * free-accordion — JS front-end
 *
 * Responsabilités :
 *  - ouvrir / fermer un item au clic sur son toggler
 *  - en mode exclusif, fermer les items frères du même groupe
 *  - gérer les boutons "tout voir" / "tout cacher"
 *  - mettre à jour les attributs ARIA
 *
 * Aucune dépendance. Vanilla JS pur.
 */

( function () {
	'use strict';

	// -----------------------------------------------------------------------
	// Helpers
	// -----------------------------------------------------------------------

	/**
	 * Lit les options du groupe directement sur l'item.
	 *
	 * @param  {Element} item
	 * @returns {{ exclusive: boolean, animated: boolean }}
	 */
	function getGroupOptions( item ) {
		return {
			exclusive : item.dataset.faExclusive === 'true',
			animated  : item.dataset.faAnimated  === 'true',
		};
	}

	/**
	 * Retourne tous les items frères d'un item (même groupe, exclu lui-même).
	 *
	 * @param  {Element} item
	 * @returns {Element[]}
	 */
	function getSiblings( item ) {
		const groupId = item.dataset.faParent;
		if ( ! groupId ) return [];
		return Array.from(
			document.querySelectorAll( '[data-fa-item][data-fa-parent="' + groupId + '"]' )
		).filter( ( el ) => el !== item );
	}

	// -----------------------------------------------------------------------
	// Ouvrir / fermer
	// -----------------------------------------------------------------------

	function openItem( item ) {
		item.classList.add( 'fa-item--open' );
		const toggler = item.querySelector( '.fa-item__toggler' );
		const content = item.querySelector( '.fa-item__content' );
		if ( toggler ) toggler.setAttribute( 'aria-expanded', 'true' );
		if ( content ) content.removeAttribute( 'aria-hidden' );
	}

	function closeItem( item ) {
		item.classList.remove( 'fa-item--open' );
		const toggler = item.querySelector( '.fa-item__toggler' );
		const content = item.querySelector( '.fa-item__content' );
		if ( toggler ) toggler.setAttribute( 'aria-expanded', 'false' );
		if ( content ) content.setAttribute( 'aria-hidden', 'true' );
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
