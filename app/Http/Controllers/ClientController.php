<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Validator;
use InvalidArgumentException;
use Throwable;

class ClientController extends Controller
{
    /**
     * Login client and add session parameter 'cl'
     *
     * @throws InvalidArgumentException
     */
    public function login(Request $request) : JsonResponse
    {
        $client = Client::where('email', '=', $request->string('email'))->firstOrFail();

        if (is_null($client)) {
            throw new InvalidArgumentException('Invalid user');
        }
        if (!password_verify($request->string('password')->value(), $client->password)) {
            throw new InvalidArgumentException('Invalid user');
        }

        $data = ['id' => $client->id];
        Session::put('cl', $data);
        return \response()->json(['data' => $data]);
    }

    public function logout(Request $request) : JsonResponse
    {
        Session::remove('cl');
        $request->session()->remove('cl');
        return \response()->json();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) : JsonResponse
    {
        $validator = Validator::make($request->request->all(), [
            'email'           => 'required|email|unique:clients',
            'username'        => 'required|string|min:6|unique:clients',
            'password'        => 'required|string|min:6',
            'repeat_password' => 'required|string|same:password',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 401);
        }

        $client = new Client();
        $client->fill($request->request->all());
        $client->saveOrFail();
        return response()->json(['data' => ['id' => $client->id]]);
    }
//
//    /**
//     * Display the specified resource.
//     *
//     * @param Client $client
//     * @return JsonResponse
//     */
//    public function show(Client $client) : JsonResponse
//    {
//        return \response()->json(['data' => $client]);
//    }

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
        return response()->json();
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
