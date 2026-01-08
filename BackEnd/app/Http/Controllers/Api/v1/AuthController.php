<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Resources\Api\v1\AuthResource;
use App\Services\Inquiry\AuthInquiryService;
use Illuminate\Http\JsonResponse;

class AuthController extends Controller
{
    public AuthInquiryService $inquiryService;

    public function __construct(
        AuthInquiryService $inquiryService
    )
    {
        $this->inquiryService = $inquiryService;
    }

    public function login(LoginRequest $request): JsonResponse
    {
        $user = $this->inquiryService->login($request);

        if (null == $user->token) {

            return response()->json([
                "data" => [],
                "message" => __('messages.api.status_code.500')
            ], 500);

        }

        return response()->json([
            "data" => new AuthResource($user),
            "message" => __('messages.api.status_code.200')
        ], 200);
    }

    public function register(RegisterRequest $request): JsonResponse
    {
        $user = $this->inquiryService->register($request->validated());

        if (null == $user->token) {

            return response()->json([
                "data" => [],
                "message" => __('messages.api.status_code.500')
            ], 500);

        }

        return response()->json([
            "data" => new AuthResource($user),
            "message" => __('messages.api.status_code.200')
        ], 200);
    }
}
