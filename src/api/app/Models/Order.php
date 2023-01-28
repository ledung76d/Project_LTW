<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        
        'user_id',
        'cid',
        'order_id',
        'total',
        'status',
        'phone',
        'address',
        'delivery'
    ];
    protected $table = 'order';
    // define primary key
    protected $primaryKey = 'order_id';
    // disable auto increment
    public $incrementing = false;
    /**
     * Get the user that owns the order.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the order_items for the order.
     */

    public function order_items()
    {
        return $this->hasMany(OrderItem::class);
    }
}
