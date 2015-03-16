<?php
echo "<h1>Réception du formulaire d'inscription utilisateur</h1>";
foreach($_POST as $name => $value){
    echo "Zone ",$name," = ",$value,"</br>";
}

?>