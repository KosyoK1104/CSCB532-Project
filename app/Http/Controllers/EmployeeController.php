<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Exceptions\HttpInvalidArgumentException;
use App\Exceptions\HttpUnauthorizedException;
use App\Http\Resources\EmployeeListingCollection;
use App\Models\Employee;
use App\Models\EmployeeProfile;
use App\Models\EmployeeType;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Enum;
use Illuminate\Validation\Rules\Password;
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
        $validator = Validator::make(
            $request->request->all(),
            [
                'email'    => 'required|email',
                'password' => 'required',
            ]
        );
        $employee = (new Employee)->where('email', '=', $validator->validate()['email'])->first();
        if (is_null($employee)) {
            throw new NotFoundHttpException('Invalid user');
        }
        if (!Hash::check($validator->validate()['password'], $employee->password)) {
            throw new NotFoundHttpException('Invalid user');
        }

        auth('employees')->login($employee);
        return response()->json(['data' => ['id' => $employee->id]]);
    }

    /**
     * @throws Throwable
     */
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
            throw new HttpInvalidArgumentException('Provided old password does not match with current!');
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

    public function listing(Request $request) : EmployeeListingCollection
    {
        $currentEmployee = $this->getEmployee();
        if (!$currentEmployee->isAdmin()) {
            throw new HttpInvalidArgumentException('Only admin can list employees');
        }
        /**
         * @var Collection<int, Employee> $employees
         */

        $employees = (new \App\Models\Employee)->join('employee_profiles', 'employee_id', '=', 'id')->where(function (Builder $query) use ($request) {
            if ($request->has('name')) {
                $query->where('employee_profiles.name', 'like', '%' . $request->string('name') . '%');
            }
            if ($request->has('email')) {
                $query->where('email', '=', $request->string('email'));
            }
            if ($request->has('type')) {
                $query->where('type', '=', EmployeeType::from((string) $request->string('type'))->value);
            }
        })->paginate();
        return new EmployeeListingCollection($employees);
    }

    public function get(Employee $employee) : JsonResponse
    {
        $currentEmployee = $this->getEmployee();
        if (!$currentEmployee->isAdmin()) {
            throw new HttpInvalidArgumentException('Only admin can list employees');
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
                    'office_id'       => $employee->office_id,
                ],
            ]
        );
    }

    /**
     * @throws Throwable
     */
    public function update(Employee $employee, Request $request) : JsonResponse
    {
        $currentEmployee = $this->getEmployee();
        if (!$currentEmployee->isAdmin()) {
            throw new HttpInvalidArgumentException('Only admin can list employees');
        }
        $validator = Validator::make($request->request->all(), [
            'name'         => 'required|min:4',
            'phone_number' => 'required|min:10',
            'office_id'    => 'sometimes|exists:offices,id',
        ]);
        $employeeProfile = $employee->employeeProfile()->getResults();
        if ($employee->type === EmployeeType::OFFICE) {
            $employee->office_id = $validator->validated()['office_id'];
        }
        if (is_null($employeeProfile)) {
            $employeeProfile = new EmployeeProfile();
            $employeeProfile->employee_id = $employee->id;
            $employeeProfile->fill($validator->validated());
        }
        else {
            $employeeProfile->update($validator->validated());
        }
        $employeeProfile->saveOrFail();
        $employee->saveOrFail();
        return response()->json(['data' => ['id' => $employee->id]]);
    }

    /**
     * @throws Throwable
     */
    public function create(Request $request) : JsonResponse
    {
        $currentEmployee = $this->getEmployee();
        if (!$currentEmployee->isAdmin()) {
            throw new HttpInvalidArgumentException('Only admin can list employees');
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

    public function delete(Employee $employee) : JsonResponse
    {
        $currentEmployee = $this->getEmployee();
        if (!$currentEmployee->isAdmin()) {
            throw new HttpUnauthorizedException('Only admin can list employees');
        }
        if ($currentEmployee->is($employee)) {
            throw new HttpInvalidArgumentException('You cannot delete yourself');
        }
        $employee->delete();
        return response()->json();
    }
}
