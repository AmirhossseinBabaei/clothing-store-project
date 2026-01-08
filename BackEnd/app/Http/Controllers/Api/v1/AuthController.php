<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Resources\Api\v1\AuthResource;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function login(LoginRequest $request): JsonResponse
    {
        $user = User::where('phone', $request->phone)->first();

        if (!$user || !Hash::check($request->password, $user->password_hash)) {
            return response()->json([
                "message" => __('messages.api.response.auth.invalid_password')
            ], 500);
        }

        $userToken = $user->createToken('authToken')->plainTextToken;

        $user->token = $userToken;

//        dd($user->token = "hello");

        return response()->json([
            "data" => AuthResource::collection([$user]),
            "message" => __('messages.api.status_code.200')
        ], 200);
    }

    public function register(RegisterRequest $request): JsonResponse
    {
        $data = $request->validated();

        $passwordHash = Hash::make($request->password_hash);

        $data['password_hash'] = $passwordHash;

        $user = User::create($data);

        if (null == $user) {
            return response()->json([
                "message" => __('messages.api.status_code.500')
            ], 500);
        }

        $user->token = $user->createToken('authToken')->plainTextToken;

        return response()->json([
            "data" => AuthResource::collection([$user]),
            "message" => __('messages.api.status_code.200')
        ], 200);
    }
}
