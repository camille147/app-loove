<?php

namespace App\Controllers;

use App\Repositories\UserRepository;
use App\Core\Response;


class UsersController extends BaseController {

    public function liste() {
        $repository = new UserRepository();
        $users = ['Alice', 'Bob']; // ou fetch depuis un repo
        $body = json_encode([
            'users' => $repository->all()
        ]);
        return new Response(200, $body);

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
    public function show_json_users() {
        header("Content-Type: application/json");

        $repo = new UserRepository();
        echo json_encode($repo->findAllUsers());
    }



    public function user(string $id) {
        $repository = new UserRepository();

        return $this->render('users/specific.php', [
            'user' => $repository->get($id)
        ]);
    }
}