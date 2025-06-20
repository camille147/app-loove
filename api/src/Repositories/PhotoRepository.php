<?php

namespace App\Repositories;

use App\Models\Album;
use App\Models\Photo;
use App\Models\User;
use Exception;

class PhotoRepository extends BaseRepository {

    public function createPhoto(int $user_id, int $album_id, string $filename, ?string $description = null, ?string $takenAt = null, ?string $alt = null, ?string $title = null): ?Photo{

        try{
            $this
                ->query("INSERT INTO photos (user_id, filename, description, taken_at, uploaded_at, alt, title, is_favorite, is_deleted, album_id)
        VALUES (:user_id, :filename, :description, :taken_at, NOW(), :alt, :title, 0, 0, :album_id)")
                ->execute([
                    'user_id' => $user_id,
                    'album_id' => $album_id,
                    'filename' => $filename,
                    'description' => $description,
                    'taken_at' => $takenAt,
                    'alt' => $alt,
                    'title' => $title

                ]);

            $id =$this->lastInsertedId();

            $result = $this
                ->query("SELECT * FROM photos WHERE id = :id")
                ->fetch(['id' => $id]);

            if (!$result) return null;

            return new Photo($result['id'],
                $result['user_id'],
                $result['filename'],
                $result['description'],
                $result['taken_at'],
                $result['uploaded_at'],
                $result['alt'],
                $result['title'],
                $result['is_favorite'],
                $result['is_deleted'],
                $result['album_id'],



            );
        } catch (\PDOException $e) {
            if ($e->getCode() =='23000') {
                throw new \Exception("err création photo");
            }
            throw $e;
        }
    }

    public function getTagIdByName(string $name): ?int {
        $result = $this
            ->query("SELECT id FROM tags WHERE name = :name")
            ->fetch(['name' => $name]);
        return $result ? (int)$result['id'] : null;
    }

    public function addTagToPhoto(int $photoId, int $tagId): void {
        $this
            ->query("INSERT INTO photo_tags (photo_id, tag_id) VALUES (:photo_id, :tag_id)")
            ->execute(['photo_id' => $photoId,
                'tag_id' => $tagId]);
    }

    public function addTagsToPhoto(int $photoId, array $tags): void {
        foreach ($tags as $tag) {
            $tagId = $this->getTagIdByName($tag);
            $this->addTagToPhoto($photoId, $tagId);
        }
    }





    public function findByAlbumAndFilter(int $albumId, ?string $tag = null, ?string $order = null, bool $favorite = false): array {
        $photos = [];
        $params = ['albumId' => $albumId];

        $query = "SELECT DISTINCT p.* FROM photos p";

        if($tag !== null) {
            $query .=" INNER JOIN photo_tags pt ON p.id = pt.photo_id
                INNER JOIN tags t ON pt.tag_id = t.id
                WHERE p.album_id = :albumId 
                AND t.name = :tag
                AND p.is_deleted = 0 ";
            $params['tag'] = $tag;
        } else {
            $query.= " WHERE p.album_id = :albumId AND p.is_deleted = 0 ";
        }

        if ($favorite) {
            $query.= " AND p.is_favorite = true ";
        }

        if ($order === 'recent') {
            $query .="ORDER BY p.taken_at DESC";

        } elseif ($order === 'old') {
            $query .="ORDER BY p.taken_at ASC";
        }



        $results = $this
            ->query($query)
            ->fetchAll($params);



        foreach ($results as $result) {
            $photos[] = new Photo($result['id'],
                $result['user_id'],
                $result['filename'],
                $result['description'],
                $result['taken_at'],
                $result['uploaded_at'],
                $result['alt'],
                $result['title'],
                $result['is_favorite'],
                $result['is_deleted'],
                $result['album_id'],
            );
        }



        return $photos;
    }

    public function toggleFavorite(int $photoId, bool $favorite): bool {
        $this->query("UPDATE photos SET is_favorite = :favorite WHERE id = :id")
            ->execute([
                'favorite' => $favorite ? 1 : 0,
                'id' => $photoId
            ]);
        return true;
    }


    public function searchTagsByName(string $query): array {
        $results = $this
            ->query("SELECT name FROM tags WHERE name LIKE :query LIMIT 10")
            ->fetchAll(['query' => $query . '%']);
        return array_map(fn($row) => $row['name'], $results);
    }


    public function getAllTags(): array {
        $results = $this
            ->query("SELECT DISTINCT name FROM tags ORDER BY name ASC")
            ->fetchAll();
        return array_map(fn($row) => $row['name'], $results);
    }



    public function get (int $photoId) {
        $result = $this
                ->query("SELECT p.*, GROUP_CONCAT(t.name) AS tags 
    FROM photos p
    LEFT JOIN photo_tags pt ON p.id = pt.photo_id
    LEFT JOIN tags t ON pt.tag_id = t.id
    WHERE p.id = :id
    GROUP BY p.id")
            ->fetch(['id' => $photoId])
        ;

        if(empty($result)) {
            throw new Exception("photo non identifié");
        }

        return new Photo($result['id'],
            $result['user_id'],
            $result['filename'],
            $result['description'],
            $result['taken_at'],
            $result['uploaded_at'],
            $result['alt'],
            $result['title'],
            $result['is_favorite'],
            $result['is_deleted'],
            $result['album_id'],
            explode(',', $result['tags'] ?? '')
        );
    }



    public function editPhoto(int $photoId, ?string $title, ?string $description, ?string $takenAt, ?string $alt, array $tags = []): ?Photo {
        try {
            $execute = [
                'photoId' => $photoId,
                'title' => $title,
                'description' => $description,
                'takenAt' => $takenAt,
                'alt' => $alt
            ];

            $query = "UPDATE photos SET title = :title, description = :description, taken_at = :takenAt, alt = :alt , uploaded_at = NOW() WHERE id = :photoId";


            $this->query($query)->execute($execute);

            // Mettre à jour les tags associés à la photo
            if (!empty($tags)) {
                $this->query("DELETE FROM photo_tags WHERE photo_id = :photoId")->execute(['photoId' => $photoId]);
                foreach ($tags as $tag) {
                    $tagId = $this->getTagIdByName($tag);
                    if ($tagId) {
                        $this->addTagToPhoto($photoId, $tagId);
                    }
                }
            }

            // Récupérer la photo mise à jour
            $result = $this->get($photoId);

            return $result;

        } catch (\PDOException $e) {
            if ($e->getCode() == '23000') {
                throw new \Exception("Erreur lors de la mise à jour de la photo.");
            }
            throw $e;
        }
    }

    public function deletePhoto(int $photoId): bool {
        try {
            $this->query("DELETE FROM photos WHERE id = :photoId")
                ->execute(['photoId' => $photoId]);

            return true;
        }catch (\Exception $e) {
            throw new Exception("Erreur lors de la suppression : " . $e->getMessage());
        }
    }


    public function getAllFavorites($userId): array
    {
        $results = $this
            ->query("SELECT * FROM photos WHERE is_favorite = 1 AND user_id = :user_id ORDER BY uploaded_at DESC")
            ->fetchAll(['user_id' => $userId]);

        $favorites = [];
        foreach ($results as $result) {
            $favorites[] = new Photo($result['id'],
                $result['user_id'],
                $result['filename'],
                $result['description'],
                $result['taken_at'],
                $result['uploaded_at'],
                $result['alt'],
                $result['title'],
                $result['is_favorite'],
                $result['is_deleted'],
                $result['album_id'],
            );
        }
        return $favorites;
    }


    public function getPhotosByTag() {

        $results = $this
            ->query("SELECT 
    t.id AS tag_id,
    t.name AS tag_name,
    p.id AS photo_id,
    p.title AS photo_title,
    p.filename,
    p.description,
    p.uploaded_at
FROM tags t
JOIN photo_tags pt ON pt.tag_id = t.id
JOIN photos p ON p.id = pt.photo_id
WHERE p.is_deleted = 0
ORDER BY t.name ASC
")
            ->fetchAll();


        $tags = [];

        foreach ($results as $row) {
            $tagName = $row['tag_name'];

            if (!isset($tags[$tagName])) {
                $tags[$tagName] = [
                    'name' => $tagName,
                    'photos' => []
                ];
            }

            $tags[$tagName]['photos'][] = [
                'id' => $row['photo_id'],
                'title' => $row['photo_title'],
                'filename' => $row['filename'],
                'description' => $row['description'],
                'uploaded_at' => $row['uploaded_at']
            ];
        }

        return array_values($tags);
    }




}

