<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Resources\Api\v1\AuthResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        $user = User::where('phone', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password_hash)) {
            return response()->json([
                "message" => __('messages.api.201')
            ], 201);
        }

        $userToken = $user->createToken('authToken')->plainTextToken;

        return response()->json([
            "data" => AuthResource::collection(["user" => $user, "token" => $userToken]),
            "message" => __('messages.api.200')
        ], 200);
    }

    public function register(RegisterRequest $request)
    {
        $data = $request->validated();

        $hash = $request->phone . $request->full_name . time();

        $passwordHash = Hash::make($hash);

        $data['password_hash'] = $passwordHash;

        $user = User::create($data);

        if (null == $user) {
            return response()->json([
                "message" => __('messages.api.500')
            ], 500);
        }

        $userToken = $user->createToken('authToken')->plainTextToken;

        return response()->json([
            "data" => AuthResource::collection(["user" => $user, "token" => $userToken]),
            "message" => __('messages.api.200')
        ], 200);
    }
}
