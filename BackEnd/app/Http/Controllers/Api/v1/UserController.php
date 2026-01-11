<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\v1;

use App\Enums\StatusCode;
use App\Http\Controllers\Controller;
use App\Http\Requests\UserRequest;
use App\Http\Resources\Api\v1\UserResource;
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

    public function getUsersCount(): JsonResponse
    {
        $count = $this->inquiryService->getUsersCount();

        return response()->json(
            [
                "data" => ['count' => $count],
                "message" => __('messages.api.status_code.200')
            ], StatusCode::OK->value);
    }

    public function createUser(UserRequest $request): JsonResponse
    {
        $user = $this->inquiryService->createUser($request->validated());

        if (null == $user) {
            return response()->json(
                [
                    "data" => [],
                    "message" => __('messages.api.status_code.500')
                ]
                , StatusCode::INTERNAL_SERVER_ERROR->value);
        }

        return response()->json(
            [
                "data" => new UserResource($user),
                "message" => __('messages.api.response.user.create_successfully_user')
            ]
            , StatusCode::OK->value);
    }

    public function updateUser(int $id, UserRequest $request): JsonResponse
    {
        $user = $this->inquiryService->updateUser($id, $request->validated());

        if (null == $user) {
            return response()->json(
                [
                    "data" => [],
                    "message" => __('messages.api.status_code.500')
                ]
                , StatusCode::INTERNAL_SERVER_ERROR->value);
        }

        return response()->json(
            [
                "data" => new UserResource($user),
                "message" => __('messages.api.response.user.update_successfully_user')
            ]
            , StatusCode::OK->value);
    }

    public function destroyUser(int $id): JsonResponse
    {
        $userStatus = $this->inquiryService->destroyUser($id);

        if (false === $userStatus) {
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
                "message" => __('messages.api.response.user.destroy_successfully_user')
            ]
            , StatusCode::OK->value);
    }
}
