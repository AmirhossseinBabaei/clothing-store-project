<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\v1;

use App\Enums\StatusCode;
use App\Http\Controllers\Controller;
use App\Http\Resources\Api\v1\ProductResource;
use App\Services\Inquiry\ProductInquiryService;
use Illuminate\Http\JsonResponse;

class ProductController extends Controller
{
    public ProductInquiryService $inquiryService;

    public function __construct(ProductInquiryService $inquiryService)
    {
        $this->inquiryService = $inquiryService;
    }

    public function index(): JsonResponse
    {
        $products = $this->inquiryService->getAllProducts();

        if (null == $products) {
            return response()->json(
                [
                    "data" => [],
                    "message" => __('messages.api.product.product_empty')
                ]
                , StatusCode::OK->value);
        }

        return response()->json(
            [
                "data" => ProductResource::collection($products),
                "message" => __('messages.api.status_code.200')
            ]
            , StatusCode::OK->value);
    }

    public function getTopFourExpensiveProducts(): JsonResponse
    {
        $products = $this->inquiryService->getTopExpensiveProducts(4);

        if (null == $products) {
            return response()->json(
                [
                    "data" => [],
                    "message" => __('messages.api.product.product_empty')
                ]
                , StatusCode::OK->value);
        }

        return response()->json(
            [
                "data" => ProductResource::collection($products),
                "message" => __('messages.api.status_code.200')
            ]
            , StatusCode::OK->value);
    }

    public function getTopFourCheapProducts(): JsonResponse
    {
        $products = $this->inquiryService->getTopCheapProducts(4);

        if (null == $products) {
            return response()->json(
                [
                    "data" => [],
                    "message" => __('messages.api.product.product_empty')
                ]
                , StatusCode::OK->value);
        }

        return response()->json(
            [
                "data" => ProductResource::collection($products),
                "message" => __('messages.api.status_code.200')
            ]
            , StatusCode::OK->value);
    }

    public function getProductsCount()
    {

    }
}
