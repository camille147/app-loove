<?php

namespace App\Controllers;

use App\Core\Request;
use App\Core\Response;
use App\Core\TemplateEngine;
use App\Repositories\UserRepository;

class AuthController extends BaseController {
    private $Repo;

    public function __construct() {
        $this->Repo = new UserRepository();
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
        header('Content-Type: application/json');
    }

    public function login() {
        $data = json_decode(file_get_contents("php://input"), true);

        $email = $data['email'] ?? '';
        $password = $data['password'] ?? '';

        $user = $this->Repo->findByEmail($email);


        if (!$user || !password_verify($password, $user->getPasswordHash())) {
            http_response_code(401);
            echo json_encode(["message" => "Identifiants invalides"]);
            return;
        }

        $_SESSION['user'] = [
            'id' => $user->getId(),
            'username' => $user->getFirstName(),
            'email' => $user->getEmail(),
            'profile_picture' => $user->profilePicture,
            'created_at' => $user->creationDate,
            'updated_at' => $user->updatedDate


        ];

        $body = json_encode([
            "message" => "Connexion réussie, identifiants valides",
            "user" => $_SESSION['user'],
        ]);

        return new Response(200, $body);

    }

    public function logout() {
        session_destroy();
        echo json_encode(["message" => "déco ok"]);
    }
}
