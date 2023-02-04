<?php

declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class EmployeeListingCollection extends ResourceCollection
{
    public function toArray($request) : array
    {
        return [
            'data'  => EmployeeListingResource::collection($this->collection),
        ];
    }
}
