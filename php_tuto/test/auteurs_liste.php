<?php
ob_start();
session_start();
$_SESSION['idAuteur'] = 0;

require('bib_params.php');
require('bib_fonctions.php');

htmlDebut('Liste auteurs', 'bd.css');

$bd = bdConnecter();

$where = $nom = '';
$position = 0;

if (isset($_POST['btnChercher'])) {
	// Si on vient de la page de recherche, on r�cup�re
	// les crit�res de recherche, on compose la clause
	// WHERE avec LIKE et on la stocke dans une variable
	// de session pour pouvoir la r�utiliser.
	if (!estEntier($_POST['radNom'])) {
		header('Location: auteurs_cherche.php');
		exit();	//==> FIN piratage ?
	}

	$position = (int) $_POST['radNom'];
	if (!estEntre($position, 1, 3)) {
		header('Location: auteurs_cherche.php');
		exit();	//==> FIN piratage ?
	}

	$nom = trim($_POST['txtNom']);

	if ($nom != '') {
		$nom = mysqli_real_escape_string($nom);
		if ($position == 1) {
			$where = "WHERE auNom LIKE '$nom%'";
		} elseif ($position == 2) {
			$where = "WHERE auNom LIKE '%$nom%'";
		} else {
			$where = "WHERE auNom LIKE '%$nom'";
		}
	}

	$_SESSION['where'] = $where;

} elseif (isset($_POST['btnListe'])) {
	// Si on vient le page de mise � jour, on r�cup�re la
	// variable de session pour refaire le select de liste
	$where = $_SESSION['where'];

} else {
	// Si on arrive ici c'est que l'utilisateur n'est pas
	// pass� par un des chemins autoris�s. On le renvoie
	// sur la page de recherche.
	header('Location: auteurs_cherche.php');
	exit();	//==> FIN piratage ?
}

//-- Requ�te ----------------------------------------
$sql = "SELECT auID, auNom, auPrenom, auPays
		FROM auteurs
		$where
		ORDER BY auNom, auPrenom";

$r = mysqli_query($bd, $sql) or bdErreur($bd, $sql);

//-- Traitement -------------------------------------
htmlTable(array('Nom', 'Pr�nom', 'Pays'), 'tab-bd');

while ($enr = mysqli_fetch_assoc($r)) {
	htmlProteger($enr);

	$id = crypterURl($enr['auID']);
	$enr['auNom'] = '<a href="auteurs_maj.php?x='.$id.'">'
						.$enr['auNom'].'</a>';
	unset($enr['auID']);

	htmlLigne($enr);
}

echo '</table>';

//-- Boutons ----------------------------------------
echo '<form method="POST" class="maj" ',
		 	'action="auteurs_cherche.php">',
		'<p class="pagination">',
		'<input type="submit" value="Ajouter" ',
			'name="btnNouveau" formaction="auteurs_maj.php">',
		'<input type="submit" value="Recherche" ',
			'name="btnChercher">',
		'</p>',
	'</form>';

//-- D�connexion ------------------------------------
mysqli_free_result($r);
mysqli_close($bd);

htmlFin();
?>