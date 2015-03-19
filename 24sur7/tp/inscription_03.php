<?php
include('bibli_24sur7.php');
$name=$_POST['txtNom'];
$name=strip_tags($name);
$namesize=strlen($name);
if($namesize<4 || $namesize>30){
    $errors['name']="Le nom doit avoir de 4 à 30 caractères";
}
$mail=$_POST['txtMail'];
$mail=strip_tags($mail);
if(empty($mail)!==false){
    $errors['mail']="L'adresse mail est obligatoire";
}
else if((strpos($mail,'@')===false)&&(strpos($mail,'.')===false)){
    $errors['mail']="L'adresse mail n'est pas valide";
}
fd_bd_connexion();
$S='SELECT utiMail FROM utilisateur WHERE utiMail="'.htmlentities($_POST['txtMail']).'"';
$R=mysqli_query($GLOBALS['bd'], $S) or fd_bd_erreur($S);
$T=mysqli_fetch_assoc($R);
if($T!==NULL){
    $errors['mail_present']="Cette adresse mail est déjà inscrite";
}
$pwd=$_POST['txtPasse'];
$pwd=strip_tags($pwd);
$pwdsize=strlen($pwd);
if($pwdsize<4 || $pwdsize>20){
    $errors['passe']="Le mot de passe doit avoir de 4 à 20 caractères";
}
$verif=$_POST['txtVerif'];
$verif=strip_tags($verif);
if(strcmp($pwd,$verif)!=0){
    $errors['verif']="Le mot de passe est différent dans les 2 zones";
}
$month=(isset($_POST['selDate_m'])?$_POST['selDate_m']:null);
$day=(isset($_POST['selDate_j'])?$_POST['selDate_j']:null);
$year=(isset($_POST['selDate_a'])?$_POST['selDate_a']:null);
if(checkdate($month,$day,$year)===false){
    $errors['date']="La date n'est pas valide";
}
$actual_date=getdate();
$actual_month=$actual_date['mon'];
$actual_day=$actual_date['mday'];
$actual_year=$actual_date['year'];
if($actual_month!=$month || $actual_day!=$day || $actual_year!=$year){
    $errors['verifdate']="La date doit être celle du jour";
}
echo "<h1>Réception du formulaire d'inscription utilisateur</h1>";
echo "<p><strong>Les erreurs suivantes ont été détectées</strong></p>";
if(empty($errors)===false){
    foreach($errors as $name => $value){
        echo $value,"</br>";
    }
}
else{
    echo "Aucune erreur de saisie";
}


?>