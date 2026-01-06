<?php

declare(strict_types=1);

namespace App\Services\Inquiry;

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

    public function getTopExpensiveProducts(int $count): array
    {
        return $this->driver->getTopExpensiveProducts(4);
    }

    public function getTopCheapProducts(int $count): array
    {
        return $this->driver->getTopCheapProducts($count);
    }
}
