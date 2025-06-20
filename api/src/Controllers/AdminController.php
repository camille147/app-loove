<?php

namespace App\Controllers;

use App\Core\Request;
use App\Core\Response;
use App\Core\TemplateEngine;
use App\Models\Album;
use App\Repositories\AdminRepository;
use App\Repositories\UserRepository;
use App\Services\UploadManager;

class AdminController extends BaseController
{

    private $repo;

    public function __construct()
    {
        $this->repo = new AdminRepository();
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
        header('Content-Type: application/json');
    }


    public function adminCreateAdmin() {

        if (session_status() !== PHP_SESSION_ACTIVE) {
            session_start();
        }

        if (!isset($_SESSION['user']['id'])) {
            return new Response(401, json_encode(['message' => 'Non authentifié']));

        }

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

            $user = $userRepo->createAdmin($username, $email, $password, $filename, $bio);
            $body = json_encode([
                "message" => "Inscription admin réussie",
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

    public function adminGetUsers() {
        try {
            if (session_status() !== PHP_SESSION_ACTIVE) {
                session_start();
            }

            if (!isset($_SESSION['user']['id'])) {
                return new Response(401, json_encode(['message' => 'Non authentifié']));

            }


            $users = $this->repo->getAllUsers();
            $usersArray = array_map(fn($user) => [
                'id' => $user->getId(),
                'username'=>$user->getFirstName(),
                'email'=>$user->getEmail(),
                'password_hash' => $user->getPasswordHash(),
                'profile_picture' => $user->profilePicture,
                'role' => $user->getRole(),
                'created_at' => $user->creationDate,
                'updated_at' => $user->updatedDate,
                'bio'=> $user->bio,
                'is_deleted' => $user->getIsDeleted(),
            ], $users);
            return new Response(200, json_encode(['users' => $usersArray]));
        } catch (\Exception $e) {
            return new Response(500, json_encode(['message' => $e->getMessage()]));
        }
    }

    public function adminDeleteUser() {
        try{
            if (session_status() !== PHP_SESSION_ACTIVE) {
                session_start();
            }

            if (!isset($_SESSION['user']['id'])) {
                return new Response(401, json_encode(['message' => 'Non authentifié']));

            }

            $userDeleteId = $_POST['user_id'] ?? null;
            $userRepo = new UserRepository();
            $userInformations = $userRepo->get($userDeleteId);
            if ($userInformations->getRole() == 1) {
                return new Response(401, json_encode(['message' => 'nop admin']));
            }
            $user = $userRepo->deleteUser($userDeleteId);


            return new Response(200, json_encode([
                "message"=> "profil supprimé"
            ]));
        } catch (\Exception $e) {
            return new Response(500,json_encode(['error' => $e->getMessage()]));
        }

    }

    public function adminCreateTag() {
        try {
            if (session_status() !== PHP_SESSION_ACTIVE) {
                session_start();
            }

            if (!isset($_SESSION['user']['id'])) {
                return new Response(401, json_encode(['message' => 'Non authentifié']));
            }

            $userId = $_SESSION['user']['id'];

            $rawPostData = file_get_contents("php://input");
            if (empty($_POST) && !empty($rawPostData)) {
                $_POST = json_decode($rawPostData, true);
            }

            $nameTag = $_POST['name'];

            try {
                $tag = $this->repo->createTag($nameTag);

                return new Response(200, json_encode([
                    "message" => "Tag créer",
                    "tag" => $tag
                ]));

            } catch (\Exception $e) {
                return new Response(500, json_encode(['error' => $e->getMessage()]));
            }

        }catch (\Exception $e) {
            return new Response(500, json_encode(['message' => $e->getMessage()]));
        }
    }

    public function adminGetTags() {
        try {
            $tags = $this->repo->getAllTags();
            return new Response(200, json_encode(['tags' => $tags]));
        } catch (\Exception $e) {
            return new Response(500, json_encode(['message' => $e->getMessage()]));
        }
    }
}


