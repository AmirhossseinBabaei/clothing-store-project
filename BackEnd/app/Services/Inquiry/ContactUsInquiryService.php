<?php

declare(strict_types=1);

namespace App\Services\Inquiry;

use App\Models\ContactUs;
use App\Services\Inquiry\Interfaces\ContactUsInquiryInterface;

class ContactUsInquiryService
{
    private ContactUsInquiryInterface $driver;

    public function __construct(ContactUsInquiryInterface $driver)
    {
        $this->driver = $driver;
    }

    public function getAllContacts(): array
    {
        return $this->driver->getAllContactsUs();
    }

    public function getContactsByPaginate(int $paginate): array
    {
        return $this->driver->getContactsUsByPaginate($paginate);
    }

    public function getContactsCount(): int
    {
        return $this->driver->getContactUsCount();
    }

    public function createContactUs(array $data): ContactUs
    {
        return $this->driver->createContactUs($data);
    }

    public function updateContactUs(int $id, array $data)
    {
        return $this->driver->updateContactUs($id, $data);
    }

    public function destroyContactUs(int $id): bool
    {
        return $this->driver->destroyContactUs($id);
    }
}
