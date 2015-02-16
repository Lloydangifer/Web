<?php
	include('bibli_24sur7.php');
	vm_html_head('24sur7 | Accueil');
	vm_html_bandeau(1);
	echo'<section id="bcContenu">',
			'<aside id="bcGauche">',
				'<section id="calendrier">',vm_html_calendrier(0,0,0),'</section>',
				'<section id="categories">Ici : bloc catégories pour afficher les catégories de rendez-vous</section>',
			'</aside>',
			'<section id="bcCentre">Ici : bloc avec le détail des rendez-vous de la semaine du 9 au 15 février 2015',
			'</section>',
		'</section>'
	;
	vm_html_pied();
?>