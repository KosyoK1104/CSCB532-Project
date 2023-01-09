<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\EmployeeSessionProvider;
use App\Models\Employee;
use App\Models\EmployeeType;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Enum;
use Illuminate\Validation\Rules\Password;
use InvalidArgumentException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Throwable;

class EmployeeController extends Controller
{
    public function __construct(
        private readonly EmployeeSessionProvider $employeeSession
    ) {
    }

    public function me(Request $request) : JsonResponse
    {
        $employee = $this->employeeSession->getEmployee($request);
        $request->session()->regenerate();
        return response()->json(
            [
                'id'    => $employee->id,
                'email' => $employee->email,
                'type'  => $employee->type->value,
            ]
        );
    }

    /**
     * @throws Throwable
     */
    public function store(Request $request) : JsonResponse
    {
        $validator = Validator::make($request->request->all(), [
            'email'    => 'required|email|unique:employees',
            'password' => (new Password(6))->letters()->numbers(),
            'type'     => new Enum(EmployeeType::class),
        ]);

        $employee = new Employee();
        $employee->fill($validator->validated());
        $employee->saveOrFail();
        return response()->json(['data' => ['id' => $employee->id]]);
    }

    public function login(Request $request) : JsonResponse
    {
        $employee = Employee::where('email', '=', $request->string('email'))->first();
        if (is_null($employee)) {
            throw new NotFoundHttpException('Invalid user');
        }
        if (!Hash::check($request->string('password')->value(), $employee->password)) {
            throw new NotFoundHttpException('Invalid user');
        }

        $data = $this->employeeSession->initialize($request, $employee);
        return response()->json(['data' => $data]);
    }

    public function changePassword(Request $request) : JsonResponse
    {
        $validator = Validator::make($request->request->all(), [
            'prev_password'   => 'required',
            'password'        => new Password(6),
            'repeat_password' => 'required|string|min::6|same:password',
        ]);
        $validated = $validator->validated();
        $employee = $this->employeeSession->getEmployee($request);
        if (!Hash::check($validated['password'], $employee->password)) {
            throw new InvalidArgumentException('Provided previous password does not match with current!');
        }
        $employee->password = $validated['password'];
        return response()->json();
    }

    public function logout(Request $request) : JsonResponse
    {
        $this->employeeSession->destroy($request);
        return response()->json();
    }
}
