<?php

declare(strict_types=1);

namespace App\Services\Inquiry;

use App\Models\Category;
use App\Services\Inquiry\Interfaces\CategoryInquiryInterface;

class CategoryInquiryService
{
    private CategoryInquiryInterface $driver;

    public function __construct(CategoryInquiryInterface $driver)
    {
        $this->driver = $driver;
    }

    public function getAllCategories(): array
    {
        return $this->driver->getAllCategories();
    }

    public function getParentCategories(int $perPaginate): array
    {
        return $this->driver->getCategoriesByPaginate($perPaginate);
    }

    public function createCategory(array $data): Category
    {
        return $this->driver->createCategory($data);
    }

    public function updateCategory(int $id, array $data)
    {
        return $this->driver->updateCategory($id, $data);
    }

    public function destroyCategory(int $id): bool
    {
        return $this->driver->destroyCategory($id);
    }
}
