<?php

namespace App\Http\Controllers;

use App\Models\Store;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Resources\StoreResource;
use App\Http\Resources\OrderResource;
use App\Http\Resources\OrderItemResource;
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

    public function getOrderBySid(Request $request) {
       
        $sid = $request->sid;
        $orderId = Order::select('order.order_id')->distinct()
        ->join('order_item', 'order.order_id', '=', 'order_item.order_id')
        ->join('product', 'order_item.pid', '=', 'product.pid')
        ->where('sid', $sid)->get();
        $order = Order::whereIn('order_id', $orderId)->get();
        $orderRes = OrderResource::collection($order);
        return response()->json(
            $orderRes
        );

    } 
    
    
    public function getOrderItemBySidOrderId(Request $request) {
        
        $sid = $request->sid;
        $orderId = $request->orderId;
        $orderItem = OrderItem::select('order.order_id', 'order_item.price', 'order_item.quantity', 'order_item.pid', 'product.title', 'product.img')
        ->join('order', 'order_item.order_id', '=', 'order.order_id')
        ->join('product', 'order_item.pid', '=', 'product.pid')
        ->where('sid', $sid)
        ->where('order.order_id', $orderId)
        ->get();
        $orderItemRes = OrderItemResource::collection($orderItem);

        return response()->json(
            $orderItemRes,

        );

    }

    public function changeOrderStatus(Request $request) {
        
        $orderId = $request->orderId;
        $status = $request->status;
      
        $order = Order::where('order_id', $orderId)->update(['status' => $status]);
        return response()->json([
            'status' => 'success',
            'err' => 4,
            'order' => $order,
        ], 200);
    }

    public function getProductByStoreId(Request $request){
       
        $sid = $request->sid;
        $product = Product::where('sid', $sid)->get();
        
        return response()->json(
            
            [ 'products' => $product
], 200        );
    }

    public function addNewProductByStore(Request $request){
        
        
        $product = Product::create([
             

            'title' => $request->title,
            'price' => $request->price,
            'quantity' => $request->quantity,
            'sid' => $user->id,
            'discount' => $request->discount,
            'img' => $request->img,
            'content' => $request->content,
            'unit' => $request->unit,
        
        ]);
        return response()->json([
            'status' => 'success',
            'data' => $product,
        ], 200);
    }

    public function updateProductByStore(Request $request){
        $pid = $request->pid;
        $product = Product::where('pid', $pid)->update([
            'title' => $request->title,
            'price' => $request->price,
            'quantity' => $request->quantity,
            'discount' => $request->discount,
            'img' => $request->img,
            'content' => $request->content,
            'unit' => $request->unit,
        ]);
        return response()->json([
            'status' => 'success',
            'data' => $product,
        ], 200);
    }
}
