<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class OrderItemResource extends JsonResource
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
              
            'pid' => $this->pid,
            'quantity' => $this->quantity,
            'price' => $this->price,
            'pid' => $this->pid,
            'title' => $this->title,
            'img' => $this->img,
          
            
        ];
        
        
    }
}
