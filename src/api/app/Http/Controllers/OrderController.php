<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use App\Http\Resources\OrderResource;

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

    public function saveToOrderItem(Request $request)
    {
            
        $orderItem = OrderItem::create([
            'order_id' => $request->orderId,
            'pid' => $request->pid,
            'quantity' => $request->quantity,
            'price' => $request->price,
        ]);
        return response()->json([
           $orderItem
        ], 200);
            
        
    }

    public function findOrderById(Request $request)
    {
       
        //select  DISTINCT * from `order`inner join order_item on `order`.orderId = order_item.orderId where `order`.orderId = "' +id 
        $order = Order::select('order.*', 'order_item.*')
        ->join('order_item', 'order.order_id', '=', 'order_item.order_id')
        ->where('order.order_id', $request->id)
        ->get();
        $orderRes = OrderResource::collection($order);
        return response()->json(
             $orderRes
        , 200);

        
    }
}
