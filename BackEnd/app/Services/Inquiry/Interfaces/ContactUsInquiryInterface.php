<?php

namespace App\Services\Inquiry\Interfaces;

use App\Models\ContactUs;

interface ContactUsInquiryInterface
{
    public function getAllContactsUs(): array;

    public function getContactsUsByPaginate(int $paginate): array;

    public function createContactUs(array $data): ContactUs;

    public function updateContactUs(int $id, array $data);

    public function destroyContactUs(int $id): bool;
}
