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
}
