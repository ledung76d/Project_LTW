<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;   
use App\Models\ProductCategory;


class CategoryController extends Controller
{
    
    public function getCategoryById(Request $request)
    {
       $id = $request->id;
       $category = ProductCategory::join('category', 'category.id', '=', 'product_category.category_id') 
        ->where('product_category.pid', $id)->get();
        return response()->json([
            'status' => 'success',
            'category' => $category
        ], 200);
    }
  
  public function getAllCategory()
    {
        $category = Category::all();
        return response()->json($category);
    }
}
