<?php

namespace App\Http\Resources;


use Illuminate\Http\Resources\Json\JsonResource;


class StoreResource extends JsonResource
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
            'sid' => $this->sid,
            'userName' => $this->user_name,
            'passWord' => $this->pass_word,
            'address' => $this->address,
            'phone' => $this->phone,
            'storeName' => $this->store_name,
            'content' => $this->content,
            'createdAt' => $this->created_at,
            'updatedAt' => $this->update_at,
            'img' => $this->img,
        ];
    }
}
