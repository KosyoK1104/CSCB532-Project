<?php

declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property mixed $clientProfile
 * @property mixed $id
 */
class ClientProfileResource extends JsonResource
{
    public function toArray($request) : array
    {
        return [
            'id'            => $this->id,
            'first_name'    => $this->clientProfile?->first_name,
            'last_name'     => $this->clientProfile?->last_name,
            'phone_number'  => $this->clientProfile?->phone_number,
            'city'          => $this->clientProfile?->city,
            'street'        => $this->clientProfile?->street,
            'street_number' => $this->clientProfile?->street_number,
            'region'        => $this->clientProfile?->region,
            'block'         => $this->clientProfile?->block,
            'postal_code'   => $this->clientProfile?->postal_code,
        ];
    }
}
