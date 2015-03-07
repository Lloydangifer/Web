/* Fichier inclus par test.js dans le code de la fenêtre de test
 * pour les tests de formulaire.
 */
 (function() {
	var i, j, E;
	
	if (document.forms.length == 0) {
		return;
	}
	
	for (i = 0; i < document.forms.length; i++) {
		document.forms[i].onsubmit = function() {return false;};
		E = document.forms[i].elements;
		for (j = 0; j < E.length; j++) {
			if (E[j].type == 'reset'
			|| E[j].type == 'button'
			|| E[j].type == 'submit') 
			{
				E[j].onclick = fp_spyBouton;
			}
		}
	}	
	
})();

function fp_spyBouton() {
	var DIV, 
		H = '<div style="width:60%; margin:auto; height:60%; position:fixed; top:0; left:0; ' +
				'right:0; bottom:0;padding:5px;background:#FFF;overflow:auto">';	
	
	if (this.type == 'reset') {
		H += '<p>Vous avez cliqu&eacute; sur un bouton de r&eacute;initialisation ' +
				'des zones du formulaire. Le contenu des zones du formulaire n\'est pas envoy&eacute; au serveur.</p>';
	} else  if (this.type == 'button') {
		H += '<p>Vous avez cliqu&eacute; sur un bouton qui ex&eacute;cute du code JavaScript. ' +
				'Le contenu des zones du formulaire n\'est pas envoy&eacute; au serveur.</p>';		
	} else  if (this.type == 'submit') {
		H += '<p>Vous avez cliqu&eacute; sur un bouton de soumission du formulaire qui ' +
				'd&eacute;lenche l\'envoi des donn&eacute;es saisies au serveur.</p>';				
	} else {
		return false;
	}
		
	H += '<p style="text-align:center">' +
					'<input type="button" value="Fermer" ' +
					'onclick="document.getElementById(\'bcModalMsg\').style.display=\'none\'">' +
				'</p>' +
				'<p style="text-align:center;font-size: 0.8em">(Ce message est g&eacute;n&eacute;r&eacute; par le tutoriel.)</p>' +
			'</div>';	

	
	DIV = document.getElementById('bcModalMsg');
	if (DIV) {
		DIV.innerHTML = H;
		DIV.style.display = 'block';
	} else {
		DIV = document.createElement('div');
		DIV.id = 'bcModalMsg';
		S = DIV.style;
		S.position = 'fixed';
		S.left = S.top = S.right = S.bottom = 0;
		S.background = 'rgba(0,0,0,0.5)';
		S.zIndex = 10;
		DIV.innerHTML = H;
		document.getElementsByTagName('BODY')[0].appendChild(DIV);
	}
	
	 if (this.type == 'button') {
	 	return false;
	 }
}