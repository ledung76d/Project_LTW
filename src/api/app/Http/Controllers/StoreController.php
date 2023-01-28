<?php

namespace App\Http\Controllers;

use App\Models\Store;
use Illuminate\Http\Request;
use App\Http\Resources\StoreResource;
use Illuminate\Support\Facades\Auth;


class StoreController extends Controller
{
    public function register(Request $request) {
        $user = Auth::user();
        $store = Store::find($user->sid);
        if (!$user) {
            return response()->json([
                'status' => 'error',
                'message' => 'User not found'
            ], 404);
        }
        if ($store) {
            return response()->json([
                'status' => 'error',
                'err' => 1,
                'message' => 'Store already exists'
            ], 400);
        }
        $store = Store::create([
            'sid' => $user->id,
            'phone' => $request->phone,
            'store_name' => $request->storeName,
        ]);
        $storeRes = new StoreResource($store);
        return response()->json([
            'status' => 'success',
            'err' => 4,
            'store' => $storeRes,
        ], 200);
    }
    public function getStoreById(Request $request) {
        $id = $request->id;
        $store = Store::find($id);
        if (!$store) {
            return response()->json([
                'status' => 'error',
                'err' => 1,
                'message' => 'Store not found'
            ], 404);
        }
        $storeRes = new StoreResource($store);
        return response()->json([
            'status' => 'success',
            'err' => 4,
            'store' => $storeRes,
        ], 200);
    }
}
