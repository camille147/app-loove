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

//route user + admin
$routeur->addRoute(['POST'], '/login', \App\Controllers\AuthController::class, 'login');
$routeur->addRoute(['POST'], '/register', \App\Controllers\AuthController::class, 'register');
$routeur->addRoute(['GET'], '/logout', \App\Controllers\AuthController::class, 'logout');
$routeur->addRoute(['GET'], '/me', \App\Controllers\AuthController::class, 'me', [
    ['middleware' => AuthMiddleware::class]
]);
//route user
$routeur->addRoute(['POST'], '/user/albums/create', \App\Controllers\AlbumController::class, 'create', [
    ['middleware' => AuthMiddleware::class, 'role' => 0]
]);
$routeur->addRoute(['GET'], '/user/albums', \App\Controllers\AlbumController::class, 'list', [
    ['middleware' => AuthMiddleware::class, 'role' => 0]
]);
$routeur->addRoute(['GET'], '/public/albums', \App\Controllers\AlbumController::class, 'listPublicsAlbums', [
    ['middleware' => AuthMiddleware::class, 'role' => 0]
]);
$routeur->addRoute(['GET'], '/user/recent/albums', \App\Controllers\AlbumController::class, 'listRecentsAlbums', [
    ['middleware' => AuthMiddleware::class, 'role' => 0]
]);
$routeur->addRoute(['POST'], 'user/profile/update', \App\Controllers\UserController::class, 'editProfile', [
    ['middleware' => AuthMiddleware::class]
]);
$routeur->addRoute(['POST'], 'user/profile/delete', \App\Controllers\UserController::class, 'deleteProfile', [
    ['middleware' => AuthMiddleware::class, 'role' => 0]
]);
$routeur->addRoute(['GET'], '/user/album/photos', \App\Controllers\PhotoController::class, 'list', [
    ['middleware' => AuthMiddleware::class, 'role' => 0]
]);
$routeur->addRoute(['POST'], '/user/album/photos/create', \App\Controllers\PhotoController::class, 'create', [
    ['middleware' => AuthMiddleware::class, 'role' => 0]
]);
$routeur->addRoute(['POST'], '/user/albums/photo/favorite', \App\Controllers\PhotoController::class, 'toggleFavorite', [
    ['middleware' => AuthMiddleware::class, 'role' => 0]
]);
$routeur->addRoute(['GET'], '/user/albums/photos/favorite', \App\Controllers\PhotoController::class, 'listAllFavorites', [
    ['middleware' => AuthMiddleware::class, 'role' => 0]
]);
$routeur->addRoute(['POST'], '/user/album/photo/update', \App\Controllers\PhotoController::class, 'editPhoto', [
    ['middleware' => AuthMiddleware::class, 'role' => 0]
]);
$routeur->addRoute(['DELETE'], '/user/album/photo/delete', \App\Controllers\PhotoController::class, 'deletePhoto', [
    ['middleware' => AuthMiddleware::class, 'role' => 0]
]);
$routeur->addRoute(['POST'], '/user/album/update', \App\Controllers\AlbumController::class, 'editAlbum', [
    ['middleware' => AuthMiddleware::class, 'role' => 0]
]);
$routeur->addRoute(['DELETE'], '/user/album/delete', \App\Controllers\AlbumController::class, 'deleteAlbum', [
    ['middleware' => AuthMiddleware::class, 'role' => 0]

]);
$routeur->addRoute(['GET'], '/tags/search', \App\Controllers\PhotoController::class, 'searchTags', [
    ['middleware' => AuthMiddleware::class, 'role' => 0]

]);
$routeur->addRoute(['GET'], '/tags', \App\Controllers\PhotoController::class, 'listAllTags', [
    ['middleware' => AuthMiddleware::class, 'role' => 0]

]);
$routeur->addRoute(['GET'], '/album', \App\Controllers\AlbumController::class, 'album', [
    ['middleware' => AuthMiddleware::class, 'role' => 0]

]);
$routeur->addRoute(['GET'], '/photo', \App\Controllers\PhotoController::class, 'photo', [
    ['middleware' => AuthMiddleware::class, 'role' => 0]

]);
//route admin
$routeur->addRoute(['POST'], '/admin/new', \App\Controllers\AdminController::class, 'adminCreateAdmin', [
    ['middleware' => AuthMiddleware::class, 'role' => 1]
]);
$routeur->addRoute(['GET'], '/admin', \App\Controllers\AdminController::class, 'adminGetUsers', [
    ['middleware' => AuthMiddleware::class, 'role' => 1]
]);
$routeur->addRoute(['POST'], '/admin/delete', \App\Controllers\AdminController::class, 'adminDeleteUser', [
    ['middleware' => AuthMiddleware::class, 'role' => 1]
]);
$routeur->addRoute(['POST'], '/admin/tag/new', \App\Controllers\AdminController::class, 'adminCreateTag', [
    ['middleware' => AuthMiddleware::class, 'role' => 1]
]);
$routeur->addRoute(['GET'], '/admin/tags', \App\Controllers\AdminController::class, 'adminGetTags', [
    ['middleware' => AuthMiddleware::class, 'role' => 1]
]);





new Kernel($routeur);
