<?php

namespace App\Services\Inquiry;

use App\Services\Inquiry\Interfaces\ContactInquiryInterface;

class ContactInquiryService
{
    private ContactInquiryInterface $driver;

    public function __construct(ContactInquiryInterface $driver)
    {
        $this->driver = $driver;
    }

    public function getAllContacts(): array
    {
        return $this->driver->getAllContacts();
    }

    public function getContactsByPaginate(int $paginate): array
    {
        return $this->driver->getContactsByPaginate($paginate);
    }

    public function getContactsCount(): int
    {
        return $this->driver->getContactsCount();
    }
}
