<?php

namespace Database\Factories;

use App\Models\Employee;
use App\Models\EmployeeType;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Employee>
 */
class EmployeeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'email'      => $this->faker->email(),
            'password'   => '123456789',
            'type'       => EmployeeType::from(EmployeeType::options()[array_rand(EmployeeType::cases())]),
            'created_at' => now()->getTimestamp(),
            'updated_at' => now()->getTimestamp(),
        ];
    }
}
