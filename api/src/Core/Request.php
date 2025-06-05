<?php

namespace App\Core;

class Request {

    public string $uri;
    public string $method;
    public array $query;
    public array $request;

    public function __construct($server, $get, $post) {
        $this->uri = $server['REQUEST_URI'];
        $this->method = $server['REQUEST_METHOD'];
        $this->query = $get;
        $this->request = $post;
    }

    public function getHeader(string $name): ?string
    {
        $key = 'HTTP_' . strtoupper(str_replace('-', '_', $name));
        if (isset($_SERVER[$key])) {
            return $_SERVER[$key];
        }

        // Tentative alternative pour Apache
        if (function_exists('apache_request_headers')) {
            $headers = apache_request_headers();
            $normalized = array_change_key_case($headers, CASE_LOWER);
            $nameLower = strtolower($name);
            return $normalized[$nameLower] ?? null;
        }

        return null;
    }
}