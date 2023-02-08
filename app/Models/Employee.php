<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Facades\Hash;

/**
 * @propery string $id
 * @property EmployeeType $type
 * @property string $email
 */
class Employee extends Authenticatable
{
    use HasFactory, HasUuids;

    protected $fillable = ['email', 'password', 'type'];
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


    public function isAdmin() : bool
    {
        return $this->type === EmployeeType::ADMIN;
    }
}
