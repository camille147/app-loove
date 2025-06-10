<?php

namespace App\Models;

class PhotoAlbumRelation{
    private int $photoId;
    private int $albumId;

    private function __construct(
        int $photoId,
        int $albumId
    ) {
        $this->photoId = $photoId;
        $this->albumId = $albumId;
    }

    public function getPhotoId(): int
    { return $this->photoId;}
    public function getAlbumId(): int
    { return $this->albumId;}

}