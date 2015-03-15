<?php
/** @file
 * Liste des rendez-vous d'un utilisateur
 *
 * @author : Frederic Dadeau - frederic.dadeau@univ-fcomte.fr
 */

// Bufferisation des sorties
ob_start();

// Inclusion de la bibliothéque
include('bibli_24sur7.php');

// Début de la page
fd_html_head('Rendez-vous utilisateur');

// Connexion à la base de données
fd_bd_connexion();

// Requête de sélection de l'utilisateur 1
$sql = 'SELECT	utiNom, rendezvous.*, categorie.*
		FROM	utilisateur,
				rendezvous,
				categorie
		WHERE utiID = 2
		AND rdvIDUtilisateur = utiID
		AND catID = rdvIDCategorie
		AND catIDUtilisateur = utiID
		ORDER BY rdvDate, rdvHeureDebut';

// Exécution de la requête
$R = mysqli_query($GLOBALS['bd'], $sql) or fd_bd_erreur($sql);

$isFirst = TRUE;

// Affichage du résultat de la requête
while ($D = mysqli_fetch_assoc($R)) {
	if ($D['rdvHeureDebut'] == -1) {
		$heure = 'journée entière';
	} else {
		$heure = fd_heure_claire($D['rdvHeureDebut'])
				.' à '.fd_heure_claire($D['rdvHeureFin']);
	}

	$public = ($D['catPublic'] == 0) ? 'font-style: italic;' : '';

	if ($isFirst) {
		echo '<h2>Utilisateur ', $D['rdvIDUtilisateur'], ' : ',
				htmlentities($D['utiNom'], ENT_COMPAT, 'UTF-8'), '</h2><ul>';
		$isFirst = FALSE;
	}

	echo '<li style="', $public, 'background-color: #', $D['catCouleurFond'],
				';border: 1px solid #', $D['catCouleurBordure'],
				';margin: 2px 0">',
				fd_date_claire($D['rdvDate']),
				' - ', $heure,
				' - ', htmlentities($D['rdvLibelle'], ENT_COMPAT, 'UTF-8');
}

// Déconnexion de la base de données
mysqli_close($GLOBALS['bd']);

// fin de la page
echo '</main></body></html>';
?>