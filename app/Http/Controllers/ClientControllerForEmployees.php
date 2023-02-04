<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Resources\ClientListingCollection;
use App\Models\Client;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

final class ClientControllerForEmployees extends Controller
{
    public function index(Request $request) : ClientListingCollection
    {
        $clients = Client::join('client_profiles', 'client_profiles.client_id', '=', 'clients.id')->where(function (Builder $query) use ($request) {
            if ($request->has('name')) {
                $name = explode(' ', $request->string('name')->value());
                foreach ($name as $part) {
                    $query->where('client_profiles.first_name', 'like', "%{$part}%")
                        ->orWhere('client_profiles.last_name', 'like', "%{$part}%")
                    ;
                }
            }
            if ($request->has('email')) {
                $query->where('email', '=', $request->string('email')->value());
            }
            if ($request->has('phone_number')) {
                $query->where('client_profiles.phone_number', '=', $request->string('phone_number')->value());
            }
        })->paginate();
        return new ClientListingCollection($clients);
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
