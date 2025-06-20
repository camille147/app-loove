<?php

namespace App\Repositories;

use App\Models\Album;
use App\Models\Photo;
use Exception;

class AlbumRepository extends BaseRepository {

    public function createAlbum(int $user_id, string $title, string $description, string $visibility, string $img_profile_album = null): ?Album{

        try{
            $this
                ->query("INSERT INTO albums (user_id, title, description, created_at, visibility, img_profile_album)
                    VALUES (:user_id, :title, :description, NOW(), :visibility, :img_profile_album)")
                ->execute([
                    'user_id' => $user_id,
                    'title' => $title,
                    'description' => $description,
                    'visibility' => $visibility,
                    'img_profile_album' => $img_profile_album
                ]);

            $id =$this->lastInsertedId();

            $result = $this
                ->query("SELECT * FROM albums WHERE id = :id")
                ->fetch(['id' => $id]);

            return new Album($result['id'],
            $result['user_id'],
            $result['title'],
            $result['description'],
            $result['created_at'],
            $result['visibility'],
            $result['img_profile_album']
            );
        } catch (\PDOException $e) {
            if ($e->getCode() =='23000') {
                throw new \Exception("err création album");
            }
            throw $e;
        }
    }


    public function findByUserAndFilter(int $userId, string $filter = 'all'): array {
        $albums = [];

        switch ($filter) {
            case 'public':
                $results = $this
                    ->query("SELECT * FROM albums WHERE user_id = :userId AND visibility = 'public'")
                    ->fetchAll(['userId' => $userId]);
                break;

            case 'private':
                $results = $this
                    ->query("SELECT * FROM albums WHERE user_id = :userId AND visibility = 'private'")
                    ->fetchAll(['userId' => $userId]);
                break;

            case 'shared':
                $results = $this
                    ->query("SELECT a.* FROM albums a 
                                    INNER JOIN album_access aa ON a.id = aa.album_id
                                    WHERE aa.user_id = :userId")
                    ->fetchAll(['userId' => $userId]);
                break;

            case 'all':
            default:
                $results = $this
                    ->query("SELECT DISTINCT a.* FROM albums a 
                                    LEFT JOIN album_access aa ON a.id = aa.album_id
                                    WHERE a.user_id = :userId OR aa.user_id = :userId")
                    ->fetchAll(['userId' => $userId]);
                break;

        }

        foreach ($results as $result) {
            $albums[] = new Album($result['id'],
                $result['user_id'],
                $result['title'],
                $result['description'],
                $result['created_at'],
                $result['visibility'],
                $result['img_profile_album']);
        }



        return $albums;
    }

    public function getAlbum(int $album_id) {
        $result = $this
            ->query("SELECT * FROM albums WHERE id = :id")
            ->fetch(['id' => $album_id]);
        return new Album($result['id'],
            $result['user_id'],
            $result['title'],
            $result['description'],
            $result['created_at'],
            $result['visibility'],
            $result['img_profile_album']);
    }

    public function editAlbum(int $albumId, ?string $title, ?string $description, ?string $visibility, ?string $img_profile_album): ?Album {
        try {
            $execute = [
                'albumId' => $albumId,
                'title' => $title,
                'description' => $description,
                'visibility' => $visibility,
                'img_profile_album' => $img_profile_album
            ];

            $this->query("UPDATE albums SET title = :title, description = :description, visibility = :visibility, img_profile_album = :img_profile_album WHERE id = :albumId")
                ->execute($execute);

            // Récupérer la photo mise à jour
            $result = $this->getAlbum($albumId);

            return $result;

        } catch (\PDOException $e) {
            if ($e->getCode() == '23000') {
                throw new \Exception("Erreur lors de la mise à jour de l'album.");
            }
            throw $e;
        }
    }


    public function deleteAlbum(int $albumId): bool {
        try {
            $this->query("DELETE FROM albums WHERE id = :albumId")
                ->execute(['albumId' => $albumId]);

            return true;
        }catch (\Exception $e) {
            throw new Exception("Erreur lors de la suppression album : " . $e->getMessage());
        }
    }


    public function getAlbumsAndPhotos(): array
    {
        $results = $this
            ->query("SELECT 
            a.id AS album_id,
            a.user_id AS album_user_id,
            a.title AS album_title,
            a.description AS album_description,
            a.created_at AS album_created_at,
            a.visibility AS album_visibility,
            a.img_profile_album AS album_img_profile_album,
            p.id AS photo_id,
            p.user_id AS photo_user_id,
            p.filename AS photo_filename,
            p.description AS photo_description,
            p.taken_at AS photo_taken_at,
            p.uploaded_at AS photo_uploaded_at,
            p.alt AS photo_alt,
            p.title AS photo_title,
            p.is_favorite AS photo_is_favorite,
            p.is_deleted AS photo_is_deleted,
            p.album_id AS photo_album_id
        FROM albums a
        JOIN photos p ON p.album_id = a.id
        WHERE a.visibility = 'public' AND p.is_deleted = 0
        ORDER BY a.id")
            ->fetchAll();
        $albums = [];
        $photoIds = [];

        foreach ($results as $row) {
            $albumId = $row['album_id'];
            $photoId = $row['photo_id'];

            if (!isset($albums[$albumId])) {
                $albums[$albumId] = new Album(
                    $albumId,
                    $row['album_user_id'],
                    $row['album_title'],
                    $row['album_description'],
                    $row['album_created_at'],
                    $row['album_visibility'],
                    $row['album_img_profile_album']

                );
            }
            $photo = new Photo($photoId,
                $row['photo_user_id'],
                $row['photo_filename'],
                $row['photo_description'],
                $row['photo_taken_at'],
                $row['photo_uploaded_at'],
                $row['photo_alt'],
                $row['photo_title'],
                $row['photo_is_favorite'],
                $row['photo_is_deleted'],
                $row['photo_album_id'],
                []
            );

            $albums[$albumId]->addPhoto($photo);
            $photoIds[] = $photoId;

        }
        if (empty($photoIds)) {
            return array_values($albums);
        }
        $inQuery = implode(',', array_fill(0, count($photoIds), '?'));
        $sql = "SELECT pt.photo_id, t.id AS tag_id, t.name AS tag_name
        FROM photo_tags pt
        JOIN tags t ON t.id = pt.tag_id
        WHERE pt.photo_id IN ($inQuery)";
        $this->query($sql);
        $this->execute($photoIds);
        $tagsResult = $this->current_statement->fetchAll();


        $tagsByPhoto = [];
        foreach ($tagsResult as $tagRow) {
            $tagsByPhoto[$tagRow['photo_id']][] = $tagRow['tag_name']; // juste le nom du tag

        }

        foreach ($albums as $album) {
            foreach ($album->getPhotos() as $photo) {
                $photoId = $photo->getId();
                $photoTags = $tagsByPhoto[$photoId] ?? [];
                $photo->setTags($photoTags);
            }
        }
        return array_values($albums);
    }

    public function getRecentsAlbums($userId) {

        $results = $this
            ->query("SELECT * FROM albums WHERE user_id = :userId ORDER BY created_at DESC LIMIT 10")
            ->fetchAll(['userId' => $userId]);


        foreach ($results as $result) {
            $albums[] = new Album($result['id'],
                $result['user_id'],
                $result['title'],
                $result['description'],
                $result['created_at'],
                $result['visibility'],
                $result['img_profile_album']);
        }



        return $albums;
    }


}