<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class UserController extends Controller
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
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function getInfoUser(){
        $user = Auth::user();

        if ($user) {
            $info = User::where('id', $user->id)->first();

            return response()->json([
                'status' => 'success',
                'data' => $info
            ], 200);
        }
        
        return response()->json([
            'status' => 'error',
            'message' => 'User not found'
        ], 404);
        
    }

    public function saveInfoUser(Request $request)
    {
        $user = Auth::user();

        if ($user) {
            User::where('id', $user->id)->update([
                'name' => $request->name,
                'phone' => $request->phone,
                'address' => $request->address,
                'picture' => $request->picture
              ]);
            return response()->json([
                'status' => 'success',
                'message' => 'Hello, ' . $request->name . '!',
            ], 200);
        }
        
        return response()->json([
            'status' => 'error',
            'message' => 'User not found'
        ], 404);
    }

    public function getUserInfoByCid(Request $request)
    {
        $cid = $request->cid;
        $user = User::where('id', $cid)->first();

        
            return response()->json(
                
                 [$user]
            , 200);
    }
}
