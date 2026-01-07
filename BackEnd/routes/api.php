<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix('v1')->group(function () {
    Route::get('products', [\App\Http\Controllers\Api\v1\ProductController::class, 'index']);

    //Getting four expensive products
    Route::get('products/get-four-expensive-products', [\App\Http\Controllers\Api\v1\ProductController::class, 'getTopFourExpensiveProducts']);

    //Getting four cheap products
    Route::get('products/get-four-cheap-products', [\App\Http\Controllers\Api\v1\ProductController::class, 'getTopFourCheapProducts']);

    Route::get('users', [\App\Http\Controllers\Api\v1\UserController::class, 'index']);

    Route::get('categories', [\App\Http\Controllers\Api\v1\CategoryController::class, 'index']);

    Route::middleware('auth:sanctum')->prefix('dashboard')->group(function (){
        Route::post('products', function(){
            return "welcome to my home!";
        });
    });

    Route::post('register', [\App\Http\Controllers\Api\v1\AuthController::class, 'register'])->name('register');

    Route::post('login', [\App\Http\Controllers\Api\v1\AuthController::class, 'login'])->name('login');
})->name('api.v1');

