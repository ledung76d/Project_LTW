<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductCategory extends Model
{
    use HasFactory;
    protected $table = 'product_category';


    /**
     * Get the product that owns the product_category.
     */

    public function products()
    {
        return $this->belongsTo(Product::class);
    }

    /**
     * Get the category that owns the product_category.
     */

    public function categories()
    {
        return $this->belongsTo(Category::class);
    }
}
