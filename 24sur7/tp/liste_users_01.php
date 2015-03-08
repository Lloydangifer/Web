<?php
/** @file
 * Affichage de l'utilisateur 1
 *
 * @author : Virgil Manrique - virgil.manrique@edu.univ-fcomte.fr
 */
include('bibli_24sur7.php');	// Inclusion de la bibliothèque

$bd=vm_db_connexion();
$S='SELECT utiNom, utiMail, utiPasse, utiDateInscription, utiJours, utiHeureMin, utiHeureMax FROM utilisateur WHERE utiID=1';
$R=mysqli_query($bd, $S) or fd_bd_erreur($S);
$T=mysqli_fetch_assoc($R);

echo '<h2>Utilisateur 1</h2>',
     '<ul><li>Nom: ',$T['utiNom'],'</li>',
     '<li>Mail: ',$T['utiMail'],'</li>',
     '<li>Inscription: ',vm_date_claire($T['utiDateInscription']),'</li>',
     '<li>Jours à afficher: ',$T['utiJours'],'</li>',
     '<li>Heure début: ',$T['utiHeureMin'],'</li>',
     '<li>Heure fin: ',$T['utiHeureMax'],'</li></ul>';

?>