<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use App\Http\EmployeeSessionProvider;
use App\Models\Client;
use App\Models\Employee;
use Closure;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Http\Request;
use InvalidArgumentException;
use Symfony\Component\HttpFoundation\Response;

final class AuthenticatedEmployee
{

    public function __construct(
        private readonly EmployeeSessionProvider $employeeSessionProvider
    ) {
    }

    /**
     * @throws AuthenticationException
     */
    public function handle(Request $request, Closure $next) : Response
    {
        if (!$this->employeeSessionProvider->isLogged()) {
            throw new AuthenticationException('Unauthenticated!');
        }
        $employee = Employee::find($this->employeeSessionProvider->id());
        if (is_null($employee)) {
            $this->employeeSessionProvider->destroy($request);
            throw new InvalidArgumentException('User not found!', 404);
        }

        return $next($request);
    }

}
