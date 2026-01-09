<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\v1;

use App\Enums\StatusCode;
use App\Http\Controllers\Controller;
use App\Http\Requests\ProductRequest;
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

    public function createProduct(ProductRequest $request): JsonResponse
    {
        $product = $this->inquiryService->createProduct($request->validated());

        if (null == $product) {
            return response()->json(
                [
                    "data" => [],
                    "message" => __('messages.api.status_code.500')
                ]
                , StatusCode::INTERNAL_SERVER_ERROR->value);
        }

        return response()->json(
            [
                "data" => new ProductResource($product),
                "message" => __('messages.api.response.product.create_successfully_product')
            ]
            , StatusCode::OK->value);
    }

    public function updateProduct(int $id, ProductRequest $request): JsonResponse
    {
        $product = $this->inquiryService->updateProduct($id, $request->validated());

        if (null == $product) {
            return response()->json(
                [
                    "data" => [],
                    "message" => __('messages.api.status_code.500')
                ]
                , StatusCode::INTERNAL_SERVER_ERROR->value);
        }

        return response()->json(
            [
                "data" => new ProductResource($product),
                "message" => __('messages.api.response.product.update_successfully_product')
            ]
            , StatusCode::OK->value);
    }

    public function destroyProduct(int $id): JsonResponse
    {
        $productStatus = $this->inquiryService->destroyProduct($id);

        if (false === $productStatus) {
            return response()->json(
                [
                    "data" => [],
                    "message" => __('messages.api.status_code.500')
                ]
                , StatusCode::INTERNAL_SERVER_ERROR->value);
        }

        return response()->json(
            [
                "data" => [],
                "message" => __('messages.api.response.product.destroy_successfully_product')
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

    public function getProductsCount(): JsonResponse
    {
        // the question: why me use a method for get products count? why me in this method get products count and return its?
        $count = $this->inquiryService->getProductsCount();

        return response()->json(
            [
                "data" => ['count' => $count],
                "message" => __('messages.api.status_code.200')
            ]
            , StatusCode::OK->value);
    }
}
