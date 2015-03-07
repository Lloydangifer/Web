FPL = {
	BoiteResultat : null,
	StyleResultat : null,
	BoiteCode : null,
	fontSize : '',
	weight : false,
	align : 'left',
	color : '',
	backgroundColor : '',
	horiz : '',
	vertic : '',
	adouci : '',
	renfort : '',
	couleurOmbre : '',
	boxShadow : '',
	borderWidth: '',
	borderStyle: '',
	borderColor: '',
	borderRadius: [ 15, 15, 15, 15, 15 ],
	ID : 0, // 1 : ombre externe / 2 : ombre interne
	refIFrame : null, // référence iframe dans la fenêtre parent

	//-----------------------------------------------------
	init : function() {
		var H = '', i, ID;

		ID = location.search.substring(1, 2);
		this.ID = +ID;

		this.refIFrame = window.parent.document.getElementById(location.search.substring(2));

		this.BoiteResultat = document.getElementById('TRUC-resultat');
		this.StyleResultat = this.BoiteResultat.style;
		this.BoiteCode = document.getElementById('TRUC-code');

		this.horizChange(document.getElementById('TRUC-rng-horiz').value);
		this.verticChange(document.getElementById('TRUC-rng-vertic').value);
		this.adouciChange(document.getElementById('TRUC-rng-adouci').value);
		this.renfortChange(document.getElementById('TRUC-rng-renfort').value);
		this.couleurOmbreChange(document.getElementById('TRUC-sel-couleur-ombre').value);

		this.borderRadiusChange(15, 0);
		this.borderWidthChange(document.getElementById('TRUC-rng-border-width').value);
		this.borderStyleChange('solid');
		this.borderColorChange(document.getElementById('TRUC-sel-border-color').value);

		this.resizeParent();
	},

	resizeParent : function() {
		this.refIFrame.style.height = (document.body.clientHeight + 20)+ 'px';
	},

	//-----------------------------------------------------
	horizChange : function(val) {
		this.horiz = (val == 0) ? '0' : val + 'px';
		document.getElementById('TRUC-span-horiz').innerHTML = this.horiz;
		this.ombreChange();
	},

	//-----------------------------------------------------
	verticChange : function(val) {
		this.vertic = (val == 0) ? '0' : val + 'px';
		document.getElementById('TRUC-span-vertic').innerHTML = this.vertic;
		this.ombreChange();
	},

	//-----------------------------------------------------
	adouciChange : function(val) {
		this.adouci = (val == 0) ? '0' : val + 'px';
		document.getElementById('TRUC-span-adouci').innerHTML = this.adouci;
		this.ombreChange();
	},

	//-----------------------------------------------------
	renfortChange : function(val) {
		this.renfort = (val == 0) ? '0' : val + 'px';
		document.getElementById('TRUC-span-renfort').innerHTML = this.renfort;
		this.ombreChange();
	},

	//-----------------------------------------------------
	couleurOmbreChange : function(color) {
		this.couleurOmbre = '#' + color;
		this.ombreChange();
	},

	//-----------------------------------------------------
	ombreChange : function() {
		this.boxShadow = this.horiz + ' ' + this.vertic + ' ' + this.adouci + 
							' ' + this.renfort + ' ' + this.couleurOmbre;
		
		if (this.ID == 2) {
			this.boxShadow += ' inset';
		}
		
		this.StyleResultat.boxShadow = this.boxShadow;

		this.afficheCode();
	},

	//-----------------------------------------------------
	borderRadiusChange : function(val, Idx) {
		var i, radius = [ '', 'borderTopLeftRadius', 'borderTopRightRadius', 
		                  'borderBottomRightRadius', 'borderBottomLeftRadius' ];

		this.tous = true;
		
		this.borderRadius[Idx] = val;
		document.getElementById('TRUC-span-border-radius' + Idx).innerHTML = val + 'px';

		if (!this.tous) {
			this.StyleResultat[radius[Idx]] = this.borderRadius[Idx] + 'px';
		} else {
			this.borderRadius = [ val, val, val, val, val ];
			for (i = 1; i < 5; i++) {
				this.StyleResultat[radius[i]] = this.borderRadius[i] + 'px';
			}
		}

		this.afficheCode();
	},

	//-----------------------------------------------------
	borderWidthChange : function(val) {
		this.borderWidth = val + 'px';
		this.StyleResultat.borderWidth = this.borderWidth;
		document.getElementById('TRUC-span-border-width').innerHTML = this.borderWidth;
		this.afficheCode();
	},

	borderStyleChange : function(val) {
		this.borderStyle = val;
		this.StyleResultat.borderStyle = val;
		this.afficheCode();
	},

	//-----------------------------------------------------
	borderColorChange : function(color) {
		this.borderColor = '#' + color;
		this.StyleResultat.borderColor = this.borderColor;
		this.afficheCode();
	},
	
	//-----------------------------------------------------
	afficheCode : function() {
		var H = '';

		H = '#boite {\n' +
			'    box-shadow: ' + this.boxShadow + ';\n\n' +
			'    border: ' + this.borderWidth + ' ' + this.borderStyle + ' ' + this.borderColor + ';\n' +
			'    border-radius: ' + this.borderRadius[0] + 'px;\n' +
			'}';

		CodeMirror.runMode(H, 'text/css', this.BoiteCode);
		
		this.resizeParent();
	}
};

window.addEventListener(
		'load', 
		function() {
			FPL.init();
		},
		false);