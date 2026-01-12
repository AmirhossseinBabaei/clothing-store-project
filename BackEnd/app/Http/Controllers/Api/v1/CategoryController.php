<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\v1;

use App\Enums\StatusCode;
use App\Http\Controllers\Controller;
use App\Http\Requests\CategoryRequest;
use App\Http\Resources\Api\v1\CategoryResource;
use App\Services\Inquiry\CategoryInquiryService;
use Illuminate\Http\JsonResponse;

class CategoryController extends Controller
{
    public CategoryInquiryService $inquiryService;

    public function __construct(
        CategoryInquiryService $inquiryService
    )
    {
        $this->inquiryService = $inquiryService;
    }

    public function index(): JsonResponse
    {
        $categories = $this->inquiryService->getAllCategories();

        if (null == $categories) {
            return response()->json(
                [
                    "data" => [],
                    "message" => __('messages.api.product.product_empty')
                ]
                , StatusCode::OK->value);
        }

        return response()->json(
            [
                "data" => CategoryResource::collection($categories),
                "message" => __('messages.api.status_code.200')
            ]
            , StatusCode::OK->value);
    }

    public function createProduct(CategoryRequest $request): JsonResponse
    {
        $category = $this->inquiryService->createCategory($request->validated());

        if (null == $category) {
            return response()->json(
                [
                    "data" => [],
                    "message" => __('messages.api.status_code.500')
                ]
                , StatusCode::INTERNAL_SERVER_ERROR->value);
        }

        return response()->json(
            [
                "data" => new CategoryResource($category),
                "message" => __('messages.api.response.category.create_successfully_category')
            ]
            , StatusCode::OK->value);
    }

    public function updateCategory(int $id, CategoryRequest $request): JsonResponse
    {
        $category = $this->inquiryService->updateCategory($id, $request->validated());

        if (null == $category) {
            return response()->json(
                [
                    "data" => [],
                    "message" => __('messages.api.status_code.500')
                ]
                , StatusCode::INTERNAL_SERVER_ERROR->value);
        }

        return response()->json(
            [
                "data" => new CategoryResource($category),
                "message" => __('messages.api.response.category.update_successfully_category')
            ]
            , StatusCode::OK->value);
    }

    public function destroyCategory(int $id): JsonResponse
    {
        $categoryStatus = $this->inquiryService->destroyCategory($id);

        if (false === $categoryStatus) {
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
                "message" => __('messages.api.response.category.destroy_successfully_category')
            ]
            , StatusCode::OK->value);
    }
}
