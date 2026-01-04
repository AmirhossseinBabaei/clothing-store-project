<?php

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
}
