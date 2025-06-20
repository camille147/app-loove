<?php

namespace App\Models;

class Photo {
    private int $id;
    private int $userId;
    private string $filename;
    private string $description;
    private string $takenAt;
    private string $uploadedAt;
    private string $alt;
    private string $title;
    private int $isFavorite;
    private int $isDeleted;

    private int $albumId;
    private array $tags;


    public function __construct(
        int $id,
        int $userId,
        string $filename,
        string $description,
        string $takenAt,
        string $uploadedAt,
        string $alt,
        string $title,
        int $isFavorite,
        int $isDeleted,
        int $albumId,
        array $tags = []

    ) {
        $this->id = $id;
        $this->userId = $userId;
        $this->filename = $filename;
        $this->description = $description;
        $this->takenAt = $takenAt;
        $this->uploadedAt = $uploadedAt;
        $this->alt = $alt;
        $this->title = $title;
        $this->isFavorite = $isFavorite;
        $this->isDeleted = $isDeleted;
        $this->albumId = $albumId;
        $this->tags = $tags;

    }

    public function getId(): int
    { return $this->id;}
    public function getUserId(): int
    { return $this->userId;}
    public function getAlbumId(): int
    { return $this->albumId;}
    public function getFilename(): string
    { return $this->filename;}
    public function getDescription(): string
    {return $this->description;}
    public function getTakenAt(): string
    {return $this->takenAt;}
    public function getUploadedAt(): string
    {return $this->uploadedAt;}
    public function getAlt(): string
    {return $this->alt;}
    public function getTitle(): string
    {return $this->title;}
    public function getIsFavorite(): int
    {
        return $this->isFavorite;
    }
    public function getIsDeleted(): int {
        return $this->isDeleted;

    }
    public function getTags(): array {
        return $this->tags;
    }

    public function setTags(array $tags): void {
        $this->tags = $tags;
    }


    public function toArray() {
        return [
            'id' => $this->id,
            'user_id' => $this->userId,
            'filename' => $this->filename,
            'description' => $this->description,
            'taken_at' => $this->takenAt,
            'uploaded_at' => $this->uploadedAt,
            'alt' => $this->alt,
            'title' => $this->title,
            'is_favorite' => $this->isFavorite,
            'is_deleted' => $this->isDeleted,
            'album_id' => $this->albumId,
            'tags' => $this->tags,
        ];
    }

}