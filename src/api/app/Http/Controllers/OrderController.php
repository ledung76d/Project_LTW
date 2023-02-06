<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Resources\OrderResource;
use App\Models\Category;
use App\Models\ProductCategory;

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
        $user = Auth::user();
        if ($user) {
            $orderItem = OrderItem::create([
                'order_id' => $request->orderId,
                'pid' => $request->pid,
                'quantity' => $request->quantity,
                'price' => $request->price,
            ]); 
            
            $product = Product::find($request->pid) ->decrement('quantity', $request->quantity);
                
            return response()->json([
                $orderItem,
                    $product
            ] , 200);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'User not found'
            ], 404);
        }
    }

    public function findOrderById(Request $request)
    {
        $user = Auth::user();
        if(!$user){
            return response()->json([
                'status' => 'error',
                'message' => 'User not found'
            ], 404);
        }
        $order = Order::select('order.*', 'order_item.*')
        ->join('order_item', 'order.order_id', '=', 'order_item.order_id')
        ->where('order.order_id', $request->id)
        ->get();
        $orderRes = OrderResource::collection($order);
        return response()->json(
                $orderRes
        , 200);   
    }

    public function findOrderByUserId(Request $request)
    {
        $user = Auth::user();
        if($user){
            $order = Order::where('cid', $user->id)->get();
            $orderRes = OrderResource::collection($order);
            return response()->json(
                $orderRes
            , 200);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'User not found'
            ], 404);
        }
    }

    public function productPopular() {
        $user = Auth::user();
        if($user){
            $data = Order::select('order_item.pid', OrderItem::raw('SUM(order_item.quantity) as total'))
            ->join('order_item', 'order.order_id', '=', 'order_item.order_id')->groupBy('order_item.pid')->orderBy('total', 'desc')->limit(5)->get();
            
        // get pid from data
            $pid = $data->pluck('pid');
            
            // get product from pid

            for($i = 0; $i < count($data); $i++){
                $data[$i]['product'] =  Product::where('pid', $data[$i]['pid'])->first();
            }

            $result = [];
            foreach($data as $item){
                if($item['product']['sid'] != $user->id) continue;
                
                $result[] = [
                    'pid' => $item['pid'],
                    'total' => $item['total']? $item['total'] : 0,
                    'product' => $item['product']
                ];
            }

        
            return response()->json(
                [
                    'status' => 'success',
                    'data' =>  $result,
                ]
            , 200);
         } else {
            return response()->json([
                'status' => 'error',
                'message' => 'User not found'
            ], 404);
        }
    }

    public function productChart () {

    }
}
