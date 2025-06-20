# 📸 Loove App – Backend API



---

## 📖 Présentation

Backend de l'application **Loove**, une galerie photo privée/publique avec gestion d'albums, tags, utilisateurs et administrateurs.

Ce projet utilise un système de routage personnalisé, des middlewares pour la sécurité, et un chargement de configuration via `.env`.

---

## 🛡️ Configuration CORS

Tous les endpoints acceptent uniquement les requêtes depuis l’interface locale :

```http
Access-Control-Allow-Origin: http://app-loove-interface.local
Access-Control-Allow-Credentials: true
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
```


## 🧱 Architecture

- **Routeur** personnalisé : `App\Core\Routeur`
- **Kernel** : point d'entrée principal
- **Controllers** : `AuthController`, `AlbumController`, `PhotoController`, etc.
- **Middlewares** : vérification d’authentification et de rôles
- **.env** pour les variables d’environnement

---

## 🌐 Routes API

### 🔐 Authentification

| Méthode | URL | Contrôleur | Middleware |
|--------|-----|------------|------------|
| POST   | `/login`    | AuthController@login    | ❌ |
| POST   | `/register` | AuthController@register | ❌ |
| GET    | `/logout`   | AuthController@logout   | ❌ |
| GET    | `/me`       | AuthController@me       | ✔️ Auth |

---

### 👤 Utilisateurs (role: 0)

| Méthode | URL | Description                 |
|--------|-----|-----------------------------|
| POST   | `/user/albums/create`             | Créer un album              |
| GET    | `/user/albums`                    | Lister ses albums           |
| GET    | `/public/albums`                  | Voir les albums publics     |
| GET    | `/user/recent/albums`             | Voir ses albums récents     |
| GET    | `/search/photo`                   | Rechercher des photos       |
| POST   | `/user/profile/update`            | Modifier son profil         |
| POST   | `/user/profile/delete`            | Supprimer son profil        |
| GET    | `/user/album/photos`              | Voir les photos d’un album  |
| POST   | `/user/album/photos/create`       | Ajouter une photo           |
| POST   | `/user/albums/photo/favorite`     | Ajouter/Retirer des favoris |
| GET    | `/user/albums/photos/favorite`    | Voir les favoris            |
| POST   | `/user/album/photo/update`        | Modifier une photo          |
| DELETE | `/user/album/photo/delete`        | Supprimer une photo         |
| POST   | `/user/album/update`              | Modifier un album           |
| DELETE | `/user/album/delete`              | Supprimer un album          |
| GET    | `/tags/search`                    | Rechercher un tag           |
| GET    | `/tags`                           | Voir tous les tags          |
| GET    | `/album`                          | Voir les infos d’un album   |
| GET    | `/photo`                          | Voir les infos d’une photo  |

---

### 🛡️ Administrateurs (role: 1)

| Méthode | URL | Description                              |
|--------|-----|------------------------------------------|
| POST   | `/admin/new`         | Créer un administrateur                  |
| GET    | `/admin`             | Lister les utilisateurs                  |
| POST   | `/admin/delete`      | Supprimer un utilisateur                 |
| POST   | `/admin/tag/new`     | Créer un nouveau tag |
| GET    | `/admin/tags`        | Voir tous les tags                       |

---

## 🧩 Middleware

Le middleware `AuthMiddleware` protège les routes :
- Vérifie la session utilisateur
- Valide le rôle requis (`0` = utilisateur, `1` = admin)

---

## 🗂️ Fichiers Uploads

Les fichiers sont accessibles via `/uploads/{fichier}`.

- Dossier de base : `../interface/uploads`
- Le `Content-Type` est détecté automatiquement
- Retourne une 404 si le fichier est introuvable

---

## 🚀 Démarrage de l'application

Point d’entrée principal dans `index.php` :

```php
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

$routeur = new Routeur();
$kernel = new Kernel($routeur);
```

---

## 📦 Structure des Réponses

Réponses standard JSON :

```json
{
  "success": true,
  "data": { ... }
}
```

---

## Codes d’erreurs HTTP retournés
| Code HTTP | Signification                                              |
|-----------|------------------------------------------------------------|
| 200       | Requête traitée avec succès, données retournées           |
| 201       | Ressource créée avec succès (ex: nouvel album créé)       |
| 400       | Mauvaise requête : paramètres manquants ou invalides      |
| 401       | Non authentifié : utilisateur non connecté ou session absente |
| 404       | Ressource non trouvée (ex: album introuvable lors de la modification) |
| 500       | Erreur serveur interne, exception levée                    |


