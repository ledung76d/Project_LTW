<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductCategory extends Model
{
    use HasFactory;
    protected $table = 'product_category';

    /** 
     * Primary key associated with the table.
     */
   

    /**
     * Get the product that owns the product_category.
     */

    public function product()
    {
        return $this->belongsTo(Product::class,'pid');
    }

    /**
     * Get the category that owns the product_category.
     */

    public function category()
    {
        return $this->belongsTo(Category::class,'category_id');
    }
}
