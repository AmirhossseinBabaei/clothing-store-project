<?php

namespace App\Services\Inquiry\Drivers;

use App\Models\Contact;
use App\Services\Inquiry\Interfaces\ContactInquiryInterface;

class ContactInquiryDriver implements ContactInquiryInterface
{
    public function getAllContacts(): array
    {
        return Contact::all();
    }

    public function getContactsByPaginate(int $perPaginate): array
    {
        return [];
    }

    public function getContactsCount(): int
    {
        return Contact::count();
    }
}
