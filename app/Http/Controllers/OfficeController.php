<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Resources\OfficeListingCollection;
use App\Models\Office;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class OfficeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return OfficeListingCollection
     */
    public function index() : OfficeListingCollection
    {
        //get all offices
//        $offices = DB::table('offices')->paginate();
        return new OfficeListingCollection(Office::paginate());
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
        //edit
        $office->fill($request->all());
        $office->save();
        return response()->json();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Office $office
     * @return JsonResponse
     */
    public function destroy(Office $office) : JsonResponse
    {
        //delete the office
        $office->delete();
        return response()->json(['data' => ['id' => $office->id]]);
    }
}
