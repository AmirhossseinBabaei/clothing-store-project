<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\v1\AuthController;
use App\Http\Controllers\Api\v1\ProductController;
use App\Http\Controllers\Api\v1\CategoryController;
use App\Http\Controllers\Api\v1\UserController;
use App\Http\Controllers\Api\v1\ContactController;
use App\Http\Controllers\Api\v1\SliderController;

Route::get('user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix('v1')->group(function () {
//    Authentication Routes
    Route::post('register', [AuthController::class, 'register'])->name('register');
    Route::post('login', [AuthController::class, 'login'])->name('login');
//    --------------------

//    Website Data Routes
//    Products
    Route::get('products', [ProductController::class, 'index']);
    Route::get('products/get-four-expensive-products', [ProductController::class, 'getTopFourExpensiveProducts']);
    Route::get('products/get-four-cheap-products', [ProductController::class, 'getTopFourCheapProducts']);
//    Categories
    Route::get('categories', [CategoryController::class, 'index']);
//    Sliders
    Route::get('sliders', [SliderController::class, 'index']);
// ------------

//    Dashboard Routes
    Route::middleware('auth:sanctum')->prefix('dashboard')->group(function () {
//        Products
        Route::get('products/get-products-count', [ProductController::class, 'getProductsCount']);
        Route::post('products/create-product', [ProductController::class, 'createProduct']);
        Route::post('products/{id}/update-product', [ProductController::class, 'updateProduct']);
        Route::post('products/{id}/delete-product', [ProductController::class, 'destroyProduct']);
//        Sliders
        Route::post('sliders/create-slider', [SliderController::class, 'createSlider']);
        Route::post('sliders/{id}/update-slider', [SliderController::class, 'updateSlider']);
        Route::post('sliders/{id}/delete-slider', [SliderController::class, 'destroySlider']);
//        Users
        Route::get('users', [UserController::class, 'index']);
        Route::get('users/get-users-count', [UserController::class, 'getUsersCount']);
        Route::post('users/create-user', [UserController::class, 'createUser']);
        Route::post('users/{id}/update-user', [UserController::class, 'updateUser']);
        Route::post('users/{id}/delete-user', [UserController::class, 'destroyUser']);
//        Categories
        Route::post('categories/create-category', [UserController::class, 'createCategory']);
        Route::post('categories/{id}/update-category', [UserController::class, 'updateCategory']);
        Route::post('categories/{id}/delete-category', [UserController::class, 'destroyCategory']);
//        Contacts
        Route::get('contacts/get-contacts-count', [ContactController::class, 'getContactCount']);
        Route::get('contacts', [ContactController::class, 'index']);
    });
})->name('api.v1');
