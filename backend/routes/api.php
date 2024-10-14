<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\TestimonialController;





// Routes for authentication
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');


Route::get('/members', [MemberController::class, 'index']);          // Fetch all members
Route::get('/members/{id}', [MemberController::class, 'show']);      // Fetch a single member by ID
Route::post('/members', [MemberController::class, 'store']);         // Create a new member
Route::put('/members/{id}', [MemberController::class, 'update']);    // Update a member
Route::delete('/members/{id}', [MemberController::class, 'destroy']); // Delete a member


Route::get('/projects', [ProjectController::class, 'index']);
Route::get('/projects/{id}', [ProjectController::class, 'show']);
Route::post('/projects', [ProjectController::class, 'store']);
Route::put('/projects/{id}', [ProjectController::class, 'update']);
Route::delete('/projects/{id}', [ProjectController::class, 'destroy']);




Route::get('/services', [ServiceController::class, 'index']); // Get all services
Route::get('/services/{id}', [ServiceController::class, 'show']); // Get a single service
Route::post('/services', [ServiceController::class, 'store']); // Create a new service
Route::put('/services/{id}', [ServiceController::class, 'update']); // Update an existing service
Route::delete('/services/{id}', [ServiceController::class, 'destroy']); // Delete a service

Route::get('/test', function () {
    return response()->json(['message' => 'API is working!']);
});


