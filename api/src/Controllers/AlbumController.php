<?php

namespace App\Controllers;

use App\Core\Request;
use App\Core\Response;
use App\Core\TemplateEngine;
use App\Models\Album;
use App\Repositories\AlbumRepository;
use App\Services\UploadManager;

class AlbumController extends BaseController {

    private $repo;

    public function __construct() {
        $this->repo = new AlbumRepository();
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
        header('Content-Type: application/json');
    }


    public function create()
    {
        try {
            if (session_status() !== PHP_SESSION_ACTIVE) {
                session_start();
            }

            if (!isset($_SESSION['user']['id'])) {
                return new Response(401, json_encode(['message' => 'Non authentifié']));
            }
            $user_id = $_SESSION['user']['id'];

            $title = $_POST['title'] ?? null;
            $description = $_POST['description'] ?? null;
            $visibility = $_POST['visibility'] ?? 'private';

                // image uploadé
            $imgFile = $_FILES['img_profile_album'] ?? null;

            if (!$imgFile) {
                return new Response(400, json_encode(['message' => 'image manquante']));
            }

            $uploader = new UploadManager(__DIR__ . '../../../../interface/uploads');
            $filename = $uploader->upload($imgFile);

            $albumRepo = new AlbumRepository();
            $album = $albumRepo->createAlbum($user_id, $title, $description, $visibility, $filename);

            return new Response(201, json_encode(['message' => 'AlbumListComponent crée',
                'album' => [
                    'id' => $album->getId(),
                    'title' => $album->getTitle(),
                    'description' => $album->getDescription(),
                    'visibility' => $album->getVisibility(),
                    'img_profile_album' => $album->getImgProfileAlbum()
                ]
            ]));
        } catch (\Exception  $e) {
            return new Response(500, json_encode(['message' => $e->getMessage()]));
        }
    }

    public function album() {
        try {
            if (session_status() !== PHP_SESSION_ACTIVE) {
                session_start();
            }
            if (!isset($_SESSION['user']['id'])) {
                return new Response(401, json_encode(['message' => 'Non authentifié']));
            }

            $album_id = $_GET['album_id'] ?? null;
            //var_dump($album_id);

            if(!$album_id) {
                return new Response(400, json_encode(['message' => 'album id manqua,t']));
            }

            $album = $this->repo->getAlbum($album_id);
            //var_dump($album);
            return new Response(200, json_encode(['album' => [
                'id' => $album->getId(),
                'title' => $album->getTitle(),
                'description' => $album->getDescription(),
                'visibility' => $album->getVisibility(),
                'img_profile_album' => $album->getImgProfileAlbum()
            ]]));

        }catch (\Exception $e) {
            return new Response(500, json_encode(['message' => $e->getMessage()]));
        }
    }


    public function list () {
        try {
            if (session_status() !== PHP_SESSION_ACTIVE) {
                session_start();
            }

            if (!isset($_SESSION['user']['id'])) {
                return new Response(401, json_encode(['message' => 'Non authentifié']));
            }
            $user_id = $_SESSION['user']['id'];

            $filter = $_GET['filter'] ?? 'all';
            $albums = $this->repo->findByUserAndFilter($user_id, $filter);
            $albumsArray = array_map(fn($album) => [
                'id' => $album->getId(),
                'title' => $album->getTitle(),
                'description' => $album->getDescription(),
                'creationDate' => $album->getCreationDate(),
                'visibility' => $album->getVisibility(),
                'imgProfileAlbum' => $album->getImgProfileAlbum(),
            ], $albums);

            return new Response(200, json_encode(['albums' => $albumsArray]));

        }catch (\Exception $e) {
            return new Response(500, json_encode(['message' => $e->getMessage()]));
        }
    }



    public function editAlbum()
    {
        try {
            if (!isset($_SESSION['user']['id'])) {
                return new Response(401, json_encode(['message' => 'Non authentifié']));
            }

            //var_dump($_POST);
            $rawPostData = file_get_contents("php://input");
            if (empty($_POST) && !empty($rawPostData)) {
                $_POST = json_decode($rawPostData, true);
            }

            if (!isset($_POST['album_id'])) {
                return new Response(400, json_encode(['message' => 'Champs album id manquants']));
            }

            $albumId = $_POST['album_id'];
            $title = $_POST['title'];
            $description = $_POST['description'];
            $visibility = $_POST['visibility'];
            $imgFile = $_FILES['img_profile_album'] ?? null;



            try {
                // Récupérer la photo existante
                $album = $this->repo->getAlbum($albumId);
                //$uploader->delete($album->getImgProfileAlbum());

                if (!$album) {
                    return new Response(404, json_encode(['message' => 'Album non trouvée']));
                }
                $filename = $album->getImgProfileAlbum(); // Par défaut, on conserve l'ancienne image

                //var_dump($_FILES);
                if ($imgFile) {
                    $uploader = new UploadManager(__DIR__ . '../../../../interface/uploads');
                    $filename = $uploader->upload($imgFile);
                }
                // Mise à jour des informations
                $this->repo->editAlbum($albumId, $title, $description, $visibility, $filename);

                // Récupérer la photo mise à jour
                $updatedAlbum = $this->repo->getAlbum($albumId);

                return new Response(200, json_encode([
                    "message" => "Album mise à jour",
                    'album' => [
                    'id' => $updatedAlbum->getId(),
                    'title' => $updatedAlbum->getTitle(),
                    'description' => $updatedAlbum->getDescription(),
                    'visibility' => $updatedAlbum->getVisibility(),
                    'img_profile_album' => $updatedAlbum->getImgProfileAlbum()
                ]
                ]));

            } catch (\Exception $e) {
                return new Response(500, json_encode(['error' => $e->getMessage()]));
            }

        }catch (\Exception $e) {
            return new Response(500, json_encode(['message' => $e->getMessage()]));
        }
    }


    public function deleteAlbum() {
        try {
            if (session_status() !== PHP_SESSION_ACTIVE) {
                session_start();
            }
            if (!isset($_SESSION['user']['id'])) {
                return new Response(401, json_encode(['message' => 'Non authentifié']));
            }
            $rawPostData = file_get_contents("php://input");
            $_DELETE = json_decode($rawPostData, true) ?? [];

            if (!isset($_DELETE['album_id'])) {
                return new Response(400, json_encode(['message' => 'album_id manquant']));
            }
            $albumId = $_DELETE['album_id'];
            try {
                $this->repo->deleteAlbum($albumId);
                return new Response(200, json_encode([
                    "message" => "Albuù supprimée"
                ]));
            } catch (\Exception $e) {
                return new Response(500, json_encode(['error' => $e->getMessage()]));
            }
        }catch (\Exception $e) {
            return new Response(500, json_encode(['message' => $e->getMessage()]));
        }
    }


    public function listPublicsAlbums() {
        try {
            if (session_status() !== PHP_SESSION_ACTIVE) {
                session_start();
            }

            if (!isset($_SESSION['user']['id'])) {
                return new Response(401, json_encode(['message' => 'Non authentifié']));
            }
            $user_id = $_SESSION['user']['id'];

            $albums = $this->repo->getAlbumsAndPhotos();
            $albumsArray = array_map(fn($album) => $album->toArray(), $albums);

            //mofdif à partir de là


            return new Response(200, json_encode(['albums' => $albumsArray]));

        }catch (\Exception $e) {
            return new Response(500, json_encode(['message' => $e->getMessage()]));
        }
    }
        public function listRecentsAlbums() {
            try {
                if (session_status() !== PHP_SESSION_ACTIVE) {
                    session_start();
                }
                if (!isset($_SESSION['user']['id'])) {
                    return new Response(401, json_encode(['message' => 'Non authentifié']));
                }
                $user_id = $_SESSION['user']['id'];

                $albums = $this->repo->getRecentsAlbums($user_id);
                $albumsArray = array_map(fn($album) => [
                    'id' => $album->getId(),
                    'title' => $album->getTitle(),
                    'description' => $album->getDescription(),
                    'creationDate' => $album->getCreationDate(),
                    'visibility' => $album->getVisibility(),
                    'imgProfileAlbum' => $album->getImgProfileAlbum(),
                ], $albums);


                return new Response(200, json_encode(['albums' => $albumsArray]));

            }catch (\Exception $e) {
                return new Response(500, json_encode(['message' => $e->getMessage()]));
            }
        }


}