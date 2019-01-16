<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Response;

class UserController extends Controller
{
    public function users(Request $request)
    {
        return Response::json([
            "users" => User::all(),
        ]);
    }
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'bio' => ['required', 'string'],
            'role' => ['required', 'string'],
            'password' => ['required', 'string', 'min:6'],
            'photo' => 'required',
        ]);
        $data['password'] = Hash::make($data['password']);
        $user = User::create($data);
        return Response::json([
            "user" => $user,
        ]);

    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user, $id)
    {
        $user->find($id)->delete();
        return Response::json([
            "deleted" => $id,
        ]);

        // return $id;
    }
}
