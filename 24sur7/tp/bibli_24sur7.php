<?php
vm_html_head($titre, $css = 'style.css'){
	echo'<!DOCTYPE HTML>
		<html>
			<head>
			<meta charset="UTF-8">
			<title>',$titre,'</title>
			<link rel="stylesheet" href="../styles/',$css,'" type="text/css">
			<link rel="shortcut icon" href="../images/favicon.ico" type="image/x-icon">
			</head>
	}';

?>