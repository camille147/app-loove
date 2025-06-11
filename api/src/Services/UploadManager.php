<?php

namespace App\Services;

class UploadManager
{
    private string $uploadDir;
    private array $allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    private int $maxSize = 5 * 1024 * 1024; // 5 Mo

    public function __construct(string $uploadDir)
    {
        $this->uploadDir = rtrim($uploadDir, '/');
        if (!file_exists($this->uploadDir)) {
            mkdir($this->uploadDir, 0755, true);
        }
    }

    public function upload(array $file): string
    {
        if (!isset($file['tmp_name']) || !is_uploaded_file($file['tmp_name'])) {
            throw new \Exception("Fichier invalide");
        }

        if (!in_array($file['type'], $this->allowedTypes)) {
            throw new \Exception("Type de fichier non autorisé");
        }

        if ($file['size'] > $this->maxSize) {
            throw new \Exception("Fichier trop volumineux");
        }

        $extension = pathinfo($file['name'], PATHINFO_EXTENSION);
        $uniqueName = uniqid('', true) . '.' . $extension;
        $destination = $this->uploadDir . '/' . $uniqueName;

        if (!move_uploaded_file($file['tmp_name'], $destination)) {
            throw new \Exception("Erreur lors du déplacement du fichier");
        }

        return $uniqueName;
    }
}
