<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\DeliveryStatus;
use App\Models\DeliveryType;
use App\Models\Package;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Enum;
use Throwable;

class PackageController extends Controller
{

    public function __construct()
    {
    }

    /**
     * Display a listing of the resource.
     * @return ?Response
     */
    public function index(): ?Response
    {
        $packages = Package::all();

        return response()->view('index', [
            'packages' => $packages,
        ]);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return array
     */
    public function validateRequest(Request $request): array
    {
        $validator = Validator::make($request->request->all(), [
            'tracking_number' => 'required|string|min:6',
            'price' => 'required|double|min:0',
            'weight' => 'required|string',
            'delivery_type' => new Enum(DeliveryType::class),
            'status' => new Enum(DeliveryStatus::class),
            'recipient_name' => 'required|string',
            'recipient_phone_number' => 'required|string|max:10|min:10',
            'recipient_address' => 'required|string',
        ]);

        return $validator->validated();
    }

    /**
     * @throws Throwable
     */
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
        return response()->view('index', [
            'package' => $packages,
        ]);

    }

    /**
     * Update the specified resource in storage.
     * @param Request $request
     * @param Package $packages
     */
    public function update(Request $request, Package $packages): JsonResponse
    {
        $validator = Validator::make($request->request->all(), [
            'delivery_type' => 'required',
            'status' => 'required',
            'price' => 'required',
            'weight' => 'required',
            'recipient_name' => 'required|min:3',
            'recipient_phone_number' => 'required|min:10',
            'recipient_address' => 'required|min:5'
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 401);
        }
        $packages->update($validator->validated());
        return response()->json();

    }

    public function destroy(Package $packages): JsonResponse
    {
        $packages->deleteOrFail();
        return response()->json();
    }

    /**
     * @throws Exception
     */
    private function generateTrackingNumber() : string
    {
        $characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $length = random_int(15, 15);
        $trackingNumber = '';
        for ($i = 0; $i < $length; $i++) {
            $trackingNumber .= $characters[random_int(0, $charactersLength - 1)];
        }
        return $trackingNumber;
    }


}
