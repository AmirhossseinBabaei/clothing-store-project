<?php

declare(strict_types=1);

namespace App\Services\Inquiry\Drivers;

use App\Models\User;
use App\Services\Inquiry\Interfaces\AuthInquiryInterface;
use Illuminate\Support\Facades\Hash;

class AuthInquiryDriver implements AuthInquiryInterface
{
    public function login($request)
    {
        $user = User::where('phone', $request->phone)->first();

        if (!$user || !Hash::check($request->password, $user->password_hash)) {
            return [];
        }

        $userToken = $user->createToken('authToken')->plainTextToken;

        $user->token = $userToken;

        return $user;
    }

    public function register($request)
    {
        $request['password_hash'] = Hash::make($request['password_hash']);

        $user = User::create($request);

        if (null == $user) {
            return [];
        }

        $user->token = $user->createToken('authToken')->plainTextToken;

        return $user;
    }
}
