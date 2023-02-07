<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Exceptions\HttpInvalidArgumentException;
use App\Exceptions\HttpUnauthorizedException;
use App\Http\Resources\OfficeListingCollection;
use App\Models\Client;
use App\Models\Employee;
use App\Models\EmployeeType;
use App\Models\Office;
use App\Models\OfficeStatus;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class OfficeController extends Controller
{
    private function getEmployee() : Employee
    {
        return auth('employees')->user();
    }

    /**
     * Display a listing of the resource.
     *
     * @return OfficeListingCollection
     */
    public function index(Request $request) : OfficeListingCollection
    {
        // get offices according to request with pagination
        //TODO Make it better for searching
        $offices = Office::where(function (Builder $query) use ($request) {
            if ($request->has('name')) {
                $query->where('name', 'like', '%' . $request->string('name') . '%');
            }
            if ($request->has('city')) {
                $query->where('city', 'like', '%' . $request->string('city') . '%');
            }
            if ($request->has('visual_id')) {
                $query->where('visual_id', 'like', '%' . $request->string('visual_id') . '%');
            }
            if($request->has('status')){
                $query->where('status', '=', OfficeStatus::from((string)$request->string('status'))->value);
            }
        })->paginate();

        return new OfficeListingCollection($offices);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request) : JsonResponse
    {
        //create a new office from request
        $office = new Office();
        $office->fill($request->all());
        $office->save();
        return response()->json();
    }

    /**
     * Display the specified resource.
     *
     * @param Office $office
     * @return JsonResponse
     */
    public function show(Office $office) : JsonResponse
    {
        //get current office
        return response()->json($office);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param Office $office
     * @return JsonResponse
     */
    public function update(Request $request, Office $office) : JsonResponse
    {
        $currentEmployee = $this->getEmployee();
        if (!$currentEmployee->isAdmin()) {
            throw new HttpUnauthorizedException('Only admin can delete offices');
        }

        //update office from request
        $validator = Validator::make($request->request->all(), [
            'name'          => 'required|min:4',
            'city'          => 'required|min:10',
            'address'       => 'required|min:5',
            'id'            => 'required|exists:offices,id',
        ]);

        if ($validator->fails()) {
            throw new HttpInvalidArgumentException($validator->errors()->first());
        }

        $office->fill($request->all());
        $office->saveOrFail();

        return response()->json(['data' => ['id' => $office->id]]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Office $office
     * @return JsonResponse
     * @throws \Throwable
     */
    public function delete(Office $office) : JsonResponse
    {
        $currentEmployee = $this->getEmployee();
        if (!$currentEmployee->isAdmin()) {
            throw new HttpUnauthorizedException('Only admin can delete offices');
        }

        $office->status = OfficeStatus::INACTIVE;
        $office->saveOrFail();

        return response()->json();
    }

    /**
     * @throws \Throwable
     */
    public function activate(Office $office) : JsonResponse
    {
        $currentEmployee = $this->getEmployee();
        if (!$currentEmployee->isAdmin()) {
            throw new HttpUnauthorizedException('Only admin can delete offices');
        }

        if($office->status == OfficeStatus::ACTIVE->value){
            throw new HttpInvalidArgumentException('Office is already active');
        }

        $office->status = OfficeStatus::ACTIVE;
        $office->saveOrFail();

        return response()->json();
    }

//    /**
//     * @throws \Throwable
//     */
//    public function create(Office $office) : JsonResponse
//    {
//        $currentEmployee = $this->getEmployee();
//        if (!$currentEmployee->isAdmin()) {
//            throw new HttpUnauthorizedException('Only admin can create offices');
//        }
//
//        //TODO do the rest
//    }

    public function get(Office $office) : JsonResponse
    {
//        dd($office);
        return response()->json(
            [
                'data' =>
                    [
                        'id'            => $office->id,
                        'visual_id'     => $office->visual_id,
                        'name'          => $office->name,
                        'city'          => $office->city,
                        'address'       => $office->address,
                        'status'        => $office->status->value,
                    ],

            ]
        );
    }

    public function all() : JsonResponse
    {
        $offices = Office::where('status','=',OfficeStatus::ACTIVE->value)->all()->map(function (Office $office) {
            return [
                'id'            => $office->id,
                'visual_id'     => $office->visual_id,
                'name'          => $office->name,
            ];
        });
        return response()->json($offices);
    }

}
