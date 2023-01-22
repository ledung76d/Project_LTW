<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;
    // define table name
    protected $table = 'category';
    /**
     * Get the product_category for the category.
     */
    public function product_category()
    {
        return $this->hasMany(product_category::class);
    }

    
}
