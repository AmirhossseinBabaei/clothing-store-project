<?php

namespace App\Services\Inquiry\Drivers;

use App\Models\Category;
use App\Services\Inquiry\Interfaces\CategoryInquiryInterface;

class CategoryInquiryDriver implements CategoryInquiryInterface
{
    public function getAllCategories(): array
    {
        return Category::orderBy('id', 'desc')->get()->all();
    }

    public function getCategoriesByPaginate(int $perPaginate): array
    {
        return Category::orderBy('id', 'desc')->paginate($perPaginate);
    }

    public function getParentCategories()
    {
        return Category::where('parent_id', null)->orderBy('id', 'desc')->get()->all();
    }

    public function createCategory(array $data): Category
    {
        return Category::create($data);
    }

    public function updateCategory(int $id, array $data)
    {
        $category = Category::where('id', $id)->first();

        $categoryStatus = $category ? $category->update($data) : false;

        return $categoryStatus ? $category : null;
    }


    public function destroyCategory(int $id): bool
    {
        $category = Category::where('id', $id)->first();

        return $category ? $category->delete() : false;
    }
}
