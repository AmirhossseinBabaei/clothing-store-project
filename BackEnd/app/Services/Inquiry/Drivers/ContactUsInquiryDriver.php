<?php

declare(strict_types=1);

namespace App\Services\Inquiry\Drivers;

use App\Models\ContactUs;
use App\Services\Inquiry\Interfaces\ContactUsInquiryInterface;

class ContactUsInquiryDriver implements ContactUsInquiryInterface
{
    public function getAllContactsUs(): array
    {
        return ContactUs::all();
    }

    public function getContactsUsByPaginate(int $paginate): array
    {
        return ContactUs::orderBy('id', 'desc')->paginate($paginate)->all();
    }

    public function getContactUsCount(): int
    {
        return ContactUs::count();
    }

    public function createContactUs(array $data): ContactUs
    {
        return ContactUs::create($data);
    }

    public function updateContactUs(int $id, array $data)
    {
        $contactUs = ContactUs::where('id', $id)->first();

        $contactUsStatus = $contactUs ? $contactUs : null;

        return $contactUsStatus ? $contactUs : null;
    }

    public function destroyContactUs(int $id): bool
    {
        $contactUs = ContactUs::where('id', $id)->first();

        return $contactUs ? $contactUs : false;
    }
}
