<?php

declare(strict_types=1);

namespace App\Http;

use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

final class EmployeeSessionProvider
{
    private ?array $session = null;

    private const SESSION_KEY = 'em';

    public function __construct()
    {
        if ($this->session === null) {
            $this->session = Session::get(self::SESSION_KEY);
        }
    }

    public function id() : ?string
    {
        if (is_null($this->session)) {
            return null;
        }
        return $this->session['id'];
    }

    public function destroy(Request $request) : void
    {
        Session::remove(self::SESSION_KEY);
        $request->session()->remove(self::SESSION_KEY);
        $this->session = null;
    }

    public function session() : ?array
    {
        return $this->session;
    }

    public function isLogged() : bool
    {
        return $this->session !== null;
    }

    private function generateSessionData(Employee $employee) : array
    {
        return [
            'id' => $employee->id,
        ];
    }

    public function initialize(Request $request, Employee $employee) : array
    {

        $data = $this->generateSessionData($employee);
        $request->session()->put(self::SESSION_KEY,);
        Session::put(self::SESSION_KEY, $data);
        $this->session = Session::get(self::SESSION_KEY);
        return $data;
    }

    public function getEmployee() : Employee
    {
        if (!is_null($this->session)) {
            return Employee::find($this->session['id']);
        }
        throw new NotFoundHttpException('Invalid user');
    }
}
