<?php

declare(strict_types=1);

use App\Http\Controllers\ClientController;
use App\Http\Middleware\AuthenticatedClient;
use App\Http\Middleware\UnauthenticatedClient;
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
    Route::get('/clients/{client}', [ClientController::class, 'show']);
    Route::post('/clients/logout', [ClientController::class, 'logout']);
});

Route::delete('/clients/{client}/delete', [ClientController::class, 'destroy']);


