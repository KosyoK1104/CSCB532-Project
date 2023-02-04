<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Resources\ClientMeResource;
use App\Models\Client;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use InvalidArgumentException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Throwable;

use function response;

final class ClientController extends Controller
{
    private function getClient() : Client
    {
        return auth('clients')->user();
    }

    public function me() : ClientMeResource
    {
        return new ClientMeResource($this->getClient());
    }

    /**
     * Login client and add session parameter 'cl'
     *
     * @throws InvalidArgumentException
     */

    public function login(Request $request) : JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $client = (new Client)->where('email', '=', $validator->validate()['email'])->first();
        if (is_null($client)) {
            throw new NotFoundHttpException('Invalid user');
        }
        if (!Hash::check($validator->validate()['password'], $client->password)) {
            throw new NotFoundHttpException('Invalid user');
        }

        auth('clients')->login($client);
        return new JsonResponse();
    }

    public function logout() : JsonResponse
    {
        auth('clients')->logout();
        return new JsonResponse();
    }

    /**
     * Store a newly created resource in storage.
     * @throws Throwable
     */
    public function store(Request $request) : JsonResponse
    {
        $validator = Validator::make($request->request->all(), [
            'email'           => 'required|email|unique:clients',
            'username'        => 'required|string|min::6|unique:clients',
            'password'        => 'required|string|min::6',
            'repeat_password' => 'required|string|same:password',
        ]);

        $client = new Client();
        $client->fill($validator->validated());
        $client->saveOrFail();
        return new JsonResponse();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Client $client) : JsonResponse
    {
        $validator = Validator::make($request->request->all(), [
            'email'    => 'required|email|unique:clients',
            'username' => 'required|string|min:6|unique:clients',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 401);
        }
        $client->update($validator->validated());
        return new JsonResponse();
    }

    /**
     * Remove the specified resource from storage.
     * @throws Throwable
     */
    public function destroy(Client $client) : JsonResponse
    {
        $client->deleteOrFail();
        return response()->json();
    }
}
