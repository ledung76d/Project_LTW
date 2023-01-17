<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class product_category extends Model
{
    use HasFactory;



    /**
     * Get the product that owns the product_category.
     */

    public function products()
    {
        return $this->belongsTo(product::class);
    }

    /**
     * Get the category that owns the product_category.
     */

    public function categories()
    {
        return $this->belongsTo(category::class);
    }

}
