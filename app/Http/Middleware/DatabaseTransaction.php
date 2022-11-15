<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

final class DatabaseTransaction
{
    public function handle(Request $request, Closure $next) : Response
    {
        DB::beginTransaction();
        try {
            $response = $next($request);
            DB::commit();
        }
        catch (Throwable $e) {
            DB::rollBack();
            throw $e;
        }
        return $response;
    }
}
