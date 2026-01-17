<?php

namespace Api\v1;

use App\Models\User;
use Tests\TestCase;

class ProductTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_create_product(): void
    {
        $data = User::factory()->create();
    }
}
