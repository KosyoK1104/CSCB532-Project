<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use Closure;
use Exception;
use Illuminate\Session\TokenMismatchException;
use Illuminate\Support\Facades\DB;

final class DatabaseTransactionMiddleware
{

    public function handle($request, Closure $next)
    {
        DB::beginTransaction();

        try {
            $response = $next($request);
            DB::commit();
            return $response;
        }
        catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
}
