<?php

declare(strict_types=1);

use App\Http\Controllers\ClientController;
use App\Http\Controllers\ClientControllerForEmployees;
use App\Http\Controllers\ClientProfileController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\EmployeeProfileController;
use App\Http\Controllers\OfficeController;
use App\Http\Controllers\PackageController;
use App\Http\Middleware\AdminAuthenticatedEmployee;
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
    Route::get('/clients/me/profile/summary', [ClientProfileController::class, 'summaryForMe']);
    Route::put('/clients/me/profile', [ClientProfileController::class, 'update']);
    Route::post('/clients/me/change-password', [ClientController::class, 'changePassword']);

    Route::post('/clients/packages', [PackageController::class, 'storeFromClient']);
    Route::get('/clients/packages/{package}', [PackageController::class, 'showForClient']);
    Route::get('/clients/packages', [PackageController::class, 'indexForClient']);
    Route::get('/clients/offices/all', [OfficeController::class, 'all']);
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
    Route::post('/employees/me/change-password', [EmployeeController::class, 'changePassword']);
    Route::get('/employees/me/profile', [EmployeeProfileController::class, 'forMe']);
    Route::put('/employees/me/profile', [EmployeeProfileController::class, 'store']);
    Route::post('/employees/me/profile-picture', [EmployeeProfileController::class, 'setProfilePicture']);
    Route::delete('/employees/me/profile-picture', [EmployeeProfileController::class, 'removeProfilePicture']);

    Route::middleware(AdminAuthenticatedEmployee::class)->group(function () {
        Route::get('/employees/employees', [EmployeeController::class, 'listing']);
        Route::get('/employees/employees/{employee}', [EmployeeController::class, 'get']);
        Route::put('/employees/employees/{employee}', [EmployeeController::class, 'update']);
        Route::post('/employees/employees', [EmployeeController::class, 'create']);
        Route::delete('/employees/employees/{employee}', [EmployeeController::class, 'delete']);
    });

    Route::get('/employees/clients', [ClientControllerForEmployees::class, 'index']);
    Route::get('/employees/clients/all', [ClientControllerForEmployees::class, 'all']);
    Route::get('/employees/clients/{client}', [ClientControllerForEmployees::class, 'get']);

    Route::post('/employees/packages', [PackageController::class, 'storeFromOffice']);
    Route::get('/employees/packages', [PackageController::class, 'index']);
    Route::get('/employees/packages/{package}', [PackageController::class, 'show']);
    Route::put('/employees/packages/{package}/deliver', [PackageController::class, 'markAsDelivered']);

    /*
     * Route::get('/employees/offices');
     * Route::get('/employees/offices/{office}');
     * Route::post('/employees/offices');
     * Route::put('/employees/offices/{office}');
     */

    Route::get('/employees/offices', [OfficeController::class, 'index']);
    Route::delete('/employees/offices/{office}', [OfficeController::class, 'delete']);
    Route::post('/employees/offices/{office}/activate', [OfficeController::class, 'activate']);
    Route::get('/employees/offices/{office}', [OfficeController::class, 'get']);
    Route::get('/employees/offices/all', [OfficeController::class, 'all']);
});

Route::match(['get', 'post', 'put', 'delete'], '/{any}', function () {
    return response()->json(['message' => 'Not found'], 404);
})->where('any', '.*');
