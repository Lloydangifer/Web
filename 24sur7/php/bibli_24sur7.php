<?php
/** @file
 * Bibliothèque générale de fonctions
 *
 * @author : Frederic Dadeau - frederic.dadeau@univ-fcomte.fr
 */

//____________________________________________________________________________
//
// Défintion des constantes de l'application
//____________________________________________________________________________

// Gestion des infos base de données
define('APP_DB_URL', 'localhost');
define('APP_DB_USER', 'u_24sur7');
define('APP_DB_PASS', 'p_24sur7');
define('APP_DB_NOM', '24sur7');

define('APP_NOM_APPLICATION','24sur7');

// Gestion des pages de l'application
define('APP_PAGE_AGENDA', 'agenda.php');
define('APP_PAGE_RECHERCHE', 'recherche.php');
define('APP_PAGE_ABONNEMENTS', 'abonnements.php');
define('APP_PAGE_PARAMETRES', 'parametres.php');

// Définition du nom des mois. Comme une constante
// ne peut être que scalaire, on utilise une chaîne
// qu'on "explodera" en tableau pour l'utiliser
define('APP_MOIS', 	'x,Janvier,Février,Mars,Avril,Mai,Juin,Juillet,Août,Septembre,Octobre,Novembre,Décembre');

// Définition des types de zones de saisies
define('APP_Z_TEXT', 'text');
define('APP_Z_PASS', 'password');
define('APP_Z_SUBMIT', 'submit');

//____________________________________________________________________________

/**
 * Connexion à la base de données
 */
function fd_db_open() {

	mysql_connect(APP_DB_URL, APP_DB_USER, APP_DB_PASS) or fd_db_err('Erreur Connexion serveur');
	mysql_select_db(APP_DB_NOM) or fd_db_err('Erreur sélection BD');
}

//____________________________________________________________________________

/**
 * Traitement erreur mysql, affichage et exit.
 *
 * @param string		$sql	Requête SQL ou message
 */
function fd_db_err($sql) {
	// On efface ce qui était déjà généré dans le buffer d'envoi au navigateur
	ob_end_clean();

	// On récupère la pile des appels de fonction
	// http://www.php.net/manual/fr/function.debug-backtrace.php
	$appels = debug_backtrace();
	$iMax = count($appels);

	// mise en forme de la requête. Dépend de la façon dont on
	// écrit la requête (tabulation, etc ...). La ligne suivante
	// peut être supprimée.
	$sql = str_replace("\t", "  ", "\t\t$sql");

	// On affiche un message grossièrement mis en forme pour notre débugage
	echo '<h2>Erreur ligne ', $appels[0]['line'],
		' dans ', basename($appels[0]['file']), '</h2><hr>',
		'<p><strong>Erreur mysql : </strong>', mysql_errno(), ' - ', mysql_error(),
		'<p><strong>Requ&ecirc;te SQL</strong><pre>', $sql, '</pre>';

	// Si une seule entrès dans la pile => l'erreur est
	// directement dans le script principal. On sort ici.
	if ($iMax == 1) {
		exit();			// Fin du script
	}

	// Affichage de la pile des appels
	echo '<hr><p><strong>Pile des appels de fonctions</strong><ul>';

	for ($i = $iMax - 1; $i > 0; $i--) {
		echo '<li><strong>', $appels[$i]['function'],
			'</strong> appel&eacute;e ligne <strong>', $appels[$i]['line'],
			'</strong> dans <strong>', basename($appels[$i]['file']), '</strong>';
	}

	exit('</ul>');		// Fin du script
}

//____________________________________________________________________________

/**
 * Génère le code HTML du début des pages.
 *
 * @param string	$titre		Titre de la page
 * @param string	$css		url de la feuille de styles liée
 */
function fd_html_head($titre, $css = '../styles/style.css') {
	echo '<!DOCTYPE HTML>',
		'<html>',
			'<head>',
				'<meta charset="UTF-8">',
				'<title>', $titre, '</title>',
				'<link rel="stylesheet" href="', $css, '">',
				'<link rel="shortcut icon" href="../images/favicon.ico" type="image/x-icon">',
			'</head>',
			'<body>',
				'<div id="bcPage">';
}

//____________________________________________________________________________

/**
 * Génère le code HTML du bandeau des pages.
 *
 * @param string	$page		Constante APP_PAGE_xxx
 */
function fd_html_bandeau($page) {
	echo '<div id="bcEntete">',
			'<div id="bcOnglets">',
				($page == APP_PAGE_AGENDA) ? '<h2>Agenda</h2>' : '<a href="'.APP_PAGE_AGENDA.'">Agenda</a>',
				($page == APP_PAGE_RECHERCHE) ? '<h2>Recherche</h2>' : '<a href="'.APP_PAGE_RECHERCHE.'">Recherche</a>',
				($page == APP_PAGE_ABONNEMENTS) ? '<h2>Abonnements</h2>' : '<a href="'.APP_PAGE_ABONNEMENTS.'">Abonnements</a>',
				($page == APP_PAGE_PARAMETRES) ? '<h2>Paramètres</h2>' : '<a href="'.APP_PAGE_PARAMETRES.'">Paramètres</a>',
			'</div>',
			'<div id="bcLogo"></div>',
			'<a href="deconnexion.php" id="btnDeconnexion" title="Se déconnecter"></a>',
		 '</div>';
}
//____________________________________________________________________________

/**
 * Génère le code HTML du pied des pages.
 */
function fd_html_pied() {
	echo '<div id="bcPied">',
			'<a id="apropos" href="#">A propos</a>',
			'<a id="confident" href="#">Confidentialité</a>',
			'<a id="conditions" href="#">Conditions</a>',
			'<p id="copyright">24sur7 & Partners &copy; 2012</p>',
		'</div>';

	echo '</div>',	// fin du bloc bcPage
		'</body></html>';
}

//____________________________________________________________________________

/**
 * Génère le code HTML d'un calendrier.
 *
 * @param integer	$jour		Numéro du jour à afficher
 * @param integer	$mois		Numéro du mois à afficher
 * @param integer	$annee		Année à afficher
 */
function fd_html_calendrier($jour = 0, $mois = 0, $annee = 0) {
	list($JJ, $MM, $AA) = explode('-', date('j-n-Y'));

	// Vérification des paramètres
	$jour = (int) $jour;
	($jour < 1 || $jour > 31) && $jour = $JJ;

	$mois = (int) $mois;
	($mois < 1 || $mois > 12) && $mois = $MM;

	$annee = (int) $annee;
	($annee < 2011) && $annee = $AA;

	if (!checkdate($mois, $jour, $annee)) {
		$jour = $JJ;
		$mois = $MM;
		$annee = $AA;
	}

	// Initialisations diverses
	$aujourdHui = mktime(0, 0, 0, $MM, $JJ, $AA);
	$jourDebut = mktime(0, 0, 0, $mois, 1, $annee);
	$jourFin = mktime(0, 0, 0, ($mois + 1), 0, $annee);
	$nbJoursMois = date('j', $jourFin);	// nombre de jours dans le mois

	// Pour signaler le jour en cours dans l'affichage
	$aujourdHui = ($aujourdHui < $jourDebut || $aujourdHui > $jourFin) ? 0 : $JJ;

	// Pour signaler la semaine du jour demandé
	$semaine = date('W', mktime(0, 0, 0, $mois, $jour, $annee));

	// Quel est le nom du jour du début du mois (lundi, mardi, etc.)
	$jourDebut = date('w', $jourDebut);
	($jourDebut == 0) && $jourDebut = 7;

	// Si le mois ne commence pas un lundi, il faut
	// rechercher le nombre de jours du mois précédent
	// pour faire l'affichage de la fin de ce mois
	if ($jourDebut == 1) {
		$nbJoursAvant = 0;
	} else {
		$nbJoursAvant = mktime(0, 0, 0, $mois, 0, $annee);
		$nbJoursAvant = date('j', $nbJoursAvant);
	}

	// Affichage du titre du calendrier
	echo '<div id="calendrier">',
			'<p>',
				'<a href="#" class="flechegauche"><img src="../images/fleche_gauche.png"></a>',
				fd_get_mois($mois), ' ', $annee,
				'<a href="#" class="flechedroite"><img src="../images/fleche_droite.png"></a>',
			'</p>';

	// Affichage des jours du calendrier
	echo '<table>',
			'<tr>',
				'<th>Lu</th><th>Ma</th><th>Me</th><th>Je</th><th>Ve</th><th>Sa</th><th>Di</th>',
			'</tr>';

	// On vérifie si le jour demandé est dans la 1ere semaine affichée
	if (date('W', mktime(0, 0, 0, $mois, 2 - $jourDebut, $annee)) == $semaine) {
		echo '<tr class="semaineCourante">';
	} else {
		echo '<tr>';
	}


	// Jours du mois précédent
	for ($i = $case = 1; $i < $jourDebut; $i++, $case++) {
		echo '<td><a class="lienJourHorsMois" href="#">',
				($nbJoursAvant - $jourDebut + $i + 1),
				'</a></td>';
	}

	// Jours du mois
	for ($i = 1; $i <= $nbJoursMois; $i++, $case++) {
		if ($i == $aujourdHui) {
			echo '<td class="aujourdHui">';
		} elseif ($i == $jour) {
			echo '<td class="jourCourant">';
		} else {
			echo '<td>';
		}

		echo '<a href="#">', $i, '</a></td>';

		if ($case < 7) {
			continue;	// ==>> la semaine n'est pas terminée
		}

		// Quand une semaine est complétement affichée il faut
		// créer une nouvelle rangée dans le tableau et signaler
		// éventuellement la semaine du jour demandé.
		echo '</tr>';

		if ($i == $nbJoursMois) {
			break;		// ==>> BREAK : l'affichage du calendrier est fini
		}

		$case = 0;
		if (date('W', mktime(0, 0, 0, $mois, $i + 1, $annee)) == $semaine) {
			echo '<tr class="semaineCourante">';
		} else {
			echo '<tr>';
		}
	}

	// Premiers jours du mois suivant
	if ($case > 1) {
		for ($i = 1; $case < 8; $i++, $case++) {
			echo '<td><a class="lienJourHorsMois" href="#">', $i, '</a></td>';
		}

		echo '</tr>';
	}

	echo '</table></div>';
}

//_______________________________________________________________

/**
 * Renvoie le nom d'un mois.
 *
 * @param integer	$numero		Numéro du mois (entre 1 et 12)
 *
 * @return string 	Nom du mois correspondant
 */
function fd_get_mois($numero) {
	$numero = (int) $numero;
	($numero < 1 || $numero > 12) && $numero = 0;

	$mois = explode(',', APP_MOIS);

	return $mois[$numero];
}

//____________________________________________________________________________

/**
 * Formatte une date AAAAMMJJ en format lisible
 *
 * @param integer	$amj		Date au format AAAAMMJJ
 *
 * @return string	Date formattée JJ nomMois AAAA
 */
function fd_date_claire($amj) {
	$a = (int) substr($amj, 0, 4);
	$m = (int) substr($amj, 4, 2);
	$m = fd_get_mois($m);
	$j = (int) substr($amj, -2);

	return "$j $m $a";
}

//____________________________________________________________________________

/**
* Formatte une heure HHMM en format lisible
*
* @param integer	$h		Heure au format HHMM
*
* @return string	Heure formattée HH h SS
*/
function fd_heure_claire($h) {
	$m = (int) substr($h, -2);
	($m == 0) && $m = '';
	$h = (int) ($h / 100);

	return "{$h}h{$m}";
}

//____________________________________________________________________________

/**
 * Redirige l'utilisateur sur une page
 *
 * @param string	$page		Page où rediriger
 */
function fd_redirige($page) {
	header("Location: $page");
	exit();
}


//_______________________________________________________________
/**
 * Véfication d'une session.
 *
 * Redirection sur la page d'inscription si la session n'est pas ouverte.
 */
function fd_verifie_session() {
	session_start();
	if (! isset($_SESSION['utiID'])) {
		session_destroy();
		header('Location: inscription.php');
		exit();
	}
}
//_______________________________________________________________

/**
 * Génére le code HTML d'une ligne de tableau d'un formulaire.
 *
 * Les formulaires sont mis en page avec un tableau : 1 ligne par
 * zone de saisie, avec dans la collone de gauche le lable et dans
 * la colonne de droite la zone de saisie.
 *
 * @param string		$gauche		Contenu de la colonne de gauche
 * @param string		$droite		Contenu de la colonne de droite
 *
 * @return string	Le code HTML de la ligne du tableau
 */
function fd_form_ligne($gauche, $droite) {
	$gauche = htmlentities($gauche, ENT_COMPAT, 'UTF-8');
	return "<tr><td>{$gauche}</td><td>{$droite}</td></tr>";
}

//_______________________________________________________________

/**
* Génére le code d'une zone input de formulaire (type text, password ou button)
*
* @param string		$type	le type de l'input (constante FD_Z_xxx)
* @param string		$name	Le nom de l'input
* @param String		$value	La valeur par défaut
* @param integer	$size	La taille de l'input
*
* @return string	Le code HTML de la zone de formulaire
*/
function fd_form_input($type, $name, $value, $size=0) {
	$value = htmlentities($value, ENT_COMPAT, 'UTF-8');
	$size = ($size == 0) ? '' : "size='{$size}'";
	return "<input type='{$type}' name='{$name}' {$size} value=\"{$value}\">";
}

//_______________________________________________________________

/**
* Génére le code pour un ensemble de trois zones de sélection
* représentant uen date : jours, mois et années
*
* @param string		$nom	Préfixe pour les noms des zones
* @param integer	$jour 	Le jour sélectionné par défaut
* @param integer	$mois 	Le mois sélectionné par défaut
* @param integer	$annee	l'année sélectionnée par défaut
*
* @return string 	Le code HTML des 3 zones de liste
*/
function fd_form_date($nom, $jour = 0, $mois = 0, $annee = 0) {
	list($AA, $MM, $JJ) = explode('-', date('Y-n-j'));
	($jour == 0) && $jour = $JJ;
	($mois == 0) && $mois = $MM;
	($annee == 0) && $annee = $AA;

	$H = "<select name='{$nom}_j'>";
	for ($i = 1; $i < 32; $i++) {
		$selected = ($i == $jour) ? ' selected' : '';
		$H .= "<option value='{$i}'{$selected}>{$i}";
	}
	$H .= '</select>';

	$libMois = explode(',', APP_MOIS);

	$H .= "<select name='{$nom}_m'>";
	for ($i = 1; $i < 13; $i++) {
		$selected = ($i == $mois) ? ' selected' : '';
		$H .= "<option value='{$i}'{$selected}>{$libMois[$i]}";
	}
	$H .= '</select>';

	$H .= "<select name='{$nom}_a'>";
	for ($i = $AA, $iMin = $AA - 99; $i >= $iMin; $i--) {
		$selected = ($i == $annee) ? ' selected' : '';
		$H .= "<option value='{$i}'{$selected}>{$i}";
	}
	$H .= '</select>';

	return $H;
}
?>