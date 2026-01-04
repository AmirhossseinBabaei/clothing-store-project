<?php

namespace App\Services\Inquiry\Interfaces;

interface UserInquiryInterface
{
    public function getAllUsers(): array;
    public function getUsersByPaginate(int $perPaginate): array;
}
