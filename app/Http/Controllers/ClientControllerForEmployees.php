<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\JsonResponse;

final class ClientControllerForEmployees extends Controller
{
    public function index() : JsonResponse
    {
        $clients = (new Client)->paginate();
        $clients->getCollection()->transform(
            fn(Client $client) => [
                'id'           => $client->id,
                'name'         => $client->clientProfile->name(),
                'email'        => $client->email,
                'phone_number' => $client->clientProfile->phone_number,
            ]
        );
        return response()->json($clients);
    }

    public function get(Client $client) : JsonResponse
    {
        return response()->json(
            [
                'data' =>
                    [
                        'id'            => $client->id,
                        'name'          => $client->clientProfile->name(),
                        'email'         => $client->email,
                        'phone_number'  => $client->clientProfile->phone_number,
                        'city'          => $client->clientProfile->city,
                        'street'        => $client->clientProfile->street,
                        'street_number' => $client->clientProfile->street_number,
                        'region'        => $client->clientProfile->region,
                        'block'         => $client->clientProfile->block,
                        'postal_code'   => $client->clientProfile->postal_code,
                    ],

            ]
        );
    }
}
