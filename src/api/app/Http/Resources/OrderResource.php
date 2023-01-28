<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

use App\Http\Resources\OrderItemResource;
class OrderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'orderId' => $this->order_id,
            'cid' => $this->cid,
            'status' => $this->status,
            'total' => $this->total,
            'phone' => $this->phone,
            'address' => $this->address,
            'delivery' => $this->delivery,
            'updatedAt' => $this->updated_at,
            'createdAt' => $this->created_at,

            // 'orderItems' => OrderItemResource::collection($this->orderItems),
            'pid' => $this->pid,
            'quantity' => $this->quantity,
            'price' => $this->price,
          
            
        ];
        
        
    }
}
