<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::prefix('v1')->group(function () {
    Route::get('products', [\App\Http\Controllers\Api\v1\ProductController::class, 'index']);

    //Getting four expensive products
    Route::get('products/get-four-expensive-products', [\App\Http\Controllers\Api\v1\ProductController::class, 'getTopFourExpensiveProducts']);

    //Getting four cheap products
    Route::get('products/get-four-cheap-products', [\App\Http\Controllers\Api\v1\ProductController::class, 'getTopFourCheapProducts']);

    Route::get('users', [\App\Http\Controllers\Api\v1\UserController::class, 'index']);
})->name('api.v1');

