<?php
	function vm_html_head($titre, $css = 'style.css'){
		echo'<!DOCTYPE HTML>',
			'<html>',
				'<head>',
				'<meta charset="UTF-8">',
				'<title>',$titre,'</title>',
				'<link rel="stylesheet" href="../styles/',$css,'" type="text/css">',
				'<link rel="shortcut icon" href="../images/favicon.ico" type="image/x-icon">',
				'</head>'
		;
	}
	DEFINE('APP_PAGE_AGENDA',1);
	DEFINE('APP_PAGE_RECHERCHE',2);
	DEFINE('APP_PAGE_ABONNEMENTS',3);
	DEFINE('APP_PAGE_PARAMETRES',4);
	function  vm_html_bandeau($page){
		switch($page){
			case '1':
				echo'<body>',
					'<main id="bcPage">',
						'<header id="bcEntete">',			
							'<div id="bcLogo"></div>',
							'<nav id="bcOnglets">',
								'<h2>Agenda</h2>',
								'<a href="#">Recherche</a>',
								'<a href="#">Abonnements</a>',
								'<a href="#">Param&egrave;tres</a>',
							'</nav>',
							'<a href="#" id="btnDeconnexion" title="Se d&eacute;connecter"></a>',
						'</header>'
				;
			break;
			case '2':
				echo'<body>',
					'<main id="bcPage">',
						'<header id="bcEntete">',			
							'<div id="bcLogo"></div>',
							'<nav id="bcOnglets">',
								'<a href="#">Agenda</a>',
								'<h2>Recherche</h2>',
								'<a href="#">Abonnements</a>',
								'<a href="#">Param&egrave;tres</a>',
							'</nav>',
							'<a href="#" id="btnDeconnexion" title="Se d&eacute;connecter"></a>',
						'</header>'
				;
			break;
			case '3':
				echo'<body>',
					'<main id="bcPage">',
						'<header id="bcEntete">',			
							'<div id="bcLogo"></div>',
							'<nav id="bcOnglets">',
								'<a href="#">Agenda</a>',
								'<a href="#">Recherche</a>',
								'<h2>Abonnements</h2>',
								'<a href="#">Param&egrave;tres</a>',
							'</nav>',
							'<a href="#" id="btnDeconnexion" title="Se d&eacute;connecter"></a>',
						'</header>'
				;
			break;
			case '4':
				echo'<body>',
					'<main id="bcPage">',
						'<header id="bcEntete">',			
							'<div id="bcLogo"></div>',
							'<nav id="bcOnglets">',
								'<a href="#">Agenda</a>',
								'<a href="#">Recherche</a>',
								'<a href="#">Abonnements</a>',
								'<h2>Param&egrave;tres</h2>',
							'</nav>',
							'<a href="#" id="btnDeconnexion" title="Se d&eacute;connecter"></a>',
						'</header>'
				;
			break;
		}
	}
	function vm_html_pied(){
		echo			'<footer id="bcPied">',
							'<a id="apropos" href="#">A propos</a>',
							'<a id="confident" href="#">Confidentialit&eacute;</a>',
							'<a id="conditions" href="#">Conditions</a>',
							'<p id="copyright">24sur7 &amp; Partners &copy; 2012</p>',
						'</footer>',
					'</main>',
				'</body>',
			'</html>'
		;
	}
	function vm_html_calendrier($jour = 0, $mois = 0, $annee = 0){
		echo'<p>',
				'<a href="#" class="flechegauche"><img src="../images/fleche_gauche.png" alt="picto fleche gauche"></a>',
				'F&eacute;vrier&nbsp;2012',
				'<a href="#" class="flechedroite"><img src="../images/fleche_droite.png" alt="picto fleche droite"></a>',
			'</p>',
			'<table>',
				'<tr>',
				'<th>Lu</th><th>Ma</th><th>Me</th><th>Je</th><th>Ve</th><th>Sa</th><th>Di</th>',
				'</tr>',
				'<tr>',
					'<td><a class="lienJourHorsMois" href="#">30</a></td>',
					'<td><a class="lienJourHorsMois" href="#">31</a></td>',
					'<td><a href="#">1</a></td>',
					'<td class="aujourdHui"><a href="#">2</a></td>',
					'<td><a href="#">3</a></td>',
					'<td><a href="#">4</a></td>',
					'<td><a href="#">5</a></td>',
				'</tr>',
				'<tr class="semaineCourante">',
					'<td><a href="#">6</a></td>',
					'<td class="jourCourant"><a href="#">7</a></td>',
					'<td><a href="#">8</a></td>',
					'<td><a href="#">9</a></td>',
					'<td><a href="#">10</a></td>',
					'<td><a href="#">11</a></td>',
					'<td><a href="#">12</a></td>',
				'</tr>',
				'<tr>',
					'<td><a href="#">13</a></td>',
					'<td><a href="#">14</a></td>',
					'<td><a href="#">15</a></td>',
					'<td><a href="#">16</a></td>',
					'<td><a href="#">17</a></td>',
					'<td><a href="#">18</a></td>',
					'<td><a href="#">19</a></td>',
				'</tr>',
				'<tr>',
					'<td><a href="#">20</a></td>',
					'<td><a href="#">21</a></td>',
					'<td><a href="#">22</a></td>',
					'<td><a href="#">23</a></td>',
					'<td><a href="#">24</a></td>',
					'<td><a href="#">25</a></td>',
					'<td><a href="#">26</a></td>',
				'</tr>',
				'<tr>',
					'<td><a href="#">27</a></td>',
					'<td><a href="#">28</a></td>',
					'<td><a href="#">29</a></td>',
					'<td><a class="lienJourHorsMois" href="#">1</a></td>',
					'<td><a class="lienJourHorsMois" href="#">2</a></td>',
					'<td><a class="lienJourHorsMois" href="#">3</a></td>',
					'<td><a class="lienJourHorsMois" href="#">4</a></td>',
				'</tr>',
			'</table>'
		;
	}
?>