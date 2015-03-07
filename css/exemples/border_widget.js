FPL = {
	BoiteResultat: null,
	StyleResultat: null,
	BoiteCode: null,
	borderWidth: '',
	borderStyle: '',
	borderColor: '',
	borderRadius: [ 15, 15, 15, 15, 15 ],
	tous: true,
	ID: 0, // Type de test (border, bordre-radius
	refIFrame: null, // référence iframe dans la fenêtre parent

	//-----------------------------------------------------
	// ID = 1 : border
	// ID = 2 : border-radius
	init : function() {
		var H = '', i, ID;

		ID = location.search.substring(1, 2);
		this.ID = +ID;

		this.refIFrame = window.parent.document.getElementById(location.search.substring(2));

		if (this.ID == 2) {
			this.makeChoixRadius();
			document.getElementById('TRUC-radius-tous').innerHTML = this.makeRangeRadius(0);
			for (i = 1; i < 5; i++) {
				H += this.makeRangeRadius(i);
			}
			document.getElementById('TRUC-radius-indiv').innerHTML = H;
		}

		this.BoiteResultat = document.getElementById('TRUC-resultat-boite');
		this.StyleResultat = this.BoiteResultat.style;
		this.BoiteCode = document.getElementById('TRUC-code');

		if (this.ID == 2) {
			this.borderRadiusChange(15, 0);
		}

		this.borderWidthChange(document.getElementById('TRUC-rng-border-width').value);
		this.borderStyleChange('solid');
		this.borderColorChange(document.getElementById('TRUC-sel-border-color').value);

		this.resizeParent();
	},

	resizeParent : function() {
		this.refIFrame.style.height = (document.body.clientHeight + 20) + 'px';
	},

	//-----------------------------------------------------
	makeChoixRadius : function() {
		var H = '<label class="TRUC-label2">'
				+ '<input type="radio" name="TRUC-rad-tous" value="0" checked onclick="FPL.typeRadiusChange(this.value)">'
				+ 'Tous les coins identiques</label>'
				+ '<label class="TRUC-label2">'
				+ '<input type="radio" name="TRUC-rad-tous" onclick="FPL.typeRadiusChange(this.value)" value="1">'
				+ 'Coins individuels</label>';

		document.getElementById('TRUC-radius-choix').innerHTML = H;
	},

	//-----------------------------------------------------
	makeRangeRadius : function(Idx) {
		var H;

		if (Idx == 0) {
			H = '<div><label class="TRUC-label1">radius</label> ';
		} else if (Idx == 1) {
			H = '<div><label class="TRUC-label1">top-left</label> ';
		} else if (Idx == 2) {
			H = '<div><label class="TRUC-label1">top-right</label> ';	
		} else if (Idx == 3) {
			H = '<div><label class="TRUC-label1">bottom-right</label> ';
		} else if (Idx == 4) {
			H = '<div><label class="TRUC-label1">bottom-left</label> ';
		}
		
		H += '<input type="range" min="0" max="50"	step="1" value="'
				+ this.borderRadius[Idx] + '" id="TRUC-rng-border-radius' + Idx + '" '
				+ ' onchange="FPL.borderRadiusChange(this.value, ' + Idx + ')" '
				+ 'oninput="FPL.borderRadiusChange(this.value, ' + Idx + ')"> '
				+ '<span id="TRUC-span-border-radius' + Idx + '"></span></div>';

		return H;
	},

	//-----------------------------------------------------
	typeRadiusChange : function(val) {
		this.tous = (val == 0);

		if (this.tous) {
			document.getElementById('TRUC-radius-indiv').style.display = 'none';
			document.getElementById('TRUC-radius-tous').style.display = 'block';
			this.borderRadius[0] = this.borderRadius[1];
			this.borderRadiusChange(this.borderRadius[0], 0);
		} else {
			document.getElementById('TRUC-radius-tous').style.display = 'none';
			document.getElementById('TRUC-radius-indiv').style.display = 'block';
		}

		this.resizeParent();
	},

	//-----------------------------------------------------
	borderRadiusChange : function(val, Idx) {
		var i, radius = [ '', 'borderTopLeftRadius', 'borderTopRightRadius', 
		                  'borderBottomRightRadius', 'borderBottomLeftRadius' ];

		this.borderRadius[Idx] = val;
		document.getElementById('TRUC-span-border-radius' + Idx).innerHTML = val + 'px';

		if (!this.tous) {
			this.StyleResultat[radius[Idx]] = this.borderRadius[Idx] + 'px';
		} else {
			this.borderRadius = [ val, val, val, val, val ];
			for (i = 1; i < 5; i++) {
				this.StyleResultat[radius[i]] = this.borderRadius[i] + 'px';
				document.getElementById('TRUC-span-border-radius' + i).innerHTML = this.borderRadius[i] + 'px';
				document.getElementById('TRUC-rng-border-radius' + i).value = this.borderRadius[i];
			}
		}

		this.afficheCode();
	},

	//-----------------------------------------------------
	borderWidthChange : function(val) {
		this.borderWidth = val + 'px';
		this.StyleResultat.borderWidth = this.borderWidth;
		document.getElementById('TRUC-span-width').innerHTML = this.borderWidth;
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
			'    border-width: ' + this.borderWidth + ';\n' + 
			'    border-style: ' + this.borderStyle + ';\n' + 
			'    border-color: ' + this.borderColor + ';\n' +
			'\n    /* Raccourci équivalent */\n' + 
			'    border: ' + this.borderWidth + ' ' + this.borderStyle + ' ' + this.borderColor + ';\n';

		if (this.ID > 1) {
			H += '\n    border-top-left-radius: ' + this.borderRadius[1] + 'px;\n' + 
				'    border-top-right-radius: ' + this.borderRadius[2] + 'px;\n' + 
				'    border-bottom-right-radius: ' + this.borderRadius[3] + 'px;\n' + 
				'    border-bottom-left-radius: ' + this.borderRadius[4] + 'px;\n' +
				'\n    /* Raccourci équivalent */\n' +
				'    border-radius: ' + this.borderRadius[1] + 'px ' + this.borderRadius[2] + 'px '	+ 
										this.borderRadius[3] + 'px ' + this.borderRadius[4] + 'px;\n';
		}

		H += '}';
		
		CodeMirror.runMode(H, 'text/css', this.BoiteCode);
	}
};

window.addEventListener(
		'load', 
		function() { 
			FPL.init();
		},
		false);