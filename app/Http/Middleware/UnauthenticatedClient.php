<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use App\Exceptions\HttpRuntimeException;
use Closure;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

final class UnauthenticatedClient
{
    public function handle(Request $request, Closure $next) : Response
    {
        if (!is_null(auth('clients')->user())){
            throw new HttpRuntimeException('You are already logged in!');
        }
        return $next($request);
    }
}
