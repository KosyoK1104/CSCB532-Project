<?php

declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;


/**
 * @property mixed $id
 * @property mixed $name
 * @property mixed $city
 * @property mixed $address
 * @property mixed $visual_id
 * @property mixed $status
 */
class OfficeListingResource extends JsonResource
{

    public function toArray($request) : array
    {
        return [
            'id'    => $this->id,
            'name' => $this->name,
            'city'  => $this->city,
            'address'  => $this->address,
            'visual_id'  => $this->visual_id,
            'status'  => $this->status,
        ];
    }
}

