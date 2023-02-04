<?php

declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ClientListingResource extends JsonResource
{
    public function toArray($request) : array
    {
        return [
            'id'           => $this->id,
            'name'         => $this->clientProfile->name(),
            'email'        => $this->email,
            'phone_number' => $this->clientProfile->phone_number,
        ];
    }
}
