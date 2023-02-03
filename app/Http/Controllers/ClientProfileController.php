<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Resources\ClientProfileResource;
use App\Http\Resources\ClientSummaryResource;
use App\Models\Client;
use App\Models\ClientProfile;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Validator;

final class ClientProfileController extends Controller
{
    protected function clientProfile() : ClientProfile
    {
        return $this->client()->clientProfile()->first();
    }

    private function client() : Client
    {
        return auth('clients')->user();
    }

    private function validatedRequest(Request $request) : array
    {
        $validator = Validator::make($request->request->all(), [
            'first_name'    => 'required|string|min:4',
            'last_name'     => 'required|string|min:4',
            'phone_number'  => 'required|string|max:10|min:10',
            'city'          => 'required|string|min:4',
            'street'        => 'nullable|string|min:4',
            'street_number' => 'nullable|string|min:1',
            'region'        => 'nullable|string|min:4',
            'block'         => 'nullable|string|min:1',
            'postal_code'   => 'nullable|string|min:4',
        ]);

        return $validator->validated();
    }

    public function summaryForMe() : ClientSummaryResource
    {
        return new ClientSummaryResource($this->client());
    }

    public function forMe() : ClientProfileResource
    {
        return new ClientProfileResource($this->client());
    }

    public function create(Request $request) : JsonResponse
    {
        $client = $this->client();

        $validated = $this->validatedRequest($request);

        $clientProfile = new ClientProfile();
        $clientProfile->client_id = $client->id;
        $clientProfile->fill($validated);
        return JsonResource::make();
    }

    public function update(Request $request) : JsonResponse
    {
        $client = $this->client();
        $validated = $this->validatedRequest($request);

        /**
         * @var ClientProfile $clientProfile
         */
        $clientProfile = $client->clientProfile()->first();
        if ($clientProfile === null) {
            $clientProfile = new ClientProfile();
            $clientProfile->client_id = $client->id;
        }
        $clientProfile->fill($validated)->saveOrFail();
        return JsonResource::make();
    }

}
