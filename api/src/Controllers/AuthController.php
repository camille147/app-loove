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
        header("Access-Control-Allow-Origin: http://app-loove-interface.local");
        header("Access-Control-Allow-Credentials: true");
        header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
        header("Access-Control-Allow-Headers: Content-Type");
        header("Content-Type: application/json");
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
        //header('Content-Type: application/json');
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

        if (session_status() !== PHP_SESSION_ACTIVE) {
            session_start();
        }


        $_SESSION['user'] = [
            'id' => $user->getId(),
            'username' => $user->getFirstName(),
            'email' => $user->getEmail(),
            'role' => (int) $user->getRole(),
            'profile_picture' => $user->profilePicture,
            'created_at' => $user->creationDate,
            'updated_at' => $user->updatedDate,
            'bio' => $user->bio

        ];
        $_SESSION['last_activity'] = time();

        $token = bin2hex(random_bytes(32));
        $_SESSION['token'] = $token;

        $body = json_encode([
            "message" => "Connexion réussie, identifiants valides",
            "token" => $token,
            "user" => $_SESSION['user'],
        ]);

        return new Response(200, $body);
    }

    public function register() {
        $data = json_decode(file_get_contents("php://input"), true);

        if(!isset($data['username'], $data['email'], $data['password'], $data['profile_picture'], $data['bio'])) {
            return new Response(400,json_encode(['message' => 'Champs manquants']));
        }

        $username = $data['username'];
        $email = $data['email'];
        $password = $data['password'];
        $profile_picture = $data['profile_picture'];
        $bio = $data['bio'];

        try{
            $userRepo = new UserRepository();

            $user = $userRepo->createUser($username, $email, $password, $profile_picture, $bio);
            $body = json_encode([
                "message" => "Inscription réussie",
                'user' => [
                    'id' => $user->getId(),
                    'username' => $user->getFirstName(),
                    'email' => $user->getEmail(),
                    'profile_picture' => $user->profilePicture,
                    'created_at' => $user->creationDate,
                    'bio' => $user->bio
                ]

            ]);
            return new Response(201, $body);

        } catch (\Exception $e) {
            return new Response(500,json_encode(['error' => $e->getMessage()]));
        }
    }





    public function logout() {
        session_destroy();
        return new Response(200, json_encode(["message" => "Déconnexion réussie"]));
    }


    public function me () {
        if(!isset($_SESSION['user'])) {
            return new Response(401, json_encode(["message" => "Non connecté"]));
        }
        return new Response(200, json_encode(["user" => $_SESSION['user']]));
    }
}
