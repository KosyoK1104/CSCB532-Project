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
use App\Models\Package;
use Exception;
use Illuminate\Database\Eloquent\Builder;
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
    public function index(Request $request) : PackageListingCollection
    {
        // tracking_number, recipient_phone_number, delivery_type
        $packages = Package::where(function (Builder $query) use ($request) {
            if ($request->has('tracking_number')) {
                $query->where('tracking_number', 'like', '%' . $request->string('tracking_number') . '%');
            }
            if ($request->has('recipient_phone_number')) {
                $query->where('recipient_phone_number', 'like', '%' . $request->string('recipient_phone_number') . '%');
            }
            if ($request->has('delivery_type')) {
                $query->where('delivery_type', '=', DeliveryType::from((string) $request->string('delivery_type'))->value);
            }
        })->paginate();
        return new PackageListingCollection($packages);
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
            'weight'                 => 'required|string',
            'delivery_type'          => new Enum(DeliveryType::class),
            'status'                 => new Enum(DeliveryStatus::class),
            'recipient_name'         => 'required|string',
            'recipient_phone_number' => 'required|string|max:10|min:10',
            'recipient_address'      => 'sometimes',
            'office_id'              => 'sometimes|nullable|exists:offices,id',
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
        if ($validatedRequest['delivery_type'] === DeliveryType::OFFICE->value) {
            unset($validatedRequest['recipient_address']);
        }
        else {
            unset($validatedRequest['office_id']);
        }
        $package->fill($validatedRequest);
        $package->status = DeliveryStatus::CREATED;
        $package->client_id = $client->id;
        $package->tracking_number = $this->generateTrackingNumber();
        $package->price = $this->pricingService->calculatePrice((int) $package->weight, $package->delivery_type);
        $package->saveOrFail();

        return response()->json(['data' => ['id' => $package->id]]);
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
        if ($validatedRequest['delivery_type'] === DeliveryType::OFFICE->value) {
            unset($validatedRequest['recipient_address']);
        }
        else {
            unset($validatedRequest['office_id']);
        }
        $package = new Package();
        $package->fill($validatedRequest);
        $package->status = DeliveryStatus::CREATED;
        $package->client_id = Client::findOrFail($request->string('client_id'))->first()->id;
        $package->tracking_number = $this->generateTrackingNumber();
        $package->price = $this->pricingService->calculatePrice((int) $package->weight, $package->delivery_type);
        $package->saveOrFail();

        return response()->json(['data' => ['id' => $package->id]]);
    }

    /**
     * Display the specified resource.
     *
     * @param Package $package
     * @return JsonResponse
     */
    public function show(Package $package) : JsonResponse
    {
        return response()->json(
            [
                'data' =>
                    [
                        'id'                     => $package->id,
                        'tracking_number'        => $package->tracking_number,
                        'office_name'            => $package->office()->first()?->name,
                        'client_name'            => $package->client()->first()?->clientProfile()->getResults()?->first_name . ' ' . $package->client()->first()?->clientProfile()->getResults()?->last_name,
                        'client_phone_number'    => $package->client()->first()?->clientProfile()->getResults()?->phone_number,
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

    public function indexForClient(Request $request) : PackageListingCollection
    {
        $client = $this->client();

        $packages = (new \App\Models\Package)->where('client_id', '=', $client->id)->where(function (Builder $query) use ($request) {
            if ($request->has('tracking_number')) {
                $query->where('tracking_number', 'like', '%' . $request->string('tracking_number') . '%');
            }
            if ($request->has('recipient_phone_number')) {
                $query->where('recipient_phone_number', '=', $request->string('recipient_phone_number'));
            }
            if ($request->has('delivery_type')) {
                $query->where('delivery_type', '=', DeliveryType::from((string) $request->string('delivery_type'))->value);
            }
        })->paginate();

        return new PackageListingCollection($packages);
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
