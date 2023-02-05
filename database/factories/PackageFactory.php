<?php

namespace Database\Factories;


use App\Models\Package;
use Illuminate\Database\Eloquent\Factories\Factory;
use Ramsey\Uuid\Uuid;

/**
 * @extends Factory<Package>
 */
class PackageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition() : array
    {
        return [
            'id' => Uuid::uuid4(),
            'tracking_number' => $this->faker->iban(),
            'delivery_type' => 'cargoTEST',
            'status' => $this->faker->boolean,
            'price' => $this->faker->randomDigitNotNull(),
            'weight' => $this->faker->randomDigitNotNull(),
            'recipient_name' => $this->faker->name(),
            'recipient_phone_number' => $this->faker->phoneNumber(),
            'recipient_address' => $this->faker->address(),
            'created_at' => now()->getTimestamp(),
            'updated_at' => now()->getTimestamp(),
        ];
    }
}
