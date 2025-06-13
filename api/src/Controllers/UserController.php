<?php

namespace App\Controllers;

use App\Core\Response;
use App\Models\User;
use App\Repositories\UserRepository;
use App\Services\UploadManager;

class UserController extends BaseController {

    private $repo;

    public function __construct() {
        $this->repo = new UserRepository();
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
        header('Content-Type: application/json');
    }


    public function editProfile() {

        if (session_status() !== PHP_SESSION_ACTIVE) {
            session_start();
        }



        //file_put_contents(__DIR__ . '/debug-upload.log', print_r($_FILES, true), FILE_APPEND);
        //file_put_contents(__DIR__ . '/debug-upload.log', "\nPOST:\n" . print_r($_POST, true), FILE_APPEND);


        if (!isset($_SESSION['user']['id'])) {
            return new Response(401, json_encode(['message' => 'Non authentifié']));
        }

        $userId = $_SESSION['user']['id'];

        if(!isset($_POST['username'], $_POST['email'], $_POST['bio'])) {
            return new Response(400, json_encode(['message' => 'Champs manquants']));
        }

        $username = $_POST['username'];
        $email = $_POST['email'];
        $bio = $_POST['bio'];
        $filename = null;
        //$imgFile = $_FILES['photo'] ?? null;

        if (!empty($_FILES['photo']) && $_FILES['photo']['error'] !== UPLOAD_ERR_NO_FILE) {            try {
                $uploadDir = realpath(__DIR__ . '/../') . '/../../interface/uploads/profile_pictures';
                $uploadManager = new UploadManager($uploadDir);
                $filename = $uploadManager->upload($_FILES['photo']);
                //file_put_contents(__DIR__.'/debug.log', "Upload dir: " . $uploadDir . PHP_EOL, FILE_APPEND);


            } catch (\Exception $e) {
                return new Response(400, json_encode([
                    'error' => 'Échec du téléchargement de l\'image',
                    'details' => $e->getMessage()
                ]));            }
        }


        try{

            $userRepo = new UserRepository();
            $user = $userRepo->editUser($userId, $username, $email, $filename, $bio);

            $_SESSION['user'] = [
                    'id' => $user->getId(),
                    'username' => $user->getFirstName(),
                    'email' => $user->getEmail(),
                    'profile_picture' => $user->profilePicture,
                    'role' => $user->getRole(),
                    'created_at' => $user->creationDate,
                    'uploaded_at' => $user->updatedDate,
                    'bio' => $user->bio

            ];

            return new Response(200, json_encode([
                "message"=> "Profil mis à jour",
                'user'=> $_SESSION['user']
            ]));

        } catch (\Exception $e) {
            return new Response(500,json_encode(['error' => $e->getMessage()]));
        }
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