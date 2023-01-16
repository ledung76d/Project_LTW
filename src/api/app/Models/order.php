<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
    ];

    /**
     * Get the user that owns the order.
     */ 
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the products for the order.
     */

    public function products()
    {
        return $this->hasMany(product::class);
    }

}
