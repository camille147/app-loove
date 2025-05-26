<?php

use App\Controllers\HomeController;
use App\Controllers\UsersController;
use App\Core\Routeur;
use App\Core\TemplateEngine;
use App\Kernel;


require 'vendor/autoload.php';

header("Access-Control-Allow-Origin: http://app-loove-interface.local"); // front
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json"); // important -> on renvoie du JSON


$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->Load();

$routeur = new Routeur();
$routeur->addRoute(['GET'], '/users/{id}', UsersController::class, 'user');
$routeur->addRoute(['GET'], '/', HomeController::class, 'index');
$routeur->addRoute(['GET'], '/users', UsersController::class, 'liste');
$routeur->addRoute(['POST'], '/login', \App\Controllers\AuthController::class, 'login');

new Kernel($routeur);
