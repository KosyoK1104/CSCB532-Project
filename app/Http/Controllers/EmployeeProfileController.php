<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\EmployeeProfile;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Throwable;

class EmployeeProfileController extends Controller
{
    protected function getProfile() : EmployeeProfile
    {
        return $this->getEmployee()->employeeProfile()->getResults();
    }

    private function getEmployee() : Employee
    {
        return auth('employees')->user();
    }

    private function validateRequest(Request $request) : array
    {
        $validator = Validator::make($request->request->all(), [
            'name'         => 'required|min:4',
            'phone_number' => 'required|min:10',
        ]);

        return $validator->validated();
    }

    /**
     * @throws Throwable
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
            $employeeProfile = $this->getProfile();
            $employeeProfile->fill($validated);
            $employeeProfile->updateOrFail();
        }
        return response()->json();
    }

    public function forMe() : JsonResponse
    {
        $employeeProfile = $this->getProfile();

        return response()->json(
            [
                'name'            => $employeeProfile->name,
                'phone_number'    => $employeeProfile->phone_number,
                'profile_picture' => Storage::url($employeeProfile->profile_picture ?? 'default-profile-picture.png'),
            ]
        );
    }

    /**
     * @throws Throwable
     */
    public function setProfilePicture(Request $request) : JsonResponse
    {
        $validator = Validator::make($request->allFiles(), [
            'profile_picture' => 'required|image',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        $employeeProfile = $this->getProfile();
        $previousProfilePicture = $employeeProfile->profile_picture;
        if ($previousProfilePicture !== null) {
            Storage::delete($previousProfilePicture);
        }
        $employeeProfile->profile_picture = $request->file('profile_picture')?->store('profile_pictures');
        $employeeProfile->updateOrFail();
        return response()->json();
    }

    /**
     * @throws Throwable
     */
    public function removeProfilePicture() : JsonResponse
    {
        $employeeProfile = $this->getProfile();
        Storage::delete($employeeProfile->profile_picture);
        $employeeProfile->profile_picture = null;
        $employeeProfile->updateOrFail();
        return response()->json();
    }

}
