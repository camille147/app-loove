<?php

namespace App\Models;

class AlbumAccess {
    private int $albumId;
    private int $userId;
    private string$permission;

    public function __construct(
        int $albumId,
        int $userId,
        string $permission
    ) {
        $this->albumId = $albumId;
        $this->userId = $userId;
        $this->permission = $permission;
    }

    public function getAlbumId() :int
    {return $this->albumId;}
    public function getUserId(): int
    { return $this->userId;}
    public function getPermission(): string
    { return $this->permission;}
}