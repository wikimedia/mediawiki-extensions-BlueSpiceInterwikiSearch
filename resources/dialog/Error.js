( function( mw, $, bs, d, undefined ){
	bs.interwiki.search.ErrorDialog = function( cfg ) {
		cfg = cfg || {};

		bs.interwiki.search.ErrorDialog.super.call( this, cfg );

		this.targetURL = cfg.targetURL;
		this.suggestLogin = cfg.suggestLogin || false;
		this.error = cfg.error || false;
		this.name = cfg.name;

		this.$element.addClass( 'interwikisearch-error-dialog' );
	};

	OO.inheritClass( bs.interwiki.search.ErrorDialog, OO.ui.Dialog );

	bs.interwiki.search.ErrorDialog.static.name = 'InterwikiSearchErrorDialog';

	bs.interwiki.search.ErrorDialog.prototype.initialize = function () {
		bs.interwiki.search.ErrorDialog.parent.prototype.initialize.call( this );
		this.content = new OO.ui.PanelLayout( { padded: true, expanded: false } );

		this.content.$element.append( new OO.ui.HorizontalLayout( {
			classes: [ 'interwikisearch-error-dialog-layout' ],
			items: [
				new OO.ui.IconWidget( {
					icon: 'alert',
					flags: [ 'destructive' ]
				} ),
				new OO.ui.LabelWidget( {
					label: this.getErrorMessage()
				} )
			]
		} ).$element );
		this.content.$element.append( new OO.ui.LabelWidget( {
			label: this.suggestLogin ?
				mw.message( 'bs-interwikisearch-login-suggestion', this.name ).text() :
				mw.message( 'bs-interwikisearch-redirect-suggestion' ).text()
		} ).$element );
		if ( this.suggestLogin ) {

		}
		var goToTargetButton = new OO.ui.ButtonWidget( {
			label: mw.message( 'bs-interwikisearch-error-go-to-target', this.name ).text(),
			flags: [
				'primary',
				'progressive'
			]
		} );
		goToTargetButton.connect( this,  {
			click: function() {
				window.open( this.targetURL, '_blank' );
			}
		} );
		this.content.$element.append( goToTargetButton.$element );

		this.$body.append( this.content.$element );
	};

	bs.interwiki.search.ErrorDialog.prototype.getBodyHeight = function () {
		return this.content.$element.outerHeight( true );
	};

	bs.interwiki.search.ErrorDialog.prototype.getErrorMessage = function () {
		return this.error !== false ?
			mw.message( "bs-interwikisearch-error-generic-with-message", this.name, this.error ).text() :
			mw.message( "bs-interwikisearch-error-generic", this.name ).text();

	};

} )( mediaWiki, jQuery, blueSpice, document );
