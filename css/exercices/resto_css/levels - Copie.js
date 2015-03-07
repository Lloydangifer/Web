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
// [] = bento open close tags

// plate == assiette

var levels = [
	{
		selectorName: "Sélecteur de type",
		helpTitle: "Sélectionner les élements par leur type",		
		help:"Sélectionne tous les éléments de type <strong>A</strong>. Type fait référence au type de la balise: <tag>div</tag>, <tag>p</tag> et <tag>ul</tag> sont tous des élements de type différent.",
		syntax: "A",
		examples: [
				"<strong>div</strong> sélectionnera tous les éléments <tag>div</tag>.",
				"<strong>p</strong> sélectionnera tous les éléments <tag>p</tag> elements.",
				],
		doThis: "Sélectionnez les assiettes.",
		selector: "assiette",
		board: "()()"
	},
	//-----------------------------
	{
		selectorName: "Sélecteur de type",
		helpTitle: "Sélectionner les élements par leur type",
		help:"Sélectionne tous les éléments de type <strong>A</strong>. Type fait référence au type de la balise: <tag>div</tag>, <tag>p</tag> et <tag>ul</tag> sont tous des élements de type différent.",
		selector: "bento",
		examples: [
				"<strong>div</strong> sélectionnera tous les éléments <tag>div</tag>.",
				"<strong>p</strong> sélectionnera tous les éléments <tag>p</tag> elements.",
				],
		syntax: "A",
		doThis: "Sélectionnez les boîtes à bento.",
		board: "[]()[]"
	},
	//-----------------------------
	{
		selectorName: "Sélecteur d'identifiant",
		helpTitle: "Sélectionner un élément par son identifiant",
		help:"Sélectionne l'élément avec l'attribut <tag>id</tag> qui a la valeur <tag>nom</tag>. On peut combiner le sélecteur d'identifant et le sélecteur de type.",
		syntax: "#nom",
		examples: [
				"<strong>#cool</strong> sélectionnera l'élément avec l'attribut <tag>id</tag> égal à <tag>cool</tag>.",
				"<strong>ul#long</strong> sélectionnera l'élément <tag>ul</tag> qui a un attribut <tag>id</tag> égal à <tag>long</tag>."
				],
		doThis: "Sélectionnez l'assiette fantaisie.",
		selector: "#fantaisie",
		board: "{}()[]"
	},
	//-----------------------------
	{
		selectorName: "Sélecteur de descendants",
		helpTitle: "Sélectionner un élément dans un autre élément",
		help:"Selectionne tout les <tag>B</tag> contenu dans des <tag>A</tag>. <tag>B</tag> est un descendant: un élément imbriqué dans un autre élément, quelque soit le niveau de l'imbrication.",
		syntax: "A&nbsp;&nbsp;B",
		examples: [
				"<strong>p&nbsp;&nbsp;strong</strong> sélectionnera les éléments <tag>strong</tag> qui sont descendant d'un élément <tag>p</tag>.",
				"<strong>#fantaisie&nbsp;&nbsp;span</strong> sélectionnera les éléments <tag>span</tag> qui sont descendants de l'élément avec l'attribut <tag>id<tag> égal à <tag>fantaisie</tag>.",
				],
		doThis: "Sélectionnez la pomme sur l'assiette",
		selector: "assiette pomme",
		board: "[](A)A"
	},
	//-----------------------------
	{
		selectorName: "Combinaison de sélecteurs",
		helpTitle: "Combiner descendant et sélecteur d'identifiant",
		help:"On peut combiner n'importe quel sélecteur avec le sélecteur de descendants.",
		syntax: "#id&nbsp;&nbsp;A",
		examples: [
				"<strong>#cool&nbsp;span</strong> sélectionnera tous les éléments <tag>span</tag> à l'intérieur de l'élément avec l'attribut <tag>id</tag> égal à <tag>cool</tag>."
				],
		doThis: "Sélectionnez le cornichon sur l'assiette fantaisie.",
		selector: "#fantaisie cornichon",
		board: "[O]{P}(P)"
	},
	//-----------------------------
	{
		selectorName: "Sélecteur de classe",
		helpTitle: "Sélectionner des éléments par leur classe",
		help:"Le sélecteur de classe sélectionne tous les éléments avec un attribut <tag>class</tag> qui a la valeur <tag>nomDeClasse</tag>. Un élément ne peut avoir qu'un seul identifiant mais il peut avoir plusieurs classes.",
		selector: ".petite",
		examples: [
				"<strong>.neato</strong> sélectionnera tous les éléments avec l'attribut <tag>class</tag> égal à <tag>neato</tag>."
				],
		syntax: ".nomDeClasse",
		doThis: "Sélectionnez les petites pommes.",
		board: "Aa(a)()"
	},
	//-----------------------------
	{
		selectorName: "Combinaison de sélecteurs",
		helpTitle: "Combiner le sélecteur de classe",
		help:"On peut combiner le sélecteur de classe avec d'autres sélecteurs comme par exemple le sélecteur de type.",
		syntax: "A.nomDeClasse",
		examples: [
				"<strong>ul.important</strong> sélectionnera tous les éléments <tag>ul</tag> avec un attribut <tag>class</tag> égal à <tag>important</tag>.",
				"<strong>#big.wide</strong> sélectionnera l'élément avec l'attribut <tag>id</tag> égal à <tag>big</strong> et qui a aussi un attribut <tag>class</tag> égal à <strong>wide</strong>."
				],
		doThis: "Sélectionnez les petites oranges.",
		selector: "orange.petite",
		board: "Aa[o](O)(o)"
	},
	//-----------------------------
	{
		selectorName: "",
		helpTitle: "Vous pouvez le faire !",
		help:"Combinez ce que vous avez appris dans les niveaux précédents pour y arriver.",
		syntax: "A vous de trouver !",
		doThis: "Sélectionnez les petites oranges dans les boîtes à bento.",
		selector: "bento orange.petite",
		board: "A(o)[o][a][o]"
	},
	//-----------------------------
	{
		selectorName: "Combinateur de groupement",
		helpTitle: "Combiner des sélecteurs avec la virgule",
		help:"Sélectionne tous les éléments <tag>A</tag> ET tous les éléments <tag>B</tag>. On peut combiner n'importe quel sélecteur de cette façon et on peut en combiner plus de 2.",
		syntax: "A, B",
		examples: [
				"<strong>p, .fun</strong> sélectionnera tous les éléments <tag>p</tag> et tous les éléments avec une classe <tag>fun</tag>.",
				"<strong>a, p, div</strong> sélectionnera tous les éléments <tag>a</tag>, <tag>p</tag> et <tag>div</tag>."
				],
		doThis: "Sélectionnez toutes les assiettes et boîtes à bento.",
		selector: "assiette, bento",
		board: "pP(P)[P](P)Pp"
	},
	//-----------------------------
	{
		selectorName:  "Sélecteur universel",
		helpTitle: "Sélectionner tout",
		help:"Sélectionne tous les éléments.",
		syntax: "*",
		examples: [
				"<strong>*</strong> sélectionnera absolument tous les élements à l'intérieur du document HTML."
				],
		doThis: "Sélectionnez tout.",
		selector: "*",
		board: "A(o)[][O]{)"
	},
	//-----------------------------
	{
		selectorName:  "Sélecteur universel",
		helpTitle: "Combiner le sélecteur universel",
		help:"Sélectionne tous les éléments contenus dans <strong>A</strong>.",
		selector: "assiette *",
		examples: [
				"<strong>p *</strong> sélectionnera tous les éléments contenus dans des éléments <tag>p</tag>.",
				"<strong>ul.fantaisie *</strong> sélectionnera tous les éléments contenus dans des éléments <tag>ul</tag> avec une classe <tag>fantaisie</tag>."
				],
		syntax: "A&nbsp;&nbsp;*",
		doThis: "Sélectionnez tout ce qui se trouve sur les assiettes.",
		board: "{o}(P)a(A)"
	},
	//-----------------------------
	{
		selectorName: "Sélecteur d'adjacent direct",
		helpTitle: "Sélectionner un élément qui en suit directement un autre",
		help:"Sélectionne tous les éléments <tag>B</tag> qui suivent directement un élément <tag>A</tag>. Un élément qui en suit un autre est appelé adjacent. Les 2 éléments sont du même niveau dans l'arborescence des éléments du document HTML et ne sont donc pas imbriqués.",
		selector: "assiette + pomme",
		examples: [
				"<strong>div + a</strong> sélectionnera les éléments <tag>a</tag> qui suivent directement un élément <tag>div</tag>",
				"<strong>p + .intro</strong> sélectionnera les éléments avec la classe <tag>intro</tag> et qui suivent directement un élément <tag>p</tag>"    
				],
		syntax: "A + B",
		doThis: "Sélectionnez chaque pomme après une assiette",
		board: "[a]()a()Aaa"
	},
	//-----------------------------
	{
		selectorName: "Sélecteur d'adjacents indirects",
		helpTitle: "Sélectionner des éléments qui suivent un autre élément",
		help:"Sélectionne tous les éléments adjacents à un autre, quelque soit leur place dans la succession. C'est comme le sélecteur d'adjacent direct (A + B) sauf qu'on sélectionnera les éléments à n'importe quelle place et pas seulement le premier qui suit.",
		syntax: "A ~ B",
		examples: [
				"<strong>p ~ ul</strong> sélectionnera tous les éléments <tag>ul</tag> qui suivent un élément <tag>p</tag>"
				],
		doThis: "Sélectionnez les cornichons à droite d'une boîte à bento",
		selector: "bento ~ cornichon",
		board: "P[o]pP(P)(p)"
	},
	//-----------------------------
	{
		selectorName: "Sélecteur d'enfant",
		helpTitle: "Sélectionner l'enfant direct d'un élément",
		help:"Sélectionne les éléments qui sont les enfants directs d'autres éléments. Un enfant est un élément qui est au 1er niveau d'imbrication d'une hiérarchie.",
		syntax: "A &gt; B&nbsp;",
		examples: [
				"<strong>ul &gt; li</strong> sélectionnera les éléments <tag>li</tag> qui sont au 1er niveau d'imbrication dans un élément <strong>ul</strong>"
				],
		doThis: "Sélectionnez la pomme directement sur une assiette",
		selector: "assiette > pomme",
		board: "([A])(A)()Aa"
	},
	//-----------------------------
	{
		selectorName: "1er enfant (pseudo-classe)",
		helpTitle: "Sélectionner le premier élément enfant d'un autre élément",
		help:"Sélectionne l'élément qui est le premier enfant d'un autre élément. On peut combiner ce sélecteur de pseudo-classe avec n'importe quel autre sélecteur.",
		syntax: ":first-child",
		examples: [
				"<strong>:first-child</strong> sélectionnera tous les éléments qui sont les premiers enfants d'un autre élément.",
				"<strong>p:first-child</strong> sélectionnera tous les éléments <tag>p</tag> qui sont le premier enfant d'autres éléments",
				"<strong>ol li:first-child</strong> sélectionnera toutes les premieres lignes (<tag>li:first-child</tag>) de listes ordonnées (élément <tag>ol</tag>)"
				],
		doThis: "Sélectionnez l'orange en haut",
		selector: "assiette:first-child",
		board: "[]()(OOO)p"
	},
	//-----------------------------
	{
		selectorName: "Enfant seul (pseudo-classe)",
		helpTitle: "Sélectionner un élément qui est un enfant seul.",
		help:"Sélectionner les éléments qui sont le seul enfant dans une imbrication d'éléments",
		syntax: ":only-child",
		examples: [
				"<strong>span:only-child</strong> sélectionnera les éléments <tag>span</tag> qui sont les seuls éléments enfants de leur parent.",
				"<strong>ul li:only-child</strong> sélectionnera la ligne qui sera unique (<tag>li:only-child</tag>) dans une liste (<tag>ul</tag>."
				],
		doThis: "Sélectionnez la pomme et le cornichon sur une assiette",
		selector: "assiette:only-child",
		board: "(A)(p)[]P(oO)p"
	},
	//-----------------------------
	{
		selectorName: "Dernier enfant (pseudo-classe)",
		helpTitle: "Sélectionne l'élément qui est le dernier enfant d'un autre élément",
		help:"Sélectionne l'élément qui est le dernier enfant d'un autre élément. Dans le cas où un élément est le seul enfant d'un autre, il peut être sélectionné avec first-child, only-child et last-child.",
		syntax: ":last-child",
		examples: [
				"<strong>:last-child</strong> sélectionnera tous les éléments qui sont les derniers enfants d'autres éléments.",
				"<strong>span:last-child</strong> sélectionnera tous les éléments <tag>span</tag> qui sont les derniers enfants d'autres éléments.",
				"<strong>ul li:last-child</strong> sélectionnera toutes les dernières lignes (<tag>li:last-child</tag>) de listes non ordonnées (élément <tag>ul</tag>)."
				],
		doThis: "Sélectionnez la petite pomme et le cornichon",
		selector: ".petite:last-child",
		board: "{a)()(oO)p"
	},
	//-----------------------------
	{
		selectorName: "Nième enfant (pseudo-classe)",
		helpTitle: "Sélectionne un élément par sa position dans un ensemble d'enfants",
		help:"Sélectionne le Nième enfant (1er, 2éme, 3éme, 4éme, etc) parmi les enfants d'un autre élément.",
		syntax: ":nth-child(n)",
		examples: [
				"<strong>:nth-child(8)</strong> sélectionnera tous les éléments qui les huitième enfants d'autres éléments.",
				"<strong>div p:nth-child(2)</strong> sélectionnera les éléments <tag>p</tag> qui sont les 2éme enfants d'éléments <tag>div</tag>.",
				],
		doThis: "Séectionnez la troisième assiette",
		selector: ":nth-child(3)",
		board: "()()(){}"
	},
	//-----------------------------
	{
		selectorName: "Nth Last Child Selector",
		helpTitle: "Select an element by its order in another element, counting from the back",
		help:"Selects the children from the bottom of the parent. This is like nth-child, but counting from the back!",
		syntax: ":nth-last-child(n)",
		examples: [
				"<strong>:nth-last-child(2)</strong> selects all second-to-last child elements."
				],
		doThis: "Select the 1st bento",
		selector: "bento:nth-last-child(4)",
		board: "()[]a(OOO)[]"
	},
	//-----------------------------
	{
		selectorName: "First of Type Selector",
		helpTitle: "Select the first element of a specific type",
		help:"Selects the first element of that type within another element.",
		syntax: ":first-of-type",
		examples: [
				"<strong>span:first-of-type</strong> selects the first <strong>&lt;span&gt;</strong> in any element."
				],
		doThis: "Select first pomme",
		selector: "pomme:first-of-type",
		board: "Aaaa(oO)"
	},
	//-----------------------------
	{
		selectorName: "Nth of Type Selector",
		// helpTitle: "Nth of Type Selector",
		help: "Selects a specific element based on its type and order in another element - or even or odd instances of that element.",
		syntax: ":nth-of-type(n)",
		examples: [
				"<strong>div:nth-of-type(2)</strong> selects the second instance of a div.",
				"<strong>.example:nth-of-type(odd)</strong> selects all odd instances of a the example class."
				],
		doThis: "Select all even assiettes",
		selector: "assiette:nth-of-type(even)",
		board: "()()()(){}()"
	},
	//-----------------------------
	{ 
		selectorName: "Nth-of-type Selector with Formula",
		// helpTitle: "Nth-of-type Selector with formula",
		help: "The nth-of-type formula selects every nth element, starting the count at a specific instance of that element.",
		syntax: ":nth-of-type(Nn+n)",
		examples: [
				"<strong>span:nth-of-type(6n+2)</strong> selects every 6th instance of a <tag>span</tag>, starting from (and including) the second instance."
				],
		doThis: "Select every 2nd assiette, starting from the 3rd",
		selector: "assiette:nth-of-type(2n+3)",
		board: "()(p)(a)()(A)()"
	},
	//-----------------------------
	{
		selectorName: "Only of Type Selector",
		helpTitle: "Select elements that are the only ones of their type",
		help:"Selects the only element of its type within another element.",
		syntax: ":only-of-type",
		examples: [
				"<strong>p span:only-of-type</strong> selects a <tag>span</tag> within any <tag>p</tag> if it is the only <tag>span</tag> in there."
				],
		doThis: "Select the pomme on the middle assiette.",
		selector: "pomme:only-of-type",
		board: "(aA)(a)(p)"
	},
	//-----------------------------
	{
		selectorName: "Last of Type Selector",
		helpTitle: "Select the last element of a specific type",
		help:"Selects each last element of that type within another element. Remember type refers the kind of tag, so <tag>p</tag> and <tag>span</tag> are different types. <br><br> I wonder if this is how the last dinosaur was selected before it went extinct.",
		syntax: ":last-of-type",
		examples: [
				"<strong>div:last-of-type</strong> selects the last <strong>&lt;div&gt;</strong> in every element.",
				"<strong>p span:last-of-type</strong> selects the last <strong>&lt;span&gt;</strong> in every <strong>&lt;p&gt;</strong>."
				],
		doThis: "Select the second pomme and orange",
		selector: ".petite:last-of-type",
		board: "ooPPaa"
	},
	//-----------------------------
	{
		selectorName: "Empty Selector",
		helpTitle: "Select elements that don't have children",
		help:"Selects elements that don't have any other elements inside of them.",
		syntax: ":empty",
		examples: [
				"<strong>div:empty</strong> selects all empty <strong>&lt;div&gt;</strong> elements."
				],
		doThis: "Select the empty bentos",
		selector: "bento:empty",
		board: "[][p][][]"
	},
	//-----------------------------
	{
		selectorName: "Negation Pseudo-class",
		helpTitle: "Select all elements that don't match the negation selector",
		help:"You can use this to select all elements that do not match selector <strong>X</strong>.",
		syntax: ":not(X)",
		examples: [
				"<strong>:not(#fantaisie)</strong> selects all elements that do not have <strong>id=fantaisieF</strong>.",
				"<strong>div:not(:first-child)</strong> selects every <tag>div</tag> that is not a first child.",
				"<strong>:not(.big, .medium)</strong> selects all elements that do not have <strong>class=big</strong> or <strong>class=medium</strong>."
				],
		doThis: "Select the big pommes",
		selector: "pomme:not(.petite)",
		board: "{a}(A)A(o)p"
	}
];