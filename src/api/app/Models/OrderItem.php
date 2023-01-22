<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    use HasFactory;
    protected $table = 'order_item';
    /* get the order that owns the order_item */
    public function order()
    {
        return $this->belongsTo(order::class);
    }

    /* get the product that owns the order_item */
    public function product()
    {
        return $this->belongsTo(product::class);
    }
}
