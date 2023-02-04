<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use App\Exceptions\HttpUnauthorizedException;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

final class AuthenticatedClient
{
    public function handle(Request $request, Closure $next) : Response
    {
        if (is_null(auth('clients')->user())) {
            throw new HttpUnauthorizedException('Unauthorized!');
            /*return response()->json([
                'message' => 'Unauthorized',
            ], 401);*/
        }
        return $next($request);
    }

}
