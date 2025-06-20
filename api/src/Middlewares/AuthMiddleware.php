<?php
namespace App\Middlewares;

use App\Core\Request;
use App\Core\Response;

class AuthMiddleware {

    public function handle(Request $request, ?int $requiredRole = null): ?Response {
        if (session_status() !== PHP_SESSION_ACTIVE) {
            session_start();
        }
        $authHeader = $request->getHeader('Authorization');
        if (!$authHeader || !preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
            // Pas de token ou token mal formé -> 401 Unauthorized
            $response = new Response(401, json_encode(['error' => 'Token manquant ou invalide']));
            $response->send();
            exit;
        }

        $token = $matches[1];

        if (!isset($_SESSION['token']) || $_SESSION['token'] !== $token) {
            return new Response(401, json_encode(['message' => 'Token invalide']));
        }

        if (!isset($_SESSION['last_activity']) || (time() - $_SESSION['last_activity'] > 1800)) {
            session_unset(); //vide ttes les var de sessionq
            session_destroy();
            return new Response(401, json_encode(['message' => 'Session expirée']));
        }

        if ($requiredRole !== null) {
            if (!isset($_SESSION['user']['role']) || $_SESSION['user']['role'] != $requiredRole) {
                return new Response(403, json_encode(['message' => 'Accès refusé : rôle insuffisant']));
            }
        }

        $_SESSION['last_activity'] = time();

        return null;
    }
}
