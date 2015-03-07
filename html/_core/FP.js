"use strict";

if (!document.getElementsByClassName
|| !document.addEventListener
|| !document.querySelector
|| !window.XMLHttpRequest) 
{	
	document.location = '_core/stop.html';
}
//___________________________________________________________________
// 	
// Singleton FP
//___________________________________________________________________
var FP = {
	Chapitre: {},
	Cookie: {},
	Voir: {},
	
	TChap: [],		// Tableau d'objets chapitre
					//		objet Chapitre :
					// 		titre : titre du chapitre
					// 		num : numéro de chapitre
					// 		TPage : tableau des pages du chapitre : non du fichier HTML de la page
					
	TPage: [],		// Collection d'objets page 
					// indicée par nom du fichier HTML
					// 		Objet Page :
					// 		titre: Titre de la page
					// 		rep: Répertoire de la page
					// 		fic: Nom fichier HTML, sans extension
					// 		type: Type de la page
					// 		chap: No de chapitre
					// 		resume : résumé de la page
					
	TExo: [],		// collection d'objets exercices
					// indicée par le nom du fichier HTML qui contient l'exo
					// contenu = tableau d'objets exercices
					//		Objet exercice :
					//		id : id du block du titre de l'exercice dans la page
					//		titre : titre de l'exercice.
				
	isMoodle: (location.host == 'moodle.univ-fcomte.fr'),	
	mailTo: '',
	isTuto: false,
	tutoID: '',
	tutoTitre: '',
	isTestPopUp: true,
	isExoPopUp: false,
	
	chapCourantNum: -1,		// No de chapitre en cours
	pageCouranteFic: '',	// Nom du fichier htmlde la page en cours
	pageCouranteNum: -1,	// No de la page en cours dans le chapitre
	pageCouranteType: -1,	// Type de la page en cours
	pageNext: '',	// Code HTML du lien <a> de la page suivante
	pagePrevious: '',	// Code HTML du lien <a> de la page précédente
	
	Progess: {		// Objet pour dessin de la progession dlecture d'une page
		H: 0,		// hauteur totale de la page
		C: null,	// objet canvas
		CP: { 		// paramètres canvas
			fillStyle: "#CCCCCC", 
			lineWidth: 2,
			x: 0,			// redéfini dans initPage
			y: 0,			// redéfini dans initPage
			radius: 0,		// redéfini dans initPage
			start: 0,
			stroke: false, 
			fill: true,
			height: 0,		// redéfini dans initPage
			width: 0,		// redéfini dans initPage
			grad: null		// redéfini dans initPage
			}
	},
						
	repBase: '',
	repTech: '',
	techUrl: '',
	techAncre: '',
		
	TCodeMirror: [],	// Tableau d'objet editeur (CodeMirror)
	TCodeSource: [],	// Code original dans textarea
	CodeMirrorEditeur: {},	// config de CodeMirror.
							// Initialisé dans init_tuto.js -> FP.init()
	CodeMirrorMode: {},		// config des langages supportés
							// Initialisé dans init_tuto.js -> FP.init()
							
	copieCodeHTML: '',	// code HTML copié par liste sélection form de test
	
	Video: {},			// Initialisé dans init_tuto.js -> FP.init()
				
	PAGE_TUTO: 1,
	PAGE_EXEMPLE: 2,
	PAGE_TECH: 3,
	PAGE_EXO: 4,
	PAGE_ACCUEIL: 5,
	PAGE_SOMMAIRE: 6,
	
	//-------------------------------------------------------------------------
	init: function(oConf) {
		var Prop;
		for (Prop in oConf) {
			this[Prop] = oConf[Prop];
		}
					
		this.isTuto = (this.tutoID.indexOf('TECH') == -1);
		this.repBase = unescape(location.href.substring(0, location.href.lastIndexOf('/') + 1));
 		this.repTech = this.repBase + this.repTech;
 		
 		window.addEventListener('unload', FP.Voir.closeAll, false);
	},
	
	//-------------------------------------------------------------------------
	// Ajout d'une page dans un chapitre du tutoriel	
	// oPage : objet page initialisé dans init_tuto.js	
	addPage: function(oPage) {
		var i;
		
		oPage.vids = oPage.vids || [];
		oPage.exos = oPage.exos || [];
		oPage.type = oPage.type || this.PAGE_TUTO;
		
		this.TPage[oPage.fic] = oPage;
								
		this.TChap[oPage.chap].addPage(oPage.fic);
		
		
		if (oPage.vids.length > 0) {
			// TODO
		}
		
		this.TExo[oPage.fic] = [];
				
		for (i = 0; i < oPage.exos.length; i++) {
			this.TExo[oPage.fic][i] = {id: oPage.exos[i][0], titre: oPage.exos[i][1]};
		}  
	},
	

	//-------------------------------------------------------------------------
	// Fonction appelée par chaque page pour initialiser le menu
	// Comme cette fonction est appelée par un événement DOMContentLoad
	// le mot clé this représente le document actif et pas l'objet FP
	initPage: function() {
		var FP = top.FP,
			nomPage = new String(this.location.href),
			ancre = this.location.search.substring(1),
			H = '',
			B;

		if (nomPage.indexOf('.') != -1) {
			nomPage = nomPage.substring(nomPage.lastIndexOf('/'));
			nomPage = nomPage.substring(1, nomPage.lastIndexOf('.'));
		}
		
		// Recherche du no de chapitre de la page
		if (! FP.TPage[nomPage]) {
			alert('Page ' + nomPage + ' introuvable.');
			return;
		}
		
		if (FP.TPage[nomPage].chap == -1) {
			return;
		}

		FP.chapCourantNum = FP.TPage[nomPage].chap;
		FP.pageCouranteFic = nomPage;
		FP.pageCouranteNum = FP.TChap[FP.chapCourantNum].getNumPage(FP.pageCouranteFic);
		FP.pageCouranteType = FP.TPage[FP.pageCouranteFic].type; 
		
		FP.setPreviousNext();
		
		top.document.title = FP.tutoID + ' tutoriel'; // + ' - ' + FP.TPage[FP.pageCouranteFic].titre;
		
		top.frames['frameTuto'].addEventListener('load', function() {top.FP.Search.reinit();}, false);
		
		
		//-----------------------------------------------------------
		// Traitement page d'accueil
		//-----------------------------------------------------------		
		if (FP.pageCouranteType == FP.PAGE_ACCUEIL) {
			FP.makePageAccueil();
			return;
		}	
		
		//-----------------------------------------------------------
		// Traitement page tuto
		//-----------------------------------------------------------
		// 					
		FP.Cookie.maj('PAGE', FP.pageCouranteFic, 365);
		FP.TCodeMirror = [];
		FP.TCodeSource = [];
			
		//--------------------------------
		// Composition du Haut de page
		B = this.getElementsByTagName('HEADER')[0];
		
		if (B !== null) {
			H = '<h1>' + FP.chapCourantNum + ' - ' + FP.TChap[FP.chapCourantNum].titre + '</h1>';
			if (FP.TPage[FP.pageCouranteFic].type == FP.PAGE_EXO) {
				H += '<h2 class="fp-exo">';
			} else {
				H += '<h2>';
			}
							
			H += FP.chapCourantNum + '.' + (FP.pageCouranteNum + 1) + 
				' - ' + FP.TPage[FP.pageCouranteFic].titre + '</h2>';
													
			B.innerHTML = H;
		}
		
		FP.makeMenuTop();
		
		FP.makeMenuPage();
						
		if (FP.pageCouranteType == FP.PAGE_TUTO
		|| FP.pageCouranteType == FP.PAGE_EXO) {
			FP.initCodeMirror(); 
		}
		
		/*
		if (FP.Video.type !== undefined) {
			FP.initVideos();
		}
		*/
		FP.makeBasPage();
		
		if (ancre != '') {
			top.frames['frameTuto'].addEventListener('load', function() {top.FP.Voir.showPartie(ancre, true);}, false);
		}
	
		// Inits pour la gestion de l'indicateur de progression
		B = top.frames['frameTuto'].document.getElementById('MENU-progress');
		if (!B) {
			return;
		}	
		
		FP.Progess.C = B.getContext('2d');
		FP.Progess.CP.width = B.width;
		FP.Progess.CP.height = B.height;
		FP.Progess.CP.x = B.width / 2;
		FP.Progess.CP.y = B.height / 2;
		FP.Progess.CP.radius = FP.Progess.CP.y - 1;									
		FP.Progess.CP.grad = FP.Progess.C.createRadialGradient(FP.Progess.CP.x, FP.Progess.CP.y, 8, 
																FP.Progess.CP.x, FP.Progess.CP.y, 15);
		FP.Progess.CP.grad.addColorStop(0, "white");
		FP.Progess.CP.grad.addColorStop(1, FP.Progess.CP.fillStyle);
	    	
		FP.tutoResize();
		
		top.frames['frameTuto'].addEventListener('resize', function() {FP.tutoResize();}, false);
		top.frames['frameTuto'].addEventListener('scroll', function() {FP.tutoScroll();}, false);	
	},
		
	//--------------------------------		
	// Composition du bloc fixe navigation générale		
	makeMenuTop: function(isPageAccueil) {
		var D = top.frames['frameTuto'].document,
			B = D.getElementById('MENU-top'),
			H;
						
		if (B === null) {
			return;
		}
		
		isPageAccueil = isPageAccueil || false;

		H = '<span id="TIT-tuto" onclick="top.FP.Voir.showPageTuto(\'tuto\')">' + this.tutoTitre + '</span>' +
			this.pageNext;
			
		if (isPageAccueil) {
			H += '<a class="LIEN-top-page" href="#" title="Haut de page"></a>';
		} else {
			H += '<a href="#" title="Haut de page"><canvas id="MENU-progress" width="32" height="32"></canvas></a>';
		}
		
		H += this.pagePrevious +
			'<a class="LIEN-tdm" onclick="top.FP.Voir.showIndex()" title="Table des matières"> </a>' +
			'<a class="LIEN-search" id="LIEN-search" onclick="top.FP.Search.showBoite()" title="Rechercher"> </a>';
			
		H += this.Search.getHTMLBoite();				
								
		B.innerHTML = H;
		
		D.getElementById('MENU-tuto').innerHTML = this.getMenuTuto();
	},
		
	//-------------------------------------------------------------------------
	// Utilisé pour générer le menu en haut cf onglets	
	getMenuTuto: function() {
		var H = '', 
			i, j,		// indices boucles 
			TPagesDuChap, 	// helper
			Page, 			// helper
			id;

		
		// Boucle de traitement des chapitres
		// La boucle commence à 1 car l'indice 0 est le chapitre page d'accueil du tuto			
		for (i = 1; i < this.TChap.length; i++) {
			TPagesDuChap = this.TChap[i].TPage;
			Page = this.TPage[TPagesDuChap[0]];			
			
			// Nom du chapitre
			id = (this.chapCourantNum == i) ? 'id="MENU-chap-courant" ' : '';
			
			H += '<div><div ' + id + '>' + this.TChap[i].titre + '</div><ul>';
			
			// Boucle de traitement des pages du chapitres
			for (j = 0; j < TPagesDuChap.length; j++) {
				Page = this.TPage[TPagesDuChap[j]];
				
				if (Page.type == this.PAGE_EXO) {
					continue;
				}
					
				id = (this.pageCouranteFic == Page.fic) ? 'id="MENU-page-courante" ' : '';
							
				H += '<li onclick="top.FP.Voir.showPageTuto(\'' + Page.fic + '\')"' + id +
			 		'title="' + Page.resume + '">' + Page.titre + '</li>';
			}

			H += '</ul></div>';
		}
		
		return H;
	},
	
	//-------------------------------------------------------------------------
	// Composition du menu avec le contenu de la page	
	makeMenuPage: function(sOrig) {
		var	isTuto = (sOrig !== 'Tech'),
			D,
			H = '',
			BlocMenu,
			lettres = ['A','B','C','D','E','F','G','H','I','J','K','L','M',
					'N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
			H3s = [],
			ERDeb = /</g,
			ERFin = />/g,
			i, Titre;
			
		D = (isTuto) ? top.frames.frameTuto.document
					: top.frames.frameTech.iFrameTech.document;		
			
		BlocMenu = D.getElementById('MENU-page');
			
		if (BlocMenu === null) {
			return;
		}

		H3s = D.getElementsByTagName('H3');
			
		switch (H3s.length) {
		case 0:
			// Abandonné ----
			// Si il n'y a pas de <H3>, on cherche si il y a quand 
			// même des <H4> et si oui on fait un menu avec eux
			// H = this.makeSousMenuPage(null, -1, lettres[0], isTuto);
			break;
		
		case 1:		
			// Si il y a un seul <H3>, on le supprime. 
			// Abandonné ---- 
			// On cherche si il y a des <H4> et si oui on fait un menu avec eux
			// H = this.makeSousMenuPage(H3s[0], 0, lettres[0], isTuto);
			H3s[0].parentNode.removeChild(H3s[0]);		
			break;
			
		default:
			// Il y a plusieurs <H3>. On fait un menu.
			for (i = 0; i < H3s.length; i++) {
				H3s[i].addEventListener('click', FP.showHideSection, false);			
				H3s[i].id = lettres[i];
				
				Titre = H3s[i].textContent;
				Titre = Titre.replace(ERDeb, '&lt;');
				Titre = Titre.replace(ERFin, '&gt;');

				
				// Numéro et titre partie dans la page
				if (isTuto) {
					H3s[i].innerHTML = this.chapCourantNum + '.' + (this.pageCouranteNum + 1) + 
										'.' + (i + 1) + ' - ' + Titre;
				} else {
					H3s[i].innerHTML = (i + 1) + ' - ' + Titre;					
				}
				
				// Partie dans le menu
				H += '<li><a ' + ((H3s[i].className == 'fp-exo') ? 'class="exo" ' : '') +
							'onclick="top.FP.Voir.showPartie(\'' + H3s[i].id + '\', ' + isTuto + ')">' + 
						Titre + 
						'</a>' +
						this.makeSousMenuPage(H3s[i], i, lettres[i], isTuto) +
					'</li>';			
			}
		}	// fin du switch nombre de <H3>
				
		if (H != '') {
			BlocMenu.innerHTML = H;
		} else {
			BlocMenu.parentNode.removeChild(BlocMenu);
		}
	},

	//-------------------------------------------------------------------------
	// Composition du sous-menu d'un item du menu avec le contenu de la page
	// H3 : élément titre H3
	// H3Idx : indice du H3 pour numérotation
	// Lettre : lettre pour faire ID sous-titre
	// isTuto : indique si tuto ou ref technique	
	makeSousMenuPage: function(H3, H3Idx, Lettre, isTuto) {	
		var H = '',
			H4s = [],
			ERDeb = /</g,
			ERFin = />/g,
			i, B, Section, Titre, D;
			
		D = (isTuto) ? top.frames.frameTuto.document
					: top.frames.frameTech.iFrameTech.document;	
					
		// Recherche des sous-parties : elles doivent 
		// être contenue dans une <section> qui suit le <h3>
		// ou dans la page si pas de <h3>
		if (H3 == null) {
			Section = D;
		} else {
			B = H3;
			Section = null;
			while(B = B.nextSibling) {
				if (B.nodeName == 'SECTION') {
					Section = B;
					break;
				}
			}
				
			if (Section === null) {
				return '';		// Pas de section dans le <H3> => pas de sous-menu
			}
		}
		
		H4s = Section.getElementsByTagName('H4');
		
		if (H4s.length == 0) {
			return '';		// Pas de <H4>
		}
		
		H = '<ol>';
		for (i = 0; i < H4s.length; i++) {
			H4s[i].addEventListener('click', FP.showHideSection, false);
			H4s[i].id = Lettre + i;
			
			Titre = H4s[i].textContent;
			Titre = Titre.replace(ERDeb, '&lt;');
			Titre = Titre.replace(ERFin, '&gt;');
	
			// Numéro et titre sous-partie dans la page
			if (isTuto) {
				H4s[i].innerHTML = this.chapCourantNum + '.' + (this.pageCouranteNum + 1) + 
									'.' + (H3Idx + 1) + '.' + (i + 1) + ' - ' + Titre;
			} else {
				H4s[i].innerHTML = (H3Idx + 1) + '.' + (i + 1) + ' - ' + Titre;				
			}
			
			// Sous-partie dans le menu
			H += '<li><a onclick="top.FP.Voir.showPartie(\'' + H4s[i].id + '\', ' + isTuto + ')"' +
					((H4s[i].className == 'fp-exo') ? ' class="exo">' : '>') + 
					Titre + 
				'</a></li>';
		}
		H += '</ol>';
		
		return H;
	},
			
	//-------------------------------------------------------------------------
	// Composition de bas des pages
	makeBasPage: function() {
		var H = '',
			mailto = '',
			i,
			B = top.frames['frameTuto'].document.getElementsByTagName('FOOTER')[0];
			
		if (B === null) {
			return;
		}
		
		for (i = 0; i < this.mailTo.length; i += 2) {
			if (this.mailTo[i] == '') {
				mailto +=  ', ' + this.mailTo[i + 1];
			} else {
				mailto += ', <a href="mailto:' + this.mailTo[i] + '">' +
						this.mailTo[i + 1] + '</a>';
			}		
		}
		
		H = this.pageNext	+
			'<a class="LIEN-top-page" href="#" title="Haut de page"></a>' +
			this.pagePrevious +
			'&copy; ' + mailto.substring(2);
			
		B.innerHTML = H;
	},
		
	//-------------------------------------------------------------------------	
	// Initialisation des extraits de code et des exemples
	initCodeMirror: function() {
		var W = null,
			D = null,
			r1 = /&lt;/g,
			r2 = /&gt;/g,
			r3 = /__ID__/g,
			r4 = /__FIC__/g,
			codeBtnTester = '',
			codeBntOrig = '',
			codeBtn = '',
			codeBtnFichier = '', 
			TCode, i, mode,
			B, ndParent, N, TxtArea, Fichier, Tmp, dataScript;		       

		// définition de la fenêtre et du document où chercher le code
		if (FP.isExoPopUp) {
			W = self;
			D = W.document;			
		} else {
			W = top.frames['frameTuto'];
			D = W.document;		
		}			
							
		// On recherche tous les éléments dont la classe est 'TEST-textarea'.
		// Normalement ce sont tous des <textarea>
		// Pour chacun on crée un éditeur CodeMirror et les boutons de gestion. 
		TCode = D.querySelectorAll('.TEST-textarea');
		if (TCode.length == 0) {
			return;				// RETURN : aucun code a tester dans la page
		}
		
		Tmp = this.getBtnPourTest();
		codeBtnTester = Tmp[0];
		codeBtnFichier = Tmp[1];
		codeBntOrig = Tmp[2];
		
		for (i = 0; i < TCode.length; i++) {
			TxtArea = TCode[i];
			Fichier = false;
			// Sauvegarde code source	
			this.TCodeSource[i] = TxtArea.innerHTML.replace(r1, '<').replace(r2, '>');
			
			// Ajout code mirror
			this.CodeMirrorEditeur.lineWrapping = (TxtArea.hasAttribute('data-wrap'));
			this.CodeMirrorEditeur.readOnly = (TxtArea.hasAttribute('data-readonly'));
			if (TxtArea.hasAttribute('data-fichier')) {
				this.CodeMirrorEditeur.readOnly = true;
				Fichier = TxtArea.getAttribute('data-fichier');
			}
			
			// Mise en commentaire car bug sur readOnly si pas objet litteral passé en param ?????
			//this.TCodeMirror[i] = W.CodeMirror.fromTextArea(TxtArea, this.CodeMirrorEditeur);
			
			this.TCodeMirror[i] = W.CodeMirror.fromTextArea(TxtArea, {dragDrop: this.CodeMirrorEditeur.dragDrop,
																		lineNumbers: this.CodeMirrorEditeur.lineNumbers,
																		mode: this.CodeMirrorEditeur.mode,
																		indentUnit: this.CodeMirrorEditeur.indentUnit,
																		indentWithTabs: this.CodeMirrorEditeur.indentWithTabs,
																		enterMode: this.CodeMirrorEditeur.enterMode,
																		gutter: this.CodeMirrorEditeur.gutter,
																		fixedGutter: this.CodeMirrorEditeur.fixedGutter,
																		readOnly: this.CodeMirrorEditeur.readOnly,
																		tabMode: this.CodeMirrorEditeur.tabMode,
																		lineWrapping: this.CodeMirrorEditeur.lineWrapping,
																		styleActiveLine: this.CodeMirrorEditeur.styleActiveLine,
																		autoCloseTags: this.CodeMirrorEditeur.autoCloseTags});
				
			// Pas de bouton si éditeur en read only et pas code de puis fichier
			if (this.CodeMirrorEditeur.readOnly
			&& Fichier === false) 
			{
				continue;
			}
			
			// Ajout boutons pour tester le code
			if (Fichier !== false) {
				// le code à tester se trouve dans un fichier
				codeBtn = codeBtnFichier;
				
			} else if (TxtArea.hasAttribute('data-binome')) {
				// Textarea avec data-binome : le code du textarea est exécuté
				// par le click d'un autre bouton (ex : tests des POST de formulaires).
				// Ces textarea n'ont pas de boutons 'Tester'	
				codeBtn = '&nbsp'; //codeBntOrig; trop piège à con
				B = D.getElementById(TxtArea.getAttribute('data-binome'));
				B.setAttribute('data-binome', i);
				
			} else if (TxtArea.hasAttribute('data-script')) {
				// Textarea avec data-script : un script JS sera ajouté au code pour le test
				// Le script se trouve dans exemples/scripts/
				dataScript = TxtArea.getAttribute('data-script');
				codeBtn = '<input type="button" name="btTest" value="Tester dans le tuto" ' +
							'onclick="TEST.codeIFrame(__ID__, \'' + dataScript + '\')">' + 
						'<input type="button" name="btTest" value="Tester dans pop-up" ' +
							'onclick="TEST.codePopUp(__ID__, \'' + dataScript + '\')">' +
						codeBntOrig;
				
			} else {
				// le code est dans le textarea - 
				// Forme "normale" la plus souvent utilisée
				codeBtn = codeBtnTester + codeBntOrig;
			}
			
			N = D.createElement('P');
			N.className = 'TEST-boutons';			
			N.innerHTML = codeBtn.replace(r3, i);
			if (Fichier !== false) {
				N.innerHTML = N.innerHTML.replace(r4, Fichier);
			}
			
			ndParent = TxtArea.parentNode;	// Tag FORM
			ndParent.name = 'testForm' + i;
			ndParent.appendChild(N);
		}

		// On recherche tous les éléments avec des exemples de code.
		// Ils ont un attribut data-code qui indique comment afficher le code. 
		TCode = D.querySelectorAll('[data-code]');
												
		for (i = 0; i < TCode.length; i++) {
			TCode[i].classList.add('cm-s-default');
			mode = TCode[i].getAttribute('data-code');
			W.CodeMirror.runMode(TCode[i].textContent, this.CodeMirrorMode[mode], TCode[i]);
		}
	},

	//-------------------------------------------------------------------------	
	// Renvoie les boutons pour les tests de code. helper
	getBtnPourTest: function() {
		var codeBtnTester = '',
			codeBtnFichier = '',
			codeBntOrig = '';
					
		codeBtnTester = '<input type="button" name="btTest" value="Tester le code" ';
		
		if (FP.tutoID == 'HTML') {
			codeBtnTester = '<input type="button" name="btTest" value="Tester dans le tuto" onclick="TEST.codeIFrame(__ID__)">' +
							'<input type="button" name="btTest" value="Tester dans pop-up" onclick="TEST.codePopUp(__ID__)">';
		} else {
			codeBtnTester = '<input type="button" name="btTest" value="Tester le code" onclick="top.FP.Voir.testCode(__ID__)">';
		}

		codeBntOrig = '<select class="TEST-select-code" onclick="top.FP.Voir.actionCode(this, __ID__)">' +
						'<option value="NONE">Code ...</option>' +
						'<option value="ORIGINAL">Remettre le code original</option>' +
						'<option value="COPIER">Copiez le code</option>' +
						'<option value="COLLER">Collez le code copié</option>' +
					'</select>';
													
		codeBtnFichier = '<input type="button" name="btTest" value="Tester le code" ' + 
							'onclick="top.FP.Voir.testCode(__ID__, \'__FIC__\')">';
		
		return [codeBtnTester, codeBtnFichier, codeBntOrig];
	},
	
	//-------------------------------------------------------------------------	
	makePageAccueil: function() {
		var D = top.frames['frameTuto'].document,
			B;
		
		FP.makeMenuTop(true);
		
		D.getElementById('SOM-tuto').innerHTML = FP.getContenuAccueil();
		
		FP.makeBasPage();

		if (FP.Cookie.get('PAGE') != null) {
			B = D.getElementById('bcLast');
			(B != null) && (B.style.display = 'block');
		}
		if (FP.Cookie.get('FAV') != null) {
			B = D.getElementById('bcFav');
			(B != null) && (B.style.display = 'block');
		}
	},
	//-------------------------------------------------------------------------
	// Utilisé pour générer la page d'accueil	
	getContenuAccueil: function() {
		var H = '', 
			i, j, k,		
			TPagesDuChap, 	// helper
			Page, 			// helper
			nBreak, TExo;

		
		// Boucle de traitement des chapitres
		// La boucle commence à 1 car l'indice 0 est le chapitre page d'accueil du tuto			
		for (i = 1; i < this.TChap.length; i++) {
			TPagesDuChap = this.TChap[i].TPage;
			Page = this.TPage[TPagesDuChap[0]];			
			
			// Nom du chapitre
			H += '<div><div class="SOM-tuto-titre-chap" onclick="showHide(' + i + ')">' + 
						this.TChap[i].titre + '</div>' +
						'<div class="SOM-tuto-chapitre" id="SOM_' + i + '" style="display: none">';	

			
			// Boucle de traitement des pages du chapitres
			for (j = 0, nBreak = TPagesDuChap.length / 2; j < TPagesDuChap.length; j++) {
				Page = this.TPage[TPagesDuChap[j]];
						
				if (j == 0) {
					H += '<ul>';
				} else if (j >= nBreak) {
					H += '</ul><ul>';
					nBreak = 0;
				}
				
				H += '<li>' +
						'<div onclick="top.FP.Voir.showPageTuto(\'' + Page.fic + '\')">' +
							'<div class="SOM-tuto-nun-page">' + (j + 1) + '</div>' + 
							'<span class="SOM-tuto-titre-page">' + '  ' + Page.titre + '</span>' +
							'<p class="SOM-tuto-resume-page">' + Page.resume + '</p>' +
						'</div>';

				
				TExo = this.TExo[Page.fic];
				for (k = 0; k < TExo.length; k++) {
					H += '<a class="SOM-tuto-lien-exo" ' +
								'onclick="top.FP.Voir.showPageTuto(\''+ Page.fic + '\', \'' + TExo[k].id + '\')">' + 
								TExo[k].titre + '</a> ';				
				}
				
				H += '</li>';
			}
		
			H += '</ul></div><div class="fp-clear"></div>' +
				'<div class="SOM-tuto-plus-detail" id="BAS_' + i + '" onclick="showHide(' + i + ')">&#10010; de détails</div></div>';
		}
		
		return H;
	},
	
	//-------------------------------------------------------------------------
	// Calcul des liens page précédente et page suivante
	setPreviousNext: function() {
		var pagePrevious = '',
			pageNext = '',
			pageTmp = '',
			nomPage = '';
			
		for (nomPage in this.TPage) {
			if (nomPage == this.pageCouranteFic) {
				pagePrevious = pageTmp;		
			}
			if (pageTmp == this.pageCouranteFic) {
				pageNext = nomPage;
				break;
			}
			pageTmp = nomPage;
		}
		
		// Bouton page suivante
		if (pageNext == '') {
			this.pageNext = '';
		} else {
			this.pageNext = '<a class="LIEN-next-page" ' +
					'onclick="top.FP.Voir.showPageTuto(\'' + this.TPage[pageNext].fic + '\')" ' +
					'title="' + this.TPage[pageNext].titre +  '"></a>';			
		} 
		
		// Bouton page précédente
		if (pagePrevious == '') {
			this.pagePrevious = '';
		} else {
			this.pagePrevious = '<a class="LIEN-previous-page" ' +
					'onclick="top.FP.Voir.showPageTuto(\'' + this.TPage[pagePrevious].fic + '\')" ' +
					'title="' + this.TPage[pagePrevious].titre +  '"></a>';		
		}
	},
	
	//-----------------------------------------------------	
	showHideSection: function() {
		var B = this;
		
		while(B = B.nextSibling) {
			if (B.nodeName == 'SECTION') {
				B.style.display = (B.style.display == 'none') ? 'block' : 'none';
				return;
			}	
		}
	},
			
	//-----------------------------------------------------	
	showHide: function(idBloc) {
		var B = top.frames['frameTuto'].document.getElementById(idBloc);
		
		if (B) {
			B.style.display = (B.style.display == 'none') ? 'block' : 'none';
		}
	},
	
	//-----------------------------------------------------	
	// Gestion de l'indicateur de progression : redimensionnement fenêtre
	tutoResize: function() {
		this.Progess.H = top.frames['frameTuto'].document.body.scrollHeight - top.frames['frameTuto'].innerHeight;
		this.tutoScroll();
	},
	//-----------------------------------------------------	
	// Gestion de l'indicateur de progression : scroll de la page	
	tutoScroll: function() {
		var pourcentage = Math.max(0, Math.min(1, top.frames['frameTuto'].pageYOffset / this.Progess.H));
		this.tutoProgress(pourcentage);
	},
	//-----------------------------------------------------	
	// Gestion de l'indicateur de progression : affichage	
	tutoProgress: function(pourcentage) {
		var Canvas = this.Progess.C,
			Param = this.Progess.CP,
			xTexte = Param.x - 10,
			end = 2 * Math.PI * pourcentage;
		
		Canvas.clearRect(0, 0, Param.width, Param.height);
		
		Param.start = 2 * Math.PI * Param.start / 100;
		
		if (end == 0) {	    	
			Canvas.beginPath();
			Canvas.moveTo(Param.x, Param.y);
			// 2 * Math.PI * 100 = 628.3185307179587
			Canvas.arc(Param.x, Param.y, Param.radius, Param.start, 628.3185307179587, false);
	    	Canvas.fillStyle = Param.grad; 
			Canvas.fill();
			Canvas.fillStyle = "black";
			Canvas.fillText('0%', Param.x - 6, Param.y + 4);
    		return;
    	}
    	
    	// Petit rond pour que le %tage soit lisible
		Canvas.beginPath();
		Canvas.moveTo(Param.x, Param.y);
		// 2 * Math.PI * 100 = 628.3185307179587
		Canvas.arc(Param.x, Param.y, 10, Param.start, 628.3185307179587, false);
    	Canvas.fillStyle = Param.grad; 
		Canvas.fill();		
		    
    	// Part de lecture    	
		Canvas.beginPath();
		Canvas.moveTo(Param.x, Param.y);
		Canvas.arc(Param.x, Param.y, Param.radius, Param.start, end, false);
    
		if (Param.stroke) {
		    Canvas.lineTo(Param.x, Param.y);
		    Canvas.strokeStyle = Param.fillStyle;
		    Canvas.stroke();
		}
    
	    if (Param.fill) {
	    	//Canvas.fillStyle = Param.fillStyle;
	    	//Canvas.fill();
	    	Canvas.fillStyle = Param.grad; 
	    	Canvas.fill();	    	 
	    }

		// Inscription du %tage
		pourcentage = Math.round(pourcentage * 100);	    
	    Canvas.fillStyle = "black";
	    if (pourcentage < 10) xTexte = Param.x - 6;
	    else if (pourcentage > 99) xTexte = Param.x - 14; 
	    Canvas.fillText(pourcentage + '%', xTexte, Param.y + 4);
	},
	
	//-----------------------------------------------------	
	getViewportSize: function(W) {
		var D;
	    if (W.pageXOffset != null) {
	    	return {X: W.innerWidth + W.pageXOffset, 
	    			Y: W.innerHeight + W.pageYOffset,
	    			W: W.innerWidth,
	    			H: W.innerHeight,
	    			T: W.pageYOffset,
	    			L: W.pageXOffset};	    
		}

		D = (W.document.compatMode == "CSS1Compat") ? 
				W.document.documentElement :
				W.document.body; 		  	

    	return {X: D.clientWidth + D.scrollLeft,
    			Y: D.clientWidth + D.scrollTop,
    			W: D.clientWidth,
    			H: D.clientHeight,
    			T: D.scrollTop,
    			L: D.scrollLeft};	     	    	
	}
};	// Fin de l'objet FP

//___________________________________________________________________
// 	
// Objet cookie
//___________________________________________________________________
FP.Cookie = {
	//---------------------------------------------------------------------
	// met à jour la valeur d'un cookie
	maj: function(Nom, Valeur, Jours, Chem, Dom, Securit) {
		var leCookie;
		
		if (Nom === '' 
		|| Nom === null) 
		{
			return null;
		}
		
		leCookie = Nom + '=' + escape(Valeur);
					
		if (!Valeur) {
			Jours = -1;
		}

		Jours = (!Jours) ? null : Jours;
		if (Jours !== null) {
			var DateFin = new Date ();
			Jours = Jours * 24 * 60 * 60 * 1000;
			DateFin.setTime( DateFin.getTime() + Jours );
			leCookie += '; expires=' + DateFin.toGMTString();
		}			
		
		if (typeof Chem === 'string' && Chem != '') {
			leCookie += '; path=' + Chem;
		}
		if (typeof Dom === 'string' && Dom != '') {
			leCookie += '; domain=' + Dom;
		}			
		if (typeof Securit === 'boolean' && Securit === true) {
			leCookie += '; secure';
		}		

		document.cookie = leCookie ;
	},
	//---------------------------------------------------------------------	
	// Renvoie la valeur du cookie Nom ou null si inex
	get: function(Nom) {
		var Cherche, Long, leCookie, CookieLong, i, j, Fin;

		if (typeof Nom !== 'string') {
			return null;
		}
		
		Cherche = Nom + "=";
		Long = Cherche.length;
		leCookie = document.cookie;
		CookieLong = leCookie.length;
		i = 0;
		
		while (i < CookieLong) {
			j = i + Long;
			if (leCookie.substring(i, j) == Cherche) {
				Fin = leCookie.indexOf (";", j);
				if (Fin == -1) {
					Fin = leCookie.length;
				}
				return unescape(leCookie.substring(j, Fin));
			}
			i = leCookie.indexOf(" ", i) + 1;
			if (i < 1) {
				break ;
			}
		}
		return null;
	}
};	// Fin objet oCookie

//___________________________________________________________________
// 	
// Objet Chapitre
//___________________________________________________________________
FP.Chapitre = function(sTitre,nNum) { 
	this.titre = sTitre;	// Titre du chapitre
	this.num = nNum;		// numéro de chapitre
	this.TPage = [];		// tableau des pages du chapitre : non du fichier HTML de la page
};

FP.Chapitre.prototype.getNbPage = function() { 
	return this.TPage.length;
};

FP.Chapitre.prototype.addPage = function(sPage) {
	this.TPage[this.TPage.length] = sPage;
};

FP.Chapitre.prototype.getNumPage = function(sPage) {
	var i;
	for (i = this.TPage.length - 1; i >= 0; i--) {
		if (sPage == this.TPage[i]) {
			return i;
		}
	}
	return -1;
};

//___________________________________________________________________
// 	
// Objet Voir
//___________________________________________________________________
FP.Voir = {
	oTagA: null,	// Ancre dans une page pour positionnement
	nHaut: 0,
	BlocExoCompletez: null,
	
	TWin: {
		EXO: {	nom: 'fp-a',
				opt: 'faite dans showCompletez',
				oWin: null,
				url: ''}, 
		PLUS: {	nom: 'fp_p',
				opt: '480px',
				oWin: null,
				url: ''},
		SPE: {	nom: 'fp_s',
				opt: 'width=610,height=350,left=' + (screen.width - 620) + 
						',top=40,scrollbars,resizable',
				oWin: null,
				url: ''},
		TECH: {	nom: 'fp_t',
				opt: 'width=610,height=' + (screen.availHeight - 80) + 
						',left=' + (screen.width - 620) + 
						',top=0,scrollbars,resizable',
				oWin: null,
				url: ''},
		IDX: {	nom: 'fp_x',
				opt: 'width=400,height=' + (screen.availHeight - 120) + 
						',left=' + (screen.width * 0.6) + 
						'top=0,scrollbars,resizable',
				oWin: null,
				url: ''},
		TEST: {	nom: 'fp_c',
				opt: '',
				oWin: null,
				url: ''},				
		AIDE: {	nom: 'fp_h',
				opt: 'width=630,height=' + (screen.height - 100) + 
						',left=' + (screen.width - 640) + 
						',top=0,scrollbars,resizable,toolbar',
				oWin: null,
				url: ''},
		FAV: {	nom: 'fp_f',
				opt: 'width=340,height=300,scrollbars,resizable,' +
						'left=' + (((screen.width - 340) / 2) -10) + 
						',top=' + (((screen.height - 300) / 2) -30),
				oWin: null,
				url: '_core/favoris.html'},
		PHP: {nom: 'fp_php',
				opt: 'width=500,height=500,left=' + ((screen.width - 500) / 2) + 
						',top=' + ((screen.height - 500) / 2) + ',scrollbars,resizable',
				oWin: null,
				url: ''}											 		
	},	
	//_____________________________________________________________________________
	// Ferme toutes les fenêtres ouvertes par le tuto	
	closeAll: function() {
		var TWin = FP.Voir.TWin,
			nom;
		for (nom in TWin) {
			TWin[nom].oWin != null && !TWin[nom].oWin.closed && TWin[nom].oWin.close();
			TWin[nom].oWin = null;
		}	
	},
	
	//_____________________________________________________________________________
	// Affichage schéma de la base de test ou organigramme de classe ou de code
	showPLUS: function (sUrl) {
		var FrameTech = top.frames.frameTech,
			iFramePlus, B;
			
		if (sUrl.indexOf('.php') != -1) {
			if (location.protocol != 'http:') {
				alert('Il faut un serveur WEB pour cette utilisation.');
				return;
			}
			if (FP.isMoodle) {
				alert('Moodle ne permet pas d\'exécuter ce script.');
				return;
			}
		}

		B = FrameTech.document.getElementById('TEST');
		if (B) {
			B.style.display = 'none';
		}
				
		this.TWin.PLUS.url = FP.repBase + sUrl;
		
		iFramePlus = FrameTech.document.getElementById('iFramePlus');
		iFramePlus.src = this.TWin.PLUS.url;		
		iFramePlus.style.height = this.TWin.PLUS.opt;
		iFramePlus.style.display = 'block';

		FrameTech.FPTech.setTechHauteur();
	},

	//---------------------------------------------------------------------				
	hidePLUS: function() {
		var FrameTech = top.frames.frameTech,
			iFramePlus = FrameTech.document.getElementById('iFramePlus'),
			B;
				
		iFramePlus.src = '';	
		iFramePlus.style.display = 'none';			
		iFramePlus.style.height = '0';

		B = FrameTech.document.getElementById('TEST');
		if (B) {
			B.style.display = 'none';
		}
		
		FrameTech.FPTech.setTechHauteur();				
	},
	//---------------------------------------------------------------------			
	// Affichage exemple de code dans fenetre 
	// nIdx : Indice de l'éditeur dans TCodeMirror[] ou code si = string
	// sUrl : url du fichier à afficher dans le fenetre ou rien si nIdx est fourni
	// nBig : 	1 = 500 * 375
	// 			2 = 500 * screen.height - 80
	//			defaut : 400 * 340
	
	// Pas utilisé pour le tuto HTML pour avoir des liens relatifs à la page
	// du tuto. Utilise à la place _local/test.js/TEST.codeIFrame() ou
	// _local/test.js/TEST.codePopUp()
	
	testCode: function(nIdx, sUrl, nBig) {
		var AvecFic = (typeof sUrl === 'string'),
			V = FP.getViewportSize(top),		
			Large = V.W / 3, 
			Haut = V.H / 3, 
			Top = 100,
			Left,
			TEST = this.TWin.TEST;
			
		if (TEST.oWin !== null 
		&& !TEST.oWin.closed)
		{
			TEST.oWin.close();
		}
		
		TEST.url = (AvecFic) ? sUrl : '';
		
		if (nBig === 1) {
			Large = V.W / 2; 
			Haut = V.H / 2; 
			Top = 100;
		} else if (nBig === 2) {
			Large = V.W / 2;
			Haut = V.H - 80; 
			Top = 0;
		} else {
			
		}
		Left = screen.width - Large;	//V.W - Width - 30;
		
		TEST.oWin = window.open(TEST.url, TEST.nom, 'width=' + Large + ',height=' + Haut + 
											',left=' + Left + ',top=' + Top + 
											',scrollbars,resizable,status');
	
		if (! AvecFic) {
			TEST.oWin.document.open();
			if (typeof nIdx === 'string') {
				TEST.oWin.document.write(nIdx);
			} else {
				TEST.oWin.document.write(FP.TCodeMirror[nIdx].getValue());
			}
			TEST.oWin.document.close();
		}
		
		TEST.oWin.focus();		
	},
	
	//---------------------------------------------------------------------
	// Affiche une des fenêtres TWin			
	openFenetre: function(oW) {
		if (oW.oWin === null 
		|| oW.oWin.closed) 
		{
			oW.oWin = window.open(oW.url, oW.nom, oW.opt);
		} else {
			oW.oWin.location = oW.url;
		}
		oW.oWin.focus();
	},	

	//---------------------------------------------------------------------	
	// Affichage fenêtre Index
	showIndex: function(sAncre) {
		this.TWin.IDX.url = FP.repBase + '_local/tab_matiere.html';
		this.openFenetre(this.TWin.IDX);
	},
	
	//---------------------------------------------------------------------		
	// Gestion des actions sur le code d'exemple ou d'exercice (liste déroulante)			
	actionCode: function(oList, nIdx) {
		var Val = oList.value;
		switch (Val) {
		case 'NONE':
			// rien
			break;
		case 'ORIGINAL':
			FP.TCodeMirror[nIdx].setValue(FP.TCodeSource[nIdx]);
			break;
		case 'COPIER': 
			FP.copieCodeHTML = FP.TCodeMirror[nIdx].getValue();
			break;
		case 'COLLER':
			if (FP.copieCodeHTML != '') {
				FP.TCodeMirror[nIdx].setValue(FP.copieCodeHTML);
			}
			break;
		}
		oList.selectedIndex = 0;
	},	
	//---------------------------------------------------------------------		
	// Remplacement du code d'un textaera de test par le code original			
	setCodeOriginal: function(nIdx) {
		FP.TCodeMirror[nIdx].setValue(FP.TCodeSource[nIdx]);
	},			
	//-------------------------------------------------------------------------
	// Affichage d'une page du tuto
	showPageTuto: function(sPage, sAncre) {
		var sUrl = FP.repBase + FP.TPage[sPage].rep + "/" + sPage + ".html";
		if (typeof sAncre === 'string') {
			sUrl += '?' + sAncre;
		}
		top.frames.frameTuto.document.location.href = sUrl;
	},
	//-------------------------------------------------------------------------
	// Positionnement sur un endroit de la page
	// Nécessaire pour éviter que le début de la partie soit cachée par
	// le bandeau fixe en haut de page.
	showPartie: function(sAncre, isTuto) {
		var D;
		
		if (isTuto) {
			D = top.frames.frameTuto.document;
			D.getElementById(sAncre).scrollIntoView();
			D.defaultView.scrollBy(0, -95);			
		} else {	
			D = top.frames.frameTech.iFrameTech.document;	
			D.getElementById(sAncre).scrollIntoView();
		}
	},	
	
			
	//---------------------------------------------------------------------		
	// Ouverture popup avec code à complétez pour les exercices
	showCompletez: function(sIDBloc) {
		var B = top.frames.frameTuto.document.getElementById(sIDBloc),
			winHeight = 0, 
			oW = this.TWin.EXO;
		
		if (!B) {
			return;
		}
		
		if (oW.oWin !== null 
		&& !oW.oWin.closed) 
		{
			oW.oWin.focus();
			return;
		}
		
		
		this.BlocExoCompletez = B;
		
		winHeight = screen.availHeight * 0.66;
		if (winHeight < 600) {
			winHeight = 600;
		}

		oW.url = FP.repBase + '_core/exercice.html';
		oW.opt = 'width=630,left=' + (screen.width - 650) + 
					',top=0,scrollbars,resizable,height=' + winHeight;
					
		oW.oWin = window.open(oW.url, oW.nom, oW.opt);		
	},
		
	//---------------------------------------------------------------------		
	// Affichage des blocs de code à complétez pour les exercices
	showCompletezOLD: function(sIDBloc) {
		var B = top.frames.frameTuto.document.getElementById(sIDBloc),
			F, idx;
		
		if (!B) {
			return;
		}
		
		// Si visible => cache
		if (B.style.display == 'block') {
			B.style.display = 'none';
			return;
		}
		
		B.style.display = 'block';
		
		F = B.getElementsByTagName('FORM')[0];
		if (F) {
			idx = F.name.substring(8);	
			FP.TCodeMirror[idx].refresh();
		}
	},
	//---------------------------------------------------------------------		
	// Affichage des solutions des exercices
	// sIDSolution peut être un identifiant dans une page, une page
	showSolution: function(sIDSolution, nType) {
		var D = top.frames.frameTuto.document,
			Msg = "Le recours à la solution de l'exercice\n" +
					"vous sera bénéfique uniquement\n" +
					"si vous avez tenté de faire cet exercice ...",
			B, F, idx, sUrl;
				
		// Solution affichée dans une fenêtre
		if (nType != 1) {
			if (!confirm(Msg)) {
				return;
			}
			
			sUrl = FP.repBase +FP.Page[FP.pageCouranteFic].rep + '/exo/' + sIDSolution;
			if (nType === null 
			|| nType === undefined) 
			{
				D.location = sUrl;
			} else {
				this.testCode(null, sUrl, 1);
			}
			return;
		}
		
		// Solution affichée dans le corps de la page
		B = D.getElementById(sIDSolution);
		// Si visible => cache
		if (B.style.display == 'block') {
			B.style.display = 'none';
			return;
		}
		// affichage solution
		if (!confirm(Msg)) {
			return;
		}
		
		B.style.display = 'block';
		
		F = B.getElementsByTagName('FORM')[0];
		if (F) {
			idx = F.name.substring(8);	
			FP.TCodeMirror[idx].refresh();
		}
	},
	//---------------------------------------------------------------------
	// Affichage Spécification technique
	showPageTech: function(sPage, sAncre) {
		var i, oSel;
		
		if (sAncre === undefined) {
			alert('Manque "sAncre". Prévenez l\'enseignant.');
			return false;
		}
		
		if (! FP.isTuto) {
			FP.Voir.showPageTuto(sPage, sAncre);
			return;
		}
		
		FP.techUrl = sPage;
		FP.techAncre = sAncre;
		
		this.TWin.TECH.url = FP.repTech + sPage + '.html#' + sAncre;
		
		top.frames.frameTech.iFrameTech.document.location.href = this.TWin.TECH.url;
		
		// synchro liste déroulante des spéc.
		oSel = top.frames.frameTech.document.getElementById('TOP-liste');
		if (!oSel) {
			return;
		}
		for (i = 0; i < oSel.options.length; i++) {
			if (oSel.options[i].value == sPage) {
				oSel.selectedIndex = i;
				break;
			}
		}
		
	},

	//---------------------------------------------------------------------			
	// Test de code PHP
	// nIdx : indique le no du code à tester
	testPHP: function(nIdx) {
		var oParam, oData;
		
		if (location.protocol != 'http:') {
			alert('Il faut un serveur WEB pour cette utilisation.');
			return;
		}

		oParam = {	url: '_local/test_script.php', 
					post: true, 
					backFonction: FP.Voir.testPHPBack
					};
		oData = {txtCode: FP.TCodeMirror[nIdx].getValue()};
		
		FP.XHR.send(oParam, oData);
	},
	
	//---------------------------------------------------------------------		
	testPHPBack: function(nomFichierPHP) {
		FP.Voir.testCode(null, nomFichierPHP);
	},

	//---------------------------------------------------------------------		
	// test d'un formulaire	
	// 1ère phase : récup du nom du fichier PHP qui va tester (cf testPHP)
	testForm: function(F) {
		var idxCodePHP, oParam, oData;	
				
		if (location.protocol != 'http:') {
			alert('Il faut un serveur WEB pour cette utilisation.');
			return;
		}
		
		// data-binome est positinné dans initCodeMirror
		idxCodePHP = F.getAttribute('data-binome');
		
		oParam = {	url: '_local/test_script.php',
					post: true,
					backFonction: FP.Voir.postForm,
					backParam: F
					};
		oData = {txtCode: FP.TCodeMirror[idxCodePHP].getValue()};	
					
		FP.XHR.send(oParam, oData);		
	},
	//---------------------------------------------------------------------
	// 2eme phase : post du contenu du formulaire au fichier PHP qui va tester			
	postForm: function(nomFichierPHP, F) {
		var oParam = {	url: nomFichierPHP,
						post: (F.method == 'post'),
						backFonction: FP.Voir.postFormBack
						},
			oData = {},
			formElts = F.elements,
			i, E;
			
		for (i = 0; i < formElts.length; i++) {
			E = formElts[i];
			switch(E.type) {
			case 'reset':
				continue;
			case 'checkbox':
			case 'radio':			
				if (!E.checked) {
					continue;
				}
				break;
			//case 'select-multiple':
			//	break;
			}
			
			oData[E.name] = E.value;
		}
		
		FP.XHR.send(oParam,	oData);
	},
	
	postFormBack: function(codeHTML) {
		FP.Voir.testCode(codeHTML);
	}	

};	// Fin objet Voir

//___________________________________________________________________
// 	
// Objet XHR 
//___________________________________________________________________
FP.XHR = {
	Ajax: null,
	isRunning: false,
	backFonction: null,
	backParam: null,
	
	//---------------------------------------------------------------------			
	send: function(oParam, oData) {
		var data = '',
			nom;
						
		if (this.Ajax === null) {
			this.Ajax = new XMLHttpRequest();
		}
		
		if (this.isRunning) {
			alert('Un traitement est déjà en cours.');
			return false;
		}
		
		for (nom in oData) {
			data += '&' + nom + '=' + encodeURIComponent(oData[nom]);
		}
		data = data.substring(1);
		
		if (data == '') {
			return;
		}
		
		if (oParam.post) {
			this.Ajax.open('POST', oParam.url, true);
			this.Ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');	
		} else {
			this.Ajax.open('GET', oParam.url + '?' + data, true);
		}
		
		this.isRunning = true;
		this.Ajax.onload = FP.XHR.back;
		this.backFonction = (typeof oParam.backFonction === 'function') ? oParam.backFonction :  null;
		this.backParam = oParam.backParam || null;
		
		this.Ajax.send(data);
		
	},
	//---------------------------------------------------------------------		
	back: function() {
		var XHR = FP.XHR,
			backFonction = XHR.backFonction,
			backParam = XHR.backParam;

		XHR.isRunning = false;
		XHR.backFonction = function() {};
		XHR.backParam = null;
		XHR.Ajax.onload = function() {};
				
		if (XHR.Ajax.status != 200) {
			alert("Erreur dans la connexion au serveur Web \n" + 
						XHR.Ajax.status + ' : ' + XHR.Ajax.statusText);
		} else {
			if (backFonction !== null) {
				backFonction(XHR.Ajax.responseText, backParam);
			}	
		}
	}
};	// Fin objet XHR


//___________________________________________________________________
// 	
// Objet Search pour recherche texte
//___________________________________________________________________
FP.Search =  {
	// certaines propriétés sont contenues dans 
	// le fichier _local/search_xxxx.js :
	// FP.Search.fichiers 
	// FP.Search.a ==>> FP.Search.z
	// FP.Search.mots
	
	premierCaractere: '',
	oBoite: null,	// SRCH-bloc
	oInput: null,	// SRCH-texte
	oDatalist: null,	// SRCH-datalist
	oUL: null, 		//SRCH-resultats
	ERa: /[àäâ]/g,
	ERc: /[ç]/g,
	ERe: /[éèê]/g,	
	ERi: /[îï]/g,
	ERo: /[öô]/g,
	ERu: /[ùüû]/g,

	//---------------------------------------------------------------------	
	// Réinitialisation des propiétés au chargement d'une page
	reinit: function() {
		var D = top.frames.frames['frameTuto'].document,
			B;
		
		this.oInput = D.getElementById('SRCH-texte');
		
		if (!this.oInput) {
			B = D.getElementById('LIEN-search');
			(B) && B.parentNode.removeChild(B);
			return;
		}
		
		this.premierCaractere = '';
		this.oBoite = D.getElementById('SRCH-bloc');
		this.oDatalist = D.getElementById('SRCH-datalist');
		this.oUL = D.getElementById('SRCH-resultats');
	},
		
	//---------------------------------------------------------------------	
	// Code HTML de la boite de recherche
	getHTMLBoite: function() {
		return '<form onsubmit="top.FP.Search.makeResultats();return false;" id="SRCH-bloc" style="display: none; margin: 0">' + 
				'<label for="SRCH-texte">Rechercher</label> ' +
				'<input type="text" name="SRCH-texte" id="SRCH-texte" list="SRCH-datalist" ' +
					'oninput="top.FP.Search.inputCaractere()">' +
				'<datalist id="SRCH-datalist"></datalist>' +
				'<input type="submit" name="SRCH-btn" id="SRCH-btn" value=" ">' +			
				'<ul id="SRCH-resultats"></ul>' +
			'</form>';
	},
	
	//---------------------------------------------------------------------	
	// Affichage boite de recherche
	showBoite: function() {
		if (this.oBoite.style.display == 'block') {
			this.oBoite.style.display = 'none';
		} else {
			this.oBoite.style.display = 'block';
			//this.oInput.value = '';
			this.oInput.focus();
		}
	},
	
	//---------------------------------------------------------------------	
	// Saisie d'un caractère dans la zone de recherche
	inputCaractere: function() {
		var mot = this.oInput.value.toLowerCase();
		
		if (mot.length == 0) {
			this.premierCaractere = '';
			return;
		}
			
		mot = mot.replace(this.ERa, 'a');
		mot = mot.replace(this.ERc, 'c');
		mot = mot.replace(this.ERe, 'e');
		mot = mot.replace(this.ERi, 'i');
		mot = mot.replace(this.ERo, 'o');
		mot = mot.replace(this.ERu, 'u');
				
		if (mot.length != 1) {
			this.oInput.value = mot;
			return;
		}
		
		if (mot == this.premierCaractere) {
			return;
		}
		
		this.premierCaractere = mot;
		
		if (this[this.premierCaractere]) {
			this.oDatalist.innerHTML = this[this.premierCaractere];
		} else {
			this.oDatalist.innerHTML = '';
		}
		this.oInput.value = mot;
	},

	//---------------------------------------------------------------------	
	// Recherche et composition de la liste des résultats
	makeResultats: function() {
		var mot = this.oInput.value,
			H = '', 
			i;
			
		if (mot == '') {
			return;
		}
		
		// Liens du mot	
		if (this.mots[mot]) {
			H += this.getLI(mot);
		}
		
		// Liens des mots suivants
		for (i = this.tabMots.indexOf(mot) + 1; i < this.tabMots.length; i++) {
			if (this.tabMots[i].substring(0, mot.length) == mot) {
				H += this.getLI(this.tabMots[i]);
			}
		}
		
		this.oUL.innerHTML = (H != '') ? H : '<li>Pas de correspondance</li>';
	},
	
	//---------------------------------------------------------------------	
	// Composition du code HTML de la liste des résultats pour un mot
	getLI: function(mot) {
		var H = '',
			liens = this.mots[mot],
			i, oPage;
			
		H += '<li class="SRCH-mot-resultat"><strong>' + mot + '</strong></li>';
			
		for (i = 0; i < liens.length; i = i + 2) {
			oPage = FP.TPage[this.fichiers[liens[i]]];
			if (!oPage) {
				continue;
			}
			H += '<li><a onclick="top.FP.Voir.showPageTuto(\'' + oPage.fic + '\')"' +
						'class="SRCH-lien"><strong>' 
					+ oPage.titre + '</strong> (' +	liens[i + 1] + ')' +
					'<div class="SRCH-resume">' + oPage.resume + '</div></a></li>';
		}
		return H;
	}
	
};	// Fin objet Search


if ('ab'.substr(-1) != 'b') {
	String.prototype.substr = function(substr) {
		return function(start, length) {
			if (start < 0) start = this.length + start;
			return substr.call(this, start, length);
		}
	}(String.prototype.substr);
}