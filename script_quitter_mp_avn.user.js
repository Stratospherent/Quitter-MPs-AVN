// ==UserScript==
// @name         Bouton quitter MP AVN
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description
// @author       Stratosphere
// @match        https://avenoel.org/*
// @grant        none
// ==/UserScript==

(function() {
		'use strict';
		var $ = window.jQuery;
		var path = window.location.pathname;

		// Interface sur la page des MPs //
		if (path.startsWith('/messagerie'))
 		{
			// Ajout du bouton "Quitter le MP" sur chaque MP dans la liste des MPs //
			$( ".table" ).last().children().first().children().append( "<th></th>" );
			$( ".table" ).last().children().last().children().each(function( i ) {
				var html = '<td>'
					+    '<input class="btn-quitter-mp" type="image" src="/images/topic/delete.png" title="Quitter le MP" alt="Icône suppression" height="16">'
					+  '</td>';
				$( this ).append( html );
			});

			$( '.btn-quitter-mp' ).click(async function() {
				if (confirm( 'Voulez-vous vraiment quitter ce MP ?' )) {

					// Extraction du numéro de MP //
					var id_mp = /https:\/\/avenoel\.org\/messagerie\/([0-9]+)/.exec($( this ).parent().parent().children().children().first().attr( "href" ))[1];
					// Quitter le MP //
					await quitterMP( id_mp );
					location.reload();
			    }
			});

			async function quitterMP( id_mp ) {
				console.log( 'MP quitté' );
				const url = 'https://avenoel.org/messagerie/' + id_mp + '-1-';
				const rawText = await fetch(url).then( res => res.text() );
				const doc = new DOMParser().parseFromString( rawText, 'text/html' );

				const form = doc.querySelector( 'form' );
				await fetch( form.action, {
					method: 'POST',
					body: new FormData(form)
				})
			}
	 	}
})();
