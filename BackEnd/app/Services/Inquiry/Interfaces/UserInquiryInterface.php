<?php

namespace App\Services\Inquiry\Interfaces;

use App\Models\User;

interface UserInquiryInterface
{
    public function getAllUsers(): array;

    public function getUsersByPaginate(int $perPaginate): array;

    public function createUser(array $data): User;

    public function updateUser(int $id, array $data);

    public function destroyUser(int $id): bool;
}
