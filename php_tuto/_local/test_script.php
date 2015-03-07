<?php
$serveurTP_L2 = '172.20.128.72';

if (!isset($_POST['txtCode'])) {
	exit;
}

$code = $_POST['txtCode'];

if (function_exists('get_magic_quotes_gpc')) {
	(get_magic_quotes_gpc() == 1) && $Code = stripslashes($Code);
}

$code = trim($code);

if (strpos($code, 'unlink') !== false) {
	$code = 'L\'utilisation de unlink dans cet environnement n\'est pas possible.';
} elseif (strpos($code, 'rmdir') !== false) {
	$code = 'L\'utilisation de rmdir dans cet environnement n\'est pas possible.';
}

if (strpos($code, '<html>') !== 0
|| strpos($code, 'bib_fonctions.php') !== false) {
	$code = utf8_decode($code);
}

$code = '<?php error_reporting(E_ALL ^ E_NOTICE); ?>'.$code;

$leFichier = str_replace('.', '_', $_SERVER['REMOTE_ADDR']);

$leFichier = ($_SERVER['SERVER_ADDR'] == $serveurTP_L2)
				? "../../test/$leFichier.php"
				: "../test/$leFichier.php";

$F = fopen($leFichier, 'wb');
fwrite($F, $code);
fclose($F);

chmod($leFichier, 0660);

// On renvoie le nom du fichier qui sera "exécuté" dans la
// fenêtre de test
$leFichier = substr($leFichier, 3);	//si frames

echo $leFichier;
?>