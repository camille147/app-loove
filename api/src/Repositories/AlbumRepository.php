<?php

namespace App\Repositories;

use App\Models\Album;
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


}