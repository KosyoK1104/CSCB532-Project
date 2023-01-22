<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Facades\Hash;

/**
 * @property EmployeeType $type
 */
class Employee extends Authenticatable
{
    use HasFactory, HasUuids;

    protected $fillable = ['email', 'username', 'password', 'employee_type'];
    protected $hidden = ['password'];

    protected $casts = [
        'type' => EmployeeType::class,
    ];
    protected $dateFormat = 'U';

    public function password() : Attribute
    {
        return Attribute::make(
            get: fn($value) => $value,
            set: fn($value) => Hash::make($value)
        );
    }

    public function employeeProfile() : HasOne
    {
        return $this->hasOne(EmployeeProfile::class);
    }

    public function employeeProfilePicture() : HasOne
    {
        return $this->hasOne(EmployeeProfilePicture::class);
    }
}
