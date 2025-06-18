<?php

namespace App\Repositories;

use App\Models\Album;
use App\Models\Photo;
use App\Models\Tag;
use App\Models\User;
use Exception;

class AdminRepository extends BaseRepository {
    public function getAllTags(): array {
        $results = $this
            ->query("SELECT DISTINCT name FROM tags ORDER BY name ASC")
            ->fetchAll();
        return array_map(fn($row) => $row['name'], $results);
    }

    public function createTag(string $name): array {
        try{
            $this
                ->query("INSERT INTO tags (name)
                    VALUES (:name)")
                ->execute([
                    'name' => $name,
                ]);

            $id =$this->lastInsertedId();

            $results = $this
                ->query("SELECT DISTINCT name FROM tags ORDER BY name ASC")
                ->fetchAll();


            return array_map(fn($row) => $row['name'], $results);
        } catch (\PDOException $e) {
            if ($e->getCode() =='23000') {
                throw new \Exception("err création tag");
            }
            throw $e;
        }
    }

    public function getAllUsers(): array {
        $results = $this
            ->query("SELECT * FROM users")
            ->fetchAll();

        //var_dump($results);
        foreach ($results as $result) {
            $users[] = new User($result['id'],
                $result['username'],
                $result['email'],
                $result['password_hash'],   //hash du mdp
                $result['profile_picture'],
                $result['role'],
                $result['created_at'],
                $result['updated_at'],
                $result['bio'],
                $result['is_deleted']);
        }

        return $users;

    }
}
