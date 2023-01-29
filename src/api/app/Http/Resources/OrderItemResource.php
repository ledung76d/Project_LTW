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
            /*pid serial NOT NULL,
    title VARCHAR ( 50 ) NOT NULL,
    price decimal(7,2) NOT NULL,
    quantity INT NOT NULL DEFAULT 0,
    "sid" VARCHAR ( 50 ) NOT NULL,
    created_at TIMESTAMP NOT NULL,
	update_at TIMESTAMP NOT NULL,
    discount INT NOT NULL DEFAULT 0,
    img text not null,
    content text NULL DEFAULT NULL,
    unit VARCHAR ( 20 ) NOT NULL,*/

           
            'pid' => $this->pid,
            'quantity' => $this->quantity,
            'price' => $this->price,
            'pid' => $this->pid,
            'title' => $this->title,
            'img' => $this->img,
          
            
        ];
        
        
    }
}
