<?php

namespace App\Models;

class User {
    private int $id;
    private string $username;
    private string $email;
    private string $passwordHash;
    public string $profilePicture;
    public bool $role;
    public string $creationDate;
    public string $updatedDate;


    public function __construct(
        int $id,
        string $username,
        string $email,
        string $passwordHash,
        string $profilePicture,
        bool $role,
        string $creationDate,
        string $updatedDate

    ){
        $this->id = $id;
        $this->username = $username;
        $this->email = $email;
        $this->passwordHash = $passwordHash;
        $this->profilePicture = $profilePicture;
        $this->role = $role;
        $this->creationDate = $creationDate;
        $this->updatedDate = $updatedDate;
    }

    public function getId(): int
    { return $this->id;}
    public function getEmail(): string
    { return $this->email;}
    public function getFirstName(): string
    { return $this->username;}
    public function getPasswordHash(): string
    {return $this->passwordHash;}

}