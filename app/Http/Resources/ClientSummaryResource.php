<?php

declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property mixed $id
 * @property mixed $email
 * @property mixed $clientProfile
 */
class ClientSummaryResource extends JsonResource
{
    public function toArray($request) : array
    {
        return [
            'id'                => $this->id,
            'email'             => $this->email,
            'name'              => $this->clientProfile->name(),
            'phone_number'      => $this->clientProfile->phone_number,
            'address'           => $this->clientProfile->address(),
            'is_address_filled' => $this->clientProfile->isAddressFilled(),
        ];
    }
}
