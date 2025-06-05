<?php

namespace App\Core;

class Response {

    public function __construct(
        private int $code, 
        private string $body = ''   // ajout =''
    ) {
        if ($body === null) {   // ajout des 3 lignes
            $this->body = '';
        }
    }

    public function getCode() : int {
        return $this->code;
    }

    public function getBody() : string {
        return $this->body;
    }
    public function send(): void {
        http_response_code($this->code);
        header('Content-Type: application/json');
        //header('Access-Control-Allow-Origin: *');
        echo $this->body;
    }
}