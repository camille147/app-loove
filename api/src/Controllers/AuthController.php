<?php

namespace App\Controllers;

use App\Core\Request;
use App\Core\Response;
use App\Core\TemplateEngine;
use App\Repositories\UserRepository;
use App\Services\UploadManager;

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

        if ($user == null) {
            return new Response(404, json_encode(["message" => "Utilistair introuvalbel"]));

        }
        if (!$user || $user->getIsDeleted() == 1) {
            return new Response(403, json_encode(["message" => "Compte désactivé/ supprimé"]));


        }
        if (!$user || !password_verify($password, $user->getPasswordHash())) {
            return new Response(401, json_encode(["message" => "Identifiants invalides"]));

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
            'bio' => $user->bio,
            'is_deleted' => $user->getIsDeleted()

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

        if(!isset($_POST['username'], $_POST['email'], $_POST['password'], $_FILES['photo'], $_POST['bio'])) {
            return new Response(400,json_encode(['message' => 'Champs manquants']));
        }

        $username = $_POST['username'];
        $email = $_POST['email'];
        $password = $_POST['password'];
        $profile_picture = $_FILES['photo'];
        $bio = $_POST['bio'];

        try{
            $uploader = new UploadManager(__DIR__ . '../../../../interface/uploads/profile_pictures');
            $filename = $uploader->upload($profile_picture);

            $userRepo = new UserRepository();

            $user = $userRepo->createUser($username, $email, $password, $filename, $bio);
            $body = json_encode([
                "message" => "Inscription réussie",
                'user' => [
                    'id' => $user->getId(),
                    'username' => $user->getFirstName(),
                    'email' => $user->getEmail(),
                    'photo' => $user->profilePicture,
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
