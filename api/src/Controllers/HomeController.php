<?php 

namespace App\Controllers;

use App\Models\User;

class HomeController extends BaseController {
    
    public function index() {
        echo json_encode([
            'nom' => 'Camille',
            'message' => 'Bienvenue sur mon app'
        ]);
    }
}