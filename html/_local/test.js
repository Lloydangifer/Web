var TEST = {
	isExoPopUp: false,
	
	//---------------------------------------------------------------------			
	// Affichage exécution du code dans fenetre iFrame
	// Il faut faire un objet local à chacune des pages pour qu'on puisse 
	// avoir des liens relatives dans le code à tester.
	//
	// nIdx : Indice de l'éditeur dans TCodeMirror[]
	// sUrl : 3 valeurs possibles :
	// 			- vide ou absent => affichage du code nIdx
	//			- une chaine de caractères :
	//				- si nIdx > -1 => nom d'un script à inclure dans le code à tester
	//									utile pour test de formulaires
	//				- si nIdx = -1 => url d'un fichier à afficher
	codeIFrame: function(nIdx, sUrl) {
		var FrameTech, iFramePlus, D, Code, 
			AvecFic = AvecScript = false;			

		FrameTech = (this.isExoPopUp) ? opener.frames.frameTech : top.frames.frameTech;
		
		if (typeof sUrl === 'string') {
			if (nIdx == -1) {
				AvecFic = true;
			} else {
				AvecScript = true;
			}
		}
				
		iFramePlus = FrameTech.document.getElementById('iFramePlus');
		D = (iFramePlus.contentWindow || iFramePlus.contentDocument);
  		if (D.document) {
  			D = D.document;
  		}

		if (AvecFic) {
			iFramePlus.src = sUrl;
		} else {
			Code = top.FP.TCodeMirror[nIdx].getValue();
			if (AvecScript) {
				Code += '<script src="../exemples/scripts/' + sUrl + '"></script>';
			}
		
			D.open();
			D.write(Code);
			D.close();
		}
							
		iFramePlus.style.height = '440px';
		iFramePlus.style.display = 'block';

 		FrameTech.document.getElementById('TEST').style.display = 'Block';
 
		FrameTech.FPTech.setTechHauteur();
	},
	
	//---------------------------------------------------------------------			
	// Affichage exécution du code dans fenetre PopUp
	// Il faut faire un objet local à chacune des pages pour qu'on puisse 
	// avoir des liens relatives dans le code à tester.
	//
	// nIdx : Indice de l'éditeur dans TCodeMirror[]
	// sUrl : 3 valeurs possibles :
	// 			- vide ou absent => affichage du code nIdx
	//			- une chaine de caractères :
	//				- si nIdx > -1 => nom d'un script à inclure dans le code à tester
	//									utile pour test de formulaires
	//				- si nIdx = -1 => url d'un fichier à afficher
	// nBig : 	1 = 500 * 375
	// 			2 = 500 * screen.height - 80
	//			defaut : 400 * 340	
	codePopUp: function(nIdx, sUrl, nBig) {
		var AvecFic = AvecScript = false,
			W = screen.width,
			H = screen.height,		
			Large = W / 3, 
			Haut = H / 3, 
			Top = 100,
			Left,
			wTEST = top.FP.Voir.TWin.TEST,
			Code;
		
		if (typeof sUrl === 'string') {
			if (nIdx == -1) {
				AvecFic = true;
			} else {
				AvecScript = true;
			}
		}
		
		if (nBig === 1) {
			Large = W / 2; Haut = H / 2; Top = 100;
		} else if (nBig === 2) {
			Large = W / 2; Haut = H - 80; Top = 0;
		} else {
			
		}
		Left = W - Large;	//V.W - Width - 30;
		
		if (wTEST.oWin !== null 
		&& !wTEST.oWin.closed)
		{
			wTEST.oWin.close();
		}
		
		wTEST.url = (AvecFic) ? sUrl : '';		
		wTEST.oWin = window.open(wTEST.url, wTEST.nom, 'width=' + Large + ',height=' + Haut + 
											',left=' + Left + ',top=' + Top + 
											',scrollbars,resizable,status');

		// Affichage fichier	
		if (AvecFic) {
			wTEST.oWin.focus();
			return;
		}
		
		// Affichage code
		Code = top.FP.TCodeMirror[nIdx].getValue();
		if (AvecScript) {
			Code += '<script src="../exemples/scripts/' + sUrl + '"></script>';
		}

		wTEST.oWin.document.open();
		wTEST.oWin.document.write(Code);
		wTEST.oWin.document.close();
	
		wTEST.oWin.focus();		
	}
};