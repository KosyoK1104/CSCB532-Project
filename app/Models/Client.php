<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Facades\Hash;

/**
 * @mixin Builder
 * @property int $id
 * @property string $email
 * @property string $username
 * @property string $password
 * @property int $email_verified_at
 */
class Client extends Authenticatable
{
    use HasFactory, HasUuids;

    protected $fillable = ['email', 'username', 'password'];
    protected $hidden = ['password'];
    protected $dateFormat = 'U';

    protected function password() : Attribute
    {
        return Attribute::make(
            get: fn($value) => $value,
            set: fn($value) => Hash::make($value)
        );
    }

    public function clientProfile() : HasOne
    {
        return $this->hasOne(ClientProfile::class);
    }

    /*
        protected function createdAt() : Attribute
        {
            return Attribute::make(
                get: fn($value) => $value,
                set: fn($value) => $value
            );
        }

        protected function updatedAt() : Attribute
        {
            return Attribute::make(
                get: fn($value) => $value,
                set: fn($value) => $value
            );
        }*/
}
