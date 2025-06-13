<?php

namespace App\Models;

class User {
    private int $id;
    private string $username;
    private string $email;
    private string $passwordHash;
    public string $profilePicture;
    private int $role;
    public string $creationDate;
    public string $updatedDate;
    public string $bio;
    private int $isDeleted;


    public function __construct(
        int $id,
        string $username,
        string $email,
        string $passwordHash,
        string $profilePicture,
        int $role,
        string $creationDate,
        string $updatedDate,
        string $bio,
        int $isDeleted


    ){
        $this->id = $id;
        $this->username = $username;
        $this->email = $email;
        $this->passwordHash = $passwordHash;
        $this->profilePicture = $profilePicture;
        $this->role = $role;
        $this->creationDate = $creationDate;
        $this->updatedDate = $updatedDate;
        $this->bio = $bio;
        $this->isDeleted = $isDeleted;
    }

    public function getId(): int
    { return $this->id;}
    public function getEmail(): string
    { return $this->email;}
    public function getFirstName(): string
    { return $this->username;}
    public function getPasswordHash(): string
    {return $this->passwordHash;}
    public function getRole(): int
    {return $this->role;}
    public function getIsDeleted(): int {
        return $this->isDeleted;

    }

}