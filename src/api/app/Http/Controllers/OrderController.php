<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function saveOrder(Request $request)
    {
        $user = Auth::user();
        if($user){
            try {
                $order = Order::create([
                    'order_id' => $request->orderId,
                    'cid' => $user->id,
                    'status' => $request->status,
                    'total' => $request->total,
                    'phone' => $request->phone,
                    'address' => $request->address,
                    'delivery' => $request->delivery,
                ]);
                return response()->json([
                    'status' => 'success',
                    'order' => $order
                ], 200);
            } catch (\Throwable $th) {
                return response()->json([
                    'status' => 'error',
                    'message' => $th->getMessage()
                ], 500);
            }
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'User not found'
            ], 404);
        }
    }
}
