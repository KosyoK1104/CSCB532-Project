<?php

declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property mixed $id
 * @property mixed $tracking_number
 * @property mixed $price
 * @property mixed $weight
 * @property mixed $delivery_type
 * @property mixed $recipient_name
 * @property mixed $recipient_phone_number
 * @property mixed $recipient_address
 * @property mixed $status
 */

class PackageListingResource extends JsonResource
{

    public function toArray($request) : array
    {
        return [
            'id' => $this->id,
            'tracking_number' => $this->tracking_number,
            'price' => $this->price,
            'weight' => $this->weight,
            'delivery_type' => $this->delivery_type->name,
            'recipient_name' => $this->recipient_name,
            'recipient_phone_number' => $this->recipient_phone_number,
            'recipient_address' => $this->recipient_address,
            'status' => $this->status,
        ];
    }
}
