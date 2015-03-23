<?php
	/**
	* TP 5 : Inscription d'un utilisateur
	*
	* @author : Frederic Dadeau (frederic.dadeau@univ-fcomte.fr)
	*/

	// Bufferisation des sorties
	ob_start();

	// Inclusion de la bibliothéque
	include('bibli_24sur7.php');

	//-----------------------------------------------------
	// Détermination de la phase de traitement :
	// 1er affichage ou soumission du formulaire
	//-----------------------------------------------------
	if (! isset($_POST['btnValider'])) {
		// On n'est dans un premier affichage de la page.
		// => On intialise les zones de saisie.
		$nbErr = 0;
		$_POST['txtNom'] = $_POST['txtMail'] = '';
		$_POST['txtVerif'] = $_POST['txtPasse'] = '';
		$_POST['selDate_a'] = 2000;
		$_POST['selDate_m'] = $_POST['selDate_j'] = 1;

	} else {
		// On est dans la phase de soumission du formulaire :
		// => vérification des valeurs reçues et création utilisateur.
		// Si aucune erreur n'est détectée, fdl_add_utilisateur()
		// redirige la page sur le script protégé.
		$erreurs = fdl_add_utilisateur();
		$nbErr = count($erreurs);
	}

	//-----------------------------------------------------
	// Affichage de la page
	//-----------------------------------------------------
	fd_html_head('24sur7 | Inscription');

	echo '<h1>Inscription utilisateur</h1>';

	// Si il y a des erreurs on les affiche
	if ($nbErr > 0) {
		echo '<strong>Les erreurs suivantes ont été détectées</strong>';
		for ($i = 0; $i < $nbErr; $i++) {
			echo '<br>', $erreurs[$i];
		}
	}

	// Affichage du formulaire
	echo '<form method="POST" action="inscription.php">',
			'<table border="1" cellpadding="4" cellspacing="0">',
			fd_form_ligne('Indiquez votre nom',
							fd_form_input(APP_Z_TEXT, 'txtNom', $_POST['txtNom'], 40)),
			fd_form_ligne('Indiquez une adresse mail valide',
							fd_form_input(APP_Z_TEXT, 'txtMail', $_POST['txtMail'], 40)),
			fd_form_ligne('Choisissez un mot de passe',
							fd_form_input(APP_Z_PASS, 'txtPasse', $_POST['txtPasse'], 20)),
			fd_form_ligne('Répétez votre mot de passe',
							fd_form_input(APP_Z_PASS, 'txtVerif', $_POST['txtVerif'], 20)),
			fd_form_ligne('Pour vérification, indiquez la date du jour',
							fd_form_date('selDate', $_POST['selDate_j'], $_POST['selDate_m'], $_POST['selDate_a'])),
			fd_form_ligne('',
							fd_form_input(APP_Z_SUBMIT, 'btnValider', 'Je m\'inscris')),
			'</table></form></div></body></html>';

	ob_end_flush();

	//=================== FIN DU SCRIPT =============================

	//_______________________________________________________________
	//
	//		FONCTIONS LOCALES
	//_______________________________________________________________

	/**
	* Validation de la saisie et création d'un nouvel utilisateur.
	*
	* Les zones reçues du formulaires de saisie sont vérifiées. Si
	* des erreurs sont détectées elles sont renvoyées sous la forme
	* d'un tableau. Si il n'y a pas d'erreurs, un enregistrement est
	* créé dans la table utilisateur, une session est ouverte et une
	* redirection est effectuée.
	*
	* @global array		$_POST		zones de saisie du formulaire
	*
	* @return array 	Tableau des erreurs détectées
	*/
	function fdl_add_utilisateur() {
		//-----------------------------------------------------
		// Vérification des zones
		//-----------------------------------------------------
		$erreurs = array();

		// Vérification du nom
		$txtNom = trim($_POST['txtNom']);
		$long = strlen($txtNom);
		if ($long < 4
		|| $long > 30)
		{
			$erreurs[] = 'Le nom doit avoir de 4 à 30 caractères';
		}

		// Vérification du mail
		$txtMail = trim($_POST['txtMail']);
		if ($txtMail == '') {
			$erreurs[] = 'L\'adresse mail est obligatoire';
		} elseif (strpos($txtMail, '@') === FALSE
				|| strpos($txtMail, '.') === FALSE)
		{
			$erreurs[] = 'L\'adresse mail n\'est pas valide';
		} else {
			// Vérification que le mail n'existe pas dans la BD
			fd_db_open();

			$mail = mysql_real_escape_string($txtMail);

			$S = "SELECT	count(*)
					FROM	utilisateur
					WHERE	utiMail = '$mail'";

			$R = mysql_query($S) or fd_db_err($S);

			$D = mysql_fetch_row($R);

			if ($D[0] > 0) {
				$erreurs[] = 'Cette adresse mail est déjà inscrite.';
			}
		}

		// Vérification du mot de passe
		$txtPasse = trim($_POST['txtPasse']);
		$long = strlen($txtPasse);
		if ($long < 4
		|| $long > 20)
		{
			$erreurs[] = 'Le mot de passe doit avoir de 4 à 20 caractères';
		}

		$txtVerif = trim($_POST['txtVerif']);
		if ($txtPasse != $txtVerif) {
			$erreurs[] = 'Le mot de passe est différent dans les 2 zones';
		}

		// Vérification de la date
		$selJour = (int) $_POST['selDate_j'];
		$selMois = (int) $_POST['selDate_m'];
		$selAnnee = (int) $_POST['selDate_a'];
		if (! checkdate($selMois, $selJour, $selAnnee)) {
			$erreurs[] = 'La date n\'est pas valide';
		} else {
			$amj = ($selAnnee * 10000) + ($selMois * 100) + $selJour;
			if ( $amj != date('Ymd')) {
				$erreurs[] = 'La date doit être celle du jour';
			}
		}

		// Si il y a des erreurs, la fonction renvoie le tableau d'erreurs
		if (count($erreurs) > 0) {
			return $erreurs;		// RETURN : des erreurs ont été détectées
		}

		//-----------------------------------------------------
		// Insertion d'un nouvel utilisateur dans la base de données
		//-----------------------------------------------------
		$txtPasse = mysql_real_escape_string(md5($txtPasse));
		$nom = mysql_real_escape_string($txtNom);
		$txtMail = mysql_real_escape_string($txtMail);
		$utiDateInscription = date('Ymd');

		$S = "INSERT INTO utilisateur SET
				utiNom = '$nom',
				utiPasse = '$txtPasse',
				utiMail = '$txtMail',
				utiDateInscription = $utiDateInscription,
				utiJours = 127,
				utiHeureMin = 6,
				utiHeureMax = 22";

		$R = mysql_query($S) or fd_db_err($S);

		//-----------------------------------------------------
		// Ouverture de la session et redirection vers la page protégée
		//-----------------------------------------------------
		session_start();
		$_SESSION['utiID'] = mysql_insert_id();
		$_SESSION['utiNom'] = $txtNom;
		header ('location: protegee.php');
		exit();			// EXIT : le script est terminé
	}

?>