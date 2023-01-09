<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\EmployeeType;
use App\Models\Package;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Enum;
use Illuminate\Validation\Rules\Password;

class PackageController extends Controller
{
    /**
     * Display a listing of the resource.
     * @return ?Response
     */
    public function index(): ?Response
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return ?Response
     */
    public function validateRequest(Request $request): array
    {
        $validator = Validator::make($request->request->all(), [
            'tracking_number' => 'required|string|min:6',
            'price' => 'required|double|min:0',
            'weight' => 'required|string',
            'delivery_type' => 'required|string',
            'recipient_name' => 'required|string',
            'recipient_phone_number' => 'required|string|max:10|min:10',
            'recipient_address' => 'required|string',
        ]);

        return $validator->validated();
    }

    public function store(Request $request): JsonResponse
    {
        $validatedRequest = $this->validateRequest($request);
        $package = new Package();
        $package->fill($validatedRequest);
        $package->tracking_number = $this->generateTrackingNumber();
        $package->price = 10.10; // TODO
        $package->saveOrFail();

        return response()->json(['id' => $package->id]);
    }

    /**
     * Display the specified resource.
     *
     * @param Package $packages
     * @return Response
     */
    public function show(Package $packages): Response
    {

    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param Package $packages
     * @return Response
     */
    public function update(Request $request, Package $packages): Response
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Package $packages
     * @return Response
     */
    public function destroy(Package $packages): Response
    {
        //
    }

    private function generateTrackingNumber()
    {
        $characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $length = rand(15, 15);
        $trackingNumber = '';
        for ($i = 0; $i < $length; $i++) {
            $trackingNumber .= $characters[rand(0, $charactersLength - 1)];
        }
        return $trackingNumber;
    }
}
