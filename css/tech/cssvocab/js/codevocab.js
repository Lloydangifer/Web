CodeVocab = {
	vocab: [
	{'token': 'comment', 'fr': 'Commentaire'},
	{'token': 'rule-set', 'fr': 'Règle de style'},
	{'token': 'selector', 'fr': 'Sélecteur', 'separ': true},
	{'token': 'simple-selector', 'fr': 'Sélecteur simple'},
	{'token': 'type-selector', 'fr': 'Sélecteur de type'},
	{'token': 'universal-selector', 'fr': 'Sélecteur universel'},
	{'token': 'id-selector', 'fr': "Sélecteur d'identifiant"},
	{'token': 'class-selector', 'fr': 'Sélecteur de classe'},	
	{'token': 'declaration-block', 'fr': 'Bloc de déclarations', 'separ': true},
	{'token': 'declaration', 'fr': 'Déclaration'},
	{'token': 'property', 'fr': 'Propriété'},
	{'token': 'value', 'fr': 'Valeur'},
	{'token': 'keyword', 'fr': 'Mot-clé'},
	{'token': 'number', 'fr': 'Nombre'},
	{'token': 'percentage', 'fr': 'Pourcentage'},
	{'token': 'length', 'fr': 'Longueur'},
	{'token': 'unit', 'fr': 'Unité'},
	{'token': 'string', 'fr': 'Chaîne de caractères'},
	{'token': 'color', 'fr': 'Couleur'},
	{'token': 'function', 'fr': 'Fonction'},
	{'token': 'police', 'fr': 'Police'},
	{'token': 'url', 'fr': 'URL'},
	{'token': 'attribute-selector', 'fr': "Sélecteur d'attribut", 'separ': true},
	{'token': 'pseudo-class', 'fr': 'Pseudo-classe'},
	{'token': 'pseudo-element', 'fr': 'Pseudo-élément'},
	{'token': 'combinator', 'fr': 'Combinateur', 'separ': true},
	{'token': 'descendant-combinator', 'fr': 'Combinateur de descendant'},
	{'token': 'child-combinator', 'fr': "Combinateur d'enfant"},
	{'token': 'adjacent-sibling-combinator', 'fr': "Combinateur d'adjacent direct"},
	{'token': 'general-sibling-combinator', 'fr': "Combinateur d'adjacent indirect"},
	{'token': 'at-rule', 'fr': 'Règle at', 'separ': true},
	{'token': 'media-query', 'fr': 'Média', 'separ': true},
	{'token': 'media-query-list', 'fr': 'Liste de médias'},
	{'token': 'media-type', 'fr': 'Type du média'},
	{'token': 'expression', 'fr': 'Expression'},
	{'token': 'media-feature', 'fr': 'Caractéristique du média'},
	{'token': 'vendor-prefix', 'fr': 'Préfixe vendeur', 'separ': true},
	],

	lang: 'fr',
	codeNodes: null,
	vocabNodes: null,
	codeSelected: [],
	vocabSelected: [],

	//-----------------------------------------------------
	make: function() {
		var selectors, i, UL;
		
		UL = document.querySelector('ul.vocab');
		if (!('classList' in UL)) {
			alert('Votre navigateur est trop ancien !');
			return;
		}
		
		UL.innerHTML = this.makeVocabList();
		
		selectors = this.buildSelectors();
		
		this.codeNodes = document.querySelectorAll(selectors.codeTokens);
		for (i = 0; i < this.codeNodes.length; i ++) {
			this.codeNodes[i].addEventListener('click', function(event) {CodeVocab.click(event);});
		};
		
		this.vocabNodes = document.querySelectorAll(selectors.vocabTokens);
		for (i = 0; i < this.vocabNodes.length; i ++) {
			this.vocabNodes[i].addEventListener('click', function(event) {CodeVocab.click(event);});
		};
	},
	
	//-----------------------------------------------------
	click: function(event) {
		var eventSrc;
		eventSrc = this.normalizeEvent(event).src;

		if (!eventSrc.classList) {
			return;
		}
		
		this.removeSelected();
		
		this.addSelected(eventSrc.classList);
	},
	
	//-----------------------------------------------------
	addSelected: function(cssClassList) {
		var i, codeClasses, vocabClasses;
		
		codeClasses = '.code ';
		vocabClasses = '';
		for (i = 0; i < cssClassList.length; i++) {
			codeClasses += '.' + cssClassList[i];
			vocabClasses += '.vocab .' + cssClassList[i] + ',';
		}
		
		vocabClasses = vocabClasses.slice(0, -1);
		
		this.codeSelected = document.querySelectorAll(codeClasses);
		for (i = 0; i < this.codeSelected.length; i ++) {
			this.codeSelected[i].classList.add('selected');
		};
		
		this.vocabSelected = document.querySelectorAll(vocabClasses);
		for (i = 0; i < this.vocabSelected.length; i ++) {
			this.vocabSelected[i].classList.add('selected');
		};
	},
	
	//-----------------------------------------------------
	removeSelected: function() {
		var i;
		
		for (i = 0; i < this.codeSelected.length; i++) {
			this.codeSelected[i].classList.remove('selected');
		}
		this.codeSelected = [];

		for (i = 0; i < this.vocabSelected.length; i++) {
			this.vocabSelected[i].classList.remove('selected');
		}	
		this.vocabSelected = [];			
	},

	//-----------------------------------------------------
	normalizeEvent: function(e) {
		e = e || window.event;

		if (e.preventDefault) {
			e.src = e.target;
			e.stopPropagation();
			e.preventDefault();
			e.offsetX = e.layerX;
			e.offsetY = e.layerY;			
		} else {
			e.cancelBubble = true;
			e.returnValue = false;
			e.src = e.srcElement;
		}

		return e;
	},
	
	
	//-----------------------------------------------------
	//Build vocab list in the sidebar
	makeVocabList: function() {
		var h = '', i;
		for (i = 0; i < this.vocab.length; i++) {
			h += (this.vocab[i].separ) ? '<li style="margin-top: 1em" ' : '<li ';
			h += 'class="' + this.vocab[i].token + '">' + 
					this.vocab[i][this.lang] + 
				'</li>';
		}
		return h;
	},

	//-----------------------------------------------------
	/*
	build css selectors that select:
	- all tokens in the app
	- tokens in css panel and
	- tokens in vocabList
	*/
	buildSelectors: function() {
		var code = vocab = '';
		var i;
		for (i = 0; i < this.vocab.length; i++) {
			code += '.code .' + this.vocab[i].token + ',';
			vocab += '.vocab .' + this.vocab[i].token + ',';
		}
		// Remove the trailing comma in each selector string
		code = code.slice(0, -1);
		vocab = vocab.slice(0, -1);
		return {'codeTokens': code, 'vocabTokens': vocab};
	}
};


document.addEventListener("DOMContentLoaded", function() {CodeVocab.make();});