<?php

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
        $products = ProductResource::collection($this->inquiryService->getAllProducts());

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
                "data" => $products,
                "message" => __('messages.api.product.product_empty')
            ]
            , StatusCode::OK->value);
    }
}
