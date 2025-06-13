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
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");


if (preg_match('#^/uploads/(.+)$#', $_SERVER['REQUEST_URI'], $matches)) {

    $uploadsDir = realpath(__DIR__ . '/../interface/uploads');
    $fileName = $matches[1];
    $filePath = $uploadsDir . DIRECTORY_SEPARATOR . str_replace(['/', '\\'], DIRECTORY_SEPARATOR, $fileName);
    if (file_exists($filePath) && is_file($filePath)) {
        $mimeType = mime_content_type($filePath);
        header("Content-Type: $mimeType");
        readfile($filePath);
        exit();
    } else {
        http_response_code(404);
        echo "Fichier non trouvé.";
        exit();
    }
}

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->Load();


$routeur = new Routeur();
$routeur->addRoute('GET', '/user/home', \App\Controllers\UserController::class, 'home', [
    ['middleware' => AuthMiddleware::class, 'role' => 0]
]);
$routeur->addRoute(['GET'], '/me', \App\Controllers\AuthController::class, 'me', [
    ['middleware' => AuthMiddleware::class]
]);
$routeur->addRoute(['POST'], '/login', \App\Controllers\AuthController::class, 'login');
$routeur->addRoute(['POST'], '/register', \App\Controllers\AuthController::class, 'register');

$routeur->addRoute(['GET'], '/logout', \App\Controllers\AuthController::class, 'logout');
$routeur->addRoute(['POST'], '/user/albums/create', \App\Controllers\AlbumController::class, 'create', [
['middleware' => AuthMiddleware::class, 'role' => 0]
]);
$routeur->addRoute(['GET'], '/user/albums', \App\Controllers\AlbumController::class, 'list', [
    ['middleware' => AuthMiddleware::class, 'role' => 0]
]);
$routeur->addRoute(['POST'], 'user/profile/update', \App\Controllers\UserController::class, 'editProfile', [
    ['middleware' => AuthMiddleware::class, 'role' => 0]
]);
$routeur->addRoute(['POST'], 'user/profile/delete', \App\Controllers\UserController::class, 'deleteProfile', [
    ['middleware' => AuthMiddleware::class, 'role' => 0]
]);
new Kernel($routeur);
