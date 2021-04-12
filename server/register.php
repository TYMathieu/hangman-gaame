<?php

require_once 'dbconnect.php';

// Récupération de la/les valeurs passée(s)
$json = file_get_contents('php://input');
// Décodage pour PHP
$data = json_decode($json);

$pseudo = $data->pseudo;
$timer = $data->seconds;
$theme = $data->theme;

var_dump($timer);

// prepare
$req = $connexion->prepare('INSERT INTO leaderboard VALUES (id,:pseudo, :timer, :theme)');
// Bind
$req->bindParam('pseudo', $pseudo);
$req->bindParam('timer', $timer);
$req->bindParam('theme', $theme);
// Execute
$req->execute();
