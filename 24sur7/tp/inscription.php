<?php

$name=$_POST['txtName'];
$name=strip_tags($name);
$namesize=strlen($nom);
if($namesize<4 || $namesize>30){
$erreurs['name']="Le nom doit avoir de 4 à 30 caractères";
}
$pwd=$_POST['txtPasse'];
$pwd=strip_tags($pwd);
$pwdsize=strlen($pwd);
if($pwdsize<4 || $pwdsize>20){
$erreurs['passe']="Le mot de passe doit avoir de 4 à 20 caractères";
}

?>