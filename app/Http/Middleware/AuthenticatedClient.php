<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use InvalidArgumentException;
use Symfony\Component\HttpFoundation\Response;

final class AuthenticatedClient
{
    public function handle(Request $request, Closure $next) : Response
    {
        if (is_null(auth('clients')->user())) {
            throw new InvalidArgumentException('You are not logged in!');
        }
        return $next($request);
    }

}
