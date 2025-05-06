<?php

namespace App\Models;

class User {
    public int $id;
    public string $first_name;
    public string $last_name;

    public string $email;
    public string $password;
    public string $orientation;
    public string $gender;
    public string $birthDate;
    public bool $isAdmin;
    public bool $isPremium;
    public string $city;
    public string $country;
    public string $creationDate;
    public string $relationshipType;
    public float $locationLat;
    public float $locationLng;

    public function __construct(
        int $id,
        string $first_name,
        string $last_name,
        string $email,
        string $password,
        string $orientation,
        string $gender,
        string $birthDate,
        bool $isAdmin,
        bool $isPremium,
        string $city,
        string $country,
        string $creationDate,
        string $relationshipType,
        float $locationLat,
        float $locationLng

    ){
        $this->id = $id;
        $this->first_name = $first_name;
        $this->last_name = $last_name;
        $this->email = $email;
        $this->password = $password;
        $this->orientation = $orientation;
        $this->gender = $gender;
        $this->birthDate = $birthDate;
        $this->isAdmin = $isAdmin;
        $this->isPremium = $isPremium;
        $this->city = $city;
        $this->country = $country;
        $this->creationDate = $creationDate;
        $this->relationshipType = $relationshipType;
        $this->locationLat = $locationLat;
        $this->locationLng = $locationLng;
    }
}