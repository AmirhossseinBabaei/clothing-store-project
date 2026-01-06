<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\v1;

use App\Enums\StatusCode;
use App\Http\Controllers\Controller;
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
}
