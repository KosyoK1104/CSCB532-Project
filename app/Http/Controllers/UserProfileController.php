<?php

namespace App\Http\Controllers;

use App\Models\User\UserProfile;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class UserProfileController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index() : Response
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param UserProfile $userProfile
     * @return Response
     */
    public function show(UserProfile $userProfile) : Response
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param UserProfile $userProfile
     * @return Response
     */
    public function update(Request $request, UserProfile $userProfile) : Response
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param UserProfile $userProfile
     * @return Response
     */
    public function destroy(UserProfile $userProfile) : Response
    {
        //
    }
}
