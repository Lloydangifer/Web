<?php
/** @file
 * Afficher les infos sur l'utilisateur 1
 *
 * @author : Frederic Dadeau - frederic.dadeau@univ-fcomte.fr
 */

// Bufferisation des sorties
ob_start();

// Inclusion de la bibliothèque
include('bibli_24sur7.php');

// Début de la page
fd_html_head('Infos utilisateur', '-');

// Connexion à la base de données
fd_bd_connexion();

// Requête de sélection de l'utilisateur 1
$sql = 'SELECT *
		FROM utilisateur
		WHERE utiID = 1';

// Exécution de la requête
$R = mysqli_query($GLOBALS['bd'], $sql) or fd_bd_erreur($sql);

// Affichage du résultat
$D = mysqli_fetch_assoc($R);

echo '<h2>Utilisateur ', $D['utiID'], '</h2>',
	'<ul>',
		'<li>Nom : ', htmlentities($D['utiNom'], ENT_COMPAT, 'UTF-8'),
		'<li>Mail : ', htmlentities($D['utiMail'], ENT_COMPAT, 'UTF-8'),
		'<li>Inscription : ', fd_date_claire($D['utiDateInscription']),
		'<li>Jours à afficher : ', $D['utiJours'],
		'<li>Heure début : ', $D['utiHeureMin'],
		'<li>Heure fin : ', $D['utiHeureMax'],
	'</ul>';

// Déconnexion de la base de données
mysqli_close($GLOBALS['bd']);

// fin de la page
echo '</main></body></html>';
?>