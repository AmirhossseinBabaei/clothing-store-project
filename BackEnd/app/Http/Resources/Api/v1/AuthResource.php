<?php

namespace App\Http\Resources\Api\v1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AuthResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "user" => [
                "phone" => $this->user->phone,
                "fullName" => $this->user->full_name,
                "created_at" => $this->user->created_at
            ],
            "token" => $this->token
        ];
    }
}
