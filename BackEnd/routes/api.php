<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::prefix('v1')->group(function(){
    Route::resource('products', \App\Http\Controllers\Api\v1\ProductController::class)->names('products');
    Route::resource('users', \App\Http\Controllers\Api\v1\UserController::class)->names('users');
})->name('api.v1');
