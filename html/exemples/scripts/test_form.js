/* Fichier inclus par test.js dans le code de la fenêtre de test
 * pour les tests de formulaire.
 */
 (function() {
	var i;
	
	if (document.forms.length == 0) {
		return;
	}
	
	for (i = 0; i < document.forms.length; i++) {
		document.forms[i].onsubmit = fp_submit;
	}	
	
})();

function fp_submit() {
	var F = this,
		E = F.elements,
		i, Z, j, 
		H = '',
		DIV, S, DIVHtml,
		Fichier = '';
	
	for (i = 0; i < E.length; i++) {
		Z = E[i];

		if (!Z.name
		|| Z.name == ''
		|| Z.disabled
		|| Z.readOnly
		|| Z.type == 'button'
		|| Z.type == 'reset') {
			continue;
		}
		
		if (Z.type == 'radio'
		&& Z.checked == false) {
			continue;
		}
		
		if (Z.type == 'checkbox'
		&& Z.checked == false) {
			continue;
		}

		if (Z.type == 'select-multiple') {
			for (j = 0; j < Z.options.length; j++) {
				if (Z.options[j].selected) {
					H += '&' + Z.name + '=' + escape(Z.options[j].value); //encodeURIComponent(Z.value);
				}
			}
			continue;
		}
						
		H += '&' + Z.name + '=' + escape(Z.value); //encodeURIComponent(Z.value);
		
		if (Z.type == 'file') {
			Fichier = Z.value;
		}
	}

	DIVHtml = '<div style="width:60%; margin:auto; height:60%; position:fixed; top:0; left:0; ' +
				'right:0; bottom:0;padding:5px;background:#FFF;overflow:auto">';
				
	if (H == '') {
		DIVHtml += '<p style="text-align:center">En dehors de ce tutoriel, le contenu du formulaire ' +
				'aurait &eacute;t&eacute; envoy&eacute; &agrave un serveur Web.</p>';
	} else {
		if (Fichier != '') {
			H += '<p>Le contenu du fichier ' + Fichier + ' aurait été aussi envoy&eacute;.</p>';
		}			
		DIVHtml += '<p>En dehors de ce tutoriel, le contenu suivant aurait &eacute;t&eacute; envoy&eacute; au serveur Web :</p>'
					+'<p><wbr>' + H.substring(1) + '</wbr></p>';
	}
	
	DIVHtml += '<p style="text-align:center">' +
					'<input type="button" value="Fermer" ' +
					'onclick="document.getElementById(\'bcModalMsg\').style.display=\'none\'">' +
				'</p>' +
				'<p style="text-align:center;font-size: 0.8em">(Ce message est g&eacute;n&eacute;r&eacute; par le tutoriel.)</p>' +
			'</div>';	
		
	DIV = document.getElementById('bcModalMsg');
	if (DIV) {
		DIV.innerHTML = DIVHtml;
		DIV.style.display = 'block';
	} else {
		DIV = document.createElement('div');
		DIV.id = 'bcModalMsg';
		S = DIV.style;
		S.position = 'fixed';
		S.left = S.top = S.right = S.bottom = 0;
		S.background = 'rgba(0,0,0,0.5)';
		S.zIndex = 10;
		DIV.innerHTML = DIVHtml;
		document.getElementsByTagName('BODY')[0].appendChild(DIV);
	}
	
	return false;
}	


/*
 = FIELDSET --> fieldset
zone-text = INPUT --> text
zone-password = INPUT --> password
zone-textarea = TEXTAREA --> textarea
zone-search = INPUT --> search
zone-datalist = INPUT --> text
zone-radio = INPUT --> radio
zone-checkbox = INPUT --> checkbox
zone-select = SELECT --> select-one
zone-select-multiple = SELECT --> select-multiple
zone-date = INPUT --> date
zone-month = INPUT --> month
zone-week = INPUT --> week
zone-time = INPUT --> time
zone-datetime = INPUT --> text
zone-email = INPUT --> email
zone-url = INPUT --> url
zone-tel = INPUT --> tel
zone-number = INPUT --> number
zone-range = INPUT --> range
zone-color = INPUT --> color
zone-reset = INPUT --> reset
zone-button = INPUT --> button
zone-submit = INPUT --> submit
*/