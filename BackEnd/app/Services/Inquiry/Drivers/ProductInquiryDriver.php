<?php

declare(strict_types=1);

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
        return Product::orderBy('id', 'desc')->paginate($perPaginate);
    }

    public function getTopExpensiveProducts(int $count): array
    {
        return Product::orderBy('price', 'desc')->take($count)->get()->all();
    }

    public function getTopCheapProducts(int $count): array
    {
        return Product::orderBy('price', 'asc')->take($count)->get()->all();
    }
}
