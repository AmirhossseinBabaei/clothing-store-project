<?php

namespace App\Services\Inquiry\Drivers;

use App\Models\Product;
use App\Services\Inquiry\Interfaces\ProductInquiryInterface;

class ProductInquiryDriver implements ProductInquiryInterface
{
    public function getAllProducts(): array
    {
        return Product::with(['user', 'category'])->get()->all();
    }

    public function getProductsByPaginate(int $perPaginate): array
    {
        return [];
    }
}
