<?php

namespace App\Models;

class Comment {
    private int $id;
    private int $photoId;
    private int $userId;
    private string $comment;
    private string $createdAt;
    private string $updatedAt;

    public function __construct(
        int $id,
        int $photoId,
        int $userId,
        string $comment,
        string $createdAt,
        string $updatedAt,
    )
    {
        $this->id = $id;
        $this->photoId = $photoId;
        $this->userId = $userId;
        $this->comment = $comment;
        $this->createdAt = $createdAt;
        $this->updatedAt = $updatedAt;
    }

    public function getId(): int
    { return $this->id;}
    public function getPhotoId(): int
    { return $this->photoId;}
    public function getUserId(): int
    { return $this->userId;}
    public function getComment(): string
    { return $this->comment;}
    public function getCreatedAt(): string
    { return $this->createdAt;}
    public function getUpdatedAt(): string
    { return $this->updatedAt;}
}