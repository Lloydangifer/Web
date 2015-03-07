FPL = {
	BoiteResultat : null,
	StyleResultat : null,
	BoiteCode : null,
	listeType : '',
	ID : 0, // Type de test (border, bordre-radius
	refIFrame : null, // référence iframe dans la fenêtre parent

	//-----------------------------------------------------
	init : function() {
		var H = '', i, ID;

		ID = location.search.substring(1, 2);
		this.ID = +ID;

		this.refIFrame = window.parent.document.getElementById(location.search.substring(2));
		this.BoiteResultat = document.getElementById('TRUC-resultat-boite');
		this.StyleResultat = this.BoiteResultat.style;
		this.BoiteCode = document.getElementById('TRUC-code');

		this.listeTypeChange('disc');
		
		this.resizeParent();
	},

	resizeParent : function() {
		this.refIFrame.style.height = (document.body.clientHeight + 20) + 'px';
	},

	//-----------------------------------------------------
	listeTypeChange : function(val) {
		this.listeType = val;
		this.StyleResultat.listStyleType = val;
		this.afficheCode();
	},


	//-----------------------------------------------------
	afficheCode : function() {
		var H = '';
		H = 'ul {\n    list-style-type: ' + this.listeType + ';\n}\n' +
			'\n/* Avec le raccourci */\n' +
			'ul {\n    list-style: ' + this.listeType + ';\n}\n';
			
		CodeMirror.runMode(H, 'text/css', this.BoiteCode);
	}
};

window.addEventListener(
	'load', 
	function() {
		FPL.init();
	},
	false);
