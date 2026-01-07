<?php

namespace App\Http\Controllers\Api\v1;

use App\Enums\StatusCode;
use App\Http\Controllers\Controller;
use App\Http\Resources\Api\v1\UserResource;
use App\Models\User;
use App\Services\Inquiry\UserInquiryService;
use Illuminate\Http\JsonResponse;

class UserController extends Controller
{
    public UserInquiryService $inquiryService;

    public function __construct(
        UserInquiryService $inquiryService
    )
    {
        $this->inquiryService = $inquiryService;
    }

    public function index(): JsonResponse
    {
        $users = $this->inquiryService->getAllUsers();

        if (null == $users) {

            return response()->json(
                [
                    "data" => [],
                    "message" => __('messages.api.user.users_empty')
                ], StatusCode::INTERNAL_SERVER_ERROR->value);
        }

        return response()->json(
            [
                "data" => UserResource::collection($users),
                "message" => __('messages.api.status_code.200')
            ], StatusCode::OK->value);
    }
}
