<?php

declare(strict_types=1);

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class OfficeFactory extends Factory
{
    public function definition() : array
    {
        return [
            'name'       => $this->faker->name(),
            'city'       => $this->faker->city(),
            'address'    => $this->faker->address(),
            'created_at' => $this->faker->randomNumber(),
            'updated_at' => $this->faker->randomNumber(),
        ];
    }
}
