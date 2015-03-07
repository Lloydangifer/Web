var TEST = {
	isExoPopUp: false,
	
	//---------------------------------------------------------------------			
	// Affichage exécution du code dans fenetre iFrame
	// Il faut faire un objet local à chacune des pages pour qu'on puisse 
	// avoir des liens relatifs dans le code à tester.
	//
	// nIdx : Indice de l'éditeur dans TCodeMirror[]
	// sScript : 
	//		- vide ou absent => affichage du code nIdx
	//		- sinon : nom d'un script à inclure dans le 
	// 					code à tester (utile pour test de formulaires)
	// sPartie :
	//		- 'HTML' => le test est à faire avec le textarea nIdx 
	//					et le textarea nidx + 1 (feuille de style)
	//		- 'CSS' => le texte est à faire avec le textarea nidx
	//					et le textearea nidx -1 (code HTML)
	//		
	codeIFrame: function(nIdx, sScript, sPartie) {
		var FrameTech, iFramePlus, D, sCode;
			 
		sScript = sScript || '',
		sPartie = sPartie || '';					

		FrameTech = (this.isExoPopUp) ? opener.frames.frameTech : top.frames.frameTech;
				
		iFramePlus = FrameTech.document.getElementById('iFramePlus');
		D = (iFramePlus.contentWindow || iFramePlus.contentDocument);
  		if (D.document) {
  			D = D.document;
  		}
		
		sCode = TEST.getCode(nIdx, sScript, sPartie);
		if (sCode === false) {
			return;
		}
		
		D.open();
		D.write(sCode);
		D.close();
							
		//Dim = top.FP.getViewportSize(FrameTech);
		iFramePlus.style.height = '500px'; //(Dim.H * 0.45) + 'px';
		iFramePlus.style.display = 'block';

 		FrameTech.document.getElementById('TEST').style.display = 'Block';
 
		FrameTech.FPTech.setTechHauteur();
	},
	
	//---------------------------------------------------------------------	
	// Récup du code à tester. Param cf testCodeIFrame		
	getCode: function(nIdx, sScript, sPartie) {
		var sCode = sCodeHTML = sCodeCSS = '',
			TCodeMirror = top.FP.TCodeMirror,
			r1 = /<link href="styles\.css" rel="stylesheet">/g; 
		
		//-------------------------------------------------
		// Pas plusieurs textareas à prendre en compte
		//-------------------------------------------------		
		if (sPartie == '') {
			sCode = TCodeMirror[nIdx].getValue();
			if (sScript != '') {
				sCode += '<script src="../exemples/scripts/' + sScript + '"></script>';
			}
			
			return sCode;
		}
		
		
		//-------------------------------------------------
		// Plusieurs textareas à prendre en compte
		//-------------------------------------------------		
		if (sPartie == 'HTML') {
			sCodeHTML = TCodeMirror[nIdx].getValue();
			sCodeCSS = top.FP.TCodeMirror[nIdx + 1].getValue();
			
		} else if (sPartie == 'CSS') {
			sCodeHTML = top.FP.TCodeMirror[nIdx - 1].getValue();
			sCodeCSS = top.FP.TCodeMirror[nIdx].getValue();
		} else {
			alert('erreur test.js');
			return false;
		}

		if (! r1.test(sCodeHTML)) {
			alert('Il manque le link du fichier styles.css.');
			return false;
		}
		
		sCode = sCodeHTML.replace(r1, '<style>' + sCodeCSS + '</style>');
		
		return sCode;	
	},
	
	//---------------------------------------------------------------------			
	// Affichage exécution du code dans fenetre PopUp
	// Il faut faire un objet local à chacune des pages pour qu'on puisse 
	// avoir des liens relativfs dans le code à tester.
	//
	// nIdx : Indice de l'éditeur dans TCodeMirror[]
	// sScript : 
	//		- vide ou absent => affichage du code nIdx
	//		- sinon : nom d'un script à inclure dans le 
	// 					code à tester (utile pour test de formulaires)
	// sPartie :
	//		- 'HTML' => le test est à faire avec le textarea nIdx 
	//					et le textarea nidx + 1 (feuille de style)
	//		- 'CSS' => le texte est à faire avec le textarea nidx
	//					et le textearea nidx -1 (code HTML)
	//
	// nBig : 	1 = largeur écran / 2 - hauteur écran / 2
	// 			2 = largeur écran / 2 - hauteur écran - 80
	//
	codePopUp: function(nIdx, sScript, sPartie, nBig) {
		var W = screen.width,
			H = screen.height,		
			Large = 700, 
			Haut = 540, 
			Top = 100,
			Left,
			wTEST = top.FP.Voir.TWin.TEST,
			sCode;
					 
		sScript = sScript || '',
		sPartie = sPartie || '';
		
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
		
		sCode = TEST.getCode(nIdx, sScript, sPartie);
		if (sCode === false) {
			return;
		}
				
		wTEST.oWin = window.open(wTEST.url, wTEST.nom, 'width=' + Large + ',height=' + Haut + 
											',left=' + Left + ',top=' + Top + 
											',scrollbars,resizable,status');
		
		wTEST.oWin.document.open();
		wTEST.oWin.document.write(sCode);
		wTEST.oWin.document.close();
	
		wTEST.oWin.focus();		
	}
};