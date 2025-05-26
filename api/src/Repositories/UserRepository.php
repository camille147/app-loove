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

        //var_dump($result);



        return new User($result['id'],
            $result['first_name'],
            $result['last_name'],
            $result['email'],
            $result['password'],   //hash du mdp
            $result['orientation'],
            $result['gender'],
            $result['birth_date'],
            (bool)$result['is_admin'],
            (bool)$result['is_premium'],
            $result['city'],
            $result['country'],
            $result['created_at'],
            $result['relationship_type'],
            (float)$result['location_lat'],
            (float)$result['location_lng']
        );

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


    public function get(string $identifier): User {
        $result = $this
            ->query("SELECT * FROM users WHERE id= :id")
            ->fetch(['id' => $identifier])
        ;

        if(empty($result)) {
            throw new Exception("User with identifier $identifier does not exist");
        }

        return new User($result['id'], $result['nom'], $result['prenom'], $result['age'], $result['localisation']);
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