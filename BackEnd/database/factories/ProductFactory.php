<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $productsStatus = ['draft', 'published', 'rejected'];

        return [
            'user_id' => User::factory()->create()->id,
            'category_id' => Category::factory()->create()->id,
            'name' => fake()->name,
            'image' => fake()->image,
            'description' => fake()->text,
            'price' => fake()->numberBetween(10,10000),
            'status' => $productsStatus[fake()->numberBetween(0, 2)]
        ];
    }
}
