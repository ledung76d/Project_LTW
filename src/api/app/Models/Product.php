<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',
        'name',
        'price',
        'quantity',
    ];
    protected $table = 'product';
    /**
     * Get the order that owns the product.
     */

    public function order()
    {
        return $this->belongsToMany(Order::class);
    }

    /**
     * Get the product category that owns the product.
     */

    public function product_category()
    {
        return $this->hasMany(ProductCategory::class);
    }

    /**
     * Get the category that owns the product.
     */

    public function store()
    {
        return $this->belongsTo(Store::class);
    }

    

    
     

}
