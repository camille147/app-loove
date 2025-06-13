<?php

namespace App\Repositories;

use App\Models\User;
use Exception;

class UserRepository extends BaseRepository {

    public function findByEmail(string $email): ?User {
        $result = $this
            ->query("SELECT * FROM users WHERE email = :email")
            ->fetch(['email' => $email])
        ;
        if (!$result) {
            return null;
        }

        return new User($result['id'],
            $result['username'],
            $result['email'],
            $result['password_hash'],   //hash du mdp
            $result['profile_picture'],
            $result['role'],
            $result['created_at'],
            $result['updated_at'],
            $result['bio'],
        $result['is_deleted']
        );

    }



    public function createUser(string $username, string $email, string $password, string $profile_picture = null, string $bio): ?User{

        $password_hash = password_hash($password, PASSWORD_DEFAULT);

        try{
            $this
                ->query("INSERT INTO users (username, email, password_hash, profile_picture, role, created_at, updated_at, bio, is_deleted) 
                            VALUES (:username, :email, :password_hash, :profile_picture, :role, NOW(), NOW(), :bio, :is_deleted)")
                ->execute([
                    'username' => $username,
                    'email' => $email,
                    'password_hash' => $password_hash,
                    'profile_picture' => $profile_picture,
                    'role' => 0,
                    'bio' => $bio,
                    'is_deleted' => 0
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
                $result['bio'],
            $result['is_deleted']
            );
        } catch (\PDOException $e) {
            if ($e->getCode() =='23000') {
                throw new \Exception("email et/ou pseudo déjà utilisé");
            }
            throw $e;
        }

    }

    public function editUser(int $id, string $username, string $email, ?string $profile_picture, string $bio): ?User {
        try {

            $execute = [
                'id' => $id,
                'username' => $username,
                'email' => $email,
                'bio' => $bio,
            ];


            $query = "UPDATE users SET username = :username, email = :email, bio = :bio";

            if ($profile_picture !== null) {
                $query .= ", profile_picture = :profile_picture";
                $execute['profile_picture'] = $profile_picture;
            }

            $query .= ", updated_at = NOW() WHERE id = :id";


            $this
                ->query($query)
                ->execute($execute);

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
                $result['bio'],
            $result['is_deleted']
            );

        } catch (\PDOException $e){
            if ($e->getCode() =='23000') {
                throw new \Exception("email et/ou pseudo déjà utilisé");
            }
            throw $e;
        }


    }





    public function get(int $id): User {
        $result = $this
            ->query("SELECT * FROM users WHERE id= :id")
            ->fetch(['id' => $id])
        ;

        if(empty($result)) {
            throw new Exception("User with identifier $id does not exist");
        }

        return new User($result['id'],
            $result['username'],
            $result['email'],
            $result['password_hash'],
            $result['profile_picture'],
            $result['role'],
            $result['created_at'],
            $result['updated_at'],
            $result['bio'],
        $result['is_deleted']
        );
    }









}