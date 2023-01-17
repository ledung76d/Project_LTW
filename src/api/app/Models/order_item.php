<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class order_item extends Model
{
    use HasFactory;

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
