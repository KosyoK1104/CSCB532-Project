<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\EmployeeProfile;
use App\Models\EmployeeType;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Enum;
use Illuminate\Validation\Rules\Password;
use InvalidArgumentException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Throwable;

class EmployeeController extends Controller
{
    public function __construct()
    {
    }

    private function getEmployee() : Employee
    {
        return auth('employees')->user();
    }

    public function me(Request $request) : JsonResponse
    {
        $employee = $this->getEmployee();
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
        $employee = (new Employee)->where('email', '=', $request->string('email'))->first();
        if (is_null($employee)) {
            throw new NotFoundHttpException('Invalid user');
        }
        if (!Hash::check($request->string('password')->value(), $employee->password)) {
            throw new NotFoundHttpException('Invalid user');
        }

        auth('employees')->login($employee);
        return response()->json(['data' => ['id' => $employee->id]]);
    }

    public function changePassword(Request $request) : JsonResponse
    {
        $validator = Validator::make($request->request->all(), [
            'old_password'              => 'required',
            'new_password'              => new Password(6),
            'new_password_confirmation' => 'required|min:6|same:new_password',
        ]);
        $validated = $validator->validated();

        $employee = $this->getEmployee();

        if (!Hash::check($validated['old_password'], $employee->password)) {
            throw new InvalidArgumentException('Provided previous password does not match with current!');
        }

        $employee->password = $validated['new_password'];
        $employee->saveOrFail();
        return response()->json();
    }

    public function logout() : JsonResponse
    {
        auth('employees')->logout();
        return response()->json();
    }

    public function listing() : JsonResponse
    {
        $currentEmployee = $this->getEmployee();
        if (!$currentEmployee->isAdmin()) {
            throw new InvalidArgumentException('Only admin can list employees');
        }
        /**
         * @var Collection<int, Employee> $employees
         */
        $employees = Employee::all();
        return response()->json(
            [
                'data' => $employees->map(
                    function (Employee $employee) {
                        return [
                            'id'    => $employee->id,
                            'email' => $employee->email,
                            'type'  => $employee->type->value,
                            'name'  => $employee->employeeProfile()->getResults()?->name,
                        ];
                    }
                ),
            ]
        );
    }

    public function get(Employee $employee) : JsonResponse
    {
        $currentEmployee = $this->getEmployee();
        if (!$currentEmployee->isAdmin()) {
            throw new InvalidArgumentException('Only admin can list employees');
        }
        return response()->json(
            [
                'data' => [
                    'id'              => $employee->id,
                    'email'           => $employee->email,
                    'type'            => $employee->type->value,
                    'name'            => $employee->employeeProfile()->getResults()?->name,
                    'phone_number'    => $employee->employeeProfile()->getResults()?->phone_number,
                    'profile_picture' => Storage::url($employee->employeeProfile()->getResults()?->profile_picture ?? 'default-profile-picture.png'),
                ],
            ]
        );
    }

    public function update(Employee $employee, Request $request) : JsonResponse
    {
        $currentEmployee = $this->getEmployee();
        if (!$currentEmployee->isAdmin()) {
            throw new InvalidArgumentException('Only admin can list employees');
        }
        $validator = Validator::make($request->request->all(), [
            'name'         => 'required|min:4',
            'phone_number' => 'required|min:10',
        ]);
        $employee->employeeProfile()->update($validator->validated());
        $employee->saveOrFail();
        return response()->json(['data' => ['id' => $employee->id]]);
    }

    public function create(Request $request) : JsonResponse
    {
        $currentEmployee = $this->getEmployee();
        if (!$currentEmployee->isAdmin()) {
            throw new InvalidArgumentException('Only admin can list employees');
        }
        $validator = Validator::make($request->request->all(), [
            'email'        => 'required|email|unique:employees',
            'name'         => 'required|min:4',
            'phone_number' => 'required|min:10',
            'type'         => new Enum(EmployeeType::class),
        ]);
        $employee = new Employee();
        $employee->fill([...$validator->validated(), 'password' => '123456789']);
        $employee->saveOrFail();
        $employeeProfile = new EmployeeProfile();
        $employeeProfile->employee_id = $employee->id;
        $employeeProfile->fill($validator->validated());
        $employeeProfile->saveOrFail();
        return response()->json(['data' => ['id' => $employee->id]]);
    }
}
