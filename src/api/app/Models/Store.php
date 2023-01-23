<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Store extends Model
{
    use HasFactory;
    protected $table = 'store';
    /**
     * Get the products for the store.
     */
    public function product()
    {
        return $this->hasMany(Product::class);
    }
    
}
