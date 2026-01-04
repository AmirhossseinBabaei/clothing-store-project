<?php

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
}
