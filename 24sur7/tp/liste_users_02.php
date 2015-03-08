<?php
/** @file
 * Page affichant tous les utilisateurs de la bd
 *
 * @author : Virgil Manrique - virgil.manrique@edu.univ-fcomte.fr
 */
include('bibli_24sur7.php');	// Inclusion de la bibliothèque

$bd=vm_db_connexion();
$S1='SELECT utiID FROM utilisateur';
$R1=mysqli_query($bd, $S1) or fd_bd_erreur($S1);
$T1=mysqli_fetch_assoc($R1);
$i=1;
while($T1){
   $S2='SELECT utiNom, utiMail, utiPasse, utiDateInscription, utiJours, utiHeureMin, utiHeureMax FROM utilisateur WHERE utiID='.$i;
    $R2=mysqli_query($bd, $S2) or fd_bd_erreur($S2);
    $T2=mysqli_fetch_assoc($R2);
    $nom=mysqli_real_escape_string($bd,$T2['utiNom']);
    $mail=mysqli_real_escape_string($bd,$T2['utiMail']);
    $incription=vm_date_claire(mysqli_real_escape_string($bd,$T2['utiDateInscription']));
    $jour=mysqli_real_escape_string($bd,$T2['utiJours']);
    $debut=mysqli_real_escape_string($bd,$T2['utiHeureMin']);
    $fin=mysqli_real_escape_string($bd,$T2['utiHeureMax']);
    echo '<h2>Utilisateur',$i,'</h2>',
         '<ul><li>Nom: ',$nom,'</li>',
         '<li>Mail: ',$mail,'</li>',
         '<li>Inscription: ',$inscription,'</li>',
         '<li>Jours à afficher: ',$jour,'</li>',
         '<li>Heure début: ',$debut,'</li>',
         '<li>Heure fin: ',$fin,'</li></ul>';
    $i=$i+1;
}

?>