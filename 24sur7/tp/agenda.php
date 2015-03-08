<?php
/** @file
 * Page d'accueil de l'application 24sur7
 *
 * @author : Frederic Dadeau - frederic.dadeau@univ-fcomte.fr
 */

include('bibli_24sur7.php');	// Inclusion de la bibliothéque

vm_html_head('24sur7 | Agenda','-');

fd_html_bandeau(APP_PAGE_AGENDA);

echo '<section id="bcContenu">',
		'<aside id="bcGauche">';

fd_html_calendrier(10, 2, 2015);

echo		'<section id="categories">',
				'Ici : bloc catégories pour afficher les catégories de rendez-vous',
			'</section>',
		'</aside>',
		'<section id="bcCentre">',
			'Ici : bloc avec le détail des rendez-vous de la semaine du 9 au 15 février 2015',
		'</section>',
	'</section>';

fd_html_pied();
?>