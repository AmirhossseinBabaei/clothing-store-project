<?php

namespace App\Services\Inquiry\Interfaces;

use App\Models\Product;

interface ProductInquiryInterface
{
public function getAllProducts(): array;

public function getProductsByPaginate(int $perPaginate): array;

public function createProduct(array $data): Product;

public function updateProduct(int $id, array $data): Product;

public function destroyProduct(int $id): bool;
}
