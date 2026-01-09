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

    public function createProduct(array $data): Product
    {
        return Product::create($data);
    }

    public function updateProduct(int $id, array $data): Product
    {
        return Product::where('id', $id)->first()->update($data);
    }

    public function destroyProduct(int $id): bool
    {
        $product = Product::where('id', $id)->first() ?? null;
        
        return $product ? $product->delete() : false;
    }

    public function getTopExpensiveProducts(int $count): array
    {
        return Product::orderBy('price', 'desc')->take($count)->get()->all();
    }

    public function getTopCheapProducts(int $count): array
    {
        return Product::orderBy('price', 'asc')->take($count)->get()->all();
    }

    public function getProductsCount(): int
    {
        return Product::count();
    }
}
