<?php

namespace App\Models;

class User {
    private int $id;
    private string $first_name;
    private string $last_name;
    private string $email;
    private string $passwordHash;
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
        string $passwordHash,
        string $orientation,
        string $gender,
        string $birthDate,
        bool $isAdmin,
        bool $isPremium,
        string $city,
        string $country,
        string $createdAt,
        string $relationshipType,
        float $locationLat,
        float $locationLng

    ){
        $this->id = $id;
        $this->first_name = $first_name;
        $this->last_name = $last_name;
        $this->email = $email;
        $this->passwordHash = $passwordHash;
        $this->orientation = $orientation;
        $this->gender = $gender;
        $this->birthDate = $birthDate;
        $this->isAdmin = $isAdmin;
        $this->isPremium = $isPremium;
        $this->city = $city;
        $this->country = $country;
        $this->creationDate = $createdAt;
        $this->relationshipType = $relationshipType;
        $this->locationLat = $locationLat;
        $this->locationLng = $locationLng;
    }

    public function getId() { return $this->id;}
    public function getEmail() { return $this->email;}
    public function getFirstName() { return $this->first_name;}
    public function getLastName() { return $this->last_name;}
    public function getPasswordHash() {return $this->passwordHash;}

}