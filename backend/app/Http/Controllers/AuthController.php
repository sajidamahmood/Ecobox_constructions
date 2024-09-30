<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /**
     * Register a new user.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        // Generate a token for the user (assuming you're using Sanctum or Passport)
        $token = $user->createToken('YourAppName')->plainTextToken;

        return response()->json([
            'message' => 'User created successfully',
            'token' => $token,
        ], 201);
    }

    
    public function login(Request $request)
{
    $credentials = $request->validate([
        'email' => 'required|email',
        'password' => 'required',
    ]);

    if (!Auth::attempt($credentials)) {
        return response()->json([
            'message' => 'Invalid login details'
        ], 401);
    }

    $user = Auth::user();
    $token = $user->createToken('YourAppToken')->plainTextToken;

    return response()->json([
        'message' => 'Login successful',
        'token' => $token,
    ]);
}


    
    public function logout(Request $request)
    {
        // Assuming you're using Sanctum for token-based authentication
        if (Auth::user()) {
            // Revoke all tokens if using Sanctum or Passport
            $request->user()->tokens()->delete();
        }

        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json([
            'message' => 'Logged out successfully',
        ]);
    }
}
