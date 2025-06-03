<?php

use App\Controllers\HomeController;
use App\Controllers\UsersController;
use App\Core\Routeur;
use App\Core\TemplateEngine;
use App\Kernel;


require 'vendor/autoload.php';

header("Access-Control-Allow-Origin: http://app-loove-interface.local");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");


$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->Load();

$routeur = new Routeur();
$routeur->addRoute(['GET'], '/users/{id}', UsersController::class, 'showUser');
$routeur->addRoute(['GET'], '/', HomeController::class, 'index');
$routeur->addRoute(['GET'], '/users', UsersController::class, 'liste');
$routeur->addRoute(['GET'], '/me', UsersController::class, 'me');
$routeur->addRoute(['POST'], '/login', \App\Controllers\AuthController::class, 'login');
$routeur->addRoute(['POST'], '/register', \App\Controllers\AuthController::class, 'register');


new Kernel($routeur);
