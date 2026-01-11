<?php

declare(strict_types=1);

namespace App\Services\Inquiry\Drivers;

use App\Models\User;
use App\Services\Inquiry\Interfaces\UserInquiryInterface;

class UserInquiryDriver implements UserInquiryInterface
{
    public function getAllUsers(): array
    {
        return User::get()->all();
    }

    public function getUsersByPaginate(int $perPaginate): array
    {
        return [];
    }

    public function getUsersCount(): int
    {
        return User::count();
    }

    public function createUser(array $data): User
    {
        return User::create($data);
    }

    public function updateUser(int $id, array $data)
    {
        $user = User::where('id', $id)->first();

        $userStatus = $user ? $user->update($data) : null;

        return $userStatus ? $user : null;
    }

    public function destroyUser(int $id): bool
    {
        $user = User::where('id', $id)->first();

        return $user ? $user->delete() : false;
    }
}
