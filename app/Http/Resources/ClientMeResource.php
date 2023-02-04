<?php

declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property mixed $email
 * @property mixed $username
 * @property mixed $id
 */
class ClientMeResource extends JsonResource
{
    public function toArray($request) : array
    {
        return [
            'id'       => $this->id,
            'username' => $this->username,
            'email'    => $this->email,
        ];
    }
}
