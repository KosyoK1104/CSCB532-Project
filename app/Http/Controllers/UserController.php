<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\User\Exceptions\UserAuthenticationException;
use App\Models\User\Exceptions\UserNotFound;
use App\Models\User\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

final class UserController extends Controller
{
    /**
     * @throws ValidationException
     */
    public function create(Request $request) : Response
    {
        $validator = Validator::make(
            [
                'email'    => $request->json('email'),
                'password' => $request->json('password'),
            ],
            [
                'email'    => 'email|unique:users',
                'password' => 'min:6',
            ]
        );

        $validated = $validator->validate();

        $user = new User();
        $user->id = Str::orderedUuid();
        $user->email = $validated['email'];
        $user->password = Hash::make($validated['password']);
        $user->created_on = now()->timestamp;
        $user->save();

        return response(['id' => $user->id], 201);
    }

    public function login(Request $request) : Response
    {
        dd(Session::all());
        $user = User::where('email', '=', $request->json('email'))->first();
        if (is_null($user)) {
            throw UserNotFound::byId();
        }
        if (!password_verify($request->json('password'), $user->password)) {
            throw UserAuthenticationException::passwordDoesNotMatch();
        }

        Session::put('user', $user->meta());
        Session::save();

        return \response([], 200);
    }
}
