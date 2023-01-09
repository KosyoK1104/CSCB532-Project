<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\EmployeeSessionProvider;
use App\Models\EmployeeProfile;
use App\Models\EmployeeProfilePicture;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class EmployeeProfileController extends Controller
{
    public function __construct(
        private readonly EmployeeSessionProvider $employeeSessionProvider
    ) {
    }

    private function validateRequest(Request $request) : array
    {
        $validator = Validator::make($request->request->all(), [
            'name'         => 'required|min:4',
            'phone_number' => 'required|min:4|max:4',
        ]);

        return $validator->validated();
    }

    public function store(Request $request) : JsonResponse
    {
        $validated = $this->validateRequest($request);
        $employee = $this->employeeSessionProvider->getEmployee($request);
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

    public function get(Request $request) : JsonResponse
    {
        $employee = $this->employeeSessionProvider->getEmployee($request);
        return response()->json(
            [
                'name'         => $employee->employeeProfile()->name,
                'phone_number' => $employee->employeeProfile()->phone_number,
            ]
        );
    }

    public function storeProfilePicture(Request $request) : JsonResponse
    {
        $employee = $this->employeeSessionProvider->getEmployee($request);

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
