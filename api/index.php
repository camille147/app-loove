<?php

use App\Core\Routeur;
use App\Kernel;
use App\Middlewares\AuthMiddleware;


require 'vendor/autoload.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: http://app-loove-interface.local");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    http_response_code(200);
    exit;
}

header("Access-Control-Allow-Origin: http://app-loove-interface.local");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");


$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->Load();

$routeur = new Routeur();
//$routeur->addRoute(['GET'], '/users/{id}', UsersController::class, 'showUser');
//$routeur->addRoute(['GET'], '/', HomeController::class, 'index');
//$routeur->addRoute(['GET'], '/users', UsersController::class, 'liste');
$routeur->addRoute('GET', '/user/home', \App\Controllers\UserController::class, 'home', [
    ['middleware' => AuthMiddleware::class, 'role' => 0]
]);
$routeur->addRoute(['GET'], '/me', \App\Controllers\AuthController::class, 'me', [
    ['middleware' => AuthMiddleware::class]
]);
$routeur->addRoute(['POST'], '/login', \App\Controllers\AuthController::class, 'login');
$routeur->addRoute(['POST'], '/register', \App\Controllers\AuthController::class, 'register');

$routeur->addRoute(['GET'], '/logout', \App\Controllers\AuthController::class, 'logout');
new Kernel($routeur);
