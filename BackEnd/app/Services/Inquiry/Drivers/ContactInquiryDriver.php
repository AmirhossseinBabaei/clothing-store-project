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

    public function getContactsByPaginate(int $paginate): array
    {
        return Contact::orderBy('id', 'desc')->paginate($paginate)->all();
    }

    public function getContactsCount(): int
    {
        return Contact::count();
    }
}
