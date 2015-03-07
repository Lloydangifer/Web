function ajouterParagraphe() {
	var P = document.createElement('P'),
		T = document.getElementsByTagName('TEXTAREA')[0];
		
	P.innerHTML = T.value;
	T.value = '';
	document.getElementsByTagName('BODY')[0].appendChild(P);
}

function afficherMasquer(event) {
	var Button, P;
				
	event = event || window.event;
	Button = event.target || event.srcElement;

	P = Button;
	while(P = P.nextSibling) {
		if (P.nodeName != 'P') {
			continue;
		}
		if (P.style.display == 'block') {
			P.style.display = 'none';
			Button.innerHTML = "Plus d'infos";
		} else {
			P.style.display = 'block';
			Button.innerHTML = "Moins d'infos";
		}
		break;
	}
}	