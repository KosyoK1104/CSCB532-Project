<?php

declare(strict_types=1);

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Client;
use App\Models\ClientProfile;
use App\Models\Employee;
use App\Models\EmployeeProfile;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run() : void
    {
        Client::factory(5)
            ->has(ClientProfile::factory())
            ->create()
        ;

        Employee::factory(35)
            ->has(EmployeeProfile::factory())
            ->create()
        ;

//        ClientProfile::factory()->for($clients)->create();
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}
