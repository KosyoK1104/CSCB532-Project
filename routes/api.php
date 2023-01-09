<?php

declare(strict_types=1);

use App\Http\Controllers\ClientController;
use App\Http\Controllers\ClientProfileController;
use App\Http\Controllers\EmployeeController;
use App\Http\Middleware\AuthenticatedClient;
use App\Http\Middleware\AuthenticatedEmployee;
use App\Http\Middleware\UnauthenticatedClient;
use App\Http\Middleware\UnauthenticatedEmployee;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
/*
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});*/

Route::middleware(UnauthenticatedClient::class)->group(function () {
    Route::post('/clients/register', [ClientController::class, 'store']);
    Route::post('/clients/login', [ClientController::class, 'login']);
});
Route::middleware(AuthenticatedClient::class)->group(function () {
    Route::get('/clients/me', [ClientController::class, 'me']);
    Route::post('/clients/logout', [ClientController::class, 'logout']);
    Route::get('/clients/me/profile', [ClientProfileController::class, 'forMe']);
    /*
     * TODO implement these
    Route::get('/clients/packages', [\App\Http\Controllers\PackageController::class, 'index']);
    Route::post('/clients/packages', [\App\Http\Controllers\PackageController::class, 'create']);
    Route::get('/clients/packages/{package}', [\App\Http\Controllers\PackageController::class, 'get']);
    */

    /*
     * Route::get('/clients/offices);
     */
});

Route::middleware(UnauthenticatedEmployee::class)->group(callback: function () {
    Route::post('/employees/register', [EmployeeController::class, 'store']);
    Route::post('/employees/login', [EmployeeController::class, 'login']);
});

Route::middleware(AuthenticatedEmployee::class)->group(function () {
    Route::get('/employees/me', [EmployeeController::class, 'me']);
    Route::post('/employees/logout', [EmployeeController::class, 'logout']);
    Route::post('/employees/password', [EmployeeController::class, 'changePassword']);

    //Route::delete('/employees/clients/{client}', [ClientControllerForEmployee::class, 'destroy']);


    /*
     * TODO implement these
    Route::get('/emoloyees/packages', [\App\Http\Controllers\PackageControllerForEmployee::class, 'index']);
    Route::get('/emoloyees/packages/{package}', [\App\Http\Controllers\PackageControllerForEmployee::class, 'get']);
    Route::get('/emoloyees/clients/{client}/packages', [\App\Http\Controllers\PackageControllerForEmployee::class, 'forClient']);
    Route::get('/emoloyees/clients/{client}/packages/{package}', [\App\Http\Controllers\PackageControllerForEmployee::class, 'forClient']);
    Route::get('/emoloyees/packages/{package}/receive', [\App\Http\Controllers\PackageControllerForEmployee::class, 'receive']);
    Route::get('/emoloyees/packages/{package}/give', [\App\Http\Controllers\PackageControllerForEmployee::class, 'give']);
    Route::get('/emoloyees/packages/{package}/in-office', [\App\Http\Controllers\PackageControllerForEmployee::class, 'inOffice']);
    Route::get('/emoloyees/packages/{package}/in-warehouse', [\App\Http\Controllers\PackageControllerForEmployee::class, 'inWarehouse']);
    */

    /*
     * TODO implement these
     * Route::get('/employees/offices);
     * Route::get('/employees/offices/{office});
     * Route::post('/employees/offices);
     * Route::put('/employees/offices/{office});
     * Route::delete('/employees/offices/{offices});
     */
});



