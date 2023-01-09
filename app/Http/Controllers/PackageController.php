<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Package;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class PackageController extends Controller
{
    /**
     * Display a listing of the resource.
     * @return ?Response
     */
    public function index() : ?Response
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return ?Response
     */
    public function store(Request $request) : ?Response
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param Package $packages
     * @return Response
     */
    public function show(Package $packages) : Response
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param Package $packages
     * @return Response
     */
    public function update(Request $request, Package $packages) : Response
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Package $packages
     * @return Response
     */
    public function destroy(Package $packages) : Response
    {
        //
    }

    private function generateTrackingNumber() {
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
