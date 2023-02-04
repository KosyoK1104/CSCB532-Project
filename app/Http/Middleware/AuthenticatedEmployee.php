<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use App\Exceptions\HttpUnauthorizedException;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

final class AuthenticatedEmployee
{

    public function handle(Request $request, Closure $next) : Response
    {
        if (is_null(auth('employees')->user())) {
            throw new HttpUnauthorizedException('You are not logged in!');
        }
        return $next($request);
    }

}
