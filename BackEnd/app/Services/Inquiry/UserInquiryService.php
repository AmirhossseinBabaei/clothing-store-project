<?php

declare(strict_types=1);

namespace App\Services\Inquiry;

use App\Models\User;
use App\Services\Inquiry\Interfaces\UserInquiryInterface;
use Illuminate\Support\Facades\Hash;

class UserInquiryService
{
    private UserInquiryInterface $driver;

    public function __construct(
        UserInquiryInterface $driver
    )
    {
        $this->driver = $driver;
    }

    public function getAllUsers(): array
    {
        return $this->driver->getAllUsers();
    }

    public function getUsersCount(): int
    {
        return $this->driver->getUsersCount();
    }

    public function createUser(array $data): User
    {
        $data['password_hash'] = Hash::make($data['password_hash']);

        return $this->driver->createUser($data);
    }

    public function updateUser(int $id, array $data)
    {
        return $this->driver->updateUser($id, $data);
    }

    public function destroyUser(int $id): bool
    {
        return $this->driver->destroyUser($id);
    }
}
