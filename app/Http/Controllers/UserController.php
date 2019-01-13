<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
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
            'password' => ['required', 'string', 'min:6'],
        ]);
        $user = User::create($data);
        return Response::json([
            "user" => $user,
        ]);

    }
}
