<?php

namespace App\Services\Inquiry\Interfaces;

use App\Models\Category;

interface CategoryInquiryInterface
{
    public function getAllCategories(): array;

    public function getCategoriesByPaginate(int $perPaginate): array;

    public function createCategory(array $data): Category;

    public function updateCategory(int $id, array $data);

    public function destroyCategory(int $id): bool;
}
