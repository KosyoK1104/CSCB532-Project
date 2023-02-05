<?php

namespace Database\Factories;


use App\Models\DeliveryStatus;
use App\Models\DeliveryType;
use App\Models\Package;
use App\Models\PackageStatus;
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
            'delivery_type' => DeliveryType::from(DeliveryType::options()[array_rand(DeliveryType::cases())]),
            'status' => DeliveryStatus::from(DeliveryStatus::options()[array_rand(DeliveryStatus::cases())]),
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
