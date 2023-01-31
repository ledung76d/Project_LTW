<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Store extends Model
{
    use HasFactory;
    protected $table = 'store';

    // define primary key
    protected $primaryKey = 'sid';
    public $incrementing = false;

    // define fillable
    protected $fillable = [
        'sid',
        'address',
        'phone',
        'store_name',
        'content',
        'picture',
    ];

    /**
     * Get the products for the store.
     */
    public function product()
    {
        return $this->hasMany(Product::class);
    }
    

    
 
    
}
