( function ( mw, $, bs ) {
	new bs.interwiki.search.InterwikiWidget( {
		$element: $( '#bs-interwiki-search' ),
		sources: mw.config.get( 'bsgInterwikiSearchSources' )
	} );
} )( mediaWiki, jQuery, blueSpice );
