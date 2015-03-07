FPL = {
	BoiteResultat: null,
	StyleResultat: null,
	BoiteCode: null,
	BoiteFlex: null,
	flexDirection: '',
	justifyContent: '',
	alignItems: '',
	flexWrap: '',
	width: '',
	height: '',
	widthAuto: true,
	heightAuto: true,
	IDTest: 0, // Type de test
			// 1 = flex-direction
			// 2 = 1 + justify-content
			// 3 = 1 + 2 + align-items
			// 4 = 1 + 2+ 3 + flex-wrap
	refIFrame: null, // référence iframe dans la fenêtre parent

	//-----------------------------------------------------
	init: function() {
		var ID = location.search.substring(1, 2);
		this.IDTest = +ID;

		this.refIFrame = window.parent.document.getElementById(location.search.substring(2));

		this.BoiteResultat = document.getElementById('TRUC-resultat');
		this.StyleResultat = this.BoiteResultat.style;
		this.BoiteCode = document.getElementById('TRUC-code');
		this.BoiteFlex = document.getElementById('boite-flex');

		switch (this.IDTest) {
		case 4:
			this.flexWrapChange('nowrap');
		case 3:
			this.alignItemsChange('stretch');
		case 2:
			this.justifyContentChange('flex-start');
		case 1:
			this.flexDirectionChange('row');
		}
				
		this.width = '558px';
		this.height = '120px';
	
		this.widthAutoChange(true);
		this.heightAutoChange(true);
		
		this.resizeParent();
	},

	resizeParent: function() {
		this.refIFrame.style.height = (document.body.clientHeight + 20) + 'px';
	},

	//-----------------------------------------------------
	justifyContentChange: function(val) {
		this.justifyContent = val;
		this.BoiteFlex.style.justifyContent = val;
		this.afficheCode();
	},

	//-----------------------------------------------------
	flexDirectionChange: function(val) {
		this.flexDirection = val;
		this.BoiteFlex.style.flexDirection = val;
		this.afficheCode();
	},

	//-----------------------------------------------------
	alignItemsChange: function(val) {
		this.alignItems = val;
		this.BoiteFlex.style.alignItems = val;
		this.afficheCode();
	},

	//-----------------------------------------------------
	flexWrapChange: function(val) {
		this.flexWrap = val;
		this.BoiteFlex.style.flexWrap = val;
		this.afficheCode();
	},

	//-----------------------------------------------------
	widthChange : function(val) {
		if (this.widthAuto) {
			return;
		}
		this.width = val + 'px';
		this.BoiteFlex.style.width = this.width;
		document.getElementById('TRUC-span-width').innerHTML = this.width;
		this.afficheCode();
	},
	
	widthAutoChange: function(Checked) {
		this.widthAuto = Checked;
		if (this.widthAuto) {
			document.getElementById('param-width').style.display = 'none';
			this.BoiteFlex.style.width = 'auto';
		} else {
			document.getElementById('param-width').style.display = 'block';
			this.widthChange(parseInt(this.width, 10));
		}
		
		this.afficheCode();		
	},

	//-----------------------------------------------------
	heightChange : function(val) {
		this.height = val + 'px';
		this.BoiteFlex.style.height = this.height;
		document.getElementById('TRUC-span-height').innerHTML = this.height;
		this.afficheCode();
	},
	
	heightAutoChange: function(Checked) {
		this.heightAuto = Checked;
		if (this.heightAuto) {
			document.getElementById('param-height').style.display = 'none';
			this.BoiteFlex.style.height = 'auto';
		} else {
			document.getElementById('param-height').style.display = 'block';
			this.heightChange(parseInt(this.height, 10));
		}
		
		this.afficheCode();		
	},
	//-----------------------------------------------------
	afficheCode: function() {
		var H,
			width = (this.widthAuto) ? 'auto' : this.width,
			height = (this.heightAuto) ? 'auto' : this.height;

		H = '#boite-flex {\n' +
				'    display: flex;\t/* modèle boîte flexible */\n' + 
				'    flex-direction: ' + this.flexDirection + ';\t/* direction affichage des items */\n';
		
		if (this.IDTest > 1) {
			H += '    justify-content: ' + this.justifyContent + '; /* aligne items sur axe principal */\n';
		}		
		if (this.IDTest > 2) {
			H += '    align-items: ' + this.alignItems + '; /* aligne items sur axe transversal */\n';
		}
		if (this.IDTest > 3) {
			H += '    flex-wrap: ' + this.alignItems + '; /* 1 ou plusieurs lignes */\n';
		}
						
		H += '    width: ' + width + ';\n' +
			 '    height: ' + height + ';\n' + 
			 '    background: darkturquoise;\n' +
			'}\n';
				
		H += '.item-flex {\n' +
				'    background: paleturquoise;\n' +
				'    margin: 5px;\n' +
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