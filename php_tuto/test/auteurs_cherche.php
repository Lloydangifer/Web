<?php
ob_start();
session_start();
$_SESSION['idAuteur'] = 0;
$_SESSION['where'] = '';

require('bib_params.php');
require('bib_fonctions.php');

htmlDebut('Recherche auteurs', 'bd.css');

echo '<form method="POST"class="maj w300" ',
		 'action="auteurs_liste.php">',
		'Rechercher des auteurs dont le nom';

echo '<label>',
		'<input type="radio" name="radNom" ',
			'value="1">commence par',
		'</label>';

echo '<label>',
		'<input type="radio" name="radNom" ',
			'value="2" checked>contient',
		'</label>';

echo '<label>',
		'<input type="radio" name="radNom" ',
			'value="3">finit par',
		'</label>';

echo '<input type="text" name="txtNom" ',
			'style="width: 280px;">';

echo '<p class="pagination">',
		'<input type="submit" value="Ajouter" ',
			'name="btnNouveau" formaction="auteurs_maj.php">',
		'<input type="submit" value="Rechercher" ',
			'name="btnChercher">',
		'</p>';

echo '</form>';

htmlFin();
?>