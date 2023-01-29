<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\Store;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Product $product)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product)
    {
        //
    }

    public function getProductByCategory(Request $request) {
        $category = $request->category;

        $pid = ProductCategory::select('pid')
        ->join('category', 'category.id', '=', 'product_category.category_id');
        if ($category) {
            $pid = $pid->where('category.title', 'like', $category);
        }
        $product = Product::whereIn('pid', $pid)->get();
        return response()->json([
            'status' => 'success',
            'products' => $product,
        ], 200);
    }

  
    public function findProductById(Request $request)
    {
        $id = $request->id;
        $product = Product::find($id);
        return response()->json([
            $product
        ], 200);
    }


    public function getProductBySid(Request $request){
        $sid = $request->sid;
        $product = Product::where('sid', $sid)->get();
        
        return response()->json([
            'status' => 'success',
            'data' => $product,
        ], 200);
    }

    public function findProductByStoreId($id)
    {
        $products = Product::where('sid', $id)->get();
        return response()->json($products);
    }


    public function deleteProductByPId($pid)
    {
        $product = Product::find($pid);
        $product->delete();
        return response()->json($product);
    }
}
