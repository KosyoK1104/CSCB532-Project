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
});

Route::middleware(UnauthenticatedEmployee::class)->group(callback: function () {
    Route::post('/employees/register', [EmployeeController::class, 'store']);
    Route::post('/employees/login', [EmployeeController::class, 'login']);
});

Route::middleware(AuthenticatedEmployee::class)->group(function () {
    Route::delete('/clients/{client}/delete', [ClientController::class, 'destroy']);
    Route::post('/employees/logout', [EmployeeController::class, 'logout']);
    Route::post('/employees/password', [EmployeeController::class, 'changePassword']);

});



