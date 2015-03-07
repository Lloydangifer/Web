var oLiens = {
	'w3c': 'http://www.w3.org/TR/2014/REC-html5-20141028/',
	'mdn': 'https://developer.mozilla.org/fr/docs/Web/HTML/Element/',
	'what': 'http://www.whatwg.org/specs/web-apps/current-work/multipage/',
	'glob': 'dom.html#global-attributes'
	};

var oTagTypes = ['Invisible', 'En-ligne', 'Bloc'];

/****************************************************************/
/* Les éléments													*/
/****************************************************************/
var oTags = {
	'a': {
		'w3c': 'text-level-semantics.html',
		'what': '=',
		'attr': ['glob',
				'links.html#attr-hyperlink-href',
				'links.html#attr-hyperlink-target',
				'links.html#attr-hyperlink-download',
				'links.html#attr-hyperlink-rel',
				'links.html#attr-hyperlink-hreflang',
				'links.html#attr-hyperlink-type'],
		'def': "(pour Anchor) représente un lien ou une cible de destination " +
				"nommée pour un lien ou les deux à la fois.",
		'type': 1},

	'abbr': {
		'w3c': 'text-level-semantics.html',
		'what': '=',
		'attr': ['glob'],
		'def': "représente une abréviation en donnant sa description. S'il est " +
				"présent, l'attribut <code>title</code> doit contenir cette même " +
				"description et rien d'autre.",
		'type': 1},

	'address': {
		'w3c': 'grouping-content.html',
		'what': '=',
		'attr': ['glob'],
		'def': "représente une information de contact pour l'élément ancêtre " +
				"<code>&lt;article&gt;</code> ou <code>&lt;body&gt;</code> le plus proche.",
		'type': 2},

	'area': {
		'w3c': 'embedded-content-0.html',
		'what': 'the-map-element.html',
		'attr': ['glob',
				'-area-alt',
				'-area-coords',
				'-area-shape',
				'links.html#attr-hyperlink-href',
				'links.html#attr-hyperlink-target',
				'links.html#attr-hyperlink-download',
				'links.html#attr-hyperlink-rel',
				'links.html#attr-hyperlink-hreflang',
				'links.html#attr-hyperlink-type'],
		'def': "représente une zone particulière d'une image pour lui associer " +
				"un lien. Cet élément n'est utilisé que dans un élément <code>&lt;map&gt;</code>.",
		'type': 1},

	'article': {
		'w3c': 'sections.html',
		'what': '=',
		'attr': ['glob'],
		'def': "représente du contenu autonome qui est prévu pour être réutilisé " +
				"ou distribué  indépendamment (par exemple dans un flux RSS).",
		'type': 2},

	'aside': {
		'w3c': 'sections.html',
		'what': '=',
		'attr': ['glob'],
		'def': "représente une partie de la page dont le contenu est " +
				"indirectement lié à ce qui l'entoure et qui pourrait être " +
				"séparé de cet environnement (colonnes annexes, encadrés).",
		'type': 2},

	'audio': {
		'w3c': 'embedded-content-0.html',
		'what': 'the-video-element.html',
		'attr': ['glob',
				'-media-src',
				'-media-crossorigin',
				'-media-preload',
				'-media-autoplay',
				'-media-mediagroup',
				'-media-loop',
				'-media-muted',
				'-media-controls'],
		'def': "représente du contenu sonore intégré dans un document. " +
				"L'élément audio peut contenir plusieurs sources audio " +
				"définies avec l'attribut <code>src</code> ou l'élément " +
				"<code>&lt;source&gt;</code>. Le navigateur décidera " +
				"quelle source utiliser suivant les codecs qu'il sait gérer.",
		'type': 1},

	'b': {
		'w3c': 'text-level-semantics.html',
		'what': '=',
		'attr': ['glob'],
		'def': "(pour Bold) représente une partie de texte avec un style " +
				"différente du texte normal, sans lui apporter une " +
				"importance particulière. Habituellement réprésenté par " +
				"du texte en gras.",
		'type': 1},

	'base': {
		'w3c': 'document-metadata.html',
		'what': 'semantics.html',
		'attr': ['glob',
				'-base-href',
				'-base-target'],
		'def': "représente l'URL de base à utiliser pour toutes les URLs " +
				"relatives contenues dans un document. Si non définie, l'URL " +
				"de base est l'URL de base du document en cours. Elément vide.",
		'type': 0},

	'bdi': {
		'w3c': 'text-level-semantics.html',
		'what': '=',
		'attr': ['glob'],
		'def': "(ou élément d'isolation de texte bi-directionnel) représente " +
				"une portée de texte (<code>span</code>) pouvant être écrit " +
				"dans une direction différente de celle du texte qui l'entoure.",
		'type': 1},

	'bdo': {
		'w3c': 'text-level-semantics.html',
		'what': '=',
		'attr': ['glob'],
		'def': "(pour bidirectional override) est utilisé pour changer la " +
				"direction du texte par la direction spécifiée par l'élément.",
		'type': 1},

	'blockquote': {
		'w3c': 'grouping-content.html',
		'what': '=',
		'attr': ['glob',
				'-blockquote-cite'],
		'def': "représente une citation longue. Habituellement, le texte " +
				"est affiché avec une indentation.",
		'type': 2},

	'body': {
		'w3c': 'sections.html',
		'what': '=',
		/*
		'attr': ['glob',
				'webappapis.html#handler-window-onafterprint',
				'webappapis.html#handler-window-onbeforeprint',
				'webappapis.html#handler-window-onbeforeunload',
				'webappapis.html#handler-window-onhashchange',
				'webappapis.html#handler-window-onmessage',
				'webappapis.html#handler-window-onoffline',
				'webappapis.html#handler-window-ononline',
				'webappapis.html#handler-window-onpagehide',
				'webappapis.html#handler-window-onpageshow',
				'webappapis.html#handler-window-onpopstate',
				'webappapis.html#handler-window-onresize',
				'webappapis.html#handler-window-onstorage',
				'webappapis.html#handler-window-onunload'],
		*/
		'attr': ['glob'],
		'def': "représente le contenu principal du document HTML, la partie " +
				"affichée par le navigateur. Il n'y a qu'un élément " +
				"<code>&lt;body&gt;</code> par document.",
		'type': 2},

	'br': {
		'w3c': 'text-level-semantics.html',
		'what': '=',
		'attr': ['glob'],
		'def': "(pour BReak) produit un retour à la ligne dans le texte. Elément vide.",
		'type': 1},

	'button': {
		'w3c': 'forms.html',
		'what': 'the-button-element.html',
		'attr': ['glob',
				'-fe-autofocus',
				'-fe-disabled',
				'-fae-form',
				'-fs-formaction',
				'-fs-formenctype',
				'-fs-formmethod',
				'-fs-formnovalidate',
				'-fs-formtarget',
				'-fe-name',
				'-button-type',
				'-button-value'],
		'def': "crée un bouton sur lequel on peut cliquer.",
		'type': 1},

	'canvas': {
		'w3c': 'embedded-content-0.html',
		'what': 'the-canvas-element.html',
		'attr': ['glob',
				'-canvas-width',
				'-canvas-height'],
		'def': "définit une zone d'affichage graphique (de type bitmap) dont " +
				"le contenu est géré par JavaScript.",
		'type': 1},

	'caption': {
		'w3c': 'tabular-data.html',
		'what': '=',
		'attr': ['glob'],
		'def': "représente le titre d'un tableau. Il doit être placé immédiatement après " +
				"l'élément <code>&lt;table&gt;</code>.",
		'type': 2},

	'cite': {
		'w3c': 'text-level-semantics.html',
		'what': '=',
		'attr': ['glob'],
		'def': "représente le titre d'une oeuvre (livre, chanson, film, sculpture...)",
		'type': 1},

	'code': {
		'w3c': 'text-level-semantics.html',
		'what': '=',
		'attr': ['glob'],
		'def': "représente un morceau de code informatique. Habituellement le navigateur " +
				"utilise une police monospace.",
		'type': 1},

	'col': {
		'w3c': 'tabular-data.html',
		'what': '=',
		'attr': ['glob',
				'-col-span'],
		'def': "représente une colonne appartenant à un tableau. Utilisé pour " +
				"définir la sémantique commune à toutes ses cellules. On trouve " +
				"généralement cet élément au sein d'un élément <code>&lt;colgroup&gt;</code>.",
		'type': 1},

	'colgroup': {
		'w3c': 'tabular-data.html',
		'what': '=',
		'attr': ['glob',
				'-colgroup-span'],
		'def': "représente un groupe de colonnes dans un tableau.",
		'type': 1},

	'datalist': {
		'w3c': 'forms.html',
		'what': 'the-button-element.html',
		'attr': ['glob'],
		'def': "représente la liste des options pour une zone de texte avec une liste de " +
				"suggestions (~ auto-complétion). Le contenu de cet élement n'est pas affiché.",
		'type': 0},

	'dd': {
		'w3c': 'grouping-content.html',
		'what': '=',
		'attr': ['glob'],
		'def': "(pour Definition Data) représente un terme dans une liste de " +
				"définitions (<code>&lt;dl&gt;</code>). Ne peut apparaître " +
				"qu'en tant qu'élément appartenant à une liste de définitions. " +
				"Doit être précédé d'un élément <code>&lt;dt&gt;</code>.",
		'type': 2},

	'del': {
		'w3c': "edits.html",
		'what': '=',
		'attr': ['glob',
				'-mod-cite',
				'-mod-datetime'],
		'def': "représente une portion de texte ayant été supprimé d'un document. " +
				"Ce texte est généralement affiché en étant rayé.",
		'type': 1},

	'details': {
		'w3c': 'interactive-elements.html',
		'what': '=',
		'attr': ['glob',
				'-details-open'],
		'def': "représente des informations supplémentaires sur un sujet.",
		'type': 1},

	'dfn': {
		'w3c': 'text-level-semantics.html',
		'what': '=',
		'attr': ['glob'],
		'def': "représente la definition d'un terme.",
		'type': 1},

	'dialog': {
		'w3c': 'interactive-elements.html',
		'what': '=',
		'attr': ['glob',
				'-dialog-open'],
		'def': "représente un moyen qui permet un dialogue avec l'utilisateur " +
				"(boîte de dialogue, inspecteur, fenêtre ...).",
		'type': 1},

	'div': {
		'w3c': 'grouping-content.html',
		'what': '=',
		'attr': ['glob'],
		'def': "représente un conteneur générique (ie sans signification " +
				"sémantique particulière) permettant d'organiser du contenu. " +
				"Il peut être utilisé pour grouper d'autres éléments afin de " +
				"leur appliquer un style (en utilisant les attributs " +
				"<code>class</code> ou <code>id</code>), ou parce qu'ils " +
				"partagent des attributs aux valeurs communes, tel que " +
				"<code>lang</code>. Il doit être utilisé uniquement " +
				"lorsqu'aucun autre élément sémantique (comme <code>&lt;article&gt;</code> " +
				"ou <code>&lt;nav&gt;</code>, etc) n'est approprié.",
		'type': 2},

	'dl': {
		'w3c': 'grouping-content.html',
		'what': '=',
		'attr': ['glob'],
		'def': "(pour Definition List) représente une liste de définitions :" +
				" des termes sont associés à leurs définitions (exemple : glossaire).",
		'type': 2},

	'dt': {
		'w3c': 'grouping-content.html',
		'what': '=',
		'attr': ['glob'],
		'def': "(pour Definition Term) représente un terme dans une liste de " +
				"definitions. Cet élément n'apparaît qu'en tant qu'élément " +
				"enfant d'un élément <code>&lt;dl&gt;</code>. Il est généralement " +
				"suivi d'un élément <code>&lt;dd&gt;</code>. Cependant plusieurs " +
				"éléments <code>&lt;dt&gt;</code> à la suite indiquent que " +
				"plusieurs termes seront définis par le même élément <code>&lt;dd&gt;</code> qui suivra.",
		'type': 2},

	'em': {
		'w3c': 'text-level-semantics.html',
		'what': '=',
		'attr': ['glob'],
		'def': "(pour Emphasis) représente un texte sur lequel on veut insister.",
		'type': 1},

	'embed': {
		'w3c': 'embedded-content-0.html',
		'what': 'the-iframe-element.html',
		'attr': ['glob',
				'-embed-src',
				'-embed-type',
				'-dim-width',
				'-dim-height'],
		'def': "fournit le point d'intégration d'une application externe ou " +
				"de contenu interactif (ie un plug-in)",
		'type': 1},

	'fieldset': {
		'w3c': 'forms.html',
		'what': 'the-button-element.html',
		'attr': ['glob',
				'-fieldset-disabled',
				'-fae-form',
				'-fe-name'],
		'def': "regroupe plusieurs zones de saisies et leurs étiquettes " +
				"(<code>&lt;label&gt;</code>) dans un formulaire.",
		'type': 2},

	'figcaption': {
		'w3c': 'grouping-content.html',
		'what': '=',
		'attr': ['glob'],
		'def': "représente un sous-titre ou une légende, associé à une figure " +
				"repésentée par l'élément <code>&lt;figure&gt;</code>. " +
				"<code>&lt;figcaption&gt;</code> doit donc être le premier ou " +
				"le dernier des éléments intégré dans un block <code>&lt;figure&gt;</code>.",
		'type': 2},

	'figure': {
		'w3c': 'grouping-content.html',
		'what': '=',
		'attr': ['glob'],
		'def': "représente un contenu génaralement accompagné d'une légende " +
				"(<code>&lt;figcaption&gt;</code>). C'est souvent une image, " +
				"une illustration, un diagramme, un fragment de code ou un " +
				"schéma dont il est fait référence dans le texte principal.",
		'type': 2},

	'footer': {
		'w3c': 'sections.html',
		'what': '=',
		'attr': ['glob'],
		'def': "représente le pied de la page (<code>&lt;body&gt;</code>) ou " +
				"de la structure dans laquelle il se trouve (<code>&lt;article&gt;</code>, " +
				"<code>&lt;aside&gt;</code>, <code>&lt;nav&gt;</code>, " +
				"<code>&lt;section&gt;</code>, <code>&lt;blockquote&gt;</code>, " +
				"<code>&lt;body&gt;</code>, <code>&lt;details&gt;</code>, " +
				"<code>&lt;fieldset&gt;</code>, <code>&lt;figure&gt;</code>, " +
				"<code>&lt;td&gt;</code>).",
		'type': 2},

	'form': {
		'w3c': 'forms.html',
		'what': '=',
		'attr': ['glob',
				'-form-accept-charset',
				'-fs-action',
				'-form-autocomplete',
				'-fs-enctype',
				'-fs-method',
				'-form-name',
				'-fs-novalidate',
				'-fs-target'],
		'def': "représente une partie de document qui contient des zones de " +
				"saisie permettant à un utilisateur d'envoyer des " +
				"données à un serveur web.",
		'type': 2},

	'h1': {
		'w3c': 'sections.html',
		'what': '=',
		'attr': ['glob'],
		'def': "représente un titre dans un document. Il y a 6 niveaux de " +
				"titre possible ;: <code>&lt;h1&gt;</code> est le plus " +
				"important et <code>&lt;h6&gt;</code> est le moins important. " +
				"Un élément de titre décrit brièvement le sujet de la section " +
				"qu'il introduit.",
		'type': 2},

	'h2': {
		'w3c': 'sections.html',
		'what': '=',
		'attr': ['glob'],
		'def': "représente un titre dans un document. Il y a 6 niveaux de " +
				"titre possible ;: <code>&lt;h1&gt;</code> est le plus " +
				"important et <code>&lt;h6&gt;</code> est le moins important. " +
				"Un élément de titre décrit brièvement le sujet de la section " +
				"qu'il introduit.",
		'type': 2},

	'h3': {
		'w3c': 'sections.html',
		'what': '=',
		'attr': ['glob'],
		'def': "représente un titre dans un document. Il y a 6 niveaux de " +
				"titre possible ;: <code>&lt;h1&gt;</code> est le plus " +
				"important et <code>&lt;h6&gt;</code> est le moins important. " +
				"Un élément de titre décrit brièvement le sujet de la section " +
				"qu'il introduit.",
		'type': 2},

	'h4': {
		'w3c': 'sections.html',
		'what': '=',
		'attr': ['glob'],
		'def': "représente un titre dans un document. Il y a 6 niveaux de " +
				"titre possible ;: <code>&lt;h1&gt;</code> est le plus " +
				"important et <code>&lt;h6&gt;</code> est le moins important. " +
				"Un élément de titre décrit brièvement le sujet de la section " +
				"qu'il introduit.",
		'type': 2},

	'h5': {
		'w3c': 'sections.html',
		'what': '=',
		'attr': ['glob'],
		'def': "représente un titre dans un document. Il y a 6 niveaux de " +
				"titre possible ;: <code>&lt;h1&gt;</code> est le plus " +
				"important et <code>&lt;h6&gt;</code> est le moins important. " +
				"Un élément de titre décrit brièvement le sujet de la section " +
				"qu'il introduit.",
		'type': 2},

	'h6': {
		'w3c': 'sections.html',
		'what': '=',
		'attr': ['glob'],
		'def': "représente un titre dans un document. Il y a 6 niveaux de " +
				"titre possible ;: <code>&lt;h1&gt;</code> est le plus " +
				"important et <code>&lt;h6&gt;</code> est le moins important. " +
				"Un élément de titre décrit brièvement le sujet de la section " +
				"qu'il introduit.",
		'type': 2},

	'head': {
		'w3c': 'document-metadata.html',
		'what': 'semantics.html',
		'attr': ['glob'],
		'def': "représente un ensemble de métadonnées sur le document et de " +
				"définitions ou liens vers des scripts et des feuilles de style.",
		'type': 0},

	'header': {
		'w3c': 'sections.html',
		'what': '=',
		'attr': ['glob'],
		'def': "représente l'en-tête de la page (<code>&lt;body&gt;</code>) " +
				"ou de la structure dans laquelle il se trouve. Il peut contenir " +
				"par exemple des éléments de titre (<code>h1</code> à " +
				"<code>h6</code>, un logo, un formulaire de recherche, etc.",
		'type': 2},

	'hr': {
		'w3c': 'grouping-content.html',
		'what': '=',
		'attr': ['glob'],
		'def': "(pour Horizontal Rule) représente un changement thématique " +
				"entre des éléments paragraphe (<code>p</code>). Il est rendu " +
				"par défaut comme une ligne horizontale. Elément vide.",
		'type': 2},

	'html': {
		'w3c': "semantics.html",
		'what': '=',
		'attr': ['glob',
				'-html-manifest'],
		'def': " représente la racine d'un document HTML. Tout autre élement " +
				"doit être descendant de cet élément.",
		'type': 2},

	'i': {
		'w3c': 'text-level-semantics.html',
		'what': '=',
		'attr': ['glob'],
		'def': "(pour Italic) représente un morceau de texte qui se " +
				"différencie du texte principal. Le contenu de cet élément " +
				"est généralement affiché en italique.",
		'type': 1},

	'iframe': {
		'w3c': 'embedded-content-0.html',
		'what': 'the-iframe-element.html',
		'attr': ['glob',
				'-iframe-src',
				'-iframe-srcdoc',
				'-iframe-name',
				'-iframe-sandbox',
				'-iframe-seamless',
				'-dim-width',
				'-dim-height'],
		'def': "représente un contexte de navigation imbriqué : une page HTML " +
				"est intégrée dans la page actuelle. Chaque contexte de " +
				"navigation possède son propre historique de session et son " +
				"document actif. Le contexte de navigation entourant le contenu " +
				"intégré est appelé contexte de navigation parent. La fenêtre de " +
				"navigation est généralement le contexte de navigation de plus " +
				"haut-niveau (c'est à dire celui n'ayant pas de parent).",
		'type': 1},

	'img': {
		'w3c': 'embedded-content-0.html',
		'what': 'embedded-content-1.html',
		'attr': ['glob',
				'-img-alt',
				'-img-src',
				'-img-crossorigin',
				'-hyperlink-usemap',
				'-img-ismap',
				'-dim-width',
				'-dim-height'],
		'def': "représente une image. Elément vide.",
		'type': 1},

	'input': {
		'w3c': 'forms.html',
		'what': 'the-input-element.html',
		'attr': ['glob',
				'-input-accept',
				'-input-alt',
				'-fe-autocomplete',
				'-fe-autofocus',
				'-input-checked',
				'-fe-dirname',
				'-fe-disabled',
				'-fae-form',
				'-fs-formaction',
				'-fs-formenctype',
				'-fs-formmethod',
				'-fs-formnovalidate',
				'-fs-formtarget',
				'embedded-content-0.html#attr-dim-height',
				'-input-list',
				'-input-max',
				'-input-maxlength',
				'-input-min',
				'-input-multiple',
				'-fe-name',
				'-input-pattern',
				'-input-placeholder',
				'-input-readonly',
				'-input-required',
				'-input-size',
				'-input-src',
				'-input-step',
				'-input-type',
				'-input-value',
				'embedded-content-0.html#attr-dim-width'],
		'def': "crée une zone de saisie dans un formulaire. La valeur de l'attribut " +
				"<code>type</code> définit la forme de la zone (texte, bouton radio, " +
				"case à cocher, bouton, etc. Elément vide.",
		'type': 1},

	'ins': {
		'w3c': "edits.html",
		'what': '=',
		'attr': ['glob',
				'-mod-cite',
				'-mod-datetime'],
		'def': "(pour Inserted Text) représente une morceau de texte qui a été ajouté à un document.",
		'type': 1},

	'kbd': {
		'w3c': 'text-level-semantics.html',
		'what': '=',
		'attr': ['glob'],
		'def': "(pour Keyboard Input) représente les entrées effectuées par " +
				"l'utilisateur et produit un élément affiché par le navigateur " +
				"avec la police monotype par défaut.",
		'type': 1},

	'keygen': {
		'w3c': 'forms.html',
		'what': 'the-button-element.html',
		'attr': ['glob',
				'-fe-autofocus',
				'-keygen-challenge',
				'-fe-disabled',
				'-fae-form',
				'-keygen-keytype',
				'-fe-name'],
		'def': "crée un contrôle de génération de clés dans un formulaire. Le " +
				"mécanisme utilisé est conçu pour être utilisé avec les systèmes " +
				"de gestion de certificats électroniques. L'élément keygen est" +
				" prévu pour être utilisé dans un formulaire HTML avec d'autres " +
				"informations permettant de construire une requête de certificat, " +
				"le résultat du processus étant un certificat signé. Elément vide.",
		'type': 1},

	'label': {
		'w3c': 'forms.html',
		'what': '=',
		'attr': ['glob',
				'-fae-form',
				'-label-for'],
		'def': "représente un label pour une zone de saisie dans un formulaire. Il peut être " +
				"associé à une zone en utilisant l'attribut for ou en plaçant " +
				"l'élément de la zone de saisie à l'intérieur de l'élément <code>&lt;label&gt;</code>.",
		'type': 1},

	'legend': {
		'w3c': 'forms.html',
		'what': 'the-button-element.html',
		'attr': ['glob'],
		'def': "représente une légende pour le contenu de son élément parent " +
				"<code>&lt;fieldset&gt;</code>.",
		'type': 2},

	'li': {
		'w3c': 'grouping-content.html',
		'what': '=',
		'attr': ['glob',
				'l#attr-li-value'],
		'def': "(pour List Item) représente un élément d'une liste. Il doit " +
				"appartenir à une liste ordonnée (<code>&lt;ol&gt;</code>), à " +
				"une liste non-ordonnée (<code>&lt;ul&gt;</code>) ou à un menu " +
				"(<code>&lt;menu&gt;</code>). Dans des menus ou des listes " +
				"non-ordonnées, les éléments d'une liste sont généralement " +
				"affichés avec des puces rondes. Dans les listes ordonnées, " +
				"la puce d'un élément est le plus souvent un nombre ou une " +
				"lettre affiché(e) à gauche.",
		'type': 2},

	'link': {
		'w3c': 'document-metadata.html',
		'what': 'semantics.html',
		'attr': ['glob',
				'-link-href',
				'-link-crossorigin',
				'-link-rel',
				'-link-media',
				'-link-hreflang',
				'-link-type',
				'links.html#attr-link-sizes'],
		'def': "représente une relation entre le document courant et d'autres " +
				"documents. L'utilisation la plus courante de cet élément est " +
				"le lien du document avec une feuille de style. Elément vide.",
		'type': 0},

	'main': {
		'w3c': 'sections.html',
		'what': '=',
		'attr': ['glob'],
		'def': "représente le contenu principal du corps (<code>&lt;body&gt;</code>) du document.",
		'type': 2},

	'map': {
		'w3c': 'embedded-content-0.html',
		'what': 'the-map-element.html',
		'attr': ['glob',
				'-map-name'],
		'def': " est utilisé en association avec des éléments <code>&lt;area&gt;</code> " +
				"pour définir un ensemble de zones cliquables dans une image (image map).",
		'type': 0},

	'mark': {
		'w3c': 'text-level-semantics.html',
		'what': '=',
		'attr': ['glob'],
		'def': "représente du texte surligné, c'est à dire du texte marqué pour " +
				"sa pertinence dans un contexte en particulier.",
		'type': 1},

	'meta': {
		'w3c': 'document-metadata.html',
		'what': 'semantics.html',
		'attr': ['glob',
				'-meta-name',
				'-meta-http-equiv',
				'-meta-content',
				'-meta-charset'],
		'def': "représente toute information de métadonnées ne pouvant être " +
				"représentée par l'un des éléments <code>&lt;base&gt;</code>, " +
				"<code>&lt;link&gt;</code>, <code>&lt;script&gt;</code>, " +
				"<code>&lt;style&gt;</code> ou <code>&lt;title&gt;</code>. " +
				"Selon les attributs qui sont renseignés, la métadonnée peut " +
				"être de différentes sortes. Elément vide.",
		'type': 0},

	'meter': {
		'w3c': 'forms.html',
		'what': 'the-button-element.html',
		'attr': ['glob',
				'-meter-value',
				'-meter-min',
				'-meter-max',
				'-meter-low',
				'-meter-high',
				'-meter-optimum'],
		'def': "représente une mesure dans un intervalle connu ou une " +
				"proportion connue. Cela peut être par exemple l'utilisation " +
				"d'un disque, la pertinence du résultat d'une requête ou " +
				"la proportion de votants ayant choisi un candidat spécifique.",
		'type': 1},

	'nav': {
		'w3c': 'sections.html',
		'what': '=',
		'attr': ['glob'],
		'def': "(pour NAVigation) représente une partie de document regroupant " +
				"des liens vers d'autres documents ou des parties du document en cours.",
		'type': 2},

	'noscript': {
		'w3c': 'scripting-1.html',
		'what': '',
		'attr': ['glob'],
		'def': "définit le code HTML qui doit être utilisé si l'interpréteur " +
				"de scripts du navigateur est désactivé.",
		'type': 2},

	'object': {
		'w3c': 'embedded-content-0.html',
		'what': 'the-iframe-element.html',
		'attr': ['glob',
				'-object-data',
				'-object-type',
				'-object-typemustmatch',
				'-object-name',
				'-hyperlink-usemap',
				'forms.html#attr-fae-form',
				'-dim-width',
				'-dim-height'],
		'def': "représente une ressource externe qui peut être interprétée " +
				"comme une image, un contexte de navigation imbriqué ou une " +
				"ressource à traiter comme un plug-in.",
		'type': 1},

	'ol': {
		'w3c': 'grouping-content.html',
		'what': '=',
		'attr': ['glob',
				'-ol-reversed',
				'-ol-start',
				'-ol-type'],
		'def': "(pour Ordered List) représente une liste ordonnée. Les éléments " +
				"d'une telle liste sont généralement affichés avec un nombre " +
				"cardinal associé pouvant prendre la forme de nombres, de lettres, " +
				"de chiffres romains ou de points. La mise en forme de la " +
				"numérotation n'est pas utilisée dans la description HTML mais " +
				"dans la feuille de style CSS associée grâce à la propriété list-style-type.",
		'type': 2},

	'optgroup': {
		'w3c': 'forms.html',
		'what': 'the-button-element.html',
		'attr': ['glob',
				'-optgroup-disabled',
				'-optgroup-label'],
		'def': "représente un regroupement des options d'une zone de saisie liste " +
				"<code>&lt;select&gt;</code> dans un formulaire .",
		'type': 2},

	'option': {
		'w3c': 'forms.html',
		'what': 'the-button-element.html',
		'attr': ['glob',
				'-option-disabled',
				'-option-label',
				'-option-selected',
				'-option-value'],
		'def': "représente une ligne dans un zone de saisie liste (<code>&lt;select&gt;</code>) " +
				"de formulaire ou dans un regroupement d'options " +
				"(<code>&lt;optgroup&gt;</code>) ou dans un zone de saisie " +
				"avec suggestions (<code>&lt;datalist&gt;</code>).",
		'type': 2},

	'output': {
		'w3c': 'forms.html',
		'what': 'the-button-element.html',
		'attr': ['glob',
				'-output-for',
				'-fae-form',
				'-fe-name'],
		'def': "représente le résultat d'un calcul dans un formulaire. Il " +
				"permet d'afficher ce résultat (calculer par un script) sans " +
				"envoyer le formulaire au serveur.",
		'type': 1},

	'p': {
		'w3c': 'grouping-content.html',
		'what': '=',
		'attr': ['glob'],
		'def': "(pour Paragraph) représente un paragraphe de texte.",
		'type': 2},

	'param': {
		'w3c': 'embedded-content-0.html',
		'what': 'the-iframe-element.html',
		'attr': ['glob',
				'-param-name',
				'-param-value'],
		'def': "(pour Parameter) représente les paramètres d'un élément " +
				"<code>&lt;object&gt;</code>. Elément vide.",
		'type': 0},

	'pre': {
		'w3c': 'grouping-content.html',
		'what': '=',
		'attr': ['glob'],
		'def': "(pour PREformatted text) représente du texte pré-formaté. Le " +
				"texte contenu dans cet élément est généralement affiché dans " +
				"une police à espacement fixe. Les blancs (espaces consécutifs, " +
				"tabulations, sauts de ligne) contenus dans le texte sont " +
				"affichés tels qu'ils sont dans le code source du document.",
		'type': 2},

	'progress': {
		'w3c': 'forms.html',
		'what': 'the-button-element.html',
		'attr': ['glob',
				'-progress-value',
				'-progress-max'],
		'def': "représente l'état d'avancement d'une tâche. Les spécificités " +
				"de l'affichage sont gérées par le navigateur qui affiche " +
				"généralement une barre de progression.",
		'type': 1},

	'q': {
		'w3c': 'text-level-semantics.html',
		'what': '=',
		'attr': ['glob',
				'-q-cite'],
		'def': "représente une citation courte ne nécessitant pas plusieurs " +
				"paragraphes. L'élément <code>&lt;blockquote&gt;</code> doit " +
				"être utilisée pour les citations plus longues.",
		'type': 1},

	'rp': {
		'w3c': 'text-level-semantics.html',
		'what': '=',
		'attr': ['glob'],
		'def': "représente ce qui sera utilisé par un navigateur qui n'a pas " +
				"le support des annotations Ruby. Les annotations Ruby " +
				"permettent d'afficher la prononciation des caractères Est " +
				"Asiatiques, notamment lors de l'usage de caractères furigana " +
				"Japonais ou bopomofo Taïwanais. L'élément <code>&lt;rp&gt;</code> " +
				"est utilisé en l'absence de support de l'élément " +
				"<code>&lt;ruby&gt;</code>. Son contenu est ce qui devrait être" +
				" affiché afin d'indiquer la présence d'une annotation Ruby, " +
				"soit généralement des parenthèses.",
		'type': 1},

	'rt': {
		'w3c': 'text-level-semantics.html',
		'what': '=',
		'attr': ['glob'],
		'def': "représente la prononciation d'un caractère présenté dans les " +
				"annotations ruby. L'élément <code>&lt;rt&gt;</code> est " +
				"utilisé à l'intérieur d'un élément <code>&lt;ruby&gt;</code>.",
		'type': 1},

	'ruby': {
		'w3c': 'text-level-semantics.html',
		'what': '=',
		'attr': ['glob'],
		'def': "représente une annotation ruby. Les annotations Ruby servent " +
				"à afficher la prononciation des caractères Est Asiatiques.",
		'type': 1},

	's': {
		'w3c': 'text-level-semantics.html',
		'what': '=',
		'attr': ['glob'],
		'def': "(pour Strikethrough) permet d'afficher du texte barré au sens " +
				"où celui-ci n'est plus d'actualité ou n'est plus pertinent. " +
				"L'élément <code>&lt;s&gt;</code> ne doit pas être utilisé pour " +
				"indiquer des suppressions de texte dans un document : l'élément " +
				"<code>&lt;del&gt;</code> (et parfois l'élément <code>&lt;ins&gt;</code>) " +
				"doit être utilisé pour traduire l'édition d'un texte.",
		'type': 1},

	'samp': {
		'w3c': 'text-level-semantics.html',
		'what': '=',
		'attr': ['glob'],
		'def': "(pour SAMple text) produit un élément en bloc affiché avec la " +
				"police sans espacement par défaut du navigateur. Cet élément a " +
				"été conçu pour représenter des informations produites par un " +
				"programme informatique.",
		'type': 1},

	'script': {
		'w3c': 'scripting-1.html',
		'what': '',
		'attr': ['glob',
				'-script-src',
				'-script-type',
				'-script-charset',
				'-script-async',
				'-script-defer',
				'-script-crossorigin'],
		'def': "est utilisé pour intégrer du code de script (JavaScript ou " +
				"JScript) dans un document ou faire référence à un fichier " +
				"de script externe.",
		'type': 0},

	'section': {
		'w3c': 'sections.html',
		'what': '=',
		'attr': ['glob'],
		'def': "représente une section générique dans un document : un groupement " +
				"thématique de contenu, généralement avec un en-tête.",
		'type': 2},

	'select': {
		'w3c': 'forms.html',
		'what': 'the-button-element.html',
		'attr': ['glob',
				'-fe-autofocus',
				'-fe-disabled',
				'-fae-form',
				'-select-multiple',
				'-fe-name',
				'-select-required',
				'-select-size'],
		'def': "crée un zone de liste dans un formulaire. la liste peut " +
				"être défilante ou déroulante. Les options de la liste (ie " +
				"les lignes) sont représentées par des éléments <code>&lt;option&gt;</code> " +
				"pouvant être regroupées par des éléments <code>&lt;optgroup&gt;</code>. " +
				"Les options peuvent également être pré-sélectionnées.",
		'type': 1},

	'small': {
		'w3c': 'text-level-semantics.html',
		'what': '=',
		'attr': ['glob'],
		'def': "représente du texte avec une police dont la taille est plus " +
				"petite que celle utilisée pour le texte environnant.",
		'type': 1},

	'source': {
		'w3c': 'embedded-content-0.html',
		'what': 'the-video-element.html',
		'attr': ['glob',
				'-source-src',
				'-source-type',
				'-source-media'],
		'def': "est généralement utilisé pour servir le même média " +
				"<code>&lt;audio&gt;</code> ou <code>&lt;video&gt;</code> " +
				"dans les différents formats supportés par le navigateur. Elément vide.",
		'type': 0},

	'span': {
		'w3c': 'text-level-semantics.html',
		'what': '=',
		'attr': ['glob'],	
		'def': "représente un conteneur générique de texte sans signification " +
				"sémantique particulière. Il est utilisé pour mettre en forme le texte " +
				"en utilisant les attributs <code>class</code> ou <code>id</code> pour associer des règles de style CSS.",
		'type': 1},

	'strong': {
		'w3c': 'text-level-semantics.html',
		'what': '=',
		'attr': ['glob'],
		'def': "représente une partie de texte importante. Le texte est généralement affiché en gras.",
		'type': 1},

	'style': {
		'w3c': 'document-metadata.html',
		'what': 'semantics.html',
		'attr': ['glob',
				'-style-media',
				'-style-type',
				'-style-scoped'],
		'def': "contient les définitions de style pour un document ou une " +
				"partie de ce document. Les définition de styles faites à " +
				"l'intérieur de cet élement ne seront appliquées que pour le " +
				"document en cours. Pour lier un fichier externe de définitions " +
				"de styles, il faut utilise l'élément <code>&lt;link&gt;</code>.",
		'type': 0},

	'sub': {
		'w3c': 'text-level-semantics.html',
		'what': '=',
		'attr': ['glob'],
		'def': "(pour SUBscript) représente du texte affiché en indice (plus " +
				"bas et généralement plus petit) par rapport au bloc de texte environnant.",
		'type': 1},

	'summary': {
		'w3c': 'interactive-elements.html',
		'what': '=',
		'attr': ['glob'],
		'def': "représente un sommaire, une légende ou la légende du contenu " +
				"d'un élément <code>&lt;detail&gt;</code>.",
		'type': 1},

	'sup': {
		'w3c': 'text-level-semantics.html',
		'what': '=',
		'attr': ['glob'],
		'def': "(pour SUPerscript) représente du texte affiché sur une ligne " +
				"plus haute et souvent plus petit que le texte principal.",
		'type': 1},

	'table': {
		'w3c': 'tabular-data.html',
		'what': '=',
		'attr': ['glob',
				'-table-border'],
		'def': "représente des données affichées sous la forme d'un tableau.",
		'type': 2},

	'tbody': {
		'w3c': 'tabular-data.html',
		'what': '=',
		'attr': ['glob'],
		'def': "(pour Table BOBY) représente un ensemble de lignes définissant " +
				"le corps d'un tableau. Bien que cela ne soit pas obligatoire, " +
				"les lignes pouvant être définies en tant qu'éléments " +
				"<code>&lt;tr&gt;</code> directement dans l'élément " +
				"<code>&lt;table&gt;</code>, tous les éléments <code>&lt;tr&gt;</code> " +
				"doivent être intégrés dans un seul élément <code>&lt;tbody&gt;</code> " +
				"si ce dernier est utilisé.",
		'type': 2},

	'td': {
		'w3c': 'tabular-data.html',
		'what': '=',
		'attr': ['glob',
				'-tdth-colspan',
				'-tdth-rowspan',
				'-tdth-headers'],
		'def': "(pour Table Data) représente une cellule de tableau contenant des données.",
		'type': 1},

	'textarea': {
		'w3c': 'forms.html',
		'what': 'the-button-element.html',
		'attr': ['glob',
				'-fe-autofocus',
				'-textarea-cols',
				'-fe-dirname',
				'-fe-disabled',
				'-fae-form',
				'-textarea-maxlength',
				'-fe-name',
				'-textarea-placeholder',
				'-textarea-readonly',
				'-textarea-required',
				'-textarea-rows',
				'-textarea-wrap'],
		'def': "crée un zone de saisie à plusieurs lignes",
		'type': 1},

	'tfoot': {
		'w3c': 'tabular-data.html',
		'what': '=',
		'attr': ['glob'],
		'def': "(pour Table FOOT) représente un ensemble de lignes résumant l" +
				"es colonnes d'un tableau.",
		'type': 2},

	'th': {
		'w3c': 'tabular-data.html',
		'what': '=',
		'attr': ['glob',
				'-tdth-colspan',
				'-tdth-rowspan',
				'-tdth-headers',
				'-th-scope',
				'-th-abbr'],
		'def': "(pour Table Header) représente une cellule qui est un en-tête " +
				"pour un groupe de cellules du tableau. Le groupe de cellules " +
				"concernées est identifiés par les attributs <code>scope</code> " +
				"et <code>headers</code>.",
		'type': 1},

	'thead': {
		'w3c': 'tabular-data.html',
		'what': '=',
		'attr': ['glob'],
		'def': "(pour Table HEAD) représente un ensemble de lignes définissant " +
				"les lignes d'en-tête des colonnes du tableau",
		'type': 2},

	'time': {
		'w3c': 'text-level-semantics.html',
		'what': '=',
		'attr': ['glob',
				'-time-datetime'],
		'def': "représente une heure (format 24 heures) ou une date précise " +
				"du calendrier grégorien (avec informations facultatives sur " +
				"l'heure ou le fuseau-horaire). Cet élément est conçu pour " +
				"permettre l'utilisation d'informations temporelles dans un " +
				"format interprétable par un ordinateur. Cela peut par exemple" +
				" être utile aux différents agents installés sur le poste de " +
				"l'utilisateur pour gérer un emploi du temps.",
		'type': 1},

	'title': {
		'w3c': 'document-metadata.html',
		'what': 'semantics.html',
		'attr': ['glob'],
		'def': "représente le titre du document. Ce titre est affiché " +
				"uniquement dans la barre de titre du navigateur ou sur " +
				"l'onglet de la page. Il ne peut contenir que du texte.",
		'type': 0},

	'tr': {
		'w3c': 'tabular-data.html',
		'what': '=',
		'attr': ['glob'],
		'def': "(pour Table Row) représente une ligne de cellules dans un " +
				"tableau. Ces lignes peuvent mélanger des éléments " +
				"<code>&lt;td&gt;</code> et des éléments <code>&lt;th&gt;</code>.",
		'type': 2},

	'track': {
		'w3c': 'embedded-content-0.html',
		'what': 'the-video-element.html',
		'attr': ['glob',
				'-track-default',
				'-track-kind',
				'-track-label',
				'-track-src',
				'-track-srclang'],
		'def': "permet de définir des données dépendant du temps et liées aux " +
				"médias <code>&lt;audio&gt;</code> et <code>&lt;video&gt;</code>. Elément vide.",
		'type': 0},

	'u': {
		'w3c': 'text-level-semantics.html',
		'what': '=',
		'attr': ['glob'],
		'def': "(pour Underline) permet d'afficher un texte souligné.",
		'type': 1},

	'ul': {
		'w3c': 'grouping-content.html',
		'what': '=',
		'attr': ['glob'],
		'def': "(pour Unordered List) représente une liste non " +
				"ordonnés. Généralement les lignes d'une liste non ordonnée " +
				"sont affichées précédées d'une puce (un simple point, un cercle ou un carré). Le style de la puce " +
				"est soit le style par défaut du navigateur, soit défini par la propriété list-style-type de la règle de " +
				"style associée.",
		'type': 2},

	'var': {
		'w3c': 'text-level-semantics.html',
		'what': '=',
		'attr': ['glob'],
		'def': "(pour VARiable) représente une variable dans une expression " +
				"mathématique ou du texte lié à la programmation. La mise en " +
				"forme par défaut sera la mise en italique du contenu de cet élément.",
		'type': 1},

	'video': {
		'w3c': 'embedded-content-0.html',
		'what': 'the-video-element.html',
		'attr': ['glob',
				'-media-src',
				'-media-crossorigin',
				'-video-poster',
				'-media-preload',
				'-media-autoplay',
				'-media-mediagroup',
				'-media-loop',
				'-media-muted',
				'-media-controls',
				'-dim-width',
				'-dim-height'],
		'def': "est utilisé pour intégrer des vidéo dans un document HTML.",
		'type': 1},
		
	'wbr': {
		'w3c': 'text-level-semantics.html',
		'what': '=',
		'attr': ['glob'],
		'def': "(pour Word BReak) représente une position dans le texte où " +
				"le navigateur peut éventuellement revenir à la ligne, même si " +
				"les règles de sauts de ligne ne sont pas définies. Elément vide.",
		'type': 1}
	};
	
/****************************************************************/
/* Les attributs												*/
/****************************************************************/	
var oAttrGlobaux = {
	'accesskey': 'editing.html#the-accesskey-attribute',
	'class': 'dom.html#classes',
	'contenteditable': 'editing.html#attr-contenteditable',
	'dir': 'dom.html#the-dir-attribute',
	'draggable': 'editing.html#the-draggable-attribute',
	'dropzone': 'editing.html#the-dropzone-attribute',
	'hidden': 'editing.html#the-hidden-attribute',
	'id': 'dom.html#the-id-attribute',
	'lang': 'dom.html#attr-lang',
	'spellcheck': 'editing.html#attr-spellcheck',
	'style': 'dom.html#the-style-attribute',
	'tabindex': 'editing.html#attr-tabindex',
	'title': 'dom.html#attr-title',
	'translate': 'dom.html#attr-translate'
	};
	
var oAttrs = {
    'accept': "liste de types que le serveur accepte, en principe un type de fichier.",
    'accept-charset': "liste de jeux de caractères supportés.",
    'accesskey': "raccourci clavier pour activer ou sélectionner un élément.",
    'action': "URI du programme qui traite les données envoyées par le formulaire.",
    'align': "définit l'alignement horizontal de l'élément.",
    'alt': "texte alternatif affiché si l'image ne peut pas être affichée.",
    'async': "indique que le script doit être chargé en asynchrone.",
    'autocomplete': "indique si les éléments du formulaire peuvent être remplis " +
    		"par défaut automatiquement par le navigateur.",
    'autofocus': "l'élement est automatiquement sélectionné après le chargement de la page.",
    'autoplay': "l'audio ou la vidéo doivent être joués dès que possible.",
    'bgcolor': "couleur d'arrière-plan de l'élément. L'utilisation de cet attribut " +
    		"est déconseillé. Utilisez plutôt la propriété CSS <code>background-color</code>",
    'border': "largeur de la bordure. L'utilisation de cet attribut est déconseillé. " +
    		"Utilisez plutôt la propriété CSS border",
    'buffered': "période de temps du média déjà en mémoire tampon.",
    'challenge': "chaîne de caractère envoyée avec la clef publique.",
    'charset': "jeu de caractères de la page ou du script.",
    'checked': "indique si l'élément doit être coché au chargement de la page.",
    'cite': "URI pointant vers la source de la citation ou du changement.",
    'class': "classe CSS à l'élément",
    'code': "URL du fichier '.class' de l'applet à charger et éxecuter",
    'codebase': "URL du repertoire où se trouvent les fichiers '.class' de l'applet, " +
    		"renseigné par l'attribut <code>code</code>.",
    'color': "couleur du texte (couleur nommée ou couleur au format hexadecimal #RRGGBB). " +
    		"L'utilisation de cet attribut est déconseillé. Utilisez plutôt la propriété CSS color",
    'cols': "nombre de colonnes dans un textarea.",
    'colspan': "nombre de colonnes sur lesquelles une cellule doit s'étendre.",
    'content': "valeur associée à <code>http-equiv</code> ou <code>name</code> selon le contexte.",
    'contenteditable': "indique si le contenu de l'élément est modifiable.",
    'contextmenu': "ID d'un élément <code>&lt;menu&gt;</code> représente une liste " +
    		"non-ordonnée de choix ou de différentes commandes <code>&lt;menu&gt;</code> " +
    		"qui servira en tant que menu contextuel de l'élément.",
    'controls': "indique si le navigateur doit afficher les contrôles de lecture à l'utilisateur.",
    'coords': "ensemble de valeur définissant les coordonnées de la zone active (répondant au clic).",
    'data': "URL de la ressource.",
    'data-*': "permet de définir ses propres attributs sur les éléments HTML.",
    'datetime': "date et heure associées à l'élément.",
    'default': "indique que le <code>track</code> doit être activé sauf si les " +
    		"préférences de l'utilisateur en décide autrement.",
    'defer': "indique que le script doit être executé après que la page ait été parsée.",
    'dir': "direction du texte. Les valeurs autorisées sont : <code>ltr</code> " +
    		"(<em>Left-To-Righ</em>t : Gauche à Droite) ou <code>rtl</code> " +
    		"(<em>Right-To-Left</em> : Droite à Gauche)",
    'dirname': "&nbsp;",
    'disabled': "indique si l'utilisateur peut intéragir avec l'élément.",
    'download': "indique que l'hyperlien doit être utilisé pour télécharger la ressource.",
    'draggable': "définit si l'élément peut être glissé.",
    'dropzone': "indique si l'élément accepte de recevoir du contenu sur lui.",
    'enctype': "définit le type d'encodage des données du formulaire quand la " +
    		"<code>method</code>&nbsp;est POST.",
    'for': "identifie l'élément de formulaire qui lui est associé",
    'form': "identifie le formulaire qui est propriétaire de l'élément.",
    'headers': "IDs des éléments <code>&lt;th&gt;</code> liés à la cellule.",
    'height': "hauteur de l'élément. Dans certains cas, tel que <code>&lt;div&gt;</code> " +
    		"il s'agit d'un attribut déconseillé : la propriété CSS <code>height</code> " +
    		"doit être utilisée. Dans les autres cas, tel que <code>&lt;canvas&gt;</code>, " +
    		"la hauteur doit être indiquée avec cet attribut.",
    'hidden': "indique que l'élément ne sera pas affiché.",
    'high': "partie basse de la zone maximale.",
    'href': "URL de la ressource liée.",
    'hreflang': "langue de la ressource liée.",
    'http-equiv': "définit l'équivalent de l'en-tête HTTP du tag <code>&lt;meta&gt;</code>",
    'icon': "définit une image pour représenter l'action.",
    'id': "identifiant de l'élément. Cet identifiant DOIT être unique dans le document en cours.",
    'ismap': "indique que l'image fait partie d'une image map serveur.",
    'itemprop': "&nbsp;",
    'keytype': "type de clef générée.",
    'kind': "type de texte pour le <code>track</code>.",
    'label': "titre lisible par l'utilisateur pour le texte du <code>track</code>.",
    'lang': "langue utilisée dans l'élément.",
    'language': "language de script utilisé.",
    'list': "identifie une liste d'option prédéfinies à suggérer à l'utilisateur.",
    'loop': "définit si le media doit être rejoué depuis le départ une fois arrivé à la fin.",
    'low': "partie haute de la zone minimale.",
    'manifest': "URL du cache manifest du document.",
    'max': "valeur maximum autorisée.",
    'maxlength': "nombre de caractères maximum autorisés dans l'élément.",
    'media': "information sur le media pour lequel la ressource liée a été conçue.",
    'method': "méthode HTTP à utiliser pour l'envoi du formulaire au serveur. Peux être GET (défaut) ou POST.",
    'min': "valeur minimum autorisée.",
    'multiple': "définit si plusieurs valeurs peuvent être rentrées dans un champ de type " +
    		"<code>email</code> ou <code>file</code>.",
    'name': "Nom de l'élément. Utilisé par exemple par le serveur pour identifier les " +
    		"champs du formulaire soumis.",
    'novalidate': "indique si le formulaire ne doit par être validé quand il est soumis.",
    'open': "indique si les détails seront montrés au chargement de la page.",
    'optimum': "valeur numérique optimale.",
    'pattern': "expression régulière utilisée pour tester la valeur de l'élément.",
    'ping': "&nbsp;",
    'placeholder': "texte informatif à afficher pour l'utilisateur dans l'élément.",
    'poster': "URL vers une image Poster à afficher avant que l'utilisateur joue le media.",
    'preload': "indique si toute la ressource, une partie, ou rien doit être préchargé.",
    'pubdate': "date et heure de publication de l'élément <code>&lt;article&gt;</code> le plus proche.",
    'radiogroup': "&nbsp;",
    'readonly': "indique si l'élément peut être modifié.",
    'rel': "définit la relation de l'objet cible avec l'objet liant.",
    'required': "indique si l'élément doit être obligatoirement rempli ou non.",
    'reversed': "indique si la liste doit être affichée dans un sens descendant ou ascendant.",
    'rows': "nombre de lignes dans un textarea.",
    'rowspan': "nombre de rangées sur lesquels doit s'étendre la cellule.",
    'sandbox': "&nbsp;",
    'spellcheck': "indique si la vérification orthographique doit être appliquée à l'élément.",
    'scope': "définit les cellules auxquelles le <code>th</code> s'applique.",
    'scoped': "définit si les styles s'appliquent au document entier ou juste au sous-arbre.",
    'seamless': "définit si les styles du document s'appliquent au contenu intégré",
    'selected': "définit une valeur sélectionnée au chargement de la page.",
    'shape': "forme d'une zone d'une image réactive (<code>map</code>)",
    'size': "largeur de l'élément (en pixels). Si l'attribut <code>type</code> de l'élément " +
    		"est <code>text</code> ou <code>password</code> il s'agit alors du nombre de caractères.",
    'sizes': "taille des icone pour <code>rel=\"icon\"</code>",
    'span': "nombre de cellules sur lequel s'étend l'élément.",
    'src': "URL du contenu intégré.",
    'srcdoc': "contenu HTML du document integré.",
    'srclang': "langue du srcdoc",
    'start': "définit le premier nombre si différent de 1.",
    'step': "valeur de l'incrément du controle",
    'style': "définit les styles CSS qui primeront sur les styles précédemment définis.",
    'summary': "&nbsp;",
    'tabindex': "définit l'ordre de tabulation.",
    'target': "définit la fenêtre ou l'onglet dans lequel va s'afficher le contenu du lien.",
    'title': "texte à afficher dans une bulle d'information au survol de l'élément.",
	'translate': "indique si l'élément doit être traduit en même temps que la page.",
    'type': "type de l'élément.",
    'usemap': "nom de l'image réactive à utiliser (<code>map</code>)",
    'value': "valeur par défaut qui sera affichée dans l'élément au chargement de la page. " +
    		"Pour <code>li</code> indique la valeur de début de numérotation.",
    'width': "largeur d'un élément. Dans certains cas, tel que <code>&lt;div&gt;</code> il " +
    		"s'agit d'un attribut déconseillé : la propriété CSS <code>width</code> doit " +
    		"être utilisée. Dans les autres cas, tel que <code>&lt;canvas&gt;</code>, la " +
    		"largeur doit être indiquée avec cet attribut.",
    'wrap': "indique comment la césure doit être gérée."
	};

/****************************************************************/
/* Les valeurs des attributs									*/
/****************************************************************/
var oAttrVals = {
	'abbr': '<a href="dom.html#attribute-text">Texte</a>',
	'accept': '<a href="infrastructure.html#set-of-comma-separated-tokens">Liste de jetons séparés par une virgule</a> représentant <a href="infrastructure.html#valid-mime-type">des types MIME sans paramètres</a> ou <code>audio/</code>, <code>video/</code>, ou <code>image/</code>',
	'accept-charset': '<a href="infrastructure.html#ordered-set-of-unique-space-separated-tokens">Liste ordonnées de jetons séparés par un espace</a>, <a href="infrastructure.html#ascii-case-insensitive">en ASCII et insensibles à la casse</a>, consistant en <a href="infrastructure.html#encoding-name">noms</a> <a href="infrastructure.html#ascii-compatible-character-encoding">d\'encodages compatibles ASCII</a>',
	'accesskey': '<a href="infrastructure.html#ordered-set-of-unique-space-separated-tokens">Liste ordonnées de jetons séparés par un espace</a>, <a href="infrastructure.html#case-sensitive">sensibles à la casse</a>, consistant en un code point UNICODE (ie un caractère)',
	'action': '<a href="infrastructure.html#valid-non-empty-url-potentially-surrounded-by-spaces">URL éventuellement entourée d\espaces</a>',
	'alt': '<a href="dom.html#attribute-text">Texte</a>',
	'async': '<a href="infrastructure.html#boolean-attribute">Attribut booléen</a>',
	'autocomplete form': '"<code>on</code>" ou "<code>off</code>"',
	'autocomplete': '<a href="forms.html#autofill-field">Liste de noms pour l\'auto-complétion</a>',
	'autofocus': '<a href="infrastructure.html#boolean-attribute">Attribut booléen</a>',
	'autoplay': '<a href="infrastructure.html#boolean-attribute">Attribut booléen</a>',
	'border': 'Chaîne vide, ou "<code>1</code>"',
	'challenge': '<a href="dom.html#attribute-text">Texte</a>',
	'charset': '<a href="infrastructure.html#encoding-name">Nom d\'encodage de caractères</a>',
	'checked': '<a href="infrastructure.html#boolean-attribute">Attribut booléen</a>',
	'cite': '<a href="infrastructure.html#valid-url-potentially-surrounded-by-spaces">URL éventuellement entourée d\espaces</a>',
	'class': '<a href="infrastructure.html#set-of-space-separated-tokens">Liste de jetons séparés par un espace</a>',
	'cols': '<a href="infrastructure.html#valid-non-negative-integer">Entier non négatif</a> supérieur à 0',
	'colspan': '<a href="infrastructure.html#valid-non-negative-integer">Entier non négatif</a> supérieur à 0',
	'content': '<a href="dom.html#attribute-text">Texte</a>',
	'contenteditable': '"<code>true</code>", "<code>false</code>"',
	'controls': '<a href="infrastructure.html#boolean-attribute">Attribut booléen</a>',
	'coords': '<a href="infrastructure.html#valid-list-of-integers">Liste d\'entiers</a>',
	'crossorigin': '"<code><a href="infrastructure.html#attr-crossorigin-anonymous-keyword">anonymous</a></code>" ou "<code><a href="infrastructure.html#attr-crossorigin-use-credentials-keyword">use-credentials</a></code>"',
	'data': '<a href="infrastructure.html#valid-non-empty-url-potentially-surrounded-by-spaces"> URL éventuellement entourée d\espaces</a>',
	'datetime del': '<a href="infrastructure.html#valid-date-string-with-optional-time">Date avec heure optionnelle</a>',
	'datetime ins': '<a href="infrastructure.html#valid-date-string-with-optional-time">Date avec heure optionnelle</a>',
	'datetime': '<a href="infrastructure.html#valid-month-string">Mois</a>, <a href="infrastructure.html#valid-date-string">date</a>, <a href="infrastructure.html#valid-yearless-date-string">date sans l\'année</a>, <a href="infrastructure.html#valid-time-string">heure</a>, <a href="infrastructure.html#valid-local-date-and-time-string">date et heure locales</a>, <a href="infrastructure.html#valid-time-zone-offset-string">décalage horaire</a>,<a href="infrastructure.html#valid-global-date-and-time-string">date et heure gloables</a>,<a href="infrastructure.html#valid-week-string">valid week string</a>,<a href="infrastructure.html#valid-non-negative-integer">entier non négatif</a>, or<a href="infrastructure.html#valid-duration-string">durée</a>',
	'default': '<a href="infrastructure.html#boolean-attribute">Attribut booléen</a>',
	'defer': '<a href="infrastructure.html#boolean-attribute">Attribut booléen</a>',
	'dir': '"<code><a href="dom.html#attr-dir-ltr">ltr</a></code>" ou "<code><a href="dom.html#attr-dir-rtl">rtl</a></code>" ou "<code><a href="dom.html#attr-dir-auto">auto</a></code>"',
	'dirname': '<a href="dom.html#attribute-text">Texte</a>',
	'disabled': '<a href="infrastructure.html#boolean-attribute">Attribut booléen</a>',
	'download': 'Text',
	'draggable': '"<code>true</code>" ou "<code>false</code>"',
	'dropzone': '<a href="infrastructure.html#unordered-set-of-unique-space-separated-tokens">Liste de jetons uniques séparés par un espace</a>, <a href="infrastructure.html#ascii-case-insensitive">en ASCII et insensibles à la casse</a>, représentant les types acceptés pour le feedback du drag &amp; drop',
	'enctype': '"<code><a href="forms.html#attr-fs-enctype-urlencoded">application/x-www-form-urlencoded</a></code>" ou "<code><a href="forms.html#attr-fs-enctype-formdata">multipart/form-data</a></code>" ou "<code"><a href="forms.html#attr-fs-enctype-text">text/plain</a></code>"',
	'for label': '<a href="infrastructure.html#concept-id">Identifiant</a>',
	'for output': '<a href="infrastructure.html#unordered-set-of-unique-space-separated-tokens">Liste de jetons uniques séparés par un espace</a>, <a href="infrastructure.html#case-sensitive">sensibles à la casse</a>, représentant des identifiants',
	'form': '<a href="infrastructure.html#concept-id">Identifiant</a>',
	'formaction': '<a href="infrastructure.html#valid-non-empty-url-potentially-surrounded-by-spaces">URL éventuellement entourée d\espaces</a>',
	'formenctype': '"<code><a href="forms.html#attr-fs-enctype-urlencoded">application/x-www-form-urlencoded</a></code>" ou "<code><a href="forms.html#attr-fs-enctype-formdata">multipart/form-data</a></code>" ou "<code><a href="forms.html#attr-fs-enctype-text">text/plain</a></code>"',
	'formmethod': '"<code>GET</code>" ou "<code>POST</code>"',
	'formnovalidate': '<a href="infrastructure.html#boolean-attribute">Attribut booléen</a>',
	'formtarget': '<a href="browsers.html#valid-browsing-context-name-or-keyword">Mot clé ou nom de contexte de navigation valide</a>',
	'headers': '<a href="infrastructure.html#unordered-set-of-unique-space-separated-tokens">Liste de jetons uniques séparés par un espace</a>, <a href="infrastructure.html#case-sensitive">sensibles à la casse</a>, représentant des identifiants',
	'height': '<a href="infrastructure.html#valid-non-negative-integer">Entier non négatif</a>',
	'hidden': '<a href="infrastructure.html#boolean-attribute">Attribut booléen</a>',
	'high': '<a href="infrastructure.html#valid-floating-point-number">Nombre en virgule flottante</a>',
	'href': '<a href="infrastructure.html#valid-url-potentially-surrounded-by-spaces">URL éventuellement entourée d\espaces</a>',
	'href': '<a href="infrastructure.html#valid-non-empty-url-potentially-surrounded-by-spaces">URL éventuellement entourée d\espaces ou chaîne vide</a>',
	'href link': '<a href="infrastructure.html#valid-url-potentially-surrounded-by-spaces">URL éventuellement entourée d\espaces</a>',
	'hreflang': 'Tag valide suivant le BCP 47',
	'http-equiv': '<a href="dom.html#attribute-text">Texte</a>',
	'id': '<a href="dom.html#attribute-text">Texte</a>',
	'ismap': '<a href="infrastructure.html#boolean-attribute">Attribut booléen</a>',
	'keytype': '<a href="dom.html#attribute-text">Texte</a>',
	'kind': '"<code"><a href="embedded-content-0.html#attr-track-kind-subtitles">subtitles</a></code>" ou "<code><a href="embedded-content-0.html#attr-track-kind-captions">captions</a></code>" ou "<code><a href="embedded-content-0.html#attr-track-kind-descriptions">descriptions</a></code>" ou "<code><a href="embedded-content-0.html#attr-track-kind-chapters">chapters</a></code>" ou "<code><a href="embedded-content-0.html#attr-track-kind-metadata">metadata</a></code>"',
	'label': '<a href="dom.html#attribute-text">Texte</a>',
	'lang': 'Tag valide suivant le BCP 47 ou chaîne vide',
	'list': '<a href="infrastructure.html#concept-id">Identifiant</a>',
	'loop': '<a href="infrastructure.html#boolean-attribute">Attribut booléen</a>',
	'low': '<a href="infrastructure.html#valid-floating-point-number">Nombre en virgule flottante</a>',
	'manifest': '<a href="infrastructure.html#valid-non-empty-url-potentially-surrounded-by-spaces">URL éventuellement entourée d\espaces</a>',
	'max input': 'Variable',
	'max': '<a href="infrastructure.html#valid-floating-point-number">Nombre en virgule flottante</a>',
	'maxlength': '<a href="infrastructure.html#valid-non-negative-integer">Entier non négatif</a>',
	'media': '<a href="infrastructure.html#valid-media-query">Media query</a>',
	'mediagroup': '<a href="dom.html#attribute-text">Texte</a>',
	'method': '"<code"><a href="forms.html#attr-fs-method-get-keyword">GET</a></code>" ou "<code><a href="forms.html#attr-fs-method-post-keyword">POST</a></code>"',
	'min': 'Variable',
	'min': '<a href="infrastructure.html#valid-floating-point-number">Nombre en virgule flottante</a>',
	'multiple': '<a href="infrastructure.html#boolean-attribute">Attribut booléen</a>',
	'muted': '<a href="infrastructure.html#boolean-attribute">Attribut booléen</a>',
	'name iframe': '<a href="browsers.html#valid-browsing-context-name-or-keyword">Mot clé ou nom de contexte de navigation valide</a>',
	'name object': '<a href="browsers.html#valid-browsing-context-name-or-keyword">Mot clé ou nom de contexte de navigation valide</a>',
	'name': '<a href="dom.html#attribute-text">Texte</a>',
	'novalidate': '<a href="infrastructure.html#boolean-attribute">Attribut booléen</a>',
	'open': '<a href="infrastructure.html#boolean-attribute">Attribut booléen</a>',
	'optimum': '<a href="infrastructure.html#valid-floating-point-number">Nombre en virgule flottante</a>',
	'pattern': 'Expression régulière conforme à celles de JavaScript',
	'placeholder': '<a href="dom.html#attribute-text">Texte</a>',
	'poster': '<a href="infrastructure.html#valid-non-empty-url-potentially-surrounded-by-spaces">URL éventuellement entourée d\espaces</a>',
	'preload': '"<code><a href="embedded-content-0.html#attr-media-preload-none">none</a></code>" ou "<code><a href="embedded-content-0.html#attr-media-preload-metadata">metadata</a></code>" ou "<code><a href="embedded-content-0.html#attr-media-preload-auto">auto</a></code>"',
	'readonly': '<a href="infrastructure.html#boolean-attribute">Attribut booléen</a>',
	'rel': '<a href="infrastructure.html#set-of-space-separated-tokens">Liste de jetons séparés par un espace</a>',
	'required': '<a href="infrastructure.html#boolean-attribute">Attribut booléen</a>',
	'reversed': '<a href="infrastructure.html#boolean-attribute">Attribut booléen</a>',
	'rows': '<a href="infrastructure.html#valid-non-negative-integer">Entier non négatif</a> supérieur à 0',
	'rowspan': '<a href="infrastructure.html#valid-non-negative-integer">Entier non négatif</a>',
	'sandbox': '<a href="infrastructure.html#unordered-set-of-unique-space-separated-tokens">Liste de jetons uniques séparés par un espace</a>, <a href="infrastructure.html#ascii-case-insensitive">en ASCII et insensibles à la casse</a>, pouvant être "<code><a href="browsers.html#attr-iframe-sandbox-allow-forms">allow-forms</a></code>","<code><a href="browsers.html#attr-iframe-sandbox-allow-pointer-lock">allow-pointer-lock</a></code>","<code><a href="browsers.html#attr-iframe-sandbox-allow-popups">allow-popups</a></code>","<code><a href="browsers.html#attr-iframe-sandbox-allow-same-origin">allow-same-origin</a></code>","<code><a href="browsers.html#attr-iframe-sandbox-allow-scripts">allow-scripts</a></code> and"<code><a href="browsers.html#attr-iframe-sandbox-allow-top-navigation">allow-top-navigation</a></code>"',
	'spellcheck': '"<code>true</code>" ou "<code>false</code>"',
	'scope': '"<code><a href="tabular-data.html#attr-th-scope-row">row</a></code>" ou "<code><a href="tabular-data.html#attr-th-scope-col">col</a></code>" ou "<code><a href="tabular-data.html#attr-th-scope-rowgroup">rowgroup</a></code>" ou "<code><a href="tabular-data.html#attr-th-scope-colgroup">colgroup</a></code>"',
	'scoped': '<a href="infrastructure.html#boolean-attribute">Attribut booléen</a>',
	'seamless': '<a href="infrastructure.html#boolean-attribute">Attribut booléen</a>',
	'selected': '<a href="infrastructure.html#boolean-attribute">Attribut booléen</a>',
	'shape': '"<code><a href="embedded-content-0.html#attr-area-shape-keyword-circle">circle</a></code>" ou "<code><a href="embedded-content-0.html#attr-area-shape-keyword-default">default</a></code>" ou "<code><a href="embedded-content-0.html#attr-area-shape-keyword-poly">poly</a></code>" ou "<code><a href="embedded-content-0.html#attr-area-shape-keyword-rect">rect</a></code>"',
	'size': '<a href="infrastructure.html#valid-non-negative-integer">Entier non négatif</a> supérieur à 0',
	'sizes': '<a href="infrastructure.html#unordered-set-of-unique-space-separated-tokens">Liste de jetons uniques séparés par un espace</a>, <a href="infrastructure.html#ascii-case-insensitive">en ASCII et insensibles à la casse</a>, repésentant des tailles',
	'span': '<a href="infrastructure.html#valid-non-negative-integer">Entier non négatif</a> supérieur à 0',
	'src': '<a href="infrastructure.html#valid-non-empty-url-potentially-surrounded-by-spaces">URL éventuellement entourée d\espaces</a>',
	'srcdoc': 'La source du <a href="embedded-content-0.html#an-iframe-srcdoc-document"><code> srcdoc d\'un iframe</code></a>',
	'srclang': 'Tag valide suivant le BCP 47',
	'start': '<a href="infrastructure.html#valid-integer">Entier</a>',
	'step': '<a href="infrastructure.html#valid-floating-point-number">Nombre en virgule flottante</a> supérieur à 0, ou "<code>any</code>"',
	'style': 'Declarations CSS',
	'tabindex': '<a href="infrastructure.html#valid-integer">Entier',
	'target': '<a href="browsers.html#valid-browsing-context-name-or-keyword">Mot clé ou nom de contexte de navigation valide</a>',
	'title': '<a href="dom.html#attribute-text">Texte</a>',
	'translate': '"<code>yes</code>" ou "<code>no</code>"',
	'type': '<a href="infrastructure.html#valid-mime-type">Type MIME</a>',
	'type button': '"<code><a href="forms.html#attr-button-type-submit">submit</a></code>" ou "<code><a href="forms.html#attr-button-type-reset">reset</a></code>" ou "<code><a href="forms.html#attr-button-type-button">button</a></code>"',
	'type input': 'Mot clé pour les types d\'<a href="forms.html#attr-input-type"><code>input</code></a>',
	'type ol': '"<code><a href="grouping-content.html#attr-ol-type-keyword-decimal">1</a></code>" ou "<code><a href="grouping-content.html#attr-ol-type-keyword-lower-alpha">a</a></code>" ou "<code><a href="grouping-content.html#attr-ol-type-keyword-upper-alpha">A</a></code>" ou "<code><a href="grouping-content.html#attr-ol-type-keyword-lower-roman">i</a></code>" ou "<code><a href="grouping-content.html#attr-ol-type-keyword-upper-roman">I</a></code>"',
	'typemustmatch': '<a href="infrastructure.html#boolean-attribute">Attribut booléen</a>',
	'usemap': '<a href="infrastructure.html#valid-hash-name-reference">Référence d\'un hashname (#nom)</a>',
	'value': '<a href="dom.html#attribute-text">Texte</a>',
	'value input': 'Variable',
	'value li': '<a href="infrastructure.html#valid-integer">Entier',
	'value meter': '<a href="infrastructure.html#valid-floating-point-number">Nombre en virgule flottante</a>',
	'value progress': '<a href="infrastructure.html#valid-floating-point-number">Nombre en virgule flottante</a>',
	'width': '<a href="infrastructure.html#valid-non-negative-integer">Entier non négatif</a>',
	'wrap': '"<code><a href="forms.html#attr-textarea-wrap-soft">soft</a></code>" ou "<code><a href="forms.html#attr-textarea-wrap-hard">hard</a></code>"'
	};