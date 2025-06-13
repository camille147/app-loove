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

}