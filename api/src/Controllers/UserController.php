<?php

namespace App\Controllers;

use App\Core\Response;
use App\Models\User;
use App\Repositories\UserRepository;

class UserController extends BaseController {

    private $repo;

    public function __construct() {
        $this->repo = new UserRepository();
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
        header('Content-Type: application/json');
    }

    public function home(): Response {
        $user = $_SESSION['user'] ?? null;

        if (!$user || $user['role'] != 0) {
            return new Response(403, json_encode(['message' => 'Accès réservé aux utilisateurs']));
        }

        return new Response(200, json_encode([
            'message' => "Bienvenue sur l'espace utilisateur",
            'user' => $user
        ]));
    }


}