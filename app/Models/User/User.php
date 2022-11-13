<?php

declare(strict_types=1);

namespace App\Models\User;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Contracts\Database\Query\Builder;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

/**
 *
 * @mixin Builder
 * @property string $id
 * @property string $email
 * @property string $password
 * @property string $email_verified_at
 * @property string $remember_token
 * @property int $created_on
 * @property int $updated_on
 */
class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HasUuids;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'email',
        'password',
    ];
    public const CREATED_AT = 'created_on';
    public const UPDATED_AT = 'updated_on';
    public $dateFormat = 'U';
    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];
    protected $table = 'users';
    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        "id"                => "string",
        "email"             => "string",
        "email_verified_at" => 'string',
        "password"          => "string",
        "remember_token"    => 'string',
        "created_on"        => 'int',
        "updated_on"        => 'int',
    ];

    public function profile() : HasOne
    {
        return $this->hasOne(UserProfile::class, 'user_id');
    }

    public function meta() : array
    {
        return [
            'id' => $this->id,
            'pw' => md5($this->password),
        ];
    }
}
