FPL = {
	BoiteResultat: null,
	StyleResultat: null,
	BoiteCode: null,
	fontSize: '',
	weight: false,
	align: 'left',
	color: '',
	backgroundColor: '',
	horiz: '',
	vertic: '',
	adouci: '',
	couleurOmbre: '',
	textShadow: '',
	ID: 0, // Type de test - inutilisé
	refIFrame: null, // référence iframe dans la fenêtre parent

	//-----------------------------------------------------
	init: function() {
		var H = '', i, ID;

		ID = location.search.substring(1, 2);
		this.ID = +ID;

		this.refIFrame = window.parent.document.getElementById(location.search.substring(2));

		this.BoiteResultat = document.getElementById('TRUC-resultat');
		this.StyleResultat = this.BoiteResultat.style;
		this.BoiteCode = document.getElementById('TRUC-code');

		this.fontChange(document.getElementById('TRUC-rng-font').value);
		this.colorChange(document.getElementById('TRUC-sel-color').value);
		this.backgroundColorChange(document.getElementById('TRUC-sel-background-color').value);
		this.horizChange(document.getElementById('TRUC-rng-horiz').value);
		this.verticChange(document.getElementById('TRUC-rng-vertic').value);
		this.adouciChange(document.getElementById('TRUC-rng-adouci').value);
		this.couleurOmbreChange(document.getElementById('TRUC-sel-couleur-ombre').value);

		this.resizeParent();
	},

	resizeParent: function() {
		this.refIFrame.style.height = (document.body.clientHeight + 20) + 'px';
	},

	//-----------------------------------------------------
	fontChange: function(val) {
		this.fontSize = val + 'px';
		this.StyleResultat.fontSize = this.fontSize;
		document.getElementById('label-font-size').innerHTML = 'font-size: ' + this.fontSize;
		this.afficheCode();
	},

	//-----------------------------------------------------
	weightChange: function(checked) {
		this.weight = checked;
		if (this.weight) {
			this.StyleResultat.fontWeight = 'bold';
		} else {
			this.StyleResultat.fontWeight = 'normal';
		}

		this.afficheCode();
	},
	
	//-----------------------------------------------------
	alignChange : function(val) {
		this.align = val;
		this.StyleResultat.textAlign = this.align;
		this.afficheCode();
	},
	
	//-----------------------------------------------------
	colorChange : function(color) {
		this.color = '#' + color;
		this.StyleResultat.color = this.color;
		this.afficheCode();
	},

	//-----------------------------------------------------
	backgroundColorChange : function(color) {
		this.backgroundColor = '#' + color;
		this.StyleResultat.backgroundColor = this.backgroundColor;
		this.afficheCode();
	},

	//-----------------------------------------------------
	horizChange: function(val) {
		this.horiz = (val == 0) ? '0' : val + 'px';	
		document.getElementById('TRUC-span-horiz').innerHTML = this.horiz;
		this.ombreChange();
	},
	
	//-----------------------------------------------------
	verticChange: function(val) {
		this.vertic = (val == 0) ? '0' : val + 'px';	
		document.getElementById('TRUC-span-vertic').innerHTML = this.vertic;
		this.ombreChange();
	},
	
	//-----------------------------------------------------
	adouciChange: function(val) {
		this.adouci = (val == 0) ? '0' : val + 'px';	
		document.getElementById('TRUC-span-adouci').innerHTML = this.adouci;
		this.ombreChange();
	},
	
	//-----------------------------------------------------
	couleurOmbreChange : function(color) {
		this.couleurOmbre = '#' + color;
		this.ombreChange();
	},

	//-----------------------------------------------------
	ombreChange: function() {			
		this.textShadow = this.horiz + ' ' + this.vertic + ' ' + 
							this.adouci + ' ' + this.couleurOmbre;	
		this.StyleResultat.textShadow = this.textShadow;
		
		this.afficheCode();
	},

	//-----------------------------------------------------
	afficheCode: function() {
		var H = '#texte {\n' +
				'    text-shadow: ' + this.textShadow + ';\n' +
				'    font-size: ' + this.fontSize + ';\n';
		
		if (this.weight) {
			H += '    font-weight: bold;\n';
		}
		
		if (this.align != 'left') {
			H += '    text-align: ' + this.align + ';\n';
		}
		
		H += '    color: ' + this.color + ';\n';
		
		H += '}';
		
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
