<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TestController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\StoreController;

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

    

});

    //Product
    Route::get('/get-product', [ProductController::class, 'getProductByCategory']);
    Route::get('/get-category-by-id', [ProductController::class, 'getCategoryById']);
    Route::get('/find-product-by-id', [ProductController::class, 'findProductById']);
    
    Route::get('/get-product-by-sid/{sid}', [ProductController::class, 'getProductBySid']);

    Route::get('/find-product-by-store-id/{id}', [ProductController::class, 'findProductByStoreId']);
    Route::get('/delete-product-by-pid/{id}', [ProductController::class, 'deleteProductByPId']);

    //Category
    Route::get('/get-store-by-id', [StoreController::class, 'getStoreById']);



