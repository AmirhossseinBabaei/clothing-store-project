<?php

namespace App\Http\Controllers\Api\v1;

use App\Enums\StatusCode;
use App\Http\Controllers\Controller;
use App\Http\Resources\Api\v1\UserResource;
use App\Services\Inquiry\Drivers\UserInquiryDriver;
use App\Services\Inquiry\UserInquiryService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public UserInquiryService $userInquiry;

    public function __construct(
        UserInquiryService $userInquiry
    )
    {
        $this->userInquiry = $userInquiry;
    }

    public function index(): JsonResponse
    {
        $users = $this->userInquiry->getAllUsers();

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
