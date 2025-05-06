<?php 

namespace App\Controllers;

use App\Models\User;

class HomeController extends BaseController {
    
    public function index() {
        return $this->render('home', [
            'nom' => 'Camille'
        ]);
    }
}