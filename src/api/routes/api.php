<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TestController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\StoreController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProductCategoryController;

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
    //Order
    Route::post('/save-order', [OrderController::class, 'saveOrder']); 
    Route::get('/find-order-by-id', [OrderController::class, 'findOrderById']);
    Route::post('/save-to-order-item', [OrderController::class, 'saveToOrderItem']);
    Route::get('/find-order-by-userid', [OrderController::class, 'findOrderByUserId']);
    // Admin
    Route::post('/admin/register', [StoreController::class, 'register']);
    Route::get('/admin/get-order-by-sid', [StoreController::class, 'getOrderBySid']);
    Route::get('/get-order-item-by-sid-orderid', [StoreController::class, 'getOrderItemBySidOrderId']);
    Route::post('/change-order-status', [StoreController::class, 'changeOrderStatus']);
    Route::get('/get-product-by-storeId', [StoreController::class, 'getProductByStoreId']);
    Route::post('/add-new-product-by-store', [StoreController::class, 'addNewProductByStore']);
    Route::post('/search-by-filter', [StoreController::class, 'searchByFilter']);
    Route::get('/admin/analysis-line-chart', [StoreController::class, 'getAnalysisStore']);

    // /api/total30day?sid=1
    Route::get('/total30day', [StoreController::class, 'total30day']);
    Route::get('/handleOrder30day', [StoreController::class, 'handleOrder30day']);
    Route::get('/totalrevenue', [StoreController::class, 'totalrevenue']);
    Route::post('/update-product-by-store', [StoreController::class, 'updateProductByStore']);
    Route::get('/admin/product-popular', [OrderController::class, 'productPopular']);

    //User
    Route::get('/user/get-info-user', [UserController::class, 'getInfoUser']);
    Route::post('/user/save-info-user', [UserController::class, 'saveInfoUser']);
    Route::get('/get-userinfo-by-cid', [UserController::class, 'getUserInfoByCId']);
    // Route::get('/total30day', [UserController::class, 'total30day']);
    
    //ProductCategory
    Route::post('/add-product-category', [ProductCategoryController::class, 'addProductCategory']);

    //Upload Image
    Route::post('/cloudinary-upload', [ProductController::class, 'cloudinaryUpload']);

    Route::post('/delete-product-by-pid', [ProductController::class, 'deleteProductByPId']);
    Route::post('/restore-product-by-pid', [ProductController::class, 'restoreProductByPId']);
});

Route::post('/update-store-info', [StoreController::class, 'updateStoreInfo']);

Route::get('/admin/product-chart', [OrderController::class, 'productChart']);

//Product
Route::get('/get-product', [ProductController::class, 'getProductByCategory']);
Route::get('/get-category-by-id', [CategoryController::class, 'getCategoryById']);
Route::get('/find-product-by-id', [ProductController::class, 'findProductById']);
Route::get('/get-product-by-sid', [ProductController::class, 'getProductBySid']);
Route::get('/search-by-name', [ProductController::class, 'searchByName']);

Route::get('/find-product-by-store-id/{id}', [ProductController::class, 'findProductByStoreId']);
//Store
Route::get('/get-store-by-id', [StoreController::class, 'getStoreById']);
Route::get('/get-all-category', [CategoryController::class, 'getAllCategory']);

// For probe
Route::get('/health', function () {
    return response()->json([
        'status' => 'OK'
    ]);
});
