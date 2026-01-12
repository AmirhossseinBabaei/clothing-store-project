<?php

namespace App\Services\Inquiry\Interfaces;

interface ContactInquiryInterface
{
    public function getAllContacts(): array;

    public function getContactsByPaginate(int $paginate): array;
}
