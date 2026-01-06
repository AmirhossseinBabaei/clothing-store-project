<?php

namespace App\Services\Inquiry\Interfaces;

interface CategoryInquiryInterface
{
    public function getAllCategories(): array;
    public function getCategoriesByPaginate(int $perPaginate): array;
}
