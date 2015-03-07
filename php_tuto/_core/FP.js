if (!document.getElementsByClassName
|| !document.addEventListener
|| !document.querySelector
|| !window.localStorage
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
			
	chapCourantNum: -1,		// No de chapitre en cours
	pageCouranteFic: '',	// Nom du fichier htmlde la page en cours
	pageCouranteNum: -1,	// No de la page en cours dans le chapitre
	pageCouranteType: -1,	// Type de la page en cours
	pageAfter: '',	// Code HTML du lien <a> de la page suivante
	pageBefore: '',	// Code HTML du lien <a> de la page précédente
						
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
	
	Video: {},			// Initialisé dans init_tuto.js -> FP.init()
				
	PAGE_TUTO: 1,
	PAGE_EXEMPLE: 2,
	PAGE_TECH: 3,
	PAGE_EXO: 4,
	PAGE_ACCUEIL: 5,
	PAGE_SOMMAIRE: 6,
	
	//-------------------------------------------------------------------------
	init: function(oConf) {
		this.tutoID = oConf.tutoID || '-';
		this.tutoTitre = oConf.tutoTitre || '-';	
		this.mailTo = oConf.mailTo || '-';	
		this.CodeMirrorEditeur = oConf.CodeMirrorEditeur || {};
		this.CodeMirrorMode = oConf.CodeMirrorMode || {};
		this.Video = oConf.Video || {};
		this.repTech = oConf.repTech || '';
					
		this.isTuto = (this.tutoID.indexOf('TECH') == -1);
		this.repBase = unescape(location.href.substring(0, location.href.lastIndexOf('/') + 1));
		//this.repBase += '../';
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
		
		FP.setBeforeAfter();
		
		top.document.title = FP.tutoID + ' tutoriel'; // + ' - ' + FP.TPage[FP.pageCouranteFic].titre;
		
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
			top.frames['frameTuto'].addEventListener('load', function() {top.FP.Voir.showPartie(ancre);}, false);
		}
	},
		
	//--------------------------------		
	// Composition du bloc fixe navigation générale		
	makeMenuTop: function() {
		var D = top.frames['frameTuto'].document,
			B = D.getElementById('MENU-top'),
			H;
						
		if (B === null) {
			return;
		}

		H = '<span id="TIT-tuto" onclick="top.FP.Voir.showPageTuto(\'tuto\')">' + this.tutoTitre + '</span>' +
			this.pageAfter +
			'<a class="LIEN-page-top" href="#" title="Haut de page"></a>' +
			this.pageBefore;
			
		if (this.tutoID == 'PHP'
		&& ! this.isMoodle) {
			H += '<a id="MENU-top-rep" title="Dossier de travail" ' +
					'onclick="top.FP.Voir.showPLUS(\'exemple/gestionrepert.php\')"></a>';
		}
				
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
	makeMenuPage: function() {
		var	D = top.frames['frameTuto'].document,
			H = '',
			BlocMenu = D.getElementById('MENU-page'),
			lettres = ['A','B','C','D','E','F','G','H','I','J','K','L','M',
					'N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
			H3s, H4s, i, j, B, Section;
			
		if (BlocMenu === null) {
			return;
		}
		
		H3s = D.getElementsByTagName('H3');
			
		for (i = 0; i < H3s.length; i++) {
			H3s[i].addEventListener('click', FP.showHideSection, false);			
			H3s[i].id = lettres[i];
			
			H += '<li><a onclick="top.FP.Voir.showPartie(\'' + H3s[i].id + '\', document)">' + H3s[i].textContent + '</a>';
			
			// Recherche des sous-parties
			B = H3s[i];
			Section = null;
			while(B = B.nextSibling) {
				if (B.nodeName == 'SECTION') {
					Section = B;
					break;
				}
			}
				
			if (Section === null) {
				continue;
			}
		
			H4s = Section.getElementsByTagName('H4');
			
			if (H4s.length > 0) {
				H += '<ol>';
				for (j = 0; j < H4s.length; j++) {
					H4s[j].addEventListener('click', FP.showHideSection, false);
					H4s[j].id = lettres[i] + j;
					
					H += '<li><a onclick="top.FP.Voir.showPartie(\'' + H4s[j].id + '\', document)">' + H4s[j].textContent + '</a>';
				}
				H += '</ol>';
			}
			
			H += '</li>';			
		}
					
		if (H != '') {
			BlocMenu.innerHTML = H;
		} else {
			BlocMenu.parentNode.removeChild(BlocMenu);
		}
	},

	//-------------------------------------------------------------------------
	// Composition de bas des pages
	makeBasPage: function() {
		var H,
			B = top.frames['frameTuto'].document.getElementsByTagName('FOOTER')[0];
			
		if (B !== null) {
			H = this.pageAfter	+
				'<a class="LIEN-page-top" href="#" title="Haut de page"></a>' +
				this.pageBefore +
				'&copy; <a href="mailto:' + this.mailTo + '">François Piat</a>';
			B.innerHTML = H;
		}
	},
		
	//-------------------------------------------------------------------------	
	// Initialisation des extraits de code et des exemples
	initCodeMirror: function() {
		var W = top.frames['frameTuto'],
			D = W.document,
			r1 = /&lt;/g,
			r2 = /&gt;/g,
			r3 = /__ID__/g,
			TCode, i, mode, readOnly,
			codeBtnTester, codeBntOrig, codeBtn, 
			B, ndParent, N, TxtArea;		       
				
		// On recherche tous les éléments dont la classe est 'TEST-textarea'.
		// Normalement ce sont tous des <textarea>
		// Pour chacun on crée un éditeur CodeMirror et les boutons de gestion. 
		TCode = D.querySelectorAll('.TEST-textarea');
		
		if (location.host == 'moodle.univ-fcomte.fr') {
			codeBtnTester = '<span class="fp-petit">Moodle ne permet pas de tester le code.</span>';
			codeBntOrig = '<span class="fp-petit">&nbsp;Installez le tutoriel sur votre machine.</span>';
		} else if (location.protocol != 'http:') {
			codeBtnTester = '<span class="fp-petit">Pour tester le code vous devez utiliser un serveur Web.</span>';
			codeBntOrig = '';			
		} else {		
			codeBtnTester = '<input type="button" name="btTest" value="Tester le code" ' + 
								( (FP.tutoID == 'PHP') ?
										'onclick="top.FP.Voir.testPHP(__ID__)">' :
										'onclick="top.FP.Voir.testCode(__ID__)">');

			codeBntOrig = '<input type="button" name="btCode" value="Code original" ' +
							'onclick="top.FP.Voir.setCodeOriginal(__ID__)">';	
		}
		
		for (i = 0; i < TCode.length; i++) {
			TxtArea = TCode[i];
			// Sauvegarde code source	
			this.TCodeSource[i] = TxtArea.innerHTML.replace(r1, '<').replace(r2, '>');
			
			// Ajout code mirror
			this.CodeMirrorEditeur.lineWrapping = (TxtArea.hasAttribute('data-wrap'));
			this.CodeMirrorEditeur.readOnly = (TxtArea.hasAttribute('data-readonly'));
			this.TCodeMirror[i] = W.CodeMirror.fromTextArea(TxtArea, this.CodeMirrorEditeur);
					
			// Pas de bouton si éditeur en read only
			if (this.CodeMirrorEditeur.readOnly) {
				continue;
			}
			
			// ajout boutons de gestion
			// Textarea avec data-binome : le code du textarea est exécuté
			// par le click d'un autre bouton (ex : tests des POST de formulaires).
			// Ces textarea n'ont pas de boutons 'Tester'				
			if (! TxtArea.hasAttribute('data-binome')) {
				codeBtn = codeBtnTester + codeBntOrig;
			} else {
				codeBtn = '&nbsp'; //codeBntOrig; trop piège à con
				B = D.getElementById(TxtArea.getAttribute('data-binome'));
				B.setAttribute('data-binome', i);
			}
			
			N = D.createElement('P');
			N.className = 'TEST-boutons';			
			N.innerHTML = codeBtn.replace(r3, i);
			
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
	makePageAccueil: function() {
		var D = top.frames['frameTuto'].document;
		
		FP.makeMenuTop();
		
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
			TExo, HExo;

		
		// Boucle de traitement des chapitres
		// La boucle commence à 1 car l'indice 0 est le chapitre page d'accueil du tuto			
		for (i = 1; i < this.TChap.length; i++) {
			TPagesDuChap = this.TChap[i].TPage;
			Page = this.TPage[TPagesDuChap[0]];			
			
			// Nom du chapitre
			//H += '<div><div class="SOM-tuto-titre-chap" onclick="top.FP.showHide(\'SOM_' + i + '\')">' + 
			//			this.TChap[i].titre + '</div><ul id="SOM_' + i + '" style="display: none">';	
			// Nom du chapitre
			H += '<div><div class="SOM-tuto-titre-chap" onclick="showHide(' + i + ')">' + 
						this.TChap[i].titre + '</div><ul id="SOM_' + i + '" style="display: none">';	
			HExo = '';
			
			// Boucle de traitement des pages du chapitres
			for (j = 0; j < TPagesDuChap.length; j++) {
				Page = this.TPage[TPagesDuChap[j]];
				
				if (Page.type != this.PAGE_EXO) {							
					H += '<li onclick="top.FP.Voir.showPageTuto(\'' + Page.fic + '\')">' +
							'<div class="num">' + (j + 1) + '</div>' + 
							'<span>' + '  ' + Page.titre + '</span>' +
							'<p>' + Page.resume + '</p></li>';
				}
				
				TExo = this.TExo[Page.fic];
				for (k = 0; k < TExo.length; k++) {
					HExo += '<div onclick="top.FP.Voir.showPageTuto(\''+ Page.fic + '\', \'' + TExo[k].id + '\')">' + 
								TExo[k].titre + '</div>';				
				}
			}
			
			if (HExo != '') {
				HExo = '<li class="fp-li-exo"><span>Exercices</span>' + HExo + '</li>';
			}
				
			H += HExo + '</ul><div class="fp-clear"></div>' +
				'<div class="bas" id="BAS_' + i + '" onclick="showHide(' + i + ')">&#10010; de détails</div></div>';
		}
		
		return H;
	},
	
	//-------------------------------------------------------------------------
	// Calcul des liens page précédente et page suivante
	setBeforeAfter: function() {
		var pageBefore = '',
			pageAfter = '',
			pageTmp = '',
			nomPage = '';
			
		for (nomPage in this.TPage) {
			if (nomPage == this.pageCouranteFic) {
				pageBefore = pageTmp;		
			}
			if (pageTmp == this.pageCouranteFic) {
				pageAfter = nomPage;
				break;
			}
			pageTmp = nomPage;
		}
		
		// Bouton page suivante
		if (pageAfter == '') {
			this.pageAfter = '';
		} else {
			this.pageAfter = '<a class="LIEN-page-after" ' +
					'onclick="top.FP.Voir.showPageTuto(\'' + this.TPage[pageAfter].fic + '\')" ' +
					'title="' + this.TPage[pageAfter].titre +  '"></a>';			
		} 
		
		// Bouton page précédente
		if (pageBefore == '') {
			this.pageBefore = '';
		} else {
			this.pageBefore = '<a class="LIEN-page-before" ' +
					'onclick="top.FP.Voir.showPageTuto(\'' + this.TPage[pageBefore].fic + '\')" ' +
					'title="' + this.TPage[pageBefore].titre +  '"></a>';		
		}
	},
	
	showHideSection: function() {
		var B = this;
		
		while(B = B.nextSibling) {
			if (B.nodeName == 'SECTION') {
				B.style.display = (B.style.display == 'none') ? 'block' : 'none';
				return;
			}	
		}
	},
			
	showHide: function(idBloc) {
		var B = top.frames['frameTuto'].document.getElementById(idBloc);
		
		if (B) {
			B.style.display = (B.style.display == 'none') ? 'block' : 'none';
		}
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
	postForm: null,	// Form à poster pour test POST / PHP
	
	TWin: {
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
				opt: 'width=270,height=' + (screen.availHeight - 80) + 
						',left=560,top=0,scrollbars,resizable',
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
			iFramePlus,
			isPHP = (sUrl.indexOf('.php') != -1);
			
		if (location.protocol != 'http:'
		&& isPHP) {
			alert('Il faut un serveur WEB pour cette utilisation.');
			return;
		}
		
		if (FP.isMoodle
		&& isPHP) {
			alert('Moodle ne permet pas d\'exécuter ce script.');
			return;
		}
		
		this.TWin.PLUS.url = FP.repBase + sUrl;
		
		iFramePlus = FrameTech.document.getElementById('iFramePlus');
		//this.openFenetre(this.TWin.PLUS);
		iFramePlus.src = this.TWin.PLUS.url;		
		iFramePlus.style.height = this.TWin.PLUS.opt;
		iFramePlus.style.display = 'block';

		FrameTech.FPTech.setTechHauteur();
	},

	//---------------------------------------------------------------------				
	hidePLUS: function() {
		var FrameTech = top.frames.frameTech,
			iFramePlus = FrameTech.document.getElementById('iFramePlus');
				
		iFramePlus.style.display = 'none';			
		iFramePlus.style.height = '0';

		FrameTech.FPTech.setTechHauteur();				
	},
	//---------------------------------------------------------------------			
	// Affichage exemple de code dans fenetre 
	// nIdx : Indice de l'éditeur dans TCodeMirror[] ou code si = string
	// sUrl : url du fichier à afficher dans le fenetre ou rien si nIdx est fourni
	// nBig : 	1 = 500 * 300
	// 			2 = 500 * screen.height - 80
	//			defaut : 400 * 340
	testCode: function(nIdx, sUrl, nBig) {
		var AvecFic = (typeof sUrl === 'string'),
			Width = 400, 
			Height = 520, 
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
			Width = 500; 
			Height = 300; 
			Top = 100;
		} else if (nBig === 2) {
			Width = 500; 
			Height = screen.height - 80; 
			Top = 0;
		}
		Left = screen.width - Width - 30;
		
		TEST.oWin = window.open(TEST.url, TEST.nom, 'width=' + Width + ',height=' + Height + 
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
		this.TWin.IDX.url = FP.repBase + FP.tutoID.toLowerCase() + '/idx.html#' + sAncre;
		this.openFenetre(this.TWin.IDX);
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
	showPartie: function(sAncre) {
		var D = top.frames.frameTuto.document;
		D.getElementById(sAncre).scrollIntoView();
		D.defaultView.scrollBy(0, -95);
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
		
		if (sPage == 'ini.core') { // exception
			this.TWin.TECH.url = FP.repTech + sPage + '.html#' + sAncre;
		} else {	// règle générale
			this.TWin.TECH.url = FP.repTech + sAncre + '.html';
		}
		
		top.frames.frameTech.iFrameTech.document.location.href = this.TWin.TECH.url;
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
	// 1ere phase : récup du nom du fichier PHP qui va tester (cf testPHP)
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
};
