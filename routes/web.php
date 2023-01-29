<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//get file url
Route::get('/storage/{path}', function (\Symfony\Component\HttpFoundation\Request $request){
    $path = $request->path();
    $path = str_replace('storage/', '', $path);
    return Storage::get($path);
})->where('path', '.*');

Route::get('{any}', function () {
    return view('index');
})->where('any', '.*');
