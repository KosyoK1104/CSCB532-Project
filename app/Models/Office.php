<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

/**
 * Class Office
 * @package App\Models
 * @property string $id
 * @property string $name
 * @property string $city
 * @property string $address
 * @property int $created_at
 * @property int $updated_at
 */

class Office extends Model
{
    use HasFactory, HasUuids;

    protected $table = 'offices';
    //to see in docs fill
    //just the parametrs which user can change
    protected $fillable = [
        'name',
        'city',
        'address',
    ];

    //timestamp format
    protected $dateFormat = 'U';


    public function packages(): HasMany
    {
        return $this->hasMany(Package::class);
    }


}
