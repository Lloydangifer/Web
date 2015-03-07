<?php
ob_start();
session_start();
require('bib_params.php');
require('bib_fonctions.php');

$errs = array();	// Pour stockage des erreurs
					// de saisie dans le formulaire

htmlDebut('Mise � jour auteur', 'bd.css');

$bd = bdConnecter();

// Traitement  suivant le bouton trouv� dans
// le post ou l'id trouv� dans le get

//---------------------------------------------------------
// Nouvel auteur : initialisation des valeurs par
// d�faut des zones du formulaires, affichage
// du formulaire de saisie.
if (isset($_POST['btnNouveau'])) {
	$z = array('auNom' => '',
				'auPrenom' => '',
				'auBiographie' => '',
				'auPays' => 'FR');

	afficherForm($z, $errs);
	htmlFin();
	exit();		//==> FIN du traitement nouveau
}

//--------------------------------------------------------
// Affichage d'un auteur : on vient de la page de
// liste. V�rification de l'ID pass�e dans l'url,
// s�lection de l'enregistrement auteur dans la
// base, affichage du formulaire.
if (isset($_GET['x'])) {
	$idAuteur = decrypterURL($_GET['x']);
	if ($idAuteur === FALSE) {
		header('Location: auteurs_cherche.php');
		exit();	//==> FIN : piratage ?
	}

	$_SESSION['idAuteur'] = (int) $idAuteur;

	$sql = "SELECT *
			FROM auteurs
			WHERE auID = $idAuteur";
	$r = mysqli_query($bd, $sql) or bdErreur($bd, $sql);

	$enr = mysqli_fetch_assoc($r);

	if ($enr === FALSE) {
		header('Location: auteurs_cherche.php');
		exit();	//==> FIN : piratage ?
	}

	afficherForm($enr, $errs);
	htmlFin();
	exit();		//==> FIN du traitement affichage
}

//--------------------------------------------------------
// Validation d'une saisie : v�rification des
// valeurs saisies, mise � jour de la base de
// donn�es si Ok, sinon affichage du formulaire de
// saisie avec les erreurs d�tect�es.
if (isset($_POST['btnValider'])) {
	$errs = verifierForm();

	if (count($errs) == 0) {
		mettreAJourBase($bd);
		afficherFin();
		exit();		//==> FIN du traitement ajout ou modif
	}

	// Il y a des erreurs de saisie. Il faut r�afficher
	// le formulaire avec ce qui a �t� saisi
	afficherForm($_POST, $errs);
	htmlFin();
	exit();		//==> FIN du traitement r�-affichage
}

//--------------------------------------------------------
// Suppression d'un auteur
if (isset($_POST['btnSupprimer'])) {
	$sql = "DELETE
			FROM auteurs
			WHERE auID = {$_SESSION['idAuteur']}";
	mysqli_query($bd, $sql) or bdErreur($bd, $sql);

	afficherFin();
	htmlFin();
	exit();		//==> FIN du traitement suppression
}

//--------------------------------------------------------
// Si on arrive ici c'est que l'utilisateur n'est
// pas pass� par les pages impos�es.
header('Location: auteurs_cherche.php');

//--------------------------------------------------------
/**
 * Affichage du formulaire de saisie
 *
 * @param array		$z		Tab assoc. zone => valeur
 * @param array		$errs	Tab assoc. zone => msg erreur
 */
function afficherForm($z, $errs) {
	htmlProteger($z);
	htmlProteger($errs);

	echo '<form method="POST" class="maj"
				action="auteurs_maj.php">';

	echo '<label>Nom ',
			'<span class="err">',
			(isset($errs['auNom']) ? $errs['auNom'] : ''),
			'</span>',
			'<input type="text" name="auNom" ',
				'value="',$z['auNom'], '">',
		'</label>';

	echo '<label>Pr�nom ',
			'<span class="err">',
			(isset($errs['auPrenom']) ? $errs['auPrenom'] : ''),
			'</span>',
			'<input type="text" name="auPrenom" ',
				'value="', $z['auPrenom'], '">',
		'</label>';

	echo '<label>Pays',
			'<select name="auPays">',
				'<option value="FR"',
					($z['auPays'] == 'FR') ? 'selected>' : '>',
					'France</option>',
				'<option value="US"',
					($z['auPays'] == 'US') ? 'selected>' : '>',
					'Etats-unis</option>',
				'<option value="XX"',
					($z['auPays'] == 'XX') ? 'selected>' : '>',
					'Autre</option>',
			'</select>',
		'</label>';

	echo '<label>Biographie',
			'<textarea name="auBiographie">',
				$z['auBiographie'],
			'</textarea>',
		'</label>';

	echo '<p class="pagination">',
			'<input type="submit" value="Recherche" ',
				'name="btnChercher" ',
				'formaction="auteurs_cherche.php">',
			'<input type="submit" value="Liste" ',
				'name="btnListe" ',
				'formaction="auteurs_liste.php">';

	// Si nouveau => pas de bouton supprimer, 1 bouton Ajouter
	// Sinon => 1 bouton supprimer et 1 bouton Modifier
	if ($_SESSION['idAuteur'] == 0) {
		echo '<input type="submit" value="Ajouter" ',
				'name="btnValider">';
	} else {
		echo '<input type="submit" value="Supprimer" ',
				'name="btnSupprimer">',
			'<input type="submit" value="Modifier" ',
				'name="btnValider">';
	}

	echo '</p></form>';
}
//--------------------------------------------------------
/**
 * V�rification des zones de saisie.
 *
 * @return array	Tab. assoc. zone => msg erreur
 */
function verifierForm() {
	$errs  = array();

	$_POST['auNom'] = strip_tags($_POST['auNom']);
	$_POST['auNom'] = trim($_POST['auNom']);
	$long = strlen($_POST['auNom']);
	if ($long < 2) {
		$errs['auNom'] = '2 caract�res minimum';
	} elseif ($long > 30) {
		$errs['auNom'] = '30 caract�res maximum';
	}

	$_POST['auPrenom'] = strip_tags($_POST['auPrenom']);
	$_POST['auPrenom'] = trim($_POST['auPrenom']);
	$long = strlen($_POST['auPrenom']);
	if ($long < 2) {
		$errs['auPrenom'] = '2 caract�res minimum';
	} elseif ($long > 20) {
		$errs['auPrenom'] = '20 caract�res maximum';
	}

	$_POST['auBiographie'] = strip_tags($_POST['auBiographie']);
	$_POST['auBiographie'] = trim($_POST['auBiographie']);

	$vals = array('FR', 'US', 'XX');
	if (!in_array($_POST['auPays'], $vals)) {
		header('Location: auteurs_cherche.php');
		exit();	//==> FIN : piratage ?
	}

	return $errs;
}
//--------------------------------------------------------
/**
 * Mise � jour de la base de donn�es
 */
function mettreAJourBase($bd) {
	// Protection SQL
	$auNom = mysqli_real_escape_string($_POST['auNom']);
	$auPrenom = mysqli_real_escape_string($_POST['auPrenom']);

	$sql = "auNom = '$auNom',
			auPrenom = '$auPrenom',
			auPays = '{$_POST['auPays']}'";

	if ($_SESSION['idAuteur'] == 0) {
		$sql = "INSERT INTO auteurs SET $sql";
	} else {
		$sql = "UPDATE auteurs
				SET $sql
				WHERE auID = {$_SESSION['idAuteur']}";
	}

	mysqli_query($bd, $sql) or bdErreur($bd, $sql);
}
//--------------------------------------------------------
/**
 * Affichage de la page de fin de traitement de la bd.
 */
function afficherFin() {
	echo '<form method="POST" class="maj pagination" ',
				'action="auteurs_cherche.php">';

	if (isset($_POST['btnSupprimer'])) {
		echo '<p>L\'auteur a bien �t� supprim�.</p>';
	} elseif ($_SESSION['idAuteur'] == 0) {
		echo '<p>Le nouvel auteur a bien �t� ajout�.</p>';
	} else {
		echo '<p>L\'auteur a bien �t� modifi�.</p>';
	}

	echo '<p>',
			'<input type="submit" value="Rechercher" name="btnChercher">',
			'<input type="submit" value="Liste" name="btnListe" ',
				'formaction="auteurs_liste.php">',
			'<input type="submit" value="Ajouter" name="btnNouveau" ',
				'formaction="auteurs_maj.php">',
		'</p>';

	echo '</form>';
}
?>