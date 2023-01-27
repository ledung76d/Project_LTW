<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;
    // define table name
    protected $table = 'category';
    // define primary key
    protected $primaryKey = 'id';
    /**
     * Get the product_category for the category.
     */
    public function product_category()
    {
        return $this->hasMany(ProductCategory::class);
    }

    
}
