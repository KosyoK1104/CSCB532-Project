<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\ClientProfile;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<ClientProfile>
 */
class ClientProfileFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition() : array
    {
        return [
            'first_name'    => $this->faker->firstName(),
            'last_name'     => $this->faker->lastName(),
            'phone_number'  => $this->faker->phoneNumber(),
            'city'          => $this->faker->city(),
            'street'        => $this->faker->streetName(),
            'street_number' => $this->faker->numberBetween(0, 10),
            'postal_code'   => $this->faker->postcode(),
            'created_at'    => now()->getTimestamp(),
            'updated_at'    => now()->getTimestamp(),
        ];
    }
}
