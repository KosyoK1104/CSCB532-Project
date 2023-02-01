<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use Closure;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

final class AdminAuthenticatedEmployee
{

    /**
     * @throws AuthorizationException
     */
    public function handle(Request $request, Closure $next) : Response
    {
        if (!auth('employees')->user()?->isAdmin()) {
            throw new AuthorizationException();
        }
        return $next($request);
    }

}
