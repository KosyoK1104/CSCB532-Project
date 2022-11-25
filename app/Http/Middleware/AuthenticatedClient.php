<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use App\Models\Client;
use Closure;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Http\Request;
use InvalidArgumentException;
use Symfony\Component\HttpFoundation\Response;

final class AuthenticatedClient
{

    public function handle(Request $request, Closure $next) : Response
    {
        if (!$request->getSession()->has('cl')) {
            throw new AuthenticationException('Unauthenticated!');
        }
        $user = (new Client)->find($request->getSession()->get('cl')['id']);
        if (is_null($user)) {
            $request->getSession()->remove('cl');
            throw new InvalidArgumentException('User not found!', 404);
        }

        return $next($request);
    }

}
