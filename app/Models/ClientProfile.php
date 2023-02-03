<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property string $client_id
 * @property string $first_name
 * @property string $last_name
 * @property string $phone_number
 * @property string $city
 * @property ?string $street
 * @property ?string $street_number
 * @property ?string $region
 * @property ?string $block
 * @property ?string $postal_code
 */
class ClientProfile extends Model
{
    use HasFactory;

    protected $primaryKey = 'client_id';
    protected $fillable = [
        'first_name',
        'last_name',
        'phone_number',
        'address',
    ];

    protected $dateFormat = 'U';

    public function client() : BelongsTo
    {
        return $this->belongsTo(Client::class);
    }

    public function isAddressFilled() : bool
    {
        return
            $this->city !== null &&
            (
                ($this->street !== null && $this->street_number !== null) ||
                ($this->region !== null && $this->block !== null)
            );
    }

    public function name() : string
    {
        return $this->first_name . ' ' . $this->last_name;
    }

    public function address() : string
    {
        return
            $this->city . ', ' .
            ($this->street !== null ? $this->street . ' ' . $this->street_number : $this->region . ' ' . $this->block) . ', ' .
            $this->postal_code;
    }
}
