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


    public function __construct(
        int $id,
        int $userId,
        string $filename,
        string $description,
        string $takenAt,
        string $uploadedAt,
        string $alt
    ) {
        $this->id = $id;
        $this->userId = $userId;
        $this->filename = $filename;
        $this->description = $description;
        $this->takenAt = $takenAt;
        $this->uploadedAt = $uploadedAt;
        $this->alt = $alt;
    }

    public function getId(): int
    { return $this->id;}
    public function getUserId(): int
    { return $this->userId;}
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

}