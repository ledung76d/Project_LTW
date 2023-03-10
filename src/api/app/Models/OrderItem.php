<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    use HasFactory;
    protected $table = 'order_item';
    protected $fillable = [
        'order_id',
        'pid',
        'quantity',
        'price',
    ];
    protected $primaryKey = null;
    public $incrementing = false;
    /* get the order that owns the order_item */
    public function order()
    {
        return $this->belongsTo(Order::class, 'order_id');
    }

    /* get the product that owns the order_item */
    public function product()
    {
        return $this->belongsTo(Product::class, 'pid');
    }
}
