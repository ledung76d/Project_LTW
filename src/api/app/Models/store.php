<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class store extends Model
{
    use HasFactory;

    /**
     * Get the products for the store.
     */
    public function products()
    {
        return $this->hasMany(product::class);
    }
    
}
