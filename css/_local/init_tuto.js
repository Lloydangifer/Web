(function() {
	var numChap, 
		dossier,
		FP = window.FP;						 
	
	FP.init({tutoID: 'CSS',
			tutoTitre: '<span class="TIT-lettre">C</span>ascading <span class="TIT-lettre">S</span>tyle <span class="TIT-lettre">S</span>heets',
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
				styleActiveLine: true,
				autoCloseTags: true,
				lineWrapping: true
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
	dossier = 'css01';
	FP.TChap[numChap] = new FP.Chapitre('Principes généraux', numChap);
				
	FP.addPage({titre: 'Séparation contenu et forme',
				resume: 'Une idée ancienne, des débuts difficiles, une situation embrouillée.',
				rep: dossier,
				fic: 'css01a1', 
				chap: numChap});
				
	FP.addPage({titre: 'Règles de style',
				resume: 'Les styles sont définis par des règles, des sélecteurs et des propriétés.',
				rep: dossier,
				fic: 'css01b1',
				parts: [["Définitions"], 
						["Syntaxe"]],
				chap: numChap});
	 
	FP.addPage({titre: 'Document Object Model',
				resume: 'Le DOM est une représentation du code HTML sous la forme d\'un arbre.',
				rep: dossier,
				fic: 'css01c1',
				parts: [["L'arbre DOM"], 
						["Vocabulaire"]],
				chap: numChap});
												
	FP.addPage({titre: 'L\'héritage',
				resume: 'Certaines propriétés sont transmises par les ancêtres à leurs descendants.',
				rep: dossier,
				fic: 'css01d1',
				chap: numChap});
												
	FP.addPage({titre: 'Inclure des styles',
				resume: 'Il y a plusieurs méthode pour inclure des feuilles de styles dans HTML.',
				rep: dossier,
				fic: 'css01f1',
				parts: [["Feuille de style externe"], 
						["Feuille de style interne"], 
						["Règle de style locale"]],
				chap: numChap});	
										
	FP.addPage({titre: 'La cascade',
				resume: 'Les règles de styles proviennent de plusieurs origines.',
				rep: dossier,
				fic: 'css01g1',
				parts: [
						["Trois origines possibles", ["La feuille de style navigateur", "La feuille de style utilisateur", "La feuille de style auteur"]],
						["La cascade"],
						["Eviter les différences des navigateurs", ["Reset CSS", "Normalisation"]]],
				chap: numChap});											
									

	//=======================================================			
	numChap ++;
	dossier = 'css02';
	FP.TChap[numChap] = new FP.Chapitre('Sélectionner des éléments', numChap, 'Sélectionner');

	FP.addPage({titre: 'Tous les sélecteurs',
				resume: 'Liste de tous les sélecteurs. Pour accès rapide.',
				rep: dossier,
				fic: 'css02b1',
				chap: numChap});
									
	FP.addPage({titre: 'Sélecteurs simples',
				resume: 'Sélecteur universel, de type, de classe, d\'identifiant',
				rep: dossier,
				fic: 'css02c1',
				parts: [["Sélecteur universel"], 
						["Sélecteur de type"], 
						["Sélecteur de classe"], 
						["Sélecteur d'identifiant"]],
				chap: numChap});
											
	FP.addPage({titre: 'Sélecteurs d\'attribut',
				resume: 'Sélectionner des éléments d\'après des valeurs de leurs attributs.',
				rep: dossier,
				fic: 'css02d1',
				parts: [["Présence d'un attribut"], 
						["Valeur égale"], 
						["Commence par"], 
						["Finit par"], 
						["Contient"], 
						["Remarques"]],
				chap: numChap});
											
	FP.addPage({titre: 'Pseudo classes',
				resume: 'Sélectionner des éléments avec des informations qui ne sont pas le DOM.',
				rep: dossier,
				fic: 'css02e1',
				parts: [["Interaction : hover, active, focus"], ["Liens : link, visited"], 
						["Position : nth-child(), nth-last-child()"], ["Type : first-of-type, last-of-type, only-of-type"], 
						["Type: nth-of-type(), nth-last-of-type()"], ["Formulaire : enabled, disabled, checked"], 
						["Négation : not()"], ["Remarques"]],
				chap: numChap});	
											
	FP.addPage({titre: 'Pseudo éléments',
				resume: 'Les pseudo éléments créent des éléments en dehors du DOM.',
				rep: dossier,
				fic: 'css02f1',
				parts: [["Première ligne ::first-line"], 
						["Premier caractère ::first-letter"], 
						["Contenu avant et après ::before et ::after"]],
				chap: numChap});				
											
	FP.addPage({titre: 'Sélecteurs regroupés',
				resume: 'Définir le même bloc de décalarations de style pour plusieurs sélecteurs.',
				rep: dossier,
				fic: 'css02g1',
				chap: numChap});				
											
	FP.addPage({titre: 'Sélecteur de descendants',
				resume: 'Sélectionner les éléments dans une relation ancêtre / descendants.',
				rep: dossier,
				fic: 'css02g2',
				chap: numChap});					
											
	FP.addPage({titre: 'Sélecteur d\'enfants',
				resume: 'Sélectionner les éléments dans une relation parent / enfants',
				rep: dossier,
				fic: 'css02g3',
				chap: numChap});						
											
	FP.addPage({titre: 'Sélecteur d\'adjacents directs',
				resume: 'Sélectionner des éléments précédés immédiatement par un autre élément.',
				rep: dossier,
				fic: 'css02g4',
				chap: numChap});									
											
	FP.addPage({titre: 'Sélecteur adjacents indirects',
				resume: 'Sélectionner des éléments précédés par un autre élément.',
				rep: dossier,
				fic: 'css02g5',
				chap: numChap});
											
	FP.addPage({titre: 'La spécificité des sélecteurs',
				resume: 'Choisir la déclaration à appliquer en cas de concurrence.',
				rep: dossier,
				fic: 'css02h1',
				chap: numChap,
				exos: [
						['exo_css_resto', 'Resto CSS']
						]});
								
	//=======================================================			
	numChap ++;
	dossier = 'css03';
	FP.TChap[numChap] = new FP.Chapitre('Positionner des éléments', numChap, 'Positionner');					
				
	FP.addPage({titre: 'C\'est dans la boîte',
				resume: 'Les éléments HTML sont des boîtes qui s\'empilent ou s\'alignent.',
				rep: dossier,
				fic: 'css03a1',
				parts: [["Des boîtes dans des boîtes dans ..."], 
						["Bloc ou en ligne"], 
						["Différences"]],
				chap: numChap});
							
	FP.addPage({titre: 'Bloc conteneur',
				resume: 'Le positionnement se fait par rapport à un bloc conteneur.',
				rep: dossier,
				fic: 'css03a3',
				parts: [["Principe"], 
						["Définition du bloc conteneur"]],
				chap: numChap});
							
	FP.addPage({titre: 'Méthodes de positionnement',
				resume: '5 méthodes différentes pour positionner les boîtes des éléments.',
				rep: dossier,
				fic: 'css03a4',
				chap: numChap});
				
	FP.addPage({titre: 'Positionnement normal',
				resume: 'Le positionnement par défaut est le postionnement suivant le flux normal.',
				rep: dossier,
				fic: 'css03b1',
				chap: numChap});
							
	FP.addPage({titre: 'Positionnement relatif',
				resume: 'Déplacer une boîte relativement à son positionnemt normal.',
				rep: dossier,
				fic: 'css03c1',
				chap: numChap});
												
	FP.addPage({titre: 'Positionnement absolu',
				resume: 'La boîte est retirée du flux normal et positionnée dans son bloc conteneur',
				rep: dossier,
				fic: 'css03d1',
				parts: [["Principes"], 
						["Changement de conteneur"], 
						["Effets indésirables"], 
						["Contexte de superposition"], 
						["Définir left, top, right, bottom"]],
				chap: numChap});
								
	FP.addPage({titre: 'Positionnement fixe',
				resume: 'La boîte est positionnée par rapport à la zone d\'affichage du navigateur.',
				rep: dossier,
				fic: 'css03e1',
				parts: [["Principes"], 
						["Entête toujours visible"], 
						["Boîte de dialogue modale"]],
				chap: numChap});

							
	FP.addPage({titre: 'Positionnement flottant',
				resume: 'La boîte est placée tout à gauche ou tout à droite de son conteneur.',
				rep: dossier,
				fic: 'css03f1',
				parts: [["Principes"], 
						["Eviter l'entourage"], 
						["Eviter les chevauchement"], 
						["Boîtes flottantes adjacentes"], 
						["Mise en page avec colonnes"]],
				chap: numChap});

				
	//=======================================================			
	numChap ++;
	dossier = 'css05';
	FP.TChap[numChap] = new FP.Chapitre('Boîtes et dimensions',numChap);

	FP.addPage({titre: 'Rappels',
				resume: 'Les composants d\'une boîte',
				rep: dossier,
				fic: 'css05a1',
				chap: numChap});
							
	FP.addPage({titre: 'La propriété display',
				resume: 'Forcer le mode d\'affichage d\'une boîte.',
				rep: dossier,
				fic: 'css05a2',
				parts: [["Comment est défini le mode d'affichage"], 
						["Masquer/afficher un élément"], 
						["Liste horizontale"], 
						["Mode 'bloc en ligne'"]],
				chap: numChap});
							
	FP.addPage({titre: 'Les marges externes',
				resume: 'Les définir avec des propriétés individuelles ou le raccourci margin.',
				rep: dossier,
				fic: 'css05a3',
				parts: [["La propriété margin"], 
						["Propriétés individualisées"], 
						["Fusion des marges"]],
				chap: numChap});
							
	FP.addPage({titre: 'Les bordures',
				resume: 'Mettre des bordures sur une boîte : épaisseur, style, couleur.',
				rep: dossier,
				fic: 'css05a4',
				chap: numChap,
				exos: [
						['exo_bordure', 'Bordures individualisées']
						]});
							
	FP.addPage({titre: 'Coins arrondis',
				resume: 'Bordures avec des coins arrondis ou en ellipse.',
				rep: dossier,
				fic: 'css05a5',
				parts: [["Coins arrondis"], 
						["Coins en ellipse"]],
				chap: numChap});
							
	FP.addPage({titre: 'Les marges internes',
				resume: 'Les définir avec des propriétés individuelles ou le raccourci padding.',
				rep: dossier,
				fic: 'css05a6',
				parts: [["La propriété padding"], 
						["Propriétés individualisées"]],
				chap: numChap});
							
	FP.addPage({titre: 'Largeur et hauteur',
				resume: 'Fixer les dimensions des boîtes de type bloc.',
				rep: dossier,
				fic: 'css05a7',
				parts: [["Largeur et hauteur"], 
						["Dimensions minimum et maximum"]],
				chap: numChap});

	//=======================================================			
	numChap ++;
	dossier = 'css06';
	FP.TChap[numChap] = new FP.Chapitre('Couleur et arrière-plan',numChap);

	FP.addPage({titre: 'Définir une couleur',
				resume: 'Il existe plusieurs façons de définir une couleur.',
				rep: dossier,
				fic: 'css06a1',
				parts: [["Notation hexadécimale"], 
						["Fonction rgb()"], 
						["Fonction rgba()"], 
						["Fonction hsl()"], 
						["Fonction hsla()"], 
						["Mots clés"], 
						["Couleurs système"]],
				chap: numChap});

	FP.addPage({titre: 'Couleur/ombrage du texte',
				resume: 'Spécifier la couleur et l\'ombrage des textes.',
				rep: dossier,
				fic: 'css06a2',
				parts: [["La propriété color"], 
						["Ombrage du texte"]],
				chap: numChap});

	FP.addPage({titre: 'Couleur de fond',
				resume: 'Spécifier une couleur de fond pour un élément.',
				rep: dossier,
				fic: 'css06b1',
				parts: [["Définir la couleur de fond"], 
						["Définir la zone de fond"]],
				chap: numChap,
				exos: [
						['exo_figure_rvb', 'Figure RVB']
						]});

	FP.addPage({titre: 'Image de fond',
				resume: 'Spécifier une image de fond pour un élément.',
				rep: dossier,
				fic: 'css06b2',
				parts: [["Définir l'image source"], 
						["Répétition de l'image de fond"], 
						["Zone couverte par l'image de fond"], 
						["Position de l'image de fond", ["Sprites CSS"]],
						["Attachement du fond"], 
						["Taille de l'image de fond"], 
						["Raccourci background"]],
				chap: numChap});

	FP.addPage({titre: 'Plusieurs images de fond',
				resume: 'Définir plusieurs images de fond pour un élément.',
				rep: dossier,
				fic: 'css06b3',
				chap: numChap});

	FP.addPage({titre: 'Dégradés',
				resume: 'Dégradés linéraires, radiaux ou répétitifs comme image de fond.',
				rep: dossier,
				fic: 'css06c1',
				parts: [
						["Dégradés linéaires", ["Dégradés subtiles", "Dégradés avec plus de 2 couleurs"]],
						["Dégradés radiaux"], 
						["Dégradés répétitifs", ["Dégradés linéaires répétitifs", "Dégradés radiaux répétitifs"]]],
				chap: numChap,
				exos: [
						['exo_degrade_lineaire', 'Dégradé linéaire']
						]});

	FP.addPage({titre: 'Ombrage des boîtes',
				resume: 'Spécifier l\'ombrage des boîtes.',
				rep: dossier,
				fic: 'css06d1',
				parts: [
						["Ombre externe"],
						["Ombre interne"],
						["Ombres mulitples"]],
				chap: numChap});

				
	//=======================================================			
	numChap ++;
	dossier = 'css04';
	FP.TChap[numChap] = new FP.Chapitre('Police et textes',numChap);
	 
	FP.addPage({titre: 'Polices de caractères',
				resume: 'Choisir et définir des polices de caractères.',
				rep: dossier,
				fic: 'css04a1',
				parts: [["La propriété font-family"], 
						["Liste de polices"], 
						["Ratio d'aspect"], 
						["Propriété héritée"]],
				chap: numChap});
	 
	FP.addPage({titre: 'Taille de police',
				resume: 'Fixer la taille des caractères. Valeur absolue ou relative.',
				rep: dossier,
				fic: 'css04a2',
				parts: [["La propriété font-size"], 
						["Taille en pixels"], 
						["Taille en em"], 
						["Taille en rem"], 
						["Taille en pourcentage"]],
				chap: numChap,
				exos: [
						['exo_arreter_em', 'Arrêter le cumul proportionnel']
						]});
	 
	FP.addPage({titre: 'Hauteur de ligne',
				resume: 'Déterminer la hauteur des lignes du texte.',
				rep: dossier,
				fic: 'css04a3',
				parts: [["La propriété line-height"], 
						["Centrage verticale"]],
				chap: numChap});
	 
	FP.addPage({titre: 'Graisse, italique et variant',
				resume: 'Définir du texte en gras et en italique. Petites majuscules.',
				rep: dossier,
				fic: 'css04a4',
				parts: [["Graisse avec font-weight"], 
						["Italique avec font-style"], 
						["Petites majuscules avec font-variant"]],
				chap: numChap});
	
	FP.addPage({titre: 'Le raccourci font',
				resume: 'Pour définir en une seule fois police, taille, hauteur de ligne, graisse.',
				rep: dossier,
				fic: 'css04a5',
				chap: numChap});
	
	FP.addPage({titre: 'Alignement du texte',
				resume: 'Alignement à gauche, à droite, centrer. Alignement vertical.',
				rep: dossier,
				fic: 'css04a6',
				parts: [["Alignement horizontal"], 
						["Alignement vertical", ["Aligner image et texte"]]],
				chap: numChap});

				
	/*			 
	FP.addPage({titre: 'Importer une police',
				resume: 'directive @font-face',
				rep: dossier,
				fic: 'css04xx1',
				chap: numChap});
	*/
														
	//=======================================================			
	numChap ++;
	dossier = 'css08';
	FP.TChap[numChap] = new FP.Chapitre('Mise en page',numChap);
	
	FP.addPage({titre: 'Multicolonnage',
				resume: 'Répartir du contenu sur plusieurs colonnes.',
				rep: dossier,
				fic: 'css08a1',
				parts: [["Définir des colonnes", ["Nombre de colonnes", "Largeur des colonnes"]], 
						["Les gouttières"],
						["Contenu sur plusieurs colonnes"],
						["Equilibrer les colonnes"],
						["Gérer les changements de colonnes"]],
				chap: numChap});
		
	FP.addPage({titre: 'Listes',
				resume: 'Propriétés de liste. Compteur de ligne. Lignes flottantes.',
				rep: dossier,
				fic: 'css08b1',
				parts: [["Propriétés de liste", ["Types de puce", "Position de la puce", "Image comme puce"]], 
						["Listes avec image et texte"],
						["Compteur de lignes"],
						["Lignes flottantes"]],
				chap: numChap,
				exos: [
						['exo_top_5', 'Top 5'],
						['exo_top_5_inverse', 'Top 5 inversé'],
						['exo_liste_flottante', 'Vignettes flottantes']]
				});			

	FP.addPage({titre: 'Listes et menus',
				resume: 'Utiliser des listes pour construire des menus à plusieurs niveaux.',
				rep: dossier,
				fic: 'css08b2',
				parts: [["Menus à un seul niveau", ["Menu vertical", "Toute la ligne cliquable", "Menu horizontal"]], 
						["Menus à plusieurs niveaux", ["Principes de fonctionnement"]]],
				chap: numChap,
				exos: [
						['exo_menu_vertical', 'Menu vertical'],
						['exo_menu_horizontal', 'Menu horizontal'],
						['exo_menu_3_niveaux', 'Menu à 3 niveaux']]
				});			
				
						
	FP.addPage({titre: 'Tableaux',
				resume: 'Présentations des tableaux et mise en forme des données.',
				rep: dossier,
				fic: 'css08c1',
				parts: [["Propriétés de base", ["Rappel sur les tableaux", "Bordure et espacement des cellules", "Dimensions"]], 
						["Mise en forme", ["Couleur/image de fond", "Zébrage", "Survol des lignes"]]],
				chap: numChap,
				exos: [
						['exo_table_1', 'Dans nos hangars'],
						['exo_table_2', 'Dans nos hangars : le retour']]
				});						

	/*
	FP.addPage({titre: 'Boîtes flexibles',
				resume: 'Structure et principes. Alignement des items dans le conteneur.',
				rep: dossier,
				fic: 'css08d1',
				parts: [["Principes", ["Un conteneur, des items", "Direction d'affichage des items"]],
						["Alignement des items", ["Alignement sur l'axe principal", "Alignement sur l'axe transversal"]]],
				chap: numChap,
				exos: [
						['exo_flex_1', 'Bandeau de navigation']]
				});					

	FP.addPage({titre: 'Boîtes flexibles : items',
				resume: 'Flexibilité des items',
				rep: dossier,
				fic: 'css08d2',
				parts: [["aaa", ["a1", "a2"]],
						["bbb", ["b1", "b2"]]],
				chap: numChap});
	*/	
})();