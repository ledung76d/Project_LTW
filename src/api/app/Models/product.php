<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class product extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',
        'name',
        'price',
        'quantity',
    ];

    /**
     * Get the order that owns the product.
     */

    public function order()
    {
        return $this->belongsToMany(order::class);
    }

    /**
     * Get the category that owns the product.
     */
    public function category()
    {
        return $this->belongsToMany(category::class);
    }
    
    /**
     * Get the category that owns the product.
     */

    public function store()
    {
        return $this->belongsTo(store::class);
    }

    
}
