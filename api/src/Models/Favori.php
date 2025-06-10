<?php

namespace App\Models;

class Favori {
    private int $id;
    private int $userId;
    private int $photoId;
    private string $uploadedAt;

    public function __construct(
        int $id,
        int $userId,
        int $photoId,
        string $uploadedAt
    ) {
        $this->id = $id;
        $this->userId = $userId;
        $this->photoId = $photoId;
        $this->uploadedAt = $uploadedAt;
    }

    public function getId(): int
    { return $this->id; }
    public function getUserId(): int
    { return $this->userId; }
    public function getPhotoId(): int
    { return $this->photoId; }
    public function getUploadedAt(): string
    { return $this->uploadedAt; }
}
