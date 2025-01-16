<?php

namespace App\Http\Controllers;

use App\Models\PasswordResetToken;
use App\Mail\ResetPasswordMail;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\DB; 
use Illuminate\Support\Facades\Mail; 


/**
 * @OA\Info(
 *     version="1.0.0",
 *     title="Auth API",
 *     description="API Endpoints for User Authentication"
 * )
 */



class AuthController extends Controller
{
   

     /**
     * @OA\Post(
     *     path="/register",
     *     summary="Register a new user",
     *     tags={"Auth"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"name", "email", "password", "password_confirmation"},
     *             @OA\Property(property="name", type="string", example="John Doe"),
     *             @OA\Property(property="email", type="string", example="john@example.com"),
     *             @OA\Property(property="password", type="string", example="password123"),
     *             @OA\Property(property="password_confirmation", type="string", example="password123"),
     *             @OA\Property(property="role", type="string", example="user")
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="User created successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="User created successfully"),
     *             @OA\Property(property="token", type="string", example="your-jwt-token")
     *         )
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Validation failed"
     *     )
     * )
     */
    public function register(Request $request)
{
    try {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'role' => 'nullable|string|in:user,admin',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => $validated['role'] ?? 'user',
        ]);

        $token = $user->createToken('YourAppName')->plainTextToken;

        return response()->json([
            'message' => 'User created successfully',
            'token' => $token,
        ], 201);


    } catch (\Illuminate\Validation\ValidationException $e) {
        return response()->json([
            'message' => 'Validation failed',
            'errors' => $e->errors(),
        ], 422);
    } catch (\Exception $e) {
        return response()->json([
            'message' => 'Registration failed',
            'error' => $e->getMessage(),
        ], 500);
    }
}


/**
     * @OA\Post(
     *     path="/login",
     *     summary="Login a user",
     *     tags={"Auth"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"email", "password"},
     *             @OA\Property(property="email", type="string", example="john@example.com"),
     *             @OA\Property(property="password", type="string", example="password123")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Login successful",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Login successful"),
     *             @OA\Property(property="token", type="string", example="your-jwt-token"),
     *             @OA\Property(property="user", type="object",
     *                 @OA\Property(property="id", type="integer", example=1),
     *                 @OA\Property(property="name", type="string", example="John Doe"),
     *                 @OA\Property(property="role", type="string", example="user")
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Invalid login details"
     *     )
     * )
 */
    
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
        'user' => [
            'id' => $user->id,
            'name' => $user->name,
            'role' => $user->role, 
        ],
    ]);
}


/**
     * @OA\Post(
     *     path="/logout",
     *     summary="Logout a user",
     *     tags={"Auth"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Response(
     *         response=200,
     *         description="Logged out successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Logged out successfully")
     *         )
     *     )
     * )
     */

    
    public function logout(Request $request)
    {
        if (Auth::user()) {
            $request->user()->tokens()->delete();
        }

        Auth::logout();

      

        return response()->json([
            'message' => 'Logged out successfully',
        ]);
    }

/**
     * @OA\Post(
     *     path="/forgot-password",
     *     summary="Send a password reset link",
     *     tags={"Auth"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"email"},
     *             @OA\Property(property="email", type="string", example="john@example.com")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Password reset link sent!"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="User not found"
     *     )
     * )
     */

    public function forgotPassword(Request $request)
{
    $request->validate(['email' => 'required|email']);

    $user = User::where('email', $request->email)->first();
    if (!$user) {
        return response()->json(['message' => 'User not found'], 404);
    }

    $token = Str::random(64);
    PasswordResetToken::create([
        'email' => $user->email,
        'token' => $token,
        'created_at' => now(),
    ]);

    $resetLink = url("/reset-password/{$token}");

    // Send email
    Mail::to($user->email)->send(new ResetPasswordMail($resetLink));

    return response()->json(['message' => 'Password reset link sent!']);
}

/**
     * @OA\Post(
     *     path="/reset-password",
     *     summary="Reset a user's password",
     *     tags={"Auth"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"token", "password", "password_confirmation"},
     *             @OA\Property(property="token", type="string", example="reset-token"),
     *             @OA\Property(property="password", type="string", example="newpassword123"),
     *             @OA\Property(property="password_confirmation", type="string", example="newpassword123")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Password has been reset successfully"
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Invalid or expired token"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="User not found"
     *     )
     * )
     */


public function resetPassword(Request $request)
{
    // Validate the input
    $request->validate([
        'token' => 'required|string',
        'password' => 'required|string|min:8|confirmed', // Ensure password matches confirmation
    ]);

    // Find the password reset token in the database
    $passwordResetToken = PasswordResetToken::where('token', $request->token)->first();

    // Check if token exists
    if (!$passwordResetToken) {
        return response()->json(['message' => 'Invalid or expired token'], 400);
    }

    // Find the user by the email associated with the token
    $user = User::where('email', $passwordResetToken->email)->first();

    // Ensure user exists
    if (!$user) {
        return response()->json(['message' => 'User not found'], 404);
    }

    // Hash and update the user's password
    $user->password = Hash::make($request->password);
    $user->save();

    // Delete the token after it has been used
    $passwordResetToken->delete();

    // Return a success response
    return response()->json(['message' => 'Password has been reset successfully']);
}




}

