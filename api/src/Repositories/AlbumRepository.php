<?php

namespace App\Repositories;

use App\Models\Album;
use Exception;

class AlbumRepository extends BaseRepository {

    public function createAlbum(int $user_id, string $title, string $description, string $visibility, string $img_profile_album = null): ?Album{

        try{
            $this
                ->query("INSERT INTO albums (username, email, password_hash, profile_picture, role, created_at, updated_at, bio)
                    VALUES (:username, :email, :password_hash, :profile_picture, :role, NOW(), NOW(), :bio)")
                ->execute([
                    'username' => $username,
                    'email' => $email,
                    'password_hash' => $password_hash,
                    'profile_picture' => $profile_picture,
                    'role' => 0,
                    'bio' => $bio
                ]);

            $id =$this->lastInsertedId();

            $result = $this
                ->query("SELECT * FROM users WHERE id = :id")
                ->fetch(['id' => $id]);

            return new User($result['id'],
            $result['username'],
            $result['email'],
            $result['password_hash'],
            $result['profile_picture'],
            $result['role'],
            $result['created_at'],
            $result['updated_at'],
            $result['bio']
            );
        } catch (\PDOException $e) {
            if ($e->getCode() =='23000') {
                throw new \Exception("email et/ou pseudo déjà utilisé");
            }
            throw $e;
        }
    }


}