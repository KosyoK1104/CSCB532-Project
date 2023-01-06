<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\ClientProfile;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

final class ClientProfileController extends Controller
{
    private function validatedRequest(Request $request) : array
    {
        $validator = Validator::make($request->request->all(), [
            'first_name'   => 'required|string|min:4',
            'last_name'    => 'required|string|min:4',
            'phone_number' => 'required|string|max:10|min:10',
            'address'      => 'required|string',
        ]);

        return $validator->validated();
    }

    private function getClientFromRequest(Request $request) : Client
    {
        $clientSession = $request->session()->get('cl');
        $client = Client::find($clientSession['id']);
        $request->session()->regenerate();
        return $client;
    }

    public function forMe(Request $request) : JsonResponse
    {
        $client = $this->getClientFromRequest($request);

        $clientProfile = $client->clientProfile()->first();
        return response()->json(
            [
                'id'            => $client->id,
                'first_name'    => $clientProfile->first_name ?? null,
                'last_name'     => $clientProfile->last_name ?? null,
                'phone_number'  => $clientProfile->phone_number ?? null,
                'city'          => $clientProfile->city ?? null,
                'street'        => $clientProfile->street ?? null,
                'street_number' => $clientProfile->street_number ?? null,
                'region'        => $clientProfile->region ?? null,
                'block'         => $clientProfile->block ?? null,
                'postal_code'   => $clientProfile->postal_code ?? null,
            ]
        );
    }

    public function create(Request $request) : JsonResponse
    {
        $client = $this->getClientFromRequest($request);

        $validated = $this->validatedRequest($request);

        $clientProfile = new ClientProfile();
        $clientProfile->id = $client->id;
        $clientProfile->fill($validated);
        return response()->json(['id' => $client->id]);
    }

    public function update(Request $request) : JsonResponse
    {
        $client = $this->getClientFromRequest($request);

        $validated = $this->validatedRequest($request);

        /**
         * @var ClientProfile $clientProfile
         */
        $clientProfile = $client->clientProfile()->getResults();
        $clientProfile->fill($validated)->save();
        return response()->json(['id' => $client->id]);
    }

}
