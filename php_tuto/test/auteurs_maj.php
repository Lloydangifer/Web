<?php
ob_start();
session_start();
require('bib_params.php');
require('bib_fonctions.php');

$errs = array();	// Pour stockage des erreurs
					// de saisie dans le formulaire

htmlDebut('Mise à jour auteur', 'bd.css');

$bd = bdConnecter();

// Traitement  suivant le bouton trouvé dans
// le post ou l'id trouvé dans le get

//---------------------------------------------------------
// Nouvel auteur : initialisation des valeurs par
// défaut des zones du formulaires, affichage
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
// liste. Vérification de l'ID passée dans l'url,
// sélection de l'enregistrement auteur dans la
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
// Validation d'une saisie : vérification des
// valeurs saisies, mise à jour de la base de
// données si Ok, sinon affichage du formulaire de
// saisie avec les erreurs détectées.
if (isset($_POST['btnValider'])) {
	$errs = verifierForm();

	if (count($errs) == 0) {
		mettreAJourBase($bd);
		afficherFin();
		exit();		//==> FIN du traitement ajout ou modif
	}

	// Il y a des erreurs de saisie. Il faut réafficher
	// le formulaire avec ce qui a été saisi
	afficherForm($_POST, $errs);
	htmlFin();
	exit();		//==> FIN du traitement ré-affichage
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
// pas passé par les pages imposées.
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

	echo '<label>Prénom ',
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
 * Vérification des zones de saisie.
 *
 * @return array	Tab. assoc. zone => msg erreur
 */
function verifierForm() {
	$errs  = array();

	$_POST['auNom'] = strip_tags($_POST['auNom']);
	$_POST['auNom'] = trim($_POST['auNom']);
	$long = strlen($_POST['auNom']);
	if ($long < 2) {
		$errs['auNom'] = '2 caractères minimum';
	} elseif ($long > 30) {
		$errs['auNom'] = '30 caractères maximum';
	}

	$_POST['auPrenom'] = strip_tags($_POST['auPrenom']);
	$_POST['auPrenom'] = trim($_POST['auPrenom']);
	$long = strlen($_POST['auPrenom']);
	if ($long < 2) {
		$errs['auPrenom'] = '2 caractères minimum';
	} elseif ($long > 20) {
		$errs['auPrenom'] = '20 caractères maximum';
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
 * Mise à jour de la base de données
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
		echo '<p>L\'auteur a bien été supprimé.</p>';
	} elseif ($_SESSION['idAuteur'] == 0) {
		echo '<p>Le nouvel auteur a bien été ajouté.</p>';
	} else {
		echo '<p>L\'auteur a bien été modifié.</p>';
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