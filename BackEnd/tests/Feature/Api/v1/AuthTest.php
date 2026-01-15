<?php

namespace Tests\Feature\Api\v1;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_login(): void
    {
        $user = User::factory()->create()->toArray();

        $this->postJson('api/v1/register', $user);

        $this->assertDatabaseHas('users', ['phone' => $user['phone']]);

        $data = [
            'phone' => $user['phone'],
            'password' => $user['password_hash']
        ];

        $loginResponse = $this->postJson('api/v1/login', $data);

//        dd($loginResponse);
        $this->assertArrayHasKey('token', $loginResponse['data']['token']);
    }

    public function test_user_can_register()
    {
        $data = User::factory()->create()->toArray();

        $this->postJson('api/v1/register', $data);

        $this->assertDatabaseHas('users', ['phone' => $data['phone']]);
    }
}
