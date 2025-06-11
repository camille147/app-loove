<?php

namespace App\Core;

class Route {
public array $middlewares = [];
    public function __construct(
        private string $path,
        private string $controller,
        private string $action,
        private array $methods = [],
        array $middlewares = []
    ) {
        $this->middlewares = $middlewares;
    }

    public function getPath(): string {
        return $this->path;
    }

    public function getMethods(): array {
        return $this->methods;
    }

    public function getController(): string {
        return $this->controller;
    }

    public function getAction(): string {
        return $this->action;
    }

    public function getMiddlewares(): array {
        return $this->middlewares;
    }
    public function isValidFor(Request $request): bool
    {
        // Extraire uniquement la partie path (avant le ?)
        $pathOnly = parse_url($request->uri, PHP_URL_PATH);

        // Vérifie la méthode HTTP
        if (!in_array($request->method, $this->getMethods(), true)) {
            return false;
        }

        $exploded_uri = explode('/', trim($pathOnly, '/'));
        $exploded_path = explode('/', trim($this->path, '/'));

        if ($pathOnly === $this->path) {
            return true;
        }

        if (count($exploded_uri) !== count($exploded_path)) {
            return false;
        }

        foreach ($exploded_path as $index => $value) {
            $isVariable = str_contains($value, '{') && str_contains($value, '}');
            if ($isVariable) {
                continue;
            }

            if ($value !== $exploded_uri[$index]) {
                return false;
            }
        }

        return true;
    }

}