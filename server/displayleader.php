<?php

require_once 'dbconnect.php';

// Récupération de la/les valeurs passée(s)
$json = file_get_contents('php://input');
// Décodage pour PHP
$data = json_decode($json);

$theme = $data->theme;

// prepare
$req = $connexion->prepare('SELECT * FROM leaderboard l WHERE theme = :theme ORDER BY timer');
// Bind
$req->bindParam('theme', $theme);
// Execute
$req->execute();
$result = $req->fetchAll(PDO::FETCH_ASSOC);

// echo permet d'afficher et donc d'envoyer une réponse traitable par JS (par l'intermédiaire aussi de json_encode)
echo json_encode($result);
