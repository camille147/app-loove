<?php

namespace App\Models;

class Album {
    private int $id;
    private int $userId;
    private string $title;
    private string $description;
    private string $creationDate;
    private string $visibility;
    private string $imgProfileAlbum;

    private array $photos = [];



    public function __construct(
        int $id,
        int $userId,
        string $title,
        string $description,
        string $creationDate,
        string $visibility,
        string $imgProfileAlbum

    ){
        $this->id = $id;
        $this->userId = $userId;
        $this->title = $title;
        $this->description = $description;
        $this->creationDate = $creationDate;
        $this->visibility = $visibility;
        $this->imgProfileAlbum = $imgProfileAlbum;
    }

    public function getId(): int
    { return $this->id;}
    public function getUserId(): int
    { return $this->userId;}
    public function getTitle(): string
    { return $this->title;}
    public function getDescription(): string
    {return $this->description;}
    public function getCreationDate(): string
    {return $this->creationDate;}
    public function getVisibility(): string
    {return $this->visibility;}
    public function getImgProfileAlbum(): string
    {return $this->imgProfileAlbum;}

    public function getPhotos(): array {
        return $this->photos;
    }

    public function addPhoto(Photo $photo): void {
        $this->photos[] = $photo;
    }
    public function toArray(): array {
        return [
            'id' => $this->id,
            'user_id' => $this->userId,
            'title' => $this->title,
            'description' => $this->description,
            'created_at' => $this->creationDate,
            'visibility' => $this->visibility,
            'img_profile_album' => $this->imgProfileAlbum,
            'photos' => array_map(fn($photo) => $photo->toArray(), $this->photos),
        ];
    }


}