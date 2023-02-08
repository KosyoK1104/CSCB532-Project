<?php

declare(strict_types=1);

namespace App\Console\Commands;

use App\Models\Employee;
use App\Models\EmployeeProfile;
use App\Models\EmployeeType;
use Illuminate\Console\Command;

class CreateAdmin extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'create:admin {email} {name} {phone_number}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle() : int
    {
        $email = $this->argument('email');
        $name = $this->argument('name');
        $phone_number = $this->argument('phone_number');

        if (Employee::where('email', $email)->exists()) {
            $this->error("Employee with email: $email already exists");
            return 1;
        }

        $employee = new Employee();
        $employee->email = $email;
        $employee->password = '123456789';
        $employee->type = EmployeeType::ADMIN;
        $employee->saveOrFail();
        $employeeProfile = new EmployeeProfile();
        $employeeProfile->employee_id = $employee->id;
        $employeeProfile->name = $name;
        $employeeProfile->phone_number = $phone_number;
        $employee->employeeProfile()->save($employeeProfile);
        $employee->save();

        $this->info("Creating admin with email: $email, name: $name, phone_number: $phone_number");
        return 0;
    }
}
