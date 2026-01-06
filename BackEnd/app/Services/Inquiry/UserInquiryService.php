<?php

declare(strict_types=1);

namespace App\Services\Inquiry;

use App\Services\Inquiry\Interfaces\UserInquiryInterface;

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
}
