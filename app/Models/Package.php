<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 *
 * @property int $id
 * @property string $tracking_number
 * @property double $price
 * @property double $weight
 * @property string $delivery_type
 * @property string $recipient_name
 * @property string $recipient_phone_number
 * @property string $recipient_address
 * @property int $created_at
 * @property int $updated_at
 */
class Package extends Model
{
    use HasFactory, HasUuids;

    protected $dateFormat = 'U';

    protected $fillable = ["weight", "delivery_type", "recipient_name", "recipient_address", "recipient_phone_number"];

    protected $casts = [
        'type' => DeliveryType::class,
    ];

}
