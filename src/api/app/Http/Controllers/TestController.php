<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class TestController extends Controller
{
    public function test(Request $request)
    {
        $user = Auth::user();
        return response()->json([
            'message' => 'Hello,'
        ], 200);
    }
}