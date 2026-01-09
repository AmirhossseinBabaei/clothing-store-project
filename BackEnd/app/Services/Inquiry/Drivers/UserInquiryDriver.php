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
}
