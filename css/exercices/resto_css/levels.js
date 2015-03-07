/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */


// Hash the array and compare the arrays!
// Key
// a = small apple .small
// A = apple
// o = small orange, .small
// O = orange
// p = small pickle, .small
// P = pickle
// () = plate open / close
// {} = fancy plate open / close
// [] = plat open close tags

var gCars = {
	'C': '<carotte></carotte>',
	'A': '<pomme></pomme>',	
	'O': '<orange></orange>',
	'P': '<cornichon></cornichon>',
	'a': '<pomme class="petite"></pomme>',
	'o': '<orange class="petite"></orange>',
	'p': '<cornichon class="petite"></cornichon>',
	'{': '<assiette id="fantaisie">',
	'(': '<assiette>',
	')': '</assiette>',
	'}': '</assiette>',
	'[': '<plat>',
	']': '</plat>'
};

var gLevels = [
	{
		selectorName: "Sélecteur de type",
		selectorTitle: "Sélectionner les élements par leur type.",		
		selectorText: "Sélectionne tous les éléments de type <strong>A</strong>. Type fait référence au type de l'élément : <tag>div</tag>, <tag>p</tag> et <tag>ul</tag> sont tous des élements de type différent.",
		selectorSyntax: "A",
		examples: [
				"<strong>div</strong> sélectionnera tous les éléments <tag>div</tag>.",
				"<strong>p</strong> sélectionnera tous les éléments <tag>p</tag>.",
				],
		exercice: "sélectionner les assiettes.",
		solution: "assiette",
		show: "()()"
	},
	//-----------------------------
	{
		selectorName: "Sélecteur de type",
		selectorTitle: "Sélectionner les élements par leur type.",
		selectorText: "Sélectionne tous les éléments de type <strong>A</strong>. Type fait référence au type de la balise: <tag>div</tag>, <tag>p</tag> et <tag>ul</tag> sont tous des élements de type différent.",
		solution: "plat",
		examples: [
				"<strong>div</strong> sélectionnera tous les éléments <tag>div</tag>.",
				"<strong>p</strong> sélectionnera tous les éléments <tag>p</tag> elements.",
				],
		selectorSyntax: "A",
		exercice: "sélectionner les plats.",
		show: "[]()[]"
	},
	//-----------------------------
	{
		selectorName: "Sélecteur d'identifiant",
		selectorTitle: "Sélectionner un élément par son identifiant.",
		selectorText: "Sélectionne l'élément avec l'attribut <tag>id</tag> qui a la valeur <tag>nom</tag>. On peut combiner le sélecteur d'identifant et le sélecteur de type.",
		selectorSyntax: "#nom",
		examples: [
				"<strong>#cool</strong> sélectionnera l'élément avec l'attribut <tag>id</tag> égal à <tag>cool</tag>.",
				"<strong>ul#long</strong> sélectionnera l'élément <tag>ul</tag> qui a un attribut <tag>id</tag> égal à <tag>long</tag>."
				],
		exercice: "sélectionner l'assiette fantaisie.",
		solution: "#fantaisie",
		show: "{}()[]"
	},
	//-----------------------------
	{
		selectorName: "Sélecteur de descendants",
		selectorTitle: "Sélectionner un élément dans un autre élément.",
		selectorText: "Selectionne tout les <tag>B</tag> contenu dans des <tag>A</tag>. <tag>B</tag> est un descendant: un élément imbriqué dans un autre élément, quelque soit le niveau de l'imbrication.",
		selectorSyntax: "A&nbsp;&nbsp;B",
		examples: [
				"<strong>p&nbsp;&nbsp;strong</strong> sélectionnera les éléments <tag>strong</tag> qui sont descendant d'un élément <tag>p</tag>.",
				"<strong>#fantaisie&nbsp;&nbsp;span</strong> sélectionnera les éléments <tag>span</tag> qui sont descendants de l'élément avec l'attribut <tag>id<tag> égal à <tag>fantaisie</tag>.",
				],
		exercice: "sélectionner la pomme sur l'assiette",
		solution: "assiette pomme",
		show: "[](A)A"
	},
	//-----------------------------
	{
		selectorName: "Combinaison de sélecteurs",
		selectorTitle: "Combiner descendant et sélecteur d'identifiant.",
		selectorText: "On peut combiner n'importe quel sélecteur avec le sélecteur de descendants.",
		selectorSyntax: "#id&nbsp;&nbsp;A",
		examples: [
				"<strong>#cool&nbsp;span</strong> sélectionnera tous les éléments <tag>span</tag> à l'intérieur de l'élément avec l'attribut <tag>id</tag> égal à <tag>cool</tag>."
				],
		exercice: "sélectionner le cornichon sur l'assiette fantaisie.",
		solution: "#fantaisie cornichon",
		show: "[O]{P}(P)"
	},
	//-----------------------------
	{
		selectorName: "Sélecteur de classe",
		selectorTitle: "Sélectionner des éléments par leur classe.",
		selectorText: "Le sélecteur de classe sélectionne tous les éléments avec un attribut <tag>class</tag> qui a la valeur <tag>nomDeClasse</tag>. Un élément ne peut avoir qu'un seul identifiant mais il peut avoir plusieurs classes.",
		solution: ".petite",
		examples: [
				"<strong>.neato</strong> sélectionnera tous les éléments avec l'attribut <tag>class</tag> égal à <tag>neato</tag>."
				],
		selectorSyntax: ".nomDeClasse",
		exercice: "sélectionner les petites pommes.",
		show: "Aa(a)()"
	},
	//-----------------------------
	{
		selectorName: "Combinaison de sélecteurs",
		selectorTitle: "Combiner le sélecteur de classe.",
		selectorText: "On peut combiner le sélecteur de classe avec d'autres sélecteurs comme par exemple le sélecteur de type.",
		selectorSyntax: "A.nomDeClasse",
		examples: [
				"<strong>ul.important</strong> sélectionnera tous les éléments <tag>ul</tag> avec un attribut <tag>class</tag> égal à <tag>important</tag>.",
				"<strong>#big.wide</strong> sélectionnera l'élément avec l'attribut <tag>id</tag> égal à <tag>big</strong> et qui a aussi un attribut <tag>class</tag> égal à <strong>wide</strong>."
				],
		exercice: "sélectionner les petites oranges.",
		solution: "orange.petite",
		show: "Aa[o](O)(o)"
	},
	//-----------------------------
	{
		selectorName: "",
		selectorTitle: "Vous pouvez le faire !",
		selectorText: "Combinez ce que vous avez appris dans les niveaux précédents pour y arriver.",
		selectorSyntax: "A vous de trouver !",
		exercice: "sélectionner les petites oranges dans les plats.",
		solution: "plat orange.petite",
		show: "A(o)[o][a][o]"
	},
	//-----------------------------
	{
		selectorName: "Combinateur de groupement",
		selectorTitle: "Combiner des sélecteurs avec la virgule.",
		selectorText: "Sélectionne tous les éléments <tag>A</tag> ET tous les éléments <tag>B</tag>. On peut combiner n'importe quel sélecteur de cette façon et on peut en combiner plus de 2.",
		selectorSyntax: "A, B",
		examples: [
				"<strong>p, .fun</strong> sélectionnera tous les éléments <tag>p</tag> et tous les éléments avec une classe <tag>fun</tag>.",
				"<strong>a, p, div</strong> sélectionnera tous les éléments <tag>a</tag>, <tag>p</tag> et <tag>div</tag>."
				],
		exercice: "sélectionner toutes les assiettes et plats.",
		solution: "assiette, plat",
		show: "pP(P)[P][P](P)Pp"
	},
	//-----------------------------
	{
		selectorName:  "Sélecteur universel",
		selectorTitle: "Sélectionner tout",
		selectorText: "Sélectionne tous les éléments.",
		selectorSyntax: "*",
		examples: [
				"<strong>*</strong> sélectionnera absolument tous les élements à l'intérieur du document HTML."
				],
		exercice: "sélectionner tout.",
		solution: "*",
		show: "A(o)[][O]{)"
	},
	//-----------------------------
	{
		selectorName:  "Sélecteur universel",
		selectorTitle: "Combiner le sélecteur universel.",
		selectorText: "Sélectionne tous les éléments contenus dans <strong>A</strong>.",
		solution: "assiette *",
		examples: [
				"<strong>p *</strong> sélectionnera tous les éléments contenus dans des éléments <tag>p</tag>.",
				"<strong>ul.fantaisie *</strong> sélectionnera tous les éléments contenus dans des éléments <tag>ul</tag> avec une classe <tag>fantaisie</tag>."
				],
		selectorSyntax: "A&nbsp;&nbsp;*",
		exercice: "sélectionner tout ce qui se trouve sur les assiettes.",
		show: "{o}(P)a(A)"
	},
	//-----------------------------
	{
		selectorName: "Sélecteur d'adjacent direct",
		selectorTitle: "Sélectionner un élément qui en suit directement un autre.",
		selectorText: "Sélectionne tous les éléments <tag>B</tag> qui suivent directement un élément <tag>A</tag>. Un élément qui en suit un autre est appelé adjacent. Les 2 éléments sont du même niveau dans l'arborescence des éléments du document HTML et ne sont donc pas imbriqués.",
		solution: "assiette + pomme",
		examples: [
				"<strong>div + a</strong> sélectionnera les éléments <tag>a</tag> qui suivent directement un élément <tag>div</tag>",
				"<strong>p + .intro</strong> sélectionnera les éléments avec la classe <tag>intro</tag> et qui suivent directement un élément <tag>p</tag>"    
				],
		selectorSyntax: "A + B",
		exercice: "sélectionner chaque pomme après une assiette",
		show: "[a]()a()Aaa"
	},
	//-----------------------------
	{
		selectorName: "Sélecteur d'adjacents indirects",
		selectorTitle: "Sélectionner des éléments qui suivent un autre élément.",
		selectorText: "Sélectionne tous les éléments adjacents à un autre, quelque soit leur place dans la succession. C'est comme le sélecteur d'adjacent direct (A + B) sauf qu'on sélectionnera les éléments à n'importe quelle place et pas seulement le premier qui suit.",
		selectorSyntax: "A ~ B",
		examples: [
				"<strong>p ~ ul</strong> sélectionnera tous les éléments <tag>ul</tag> qui suivent un élément <tag>p</tag>"
				],
		exercice: "sélectionner les cornichons à droite d'un plat",
		solution: "plat ~ cornichon",
		show: "P[o]pP(P)(p)"
	},
	//-----------------------------
	{
		selectorName: "Sélecteur d'enfant",
		selectorTitle: "Sélectionner l'enfant direct d'un élément.",
		selectorText: "Sélectionne les éléments qui sont les enfants directs d'autres éléments. Un enfant est un élément qui est au 1er niveau d'imbrication d'une hiérarchie.",
		selectorSyntax: "A &gt; B&nbsp;",
		examples: [
				"<strong>ul &gt; li</strong> sélectionnera les éléments <tag>li</tag> qui sont au 1er niveau d'imbrication dans un élément <strong>ul</strong>"
				],
		exercice: "sélectionner la pomme directement sur une assiette",
		solution: "assiette > pomme",
		show: "([A])(A)()Aa"
	},
	//-----------------------------
	{
		selectorName: "1er enfant (pseudo-classe)",
		selectorTitle: "Sélectionner le premier élément enfant d'un autre élément.",
		selectorText: "Sélectionne l'élément qui est le premier enfant d'un autre élément. On peut combiner ce sélecteur de pseudo-classe avec n'importe quel autre sélecteur.",
		selectorSyntax: ":first-child",
		examples: [
				"<strong>:first-child</strong> sélectionnera tous les éléments qui sont les premiers enfants d'un autre élément.",
				"<strong>p:first-child</strong> sélectionnera tous les éléments <tag>p</tag> qui sont le premier enfant d'autres éléments",
				"<strong>ol li:first-child</strong> sélectionnera toutes les premieres lignes (<tag>li:first-child</tag>) de listes ordonnées (élément <tag>ol</tag>)"
				],
		exercice: "sélectionner l'orange en haut",
		solution: "assiette :first-child",
		show: "[]()(OOO)p"
	},
	//-----------------------------
	{
		selectorName: "Enfant seul (pseudo-classe)",
		selectorTitle: "Sélectionner un élément qui est un enfant seul.",
		selectorText: "Sélectionner les éléments qui sont le seul enfant dans une imbrication d'éléments",
		selectorSyntax: ":only-child",
		examples: [
				"<strong>span:only-child</strong> sélectionnera les éléments <tag>span</tag> qui sont les seuls éléments enfants de leur parent.",
				"<strong>ul li:only-child</strong> sélectionnera la ligne qui sera unique (<tag>li:only-child</tag>) dans une liste (<tag>ul</tag>)."
				],
		exercice: "sélectionner la pomme et le cornichon sur une assiette",
		solution: "assiette :only-child",
		show: "(A)(p)[]P(oO)p"
	},
	//-----------------------------
	{
		selectorName: "Dernier enfant (pseudo-classe)",
		selectorTitle: "Sélectionner l'élément qui est le dernier enfant d'un autre élément.",
		selectorText: "Sélectionne l'élément qui est le dernier enfant d'un autre élément. Dans le cas où un élément est le seul enfant d'un autre, il peut être sélectionné avec first-child, only-child et last-child.",
		selectorSyntax: ":last-child",
		examples: [
				"<strong>:last-child</strong> sélectionnera tous les éléments qui sont les derniers enfants d'autres éléments.",
				"<strong>span:last-child</strong> sélectionnera tous les éléments <tag>span</tag> qui sont les derniers enfants d'autres éléments.",
				"<strong>ul li:last-child</strong> sélectionnera toutes les dernières lignes (<tag>li:last-child</tag>) de listes non ordonnées (élément <tag>ul</tag>)."
				],
		exercice: "sélectionner la petite pomme et le cornichon",
		solution: ".petite:last-child",
		show: "{a)()(oO)p"
	},
	//-----------------------------
	{
		selectorName: "Nième enfant (pseudo-classe)",
		selectorTitle: "Sélectionner un élément par sa position dans un ensemble d'enfants.",
		selectorText: "Sélectionne le Nième enfant (1er, 2éme, 3éme, 4éme, etc) parmi les enfants d'un autre élément. Pour définir la position on peut utiliser un nombre, mais aussi les mots clés <strong>odd</strong> et <strong>even</strong>. <strong>odd</strong> sélectionne tous les éléments à une position paire et <strong>even</strong> tous les éléments à une position impaire.",
		selectorSyntax: ":nth-child(n)",
		examples: [
				"<strong>:nth-child(8)</strong> sélectionnera tous les éléments qui les huitième enfants d'autres éléments.",
				"<strong>div p:nth-child(2)</strong> sélectionnera les éléments <tag>p</tag> qui sont les 2éme enfants d'éléments <tag>div</tag>.",
				],
		exercice: "sélectionner la troisième assiette",
		solution: ":nth-child(3)",
		show: "()()(){}"
	},
	//-----------------------------
	{
		selectorName: "Nième dernier enfant (pseudo-classe)",
		selectorTitle: "Sélectionner un élément par sa position dans un ensemble d'enfants, en commençant par la fin.",
		selectorText: "Sélectionne le dernier, avant-dernier, avant-avant-dernier, etc enfant parmi les enfants d'un autre élément.",
		selectorSyntax: ":nth-last-child(n)",
		examples: [
				"<strong>:nth-last-child(2)</strong> sélectionnera tous les avant-derniers éléments d'autres éléments."
				],
		exercice: "sélectionner le 1er plat",
		solution: "plat:nth-last-child(4)",
		show: "()[]a(OOO)[]"
	},
	//-----------------------------
	{
		selectorName: "1er d'un type (pseudo-classe)",
		selectorTitle: "Sélectionner le 1er enfant d'un certain type.",
		selectorText: "Sélectionne le 1er enfant d'un type donné parmi les enfants d'un autre élément.",
		selectorSyntax: ":first-of-type",
		examples: [
				"<strong>span:first-of-type</strong> sélectionnera le 1er élément <strong>span</strong> enfant d'autres éléments."
				],
		exercice: "sélectionner la 1ère pomme",
		solution: "pomme:first-of-type",
		show: "Aaaa(oO)"
	},

	//-----------------------------
	{
		selectorName: "Nième d'un type (pseudo-classe)",
		selectorTitle: "Sélectionner un élément par son type et sa position dans un ensemble d'enfants.",
		selectorText: "Sélectionne le Nième enfant (1er, 2éme, 3éme, 4éme, etc) parmi des enfants qui sont d'un type particulier. Pour définir la position on peut utiliser un nombre, mais aussi les mots clés <strong>odd</strong> et <strong>even</strong>. <strong>odd</strong> sélectionne tous les éléments à une position paire et <strong>even</strong> tous les éléments à une position impaire.",
		selectorSyntax: ":nth-of-type(n)",
		examples: [
				"<strong>div:nth-of-type(2)</strong> sélectionnera tous les 2éems <tag>div<tag> qui sont les enfants d'autres éléments.",
				"<strong>.example:nth-of-type(odd)</strong> sélectionnera tous les éléments avec l'attribut <tag>class</tag> égal à <tag>example</tag> qui sont à une position paire."
				],
		exercice: "sélectionner toutes les assiettes impaires",
		solution: "assiette:nth-of-type(even)",
		show: "()()()(){}()"
	},
	/*
	//-----------------------------
	{ 
		selectorName: "Nth-of-type Selector with Formula",
		selectorTitle: "Nth-of-type Selector with formula",
		selectorText: "The nth-of-type formula selects every nth element, starting the count at a specific instance of that element.",
		selectorSyntax: ":nth-of-type(Nn+n)",
		examples: [
				"<strong>span:nth-of-type(6n+2)</strong> selects every 6th instance of a <tag>span</tag>, starting from (and including) the second instance."
				],
		exercice: "Select every 2nd assiette, starting from the 3rd",
		solution: "assiette:nth-of-type(2n+3)",
		show: "()(p)(a)()(A)()"
	},
	*/
	//-----------------------------
	{
		selectorName: "Seul de ce type (pseudo-classe)",
		selectorTitle: "Sélectionner des éléments qui sont les seuls de leur type.",
		selectorText: "Sélectionne les éléments qui sont les seuls de leur type parmi les enfants d'autres éléments.",
		selectorSyntax: ":only-of-type",
		examples: [
				"<strong>p span:only-of-type</strong> sélectionnera les éléments <tag>span</tag> à l'intérieur d'éléments <tag>p</tag> si ce sont les seuls <tag>span</tag> parmi les enfants des <tag>p</tag>."
				],
		exercice: "sélectionner la pomme sur l'assiette du milieu.",
		solution: "pomme:only-of-type",
		show: "(aA)(a)(p)"
	},
	//-----------------------------
	{
		selectorName: "Dernier d'un type (pseudo-classe)",
		selectorTitle: "Sélectionner le dernier élément d'un certain type.",
		selectorText: "Sélectionne le dernier enfant d'un type donné parmi les enfants d'un autre élément.",
		selectorSyntax: ":last-of-type",
		examples: [
				"<strong>div:last-of-type</strong> sélectionnera tous les <tag>div</div> qui sont les derniers <tag>div</div> parmi les enfants d'autres éléments.",
				"<strong>p span:last-of-type</strong> sélectionnera le dernier élément <tag>span<tag> des éléments <tag>p</tag>."
				],
		exercice: "sélectionner la seconde pomme et la seconde orange.",
		solution: ".petite:last-of-type",
		show: "ooPPaa"
	},
	//-----------------------------
	{
		selectorName: "Elément vide (pseudo-classe)",
		selectorTitle: "Sélectionner les éléments sans enfant.",
		selectorText: "Sélectionne les éléments qui n'ont ni éléments enfants ni texte.",
		selectorSyntax: ":empty",
		examples: [
				"<strong>div:empty</strong> sélectionnera tous les éléments <tag>div</tag> sui sont vides."
				],
		exercice: "sélectionner les plats vides.",
		solution: "plat:empty",
		show: "[][p][][]"
	},
	//-----------------------------
	{
		selectorName: "Négation (pseudo-classe)",
		selectorTitle: "Sélectionner les éléments qui ne sont pas sélectionnés.",
		selectorText: "Sélectionne les éléments qui ne sont pas sélectionné par le sélecteur S passé en paramètre.",
		selectorSyntax: ":not(S)",
		examples: [
				"<strong>:not(#fantaisie)</strong> sélectionnera tous les éléments qui n'ont pas un attribut <tag>id<tag> égal à <tag>fantaisie</tag>.",
				"<strong>div:not(:first-child)</strong> sélectionnera les éléments <tag>div</tag> qui na sont pas des premiers enfants.",
				"<strong>:not(.big, .medium)</strong> sélectionnera tous les éléments qui n'ont pas un attribut <tag>class</tag> égal à <tag>big</tag> ou <tag>medium</tag>."
				],
		exercice: "sélectionner les grosses pommes.",
		solution: "pomme:not(.petite)",
		show: "{a}(A)A(o)p"
	}
];