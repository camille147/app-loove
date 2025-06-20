<?php 

namespace App\Core;

use Exception;
use ReflectionClass;
use App\Controllers\BaseController;

class Routeur {

    public function __construct(
        private array $routes = []
    ) {}

    public function addRoute(string|array $methods, string $path, string $controller, string $action, array $middlewares = [])
    {
        if (is_string($methods)) {
            $methods = [$methods];
        }

        $this->routes[] = new Route($path, $controller, $action, $methods, $middlewares);
    }


    public function request(Request $request): Response 
    {
        $response = new Response(404, "Route not found");
 
        /** @var Route $route */
        foreach($this->routes as $route) {
            if ($route->isValidFor($request)) {

                foreach ($route->getMiddlewares() as $mw) {
                    $middlewareClass = $mw['middleware'];

                    $requiredRole = $mw['role'] ?? null;

                    $middleware = new $middlewareClass();
                    $middlewareResult = $middleware->handle($request, $requiredRole);

                    if ($middlewareResult instanceof Response) {
                        return $middlewareResult; // stop la requête si refusée
                    }
                }

                $reflected_controller = new ReflectionClass($route->getController());

                $exploded_uri = explode('/', trim($request->uri));
                $indexes = $this->indexOfParams($route->getPath());
                $params = array_filter($exploded_uri, function($v, $k) use ($indexes) {
                    return in_array($k, $indexes, true);
                }, ARRAY_FILTER_USE_BOTH);

                /** @var BaseController $controller */
                $controller = $reflected_controller->newInstance();
                $controller->setRequest($request);

                try {
                    $result = call_user_func_array(
                        [$controller, $route->getAction()],
                        $params
                    );

                    if ($result instanceof Response) {
                        $response = $result;
                    } else {
                        $response = new Response(200, is_string($result) ? $result : json_encode($result));
                    }
                } catch(Exception $e) {
                    $response = new Response(500, $e->getMessage());
                }

            }
        }
    
        return $response;
    }

    private function indexOfParams(string $path) : array 
    {
        $exploded_path = explode('/', trim($path));
        $indexes = [];

        foreach($exploded_path as $key => $value) {
            if(str_contains($value, '{') && str_contains($value, '}')) {
                $indexes[] = $key;
            }
        }
        return $indexes;
    }

}