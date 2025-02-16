<?php

declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property mixed $employeeProfile
 * @property mixed $type
 * @property mixed $email
 * @property mixed $id
 */
class EmployeeListingResource extends JsonResource
{

    public function toArray($request) : array
    {
        return [
            'id'    => $this->id,
            'email' => $this->email,
            'type'  => $this->type->name,
            'name'  => $this->employeeProfile?->name,
        ];
    }
}
