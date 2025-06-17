<?php

namespace App\Controllers;

use App\Core\Request;
use App\Core\Response;
use App\Core\TemplateEngine;
use App\Models\Album;
use App\Repositories\AlbumRepository;
use App\Repositories\PhotoRepository;
use App\Services\UploadManager;

class PhotoController extends BaseController {

    private $repo;

    public function __construct() {
        $this->repo = new PhotoRepository();
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

            $album_id = $_POST['album_id'] ?? null;
            $title = $_POST['title'] ?? null;
            $description = $_POST['description'] ?? null;
            $alt = $_POST['title'] ?? '';
            $takenAt = $_POST['taken_at'] ?? date('Y-m-d H:i:s');
            $tagsJSON = $_POST['tags'] ?? '[]';
            $tags = json_decode($tagsJSON, true);
            if (!is_array($tags)) $tags = [];

            // image uploadé
            $imgFile = $_FILES['photo_file'] ?? null;

            if(!$album_id) {
                return new Response(400, json_encode(['message'=>'album id manquant']));
            }
            if (!$imgFile) {
                return new Response(400, json_encode(['message' => 'image manquante']));
            }

            $uploader = new UploadManager(__DIR__ . '../../../../interface/uploads/photos');
            $filename = $uploader->upload($imgFile);

            $photo = $this->repo->createPhoto($user_id,$album_id, $filename, $description, $takenAt, $alt, $title);

            if (!empty($tags)) {
                $this->repo->addTagsToPhoto($photo->getId(), $tags);
            }

            return new Response(201, json_encode(['message' => 'photo creer',
                'photo' => [
                    'id' => $photo->getId(),
                    'album_id' => $photo->getAlbumId(),
                    'filename' => $photo->getFilename(),
                    'description' => $photo->getDescription(),
                    'taken_at' => $photo->getTakenAt(),
                    'alt' => $photo->getAlt(),
                    'title' => $photo->getTitle()

                ]
            ]));
        } catch (\Exception  $e) {
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
            //var_dump($_SESSION);

            $album_id = $_GET['album_id'] ?? null;
            if(!$album_id) {
                return new Response(400, json_encode(['message' => 'album id manqua,t']));
            }

            $order = $_GET['order'] ?? 'all';
            $tag= $_GET['tag'] ?? null;
            $favorite = $_GET['favorite'] ?? false;
            $photos = $this->repo->findByAlbumAndFilter($album_id, $tag, $order, $favorite);

            $photosArray = array_map(fn($photo) => [
                'id' => $photo->getId(),
                'user_id' => $photo->getUserId(),
                'album_id' => $photo->getAlbumId(),
                'filename' => $photo->getFilename(),
                'description' => $photo->getDescription(),
                'takenDate' => $photo->getTakenAt(),
                'uploadDate' => $photo->getUploadedAt(),
                'alt' => $photo->getAlt(),
                'title' => $photo->getTitle(),
                'isFavorite' => $photo->getIsFavorite(),
                'isDeleted' => $photo->getIsDeleted(),


            ], $photos);

            return new Response(200, json_encode(['photos' => $photosArray]));

        }catch (\Exception $e) {
            return new Response(500, json_encode(['message' => $e->getMessage()]));
        }
    }

    public function toggleFavorite () {
        try {
            if (session_status() !== PHP_SESSION_ACTIVE) {
                session_start();
            }

            if (!isset($_SESSION['user']['id'])) {
                return new Response(401, json_encode(['message' => 'Non authentifié']));
            }

            $photoId = $_POST['photo_id'] ?? null;
            $favorite = $_POST['favorite'] ?? null;

            if (!$photoId || !is_numeric($photoId) || !in_array($favorite, ['0', '1', 0, 1], true)) {
                return new Response(400, json_encode(['message' => 'Données invalides']));
            }

            $this->repo->toggleFavorite($photoId, $favorite);

            return new Response(200, json_encode(['message'=> 'Etat fav mis à jour']));

        } catch (\Exception $e) {
            return new Response(500, json_encode(['message' => $e->getMessage()]));
        }
    }

    public function listAllTags() {
        try {
            $tags = $this->repo->getAllTags();
            return new Response(200, json_encode(['tags' => $tags]));
        } catch (\Exception $e) {
            return new Response(500, json_encode(['message' => $e->getMessage()]));
        }
    }


    public function searchTags() {
        try {
            $query = $_GET['q'] ?? '';
            if (strlen($query) <2) {
                return new Response(400, json_encode(['message' => 'Recherche trop courte']));
            }

            $tags = $this->repo->searchTagsByName($query);
            return new Response(200, json_encode(['tags' => $tags]));
        }catch (\Exception $e) {
            return new Response(500, json_encode(['message' => $e->getMessage()]));
        }
    }


    public function photo()
    {
        try {
            if (session_status() !== PHP_SESSION_ACTIVE) {
                session_start();
            }

            if (!isset($_SESSION['user']['id'])) {
                return new Response(401, json_encode(['message' => 'Non authentifié']));
            }


            $photo_id = $_GET['photo_id'] ?? null;

            if(!$photo_id) {
                return new Response(400, json_encode(['message' => 'photo id manqua,t']));
            }


            $photo = $this->repo->get($photo_id);
            //var_dump($photo);

            return new Response(200, json_encode(['photo' => $photo->toArray()]));


        }catch (\Exception $e) {
            return new Response(500, json_encode(['message' => $e->getMessage()]));
        }
    }


    public function editPhoto()
    {
        try {
            if (session_status() !== PHP_SESSION_ACTIVE) {
                session_start();
            }


            if (!isset($_SESSION['user']['id'])) {
                return new Response(401, json_encode(['message' => 'Non authentifié']));
            }

            $userId = $_SESSION['user']['id'];

            //var_dump($_POST);
            $rawPostData = file_get_contents("php://input");
            if (empty($_POST) && !empty($rawPostData)) {
                $_POST = json_decode($rawPostData, true);
            }

            if (!isset($_POST['photo_id'])) {
                return new Response(400, json_encode(['message' => 'Champs photo id manquants']));
            }

            $photoId = $_POST['photo_id'];
            $title = $_POST['title'];
            $description = $_POST['description'];
            $takenAt = $_POST['taken_at'];
            $alt = $_POST['alt'] ?? null;

            $tags = $_POST['tags'] ?? [];
            if (!is_array($tags)) {
                $tags = json_decode($tags, true) ?? [];
            }

            try {
                // Récupérer la photo existante
                $photo = $this->repo->get($photoId);
                if (!$photo) {
                    return new Response(404, json_encode(['message' => 'Photo non trouvée']));
                }

                // Mise à jour des informations
                $this->repo->editPhoto($photoId, $title, $description, $takenAt, $alt, $tags);

                // Récupérer la photo mise à jour
                $updatedPhoto = $this->repo->get($photoId);

                return new Response(200, json_encode([
                    "message" => "Photo mise à jour",
                    "photo" => $updatedPhoto->toArray()
                ]));

            } catch (\Exception $e) {
                return new Response(500, json_encode(['error' => $e->getMessage()]));
            }

        }catch (\Exception $e) {
            return new Response(500, json_encode(['message' => $e->getMessage()]));
        }
    }


    public function deletePhoto() {
        try {
            if (session_status() !== PHP_SESSION_ACTIVE) {
                session_start();
            }


            if (!isset($_SESSION['user']['id'])) {
                return new Response(401, json_encode(['message' => 'Non authentifié']));
            }


            $rawPostData = file_get_contents("php://input");
            $_DELETE = json_decode($rawPostData, true) ?? [];

            if (!isset($_DELETE['photo_id'])) {
                return new Response(400, json_encode(['message' => 'photo_id manquant']));
            }

            $photoId = $_DELETE['photo_id'];

            try {
                $this->repo->deletePhoto($photoId);

                return new Response(200, json_encode([
                    "message" => "Photo supprimée"
                ]));

            } catch (\Exception $e) {
                return new Response(500, json_encode(['error' => $e->getMessage()]));
            }
        }catch (\Exception $e) {
            return new Response(500, json_encode(['message' => $e->getMessage()]));
        }
    }






}