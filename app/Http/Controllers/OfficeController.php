<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Office;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class OfficeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response|null
     */
    public function index() : ?Response
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return Response|null
     */
    public function store(Request $request) : ?Response
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param Office $office
     * @return Response|null
     */
    public function show(Office $office) : ?Response
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param Office $office
     * @return Response|null
     */
    public function update(Request $request, Office $office) : ?Response
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Office $office
     * @return Response|null
     */
    public function destroy(Office $office) : ?Response
    {
        //
    }
}
