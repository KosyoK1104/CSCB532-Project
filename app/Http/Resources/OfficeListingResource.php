<?php

declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;


/**
 * @property mixed $id
 * @property mixed $name
 * @property mixed $city
 * @property mixed $address
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
        ];
    }
}

