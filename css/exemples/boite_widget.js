FPL = {
	BoiteResultat: null,
	StyleResultat: null,
	BoiteCode: null,
	BoiteParent: null,
	StyleDisplay: null,
	marginWidth: [],
	marginColor: '#20C7DE',
	borderWidth: [],
	borderStyle: 'solid',
	borderColor: '#75DDEB',
	borderRadius: '0px',
	paddingWidth: [],
	paddingColor: '#C0F0F6',
	widthDisplay: 300,
	heightDisplay: 0,
	
	ID: 0, // Type de test (border, bordre-radius
	refIFrame: null, // référence iframe dans la fenêtre parent

	//-----------------------------------------------------
	init: function() {
		var i;
		var ID = location.search.substring(1, 2);
		
		this.ID = +ID;

		this.refIFrame = window.parent.document.getElementById(location.search.substring(2));

		this.BoiteResultat = document.getElementById('TRUC-resultat-boite');
		this.StyleResultat = this.BoiteResultat.style;
		this.StyleResultat['background'] = this.paddingColor;
		this.BoiteParent = document.getElementById('TRUC-resultat-parent');
		this.BoiteParent.style['background'] = this.marginColor;
		this.BoiteCode = document.getElementById('TRUC-code');
		this.StyleDisplay = document.getElementById('TRUC-resultat-display').style;
		
		this.makeMargin();
		this.makeBorder();
		this.makePadding();

		for (i = 1; i < 5; i++) {
			this.marginChange(this.marginWidth[i], i);
			this.borderChange(this.paddingWidth[i], i);
			this.paddingChange(this.paddingWidth[i], i);
		}
		this.widthChange(this.widthDisplay);
		this.heightChange(this.heightDisplay);
		
		this.resizeParent();
	},

	resizeParent: function() {
		this.refIFrame.style.height = (document.body.clientHeight + 20) + 'px';
	},

	//-----------------------------------------------------
	makeMargin: function() {
		var i, H, lib = ['', 'top', 'right', 'bottom', 'left'];
		
		this.marginWidth = [10, 10, 10, 10, 10];
		
		H = '<legend style="background: ' + this.marginColor + '">margin</legend>';
		
		for (i = 1; i < 5; i++) {
			H += '<div><label class="TRUC-label1" style="background: ' + this.marginColor + '">'
				+ lib[i] + '</label>'
				+ '<input type="range" min="0" max="30" step="1" '
				+ 'value="' + this.marginWidth[i] + '" '
				+ 'id="TRUC-rng-margin' + i + '" '
				+ 'onchange="FPL.marginChange(this.value, ' + i + ')" '
				+ 'oninput="FPL.marginChange(this.value, ' + i + ')">'
				+ '<span id="TRUC-span-margin' + i + '"></span></div>';
		}
				
		document.getElementById('TRUC-fls-margin').innerHTML = H;
	},

	//-----------------------------------------------------
	makeBorder: function() {
		var i, H, lib = ['', 'top', 'right', 'bottom', 'left'];
		
		this.borderWidth = [10, 10, 10, 10, 10];
		
		H = '<legend style="background: ' + this.borderColor + '">border</legend>';
		
		for (i = 1; i < 5; i++) {
			H += '<div><label class="TRUC-label1" style="background: ' + this.borderColor + '">'
				+ lib[i] + '</label>'
				+ '<input type="range" min="0" max="30" step="1" '
				+ 'value="' + this.borderWidth[i] + '" '
				+ 'id="TRUC-rng-border' + i + '" '
				+ 'onchange="FPL.borderChange(this.value, ' + i + ')" '
				+ 'oninput="FPL.borderChange(this.value, ' + i + ')">'
				+ '<span id="TRUC-span-border' + i + '"></span></div>';
		}
				
		document.getElementById('TRUC-fls-border').innerHTML = H;
	},

	//-----------------------------------------------------
	makePadding: function() {
		var i, H, lib = ['', 'top', 'right', 'bottom', 'left'];
		
		this.paddingWidth = [10, 10, 10, 10, 10];
		
		H = '<legend style="background: ' + this.paddingColor + '">padding</legend>';
		
		for (i = 1; i < 5; i++) {
			H += '<div><label class="TRUC-label1" style="background: ' + this.paddingColor + '">'
				+ lib[i] + '</label>'
				+ '<input type="range" min="0" max="30" step="1" '
				+ 'value="' + this.paddingWidth[i] + '" '
				+ 'id="TRUC-rng-padding' + i + '" '
				+ 'onchange="FPL.paddingChange(this.value, ' + i + ')" '
				+ 'oninput="FPL.paddingChange(this.value, ' + i + ')">'
				+ '<span id="TRUC-span-padding' + i + '"></span></div>';
		}
				
		document.getElementById('TRUC-fls-padding').innerHTML = H;
	},
	
	//-----------------------------------------------------
	marginChange: function(val, Idx) {
		var margin = [ '', 'marginTop', 'marginRight', 
		                  'marginBottom', 'marginLeft' ];
		
		this.marginWidth[Idx] = val;
		document.getElementById('TRUC-span-margin' + Idx).innerHTML = this.marginWidth[Idx] + 'px';
		this.StyleResultat[margin[Idx]] =  this.marginWidth[Idx] + 'px';
		
		this.afficheCode();
	},

	//-----------------------------------------------------
	borderChange: function(val, Idx) {
		var border = [ '', 'borderTopWidth', 'borderRightWidth', 
		                  'borderBottomWidth', 'borderLeftWidth' ];
		                  
		this.borderWidth[Idx] = val;
		document.getElementById('TRUC-span-border' + Idx).innerHTML = this.borderWidth[Idx] + 'px';
		this.StyleResultat[border[Idx]] = this.borderWidth[Idx] + 'px';
		this.StyleResultat['borderColor'] = this.borderColor;
		this.StyleResultat['borderStyle'] = this.borderStyle;
						
		this.afficheCode();
	},

	//-----------------------------------------------------
	paddingChange: function(val, Idx) {
		var padding = [ '', 'paddingTop', 'paddingRight', 
		                  'paddingBottom', 'paddingLeft' ];
		
		this.paddingWidth[Idx] = val;
		document.getElementById('TRUC-span-padding' + Idx).innerHTML = this.paddingWidth[Idx] + 'px';
		this.StyleResultat[padding[Idx]] = this.paddingWidth[Idx] + 'px';
		
		this.afficheCode();
	},

	//-----------------------------------------------------
	widthChange: function(val) {
		this.widthDisplay = val;
		document.getElementById('TRUC-span-width').innerHTML = this.widthDisplay + 'px';
		this.StyleDisplay['width'] = this.widthDisplay + 'px';
		
		this.afficheCode();
	},

	//-----------------------------------------------------
	heightChange: function(val) {
		this.heightDisplay = val;
		if (val == 0) {
			this.heightDisplay = 'auto';
			document.getElementById('TRUC-span-height').innerHTML = this.heightDisplay;
			this.StyleDisplay['height'] = this.heightDisplay;
		} else {
			document.getElementById('TRUC-span-height').innerHTML = this.heightDisplay + 'px';
			this.StyleDisplay['height'] = this.heightDisplay + 'px';
		}
		
		this.afficheCode();
	},
	//-----------------------------------------------------
	afficheCode: function() {
		var H = '';

		H = '#boite {\n' +
			'    margin: ' + this.marginWidth[1] + 'px ' + this.marginWidth[2] + 'px ' +
							this.marginWidth[3] + 'px ' + this.marginWidth[4] + 'px;\n' +
			'    border-width: ' + this.borderWidth[1] + 'px ' + this.borderWidth[2] + 'px ' +
								this.borderWidth[3] + 'px ' + this.borderWidth[4] + 'px;\n' +
			'    border-style: ' + this.borderStyle + ';\n' +
		 	'    border-color: ' + this.borderColor + ';\n' +
		 	'    padding: ' + this.paddingWidth[1] + 'px ' + this.paddingWidth[2] + 'px ' +
							this.paddingWidth[3] + 'px ' + this.paddingWidth[4] + 'px;\n' +
			'    width: ' + this.widthDisplay + 'px;\n';
		
		if (this.heightDisplay != 'auto') {
			H += '    height: ' + this.heightDisplay + 'px;\n';
		}
			
		H += '}';
		
		CodeMirror.runMode(H, 'text/css', this.BoiteCode);
		
		H = 'Dimensions totales : ' 
			+ (this.BoiteParent.clientWidth) + 'px / '
			+ (this.BoiteParent.clientHeight) + 'px';
			
		document.getElementById('TRUC-div-dimensions').innerHTML = H;
	}
};

window.addEventListener(
		'load', 
		function() {
			FPL.init();
		},
		false);