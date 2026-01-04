<?php

namespace App\Services\Inquiry\Interfaces;

interface ProductInquiryInterface
{
public function getAllProducts(): array;
public function getProductsByPaginate(int $perPaginate): array;
}
