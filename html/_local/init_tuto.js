(function() {
	var numChap, dossier,
		FP = window.FP;						 
	
	FP.init({tutoID: 'HTML',
			tutoTitre: '<span class="TIT-lettre">H</span>yper<span class="TIT-lettre">T</span>ext <span class="TIT-lettre">M</span>arkup <span class="TIT-lettre">L</span>anguage',
			mailTo: ['francois.piat@univ-fcomte.fr', 'François Piat'],
			Video: {
				height: 360,
				width: 480,
				poster: '../_core/images/_video_file_1.png',
				TMovie: []
				},
			repTech: 'tech/',
			CodeMirrorEditeur: {
				dragDrop: false,
				lineNumbers: true,
				mode: 'text/html',
				indentUnit: 4,
				indentWithTabs: true,
				enterMode: 'keep',
				gutter: true,
				fixedGutter: true,
				readOnly: false,
				tabMode: 'shift',
				lineWrapping: true,
				styleActiveLine: true,
				autoCloseTags: true
				},
			CodeMirrorMode: {
				HTML: 'text/html',
				CSS: 'text/css',
				JS: 'text/javascript', 
				JSON: 'application/json'			
				}
			});
	
	//=======================================================	
	// Dans les objets pages suivant, si type n'est pas défini,
	// il sera PAGE_TUTO par défaut
	
	//=======================================================	
	numChap = 0;
	FP.TChap[numChap] = new FP.Chapitre('Accueil',numChap);
	FP.addPage({titre: 'Accueil',
				rep: '_local',
				fic: 'tuto',
				type: FP.PAGE_ACCUEIL,
				chap: numChap});

	//=======================================================			
	numChap ++;
	dossier = 'html01';
	FP.TChap[numChap] = new FP.Chapitre('Principes généraux', numChap);
				
	FP.addPage({titre: 'Description de document',
				resume: 'HTML est un langage de balisage qui décrit la structure d\'un document.',
				rep: dossier,
				fic: 'html01a1', 
				chap: numChap});
	FP.addPage({titre: 'Balises et éléments',
				resume: 'Syntaxe des balises, définition d\'un élément',
				rep: dossier,
				fic: 'html01b1',
				parts: [["Syntaxe d'une balise"], 
						["Elément"]],
				chap: numChap});
	FP.addPage({titre: 'Attributs',
				resume: 'Les attributs permettent de caractèriser une balise.',
				rep: dossier,
				fic: 'html01b2',
				chap: numChap});				
								
	FP.addPage({titre: 'Imbrications d\'éléments',
				resume: 'Le contenu d\'un élément peut être un autre élément. Arbre DOM',
				rep: dossier,
				fic: 'html01c1',
				chap: numChap});													
	FP.addPage({titre: 'Jamais d\'erreurs',
				resume: 'Le navigateur ne s\'arrête jamais sur les erreurs et ne les précise pas.',
				rep: dossier,
				fic: 'html01c2',
				parts: [["Imbrication incorrecte"], 
						["Elément non fermé"], 
						["Erreur de syntaxe"]],
				chap: numChap});
							
	FP.addPage({titre: 'Types d\'éléments',
				resume: 'Selon leur utilité, les éléments sont classés en types.',
				rep: dossier,
				fic: 'html01d1',
				parts: [["Catégories W3C"], 
						["Catégories du tutoriel", ["En-tête", "Structure", "Groupement", "Texte", "Embarqués", "Formulaire"]]],
				chap: numChap});
				
	FP.addPage({titre: 'Mode d\'affichage',
				resume: 'Les éléments ne sont pas tous affichés de la même façon.',
				rep: dossier,
				fic: 'html01d2',
				parts: [["Les éléments invisibles"], 
						["Les éléments de bloc"], 
						["Les éléments en ligne"]],
				chap: numChap});				

	FP.addPage({titre: 'Mise en forme/mise en page',
				resume: 'CSS est le langage qui permet la mise en forme/mise en page des éléments.',
				rep: dossier,
				fic: 'html01e1',
				chap: numChap});	
							
	//=======================================================			
	numChap ++;
	dossier = 'html02';
	FP.TChap[numChap] = new FP.Chapitre('Les liens',numChap);

	FP.addPage({titre: 'Hypertexte',
				resume: 'Une idée ancienne devenue réalité avec le Web.',
				rep: dossier,
				fic: 'html02a1',
				chap: numChap});
	FP.addPage({titre: 'Client/Serveur avec HTTP',
				resume: 'Principes du dialogue client/serveur avec le protocole HTTP.',
				rep: dossier,
				fic: 'html02a2',
				chap: numChap});
											
	FP.addPage({titre: 'Les URL',
				resume: 'Définir l\'adresse d\'une ressource sur le réseau. Règles de nommage, parties d\'une URL.',
				rep: dossier,
				fic: 'html02b1',
				parts: [["Définition d'un URL"], 
						["Parties d'une URL"]],
				chap: numChap});

	FP.addPage({titre: 'Portée d\'une URL',
				resume: 'Utiliser une URL absolue ou une URL relative.',
				rep: dossier,
				fic: 'html02b2',
				parts: [["Des portées différentes"], 
						["URL absolue"], 
						["URL relative"]],
				chap: numChap,
				exos: [
						['exo_liens_relatifs', 'Faire des liens relatifs']
						]});

	FP.addPage({titre: 'Lien vers un autre document',
				resume: 'Utiliser une URL absolue ou une URL relative.',
				rep: dossier,
				fic: 'html02c1',
				parts: [["La balise &lt;a&gt;"], 
						["Ancre d'arrivée nommée", ["Ance de départ", "Ancre d'arrivée"]], 
						["Fenêtre d'affichage"]],
				chap: numChap,
				exos: [
						['exo_lien_a_01', 'Liens vers d\'autres pages - 1'],
						['exo_lien_a_02', 'Liens vers d\'autres pages - 2']
						]});

				
	//=======================================================			
	numChap ++;
	dossier = 'html03';
	FP.TChap[numChap] = new FP.Chapitre('Document et en-tête',numChap);
					
	FP.addPage({titre: 'Doctype',
				resume: 'La déclaration de doctype définit la version HTML du document.',
				rep: dossier,
				fic: 'html03a1',
				parts: [["Doctype"], 
						["Commentaires"]],
				chap: numChap});
				
	FP.addPage({titre: 'html et head',
				resume: 'La structure minimum d\'un document bien formé. Les tags html et head.',
				rep: dossier,
				fic: 'html03a2',
				parts: [["Document minimum"], 
						["La racine avec &lt;html&gt;"], 
						["L'en-tête avec &lt;head&gt;"]],
				chap: numChap});								
							
	FP.addPage({titre: 'meta',
				resume: 'L\'élément meta est le couteau suisse des métadonnées.',
				rep: dossier,
				fic: 'html03b1',
				parts: [["meta charset"], 
						["meta http-equiv"], 
						["meta name"]],
				chap: numChap});
						
	FP.addPage({titre: 'title',
				resume: 'Titre du document.',
				rep: dossier,
				fic: 'html03b2',
				chap: numChap});
	
	FP.addPage({titre: 'link',
				resume: 'Liaison de ressources concernant l\'ensemble du contenu.',
				rep: dossier,
				fic: 'html03b3',
				chap: numChap,
				exos: [
						['exo_head', 'Rédiger l\'en-tête d\'une page']
						]});
	
	FP.addPage({titre: 'style',
				resume: 'Définition de règles de styles pour la mise en page, mise en forme.',
				rep: dossier,
				fic: 'html03b4',
				chap: numChap});
				
	FP.addPage({titre: 'script',
				resume: 'Intégration de code d\'un langage de script (JavaScript, VBScript).',
				rep: dossier,
				fic: 'html03b5',
				chap: numChap});
				
					
	//=======================================================			
	numChap ++;
	dossier = 'html04';
	FP.TChap[numChap] = new FP.Chapitre('Structure',numChap);
				
	FP.addPage({titre: 'Page type',
				resume: 'L\'évolution de la structure des pages aboutit à des blocs de contenu typiques.',
				rep: dossier,
				fic: 'html04a1',
				chap: numChap});
				
	FP.addPage({titre: 'Les éléments de structure',
				resume: 'body, header, footer, nav, section, article, aside, h1 à h6',
				rep: dossier,
				fic: 'html04a2',
				parts: [["body"], 
						["header"], 
						["footer"],
						["nav"],
						["main"],
						["section"],
						["article"],
						["aside"],
						["h1 à h6"]],
				chap: numChap});
							
	FP.addPage({titre: 'Exemples et exercices',
				resume: 'Des exemples et des exercices pour composer une structure de page',
				rep: dossier,
				fic: 'html04a3',
				chap: numChap,
				parts: [["En-tête, principal et pied"], 
						["Hors-texte, à côté"]],
				exos: [
						['exo_en_tete', 'Remplir un en-tête'],
						['exo_hors_texte', 'Remplir un hors-texte'],
						['exo_section_article', 'Faire des sections et des articles'],
						['exo_principal', 'Remplir le contenu principal']
						]});
								
	//=======================================================			
	numChap ++;
	dossier = 'html05';
	FP.TChap[numChap] = new FP.Chapitre('Groupement',numChap);
				
	FP.addPage({titre: 'Paragraphe',
				resume: 'p définit des paragraphes.',
				rep: dossier,
				fic: 'html05a1',
				parts: [["Marges"], 
						["Alignement"], 
						["Emcombrement"]],
				chap: numChap});
				
	FP.addPage({titre: 'div',
				resume: 'div permet de regrouper d\'autres éléments de groupement.',
				rep: dossier,
				fic: 'html05a2',
				chap: numChap});		
								
	FP.addPage({titre: 'Liste non ordonnée',
				resume: 'Le type de listes le plus souvent utilisé.',
				rep: dossier,
				fic: 'html05b1',
				chap: numChap,
				exos: [
						['exo_liste_non_ordonnee', 'Liste contenu tutoriel HTML']
						]});
										
	FP.addPage({titre: 'Liste ordonnée',
				resume: 'Liste avec des compteurs de lignes.',
				rep: dossier,
				fic: 'html05b2',
				chap: numChap,
				exos: [
						['exo_liste_ordonnee', 'Liste contenu tutoriel CSS']
						]});
												
	FP.addPage({titre: 'Liste de définitions',
				resume: 'Pour associer deux contenus entre eux.',
				rep: dossier,
				fic: 'html05b3',
				chap: numChap,
				exos: [
						['exo_liste_definitions', 'Définitions des élements de liste']
						]});
												
	FP.addPage({titre: 'Imbrications de listes',
				resume: 'Des listes dans des listes dans des ... Exercices.',
				rep: dossier,
				fic: 'html05b4',
				chap: numChap,
				exos: [
						['exo_liste_01', 'Listes imbriquées ordonnées'],
						['exo_liste_02', 'Listes de liens']
						]});
												
	FP.addPage({titre: 'Tableaux',
				resume: 'Ils permettent de présenter des données en lignes et colonnes.',
				rep: dossier,
				fic: 'html05c1',
				parts: [["Structure minimum"], 
						["Structure avec sémantique"], 
						["Contenu des cellules"],
						["Fusion de cellules", ["Fusion horizontale avec colspan", "Fusion verticale avec rowspan"]]],
				chap: numChap,
				exos: [
						['exo_table_01', 'Catalogue Lego Junior'],
						['exo_table_02', 'Catalogue avec images et liens'],
						['exo_table_03', 'Fusion lignes et colonnes']
						]});
																
	//=======================================================			
	numChap ++;
	dossier = 'html06';
	FP.TChap[numChap] = new FP.Chapitre('Embarqués',numChap);

	FP.addPage({titre: 'Eléments embarqués',
				resume: 'Définition et remarques.',
				rep: dossier,
				fic: 'html06a1',
				chap: numChap});
					
	FP.addPage({titre: 'Images',
				resume: 'La balise img et ses attributs.',
				rep: dossier,
				fic: 'html06b1',
				parts: [["L'attribut src"], 
						["Dimensions"], 
						["Alignement"],
						["L'attribut alt"],
						["Bulle d'aide"]],
				chap: numChap,
				exos: [
						['exo_img_02', 'Images et textes (1)'],
						['exo_img_01', 'Images et textes (2)']
						]});

	FP.addPage({titre: 'Vidéos',
				resume: 'Embarquer une vidéo dans une page et gérer les différents formats.',
				rep: dossier,
				fic: 'html06c1',
				parts: [["L'élément &lt;video&gt;", ["L'attribut src", "L'attribut controls", "Dimensions", "L'attribut poster", "L'attribut autoplay", "L'attribut loop", "L'attribut preload"]], 
						["Sources multiples"]],
				chap: numChap,
				exos: [
						['exo_video_01', 'Store wars']
						]});
						
	FP.addPage({titre: 'Audio',
				resume: 'Embarquer un fichier audio dans une page et gérer les différents formats.',
				rep: dossier,
				fic: 'html06d1',
				parts: [["L'élément &lt;audio&gt;", ["L'attribut src", "L'attribut controls", "L'attribut autoplay", "L'attribut loop", "L'attribut preload"]], 
						["Sources multiples"]],
				chap: numChap});
				
	FP.addPage({titre: 'iframe',
				resume: 'Embarquer une page Web dans une autre page Web.',
				rep: dossier,
				fic: 'html06e1',
				parts: [["L'élément &lt;iframe&gt;", ["Dimensions", "L'attribut src", "Bordure", "Barres de défilement"]], 
						["Liens et iframe"], 
						["Protection"]],
				chap: numChap,
				exos: [['exo_iframe_01', 'Liens vers un iframe'],
						['exo_iframe_02', 'Liens vers des iframes']]});				

	//=======================================================			
	numChap ++;
	dossier = 'html07';
	FP.TChap[numChap] = new FP.Chapitre('Texte',numChap);
	
	FP.addPage({titre: 'Principaux éléments',
				resume: 'Seuls quelques éléments sont utilisés en réalité car la mise en forme se fait maintenant avec CSS.',
				rep: dossier,
				fic: 'html07a1',
				parts: [["&lt;strong&gt; : important"], 
						["&lt;em&gt; : emphase"], 
						["&lt;br&gt; : saut de ligne"],
						["&lt;span&gt; : affecter un style"]],
				chap: numChap,
				exos: [['exo_texte_01', 'Rendu des éléments texte']]});			
				
	//=======================================================			
	numChap ++;
	dossier = 'html08';
	FP.TChap[numChap] = new FP.Chapitre('Formulaire',numChap);
	
	FP.addPage({titre: 'Présentation',
				resume: 'Saisie d\'informations dans une page et envoi des données au serveur.',
				rep: dossier,
				fic: 'html08a1',
				chap: numChap});
				
	FP.addPage({titre: 'Structure d\'un formulaire',
				resume: 'Composants et éléments de présentation fieldset, legend, label.',
				rep: dossier,
				fic: 'html08a2',
				parts: [["Structure de base", ["Créer des lignes", "Mise en forme rapide"]], 
						["L'indispensable bouton de soumission"], 
						["&lt;fieldset&gt; et &lt;legend&gt;"],
						["&lt;label&gt;", ["Associer un label à une zone"]]],
				chap: numChap,
				exos: [['exo_form_01', 'Structurer un formulaire']]});	

	FP.addPage({titre: 'Element &lt;form&gt;',
				resume: 'Indispensable pour créer un formulaire. 3 attributs importants.',
				rep: dossier,
				fic: 'html08b1',
				parts: [["L'attribut action"], 
						["L'attribut method"], 
						["L'attribut enctype"]],
				chap: numChap});
				
	FP.addPage({titre: 'Attributs des zones',
				resume: 'Beaucoup d\'attributs commums dont certains obligatoires.',
				rep: dossier,
				fic: 'html08c1',
				parts: [["Le couple name / value", ["L'atribut name", "L'attribut value"]], 
						["Tous les attributs"], 
						["Les zones et leurs attributs"]],
				chap: numChap});
				
	FP.addPage({titre: 'Saisie de texte',
				resume: 'Texte simple, masqué, multi-lignes, suggestions, recherche',
				rep: dossier,
				fic: 'html08d1',
				parts: [["Texte simple"], 
						["Texte masqué"], 
						["Texte multi-lignes"],
						["Texte avec liste de suggestions"],
						["Recherche"]],
				chap: numChap,
				exos: [['exo_input_text', 'Saisie texte simple'],
						['exo_textarea', 'Saisie textarea'],
						['exo_datalist', 'Liste de suggestions']]});	
				
	FP.addPage({titre: 'Boutons radio',
				resume: 'Pour faire un choix exclusif dans un groupe d\'options.',
				rep: dossier,
				fic: 'html08d2',
				chap: numChap,
				exos: [['exo_btn_radio', 'Groupes de boutons radio']]});
					
	FP.addPage({titre: 'Cases à cocher',
				resume: 'Pour faire des choix multiples dans un groupe d\'options.',
				rep: dossier,
				fic: 'html08d3',
				chap: numChap,
				exos: [['exo_case_cocher', 'Ajouter à mes amis']]});	
											
	FP.addPage({titre: 'Listes de sélection',
				resume: 'Listes déroulantes ou défilantes, choix multiple, groupement de lignes.',
				rep: dossier,
				fic: 'html08d4',
				parts: [["Structure d'une liste"], 
						["Déroulante ou défilante"], 
						["Sélections multiples"],
						["Groupement de lignes"]],
				chap: numChap,
				exos: [['exo_select_01', 'Listes de sélection'],
						['exo_select_02', 'Voyages-sncf.com']]});	
											
	FP.addPage({titre: 'Formats spécifiques',
				resume: 'Les nombres, les URL, les adresse mail et les numéros de téléphone.',
				rep: dossier,
				fic: 'html08d5',
				parts: [["Nombres"], 
						["URL"], 
						["e-mail"],
						["Téléphone"]],
				chap: numChap,
				exos: [['exo_number', 'Recherche location'],
						['exo_url_email', 'Enquête']]});	
											
	FP.addPage({titre: 'Date et heure',
				resume: 'Zones de saisie pour les dates, les mois, les semaines, et les heures.',
				rep: dossier,
				fic: 'html08d6',
				parts: [["Dates"], 
						["Mois"], 
						["Semaines"],
						["Heures"],
						["Date et heure"]],
				chap: numChap});			
								
	FP.addPage({titre: 'Zones diverses',
				resume: 'Zone cachée, intervalle, téléchargement de fichier, couleurs.',
				rep: dossier,
				fic: 'html08d7',
				parts: [["Zone cachée"], 
						["Intervalle"], 
						["Téléchargement de fichier"],
						["Sélecteur de couleur"]],
				chap: numChap});

	FP.addPage({titre: 'Boutons',
				resume: 'Indispensables pour la gestion du formulaire : submit, reset, button, image.',
				rep: dossier,
				fic: 'html08d8',
				parts: [["Avec l'élément input", ["Bouton de soumission", "Bouton de réinitialisation", 
												"Bouton de script", "Bouton image"]],
						["Avec l'élément button", ['Structure HTML', 'Attribut type', 'Tous les attributs']]],
				chap: numChap,
				exos: [['exo_input_submit', 'Noter'],
						['exo_button', 'Hacking']]});	
})();