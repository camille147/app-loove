<?php

namespace App\Controllers;

use App\Repositories\UserRepository;
use App\Core\Response;


class UsersController extends BaseController {

    private $Repo;

    public function __construct() {
        $this->Repo = new UserRepository();

    }

    public function showUser(int $id) {
        try {
            $user = $this->Repo->get($id);

            return new Response(200, json_encode($user));
        } catch (Exception $e) {
            return new Response(404, json_encode(['error' => 'Utilisateur non troubé']));
        }

    }

//    public function liste() {
//        $repository = new UserRepository();
//        //var_dump($repository->all());
//        return $this->render('liste', [
//            'users' => $repository->all()
//        ]);
//    }
//    public function users_json() {
//        header("Content-Type: application/json");
//
//        $repo = new UserRepository();
//        echo json_encode($repo->findAllUsers());
//    }




    public function user(string $id) {
        $repository = new UserRepository();

        return $this->render('users/specific.php', [
            'user' => $repository->get($id)
        ]);
    }
}