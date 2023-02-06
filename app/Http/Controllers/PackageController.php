<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Exceptions\HttpInvalidArgumentException;
use App\Http\Resources\PackageListingCollection;
use App\Http\Services\PricingService;
use App\Models\Client;
use App\Models\DeliveryStatus;
use App\Models\DeliveryType;
use App\Models\Employee;
use App\Models\EmployeeType;
use App\Models\Office;
use App\Models\Package;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Enum;
use Throwable;

class PackageController extends Controller
{

    public function __construct(
        private readonly PricingService $pricingService
    ) {
    }

    private function employee() : Employee
    {
        return auth('employees')->user();
    }

    private function client() : Client
    {
        return auth('clients')->user();
    }

    /**
     * Display a listing of the resource.
     * @return PackageListingCollection
     */
    public function index() : PackageListingCollection
    {
        return new PackageListingCollection(Package::paginate());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return array
     */
    public function validateRequest(Request $request) : array
    {
        $validator = Validator::make($request->request->all(), [
            'tracking_number'        => 'required|string|min:6',
            //            'price'                  => 'required|double|min:0',
            'weight'                 => 'required|string',
            'delivery_type'          => new Enum(DeliveryType::class),
            'status'                 => new Enum(DeliveryStatus::class),
            'recipient_name'         => 'required|string',
            'recipient_phone_number' => 'required|string|max:10|min:10',
            'recipient_address'      => 'required|string',
        ]);

        return $validator->validated();
    }

    /**
     * @throws Throwable
     */
    public function storeFromClient(Request $request) : JsonResponse
    {
        $client = $this->client();
        $validatedRequest = $this->validateRequest($request);
        $package = new Package();
        if ($validatedRequest['delivery_type'] === DeliveryType::OFFICE) {
            $office = Office::findOrFail($request->request->get('office_id'))->first();
            $package->office_id = $office->id;
        }
        $package->fill($validatedRequest);
        $package->status = DeliveryStatus::CREATED;
        $package->client_id = $client->id;
        $package->tracking_number = $this->generateTrackingNumber();
        $package->price = $this->pricingService->calculatePrice($package->weight, $package->delivery_type);
        $package->saveOrFail();

        return response()->json(['id' => $package->id]);
    }

    /**
     * @throws Throwable
     */
    public function storeFromOffice(Request $request) : JsonResponse
    {
        $employee = $this->employee();
        if ($employee->type !== EmployeeType::OFFICE) {
            throw new HttpInvalidArgumentException('Only office employees can create packages');
        }

        $validatedRequest = $this->validateRequest($request);
        $package = new Package();
        $package->fill($validatedRequest);
        $package->office_id = $employee->office_id;
        $package->status = DeliveryStatus::CREATED;
        $package->client_id = $request->string('client_id');
        $package->tracking_number = $this->generateTrackingNumber();
        $package->price = $this->pricingService->calculatePrice($package->weight, $package->delivery_type);
        $package->saveOrFail();

        return response()->json(['id' => $package->id]);
    }

    /**
     * Display the specified resource.
     *
     * @param Package $packages
     * @return JsonResponse
     */
    public function show(Package $packages) : JsonResponse
    {
        return response()->json($packages);
    }

    public function showForClient(Package $package) : JsonResponse
    {
        $client = $this->client();
        if ($package->client_id !== $client->id) {
            throw new HttpInvalidArgumentException('You can only view your own packages');
        }
        return response()->json(
            [
                'data' =>
                    [
                        'id'                     => $package->id,
                        'tracking_number'        => $package->tracking_number,
                        'office_name'            => $package->office()->first()?->name,
                        'delivery_type'          => $package->delivery_type,
                        'status'                 => $package->status,
                        'price'                  => $package->price,
                        'weight'                 => $package->weight,
                        'recipient_name'         => $package->recipient_name,
                        'recipient_phone_number' => $package->recipient_phone_number,
                        'recipient_address'      => $package->recipient_address,
                    ],
            ]
        );
    }

    public function markAsDelivered(Package $package) : JsonResponse
    {
        $employee = $this->employee();
        if ($employee->type === EmployeeType::DELIVERY && $package->delivery_type === DeliveryType::OFFICE) {
            throw new HttpInvalidArgumentException('Only office employees can mark packages as delivered');
        }
        if ($employee->type === EmployeeType::OFFICE && $package->delivery_type === DeliveryType::ADDRESS) {
            throw new HttpInvalidArgumentException('Only delivery employees can mark packages as delivered');
        }
        $package->status = DeliveryStatus::DELIVERED;
        $package->saveOrFail();
        return response()->json(['id' => $package->id]);
    }

    public function indexForClient() : JsonResponse
    {
        $client = $this->client();
        $packages = Package::where('client_id', $client->id)->paginate();
        return response()->json($packages);
    }

    /*public function update(Request $request, Package $packages) : JsonResponse
    {
        $validator = Validator::make($request->request->all(), [
            'delivery_type'          => 'required',
            'status'                 => 'required',
            'price'                  => 'required',
            'weight'                 => 'required',
            'recipient_name'         => 'required|min:3',
            'recipient_phone_number' => 'required|min:10',
            'recipient_address'      => 'required|min:5',
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 401);
        }
        $packages->update($validator->validated());
        return response()->json();
    }

    public function destroy(Package $packages) : JsonResponse
    {
        $packages->deleteOrFail();
        return response()->json();
    }*/

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
