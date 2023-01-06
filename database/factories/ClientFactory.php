<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\ClientProfile;
use Illuminate\Database\Eloquent\Factories\Factory;
use Ramsey\Uuid\Uuid;

/**
 * @extends Factory<ClientProfile>
 */
final class ClientFactory extends Factory
{

    public function definition() : array
    {
        return [
            'id'         => Uuid::uuid4(),
            'email'      => $this->faker->email(),
            'username'   => $this->faker->userName(),
            'password'   => '123456789',
            'created_at' => now()->getTimestamp(),
            'updated_at' => now()->getTimestamp(),
        ];
    }
}
