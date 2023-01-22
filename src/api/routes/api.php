<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TestController;
use App\Http\Controllers\ProductController;

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

Route::middleware(['api'])->group(function () {
    Route::get('/test', [TestController::class, 'test']);

    //Product
    Route::get('/get-product/{category}', [ProductController::class, 'getProductbyCategory']);
    Route::get('/get-category-by-id/{id}', [ProductController::class, 'getCategorybyId']);
    Route::get('/get-store-by-id/{id}', [ProductController::class, 'getStorebyId']);
    Route::post('/save-to-order-item', [ProductController::class, 'saveToOrderItem']);
    Route::get('/find-order-by-id/{id}', [ProductController::class, 'findOrderById']);
    Route::get('/find-product-by-id/{id}', [ProductController::class, 'findProductById']);

    //User
    Route::get('/find-order-by-userid/{id}', [UserController::class, 'findOrderByUserId']);
    Route::post('/save-order', [UserController::class, 'saveOrder']);
});
