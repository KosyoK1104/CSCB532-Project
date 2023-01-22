<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\EmployeeProfile;
use App\Models\EmployeeProfilePicture;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class EmployeeProfileController extends Controller
{

    private function getEmployee() : Employee
    {
        return auth('employees')->user();
    }

    private function validateRequest(Request $request) : array
    {
        $validator = Validator::make($request->request->all(), [
            'name'         => 'required|min:4',
            'phone_number' => 'required|min:4|max:4',
        ]);

        return $validator->validated();
    }

    /**
     * @throws \Throwable
     */
    public function store(Request $request) : JsonResponse
    {
        $validated = $this->validateRequest($request);
        $employee = $this->getEmployee();
        if ($employee->employeeProfile()->doesntExist()) {
            $employeeProfile = new EmployeeProfile();
            $employeeProfile->fill($validated);
            $employeeProfile->employee_id = $employee->id;
            $employeeProfile->saveOrFail();
        }
        else {
            $employeeProfile = $employee->employeeProfile()->getRelated();
            $employeeProfile->update($validated);
            $employeeProfile->updateOrFail();
        }
        return response()->json();
    }

    public function get() : JsonResponse
    {
        $employee = $this->getEmployee();
        return response()->json(
            [
                'name'         => $employee->employeeProfile()->getRelated()->name,
                'phone_number' => $employee->employeeProfile()->getRelated()->phone_number,
            ]
        );
    }

    /**
     * @throws \Throwable
     */
    public function storeProfilePicture(Request $request) : JsonResponse
    {
        $employee = $this->getEmployee();

        if ($request->file('file')) {
            return response()->json();
        }
        $path = $request->file('file')->store('pictures');
        if ($employee->employeeProfilePicture()->doesntExist()) {
            $employeeProfilePicture = new EmployeeProfilePicture();
            $employeeProfilePicture->employee_id = $employee->id;
            $employee->path = $path;
            $employeeProfilePicture->saveOrFail();
        }
        else {
            $employeeProfilePicture = $employee->employeeProfilePicture()->getRelated();
            $employeeProfilePicture->path = $path;
            $employeeProfilePicture->updateOrFail();
        }

        return response()->json(['path' => Storage::url($path)]);
    }

}
