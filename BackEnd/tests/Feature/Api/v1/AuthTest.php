<?php

namespace Tests\Feature\Api\v1;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthTest extends TestCase
{
    use RefreshDatabase;

    /**
     * A basic feature test example.
     */
    public function test_user_can_login(): void
    {
        $user = User::factory()->create()->toArray();

        $registerResponse = $this->postJson('api/v1/register', $user);

        $registerResponse->assertOk();

        $data = [
            'phone' => $user['phone'],
            'password' => $user['password_hash']
        ];

        $loginResponse = $this->postJson('api/v1/login', $data);

        $loginResponse->assertOk();
    }

    public function testRegisterUser()
    {
        $data = [
            'full_name' => 'AmirHossein',
            'phone' => '09029165434',
            'password_hash' => 'midlevel@gmail.com'
        ];

        $response = $this->postJson('api/v1/register', $data);

        $response->assertOk();

        $this->assertDatabaseHas('users', ['phone' => $data['phone']]);
    }
}
