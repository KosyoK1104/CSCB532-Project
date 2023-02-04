<?php

declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class ClientListingCollection extends ResourceCollection
{
    public function toArray($request) : array
    {
        return [
            'data' => ClientListingResource::collection($this->collection),
        ];
    }
}
