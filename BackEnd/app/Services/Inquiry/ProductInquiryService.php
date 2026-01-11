<?php

declare(strict_types=1);

namespace App\Services\Inquiry;

use App\Models\Product;
use App\Services\Inquiry\Interfaces\ProductInquiryInterface;

class ProductInquiryService
{
    private ProductInquiryInterface $driver;

    public function __construct(ProductInquiryInterface $driver)
    {
        $this->driver = $driver;
    }

    public function getAllProducts(): array
    {
        return $this->driver->getAllProducts();
    }

    public function createProduct(array $data): Product
    {
        return $this->driver->createProduct($data);
    }

    public function updateProduct(int $id, array $data)
    {
        return $this->driver->updateProduct($id, $data);
    }

    public function destroyProduct(int $id): bool
    {
        return $this->driver->destroyProduct($id);
    }

    public function getTopExpensiveProducts(int $count): array
    {
        return $this->driver->getTopExpensiveProducts($count);
    }

    public function getTopCheapProducts(int $count): array
    {
        return $this->driver->getTopCheapProducts($count);
    }

    public function getProductsCount(): int
    {
        return $this->driver->getProductsCount();
    }
}
