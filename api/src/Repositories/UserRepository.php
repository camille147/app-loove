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

        return new User($result['id'],
            $result['username'],
            $result['email'],
            $result['password_hash'],   //hash du mdp
            $result['profile_picture'],
            $result['role'],
            $result['created_at'],
            $result['updated_at'],
            $result['bio']
        );

    }

    public function createUser(string $username, string $email, string $password, string $profile_picture = null, string $bio): ?User{

        $password_hash = password_hash($password, PASSWORD_DEFAULT);

        try{
            $this
                ->query("INSERT INTO users (username, email, password_hash, profile_picture, role, created_at, updated_at, bio) 
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

    //public function create(string $email, string $password): bool {
    //    $hash = password_hash($password, PASSWORD_DEFAULT);
    //
    //    $result = $this
    //        ->query("INSERT INTO users (email, password, status) VALUES (:email, :password, :status)")
    //
    //    ;
    //    return $this->execute([
    //        'email' => $email,
    //        'password' => $hash,
    //        'status' => $status,
    //    ]);
    //}


    public function findAllUsers() :array {
        $results = $this
            ->query("SELECT * FROM users")
            ->fetch();

        $users = [];
        foreach($results as $result) {
            $users[] = new User($result['id'], $result['first_name'], $result['last_name'], $result['birth_date'],);
        }

        return $users;
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
            $result['bio']
        );
    }



    public function all(): array {
        $results = $this
            ->query("SELECT * FROM users")
            ->fetchAll();

        $users = [];
        foreach ($results as $result) {
                $users[] = new User(
                    $result['id'],
                    $result['first_name'],
                    $result['last_name'],
                    $result['email'],
                    $result['password'],
                    $result['orientation'],
                    $result['gender'],
                    $result['birth_date'],
                    (bool) $result['is_admin'],
                    (bool) $result['is_premium'],
                    $result['city'],
                    $result['country'],
                    $result['created_at'],
                    $result['relationship_type'],
                    (float) $result['location_lat'],
                    (float) $result['location_lng']
                );
        }

        return $users;
    }


    //public function save(User $user): void {
    //    $this
    //        ->query("UPDATE users SET first_name = :first_name, last_name = :last_name, birthDate = :birthDate, city = :city WHERE id = :id")
    //        ->execute([
    //            'nom' => $user->first_name,
    //            'prenom' => $user->last_name,
    //            'date' => $user->birthDate,
    //            'ville' => $user->city,
    //            'id' => $user->id
    //        ]);
    //}

    //public function delete(User $user): void {
    //    $this
    //       ->query("DELETE FROM users where id = :id")
    //        ->execute(['id'=>$user->id])
    //    ;
    //}


}