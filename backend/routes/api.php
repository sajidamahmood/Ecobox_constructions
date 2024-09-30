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


Route::get('/members', [MemberController::class, 'index']);
Route::get('/members/{id}', [MemberController::class, 'show']);
Route::post('/members', [MemberController::class, 'store']);
Route::put('/members/{id}', [MemberController::class, 'update']);
Route::delete('/members/{id}', [MemberController::class, 'destroy']);



Route::get('/projects', [ProjectController::class, 'index']); // Get all projects
Route::get('/projects/{id}', [ProjectController::class, 'show']); // Get a single project
Route::post('/projects', [ProjectController::class, 'store']); // Create a new project
Route::put('/projects/{id}', [ProjectController::class, 'update']); // Update a project
Route::delete('/projects/{id}', [ProjectController::class, 'destroy']); // Delete a project



Route::prefix('services')->group(function () {
    // Retrieve all services
    Route::get('/', [ServiceController::class, 'index']); // GET /api/services
    Route::get('{id}', [ServiceController::class, 'show']); // GET /api/services/{id}
    Route::post('/', [ServiceController::class, 'store']); // POST /api/services
    Route::put('{id}', [ServiceController::class, 'update']); // PUT /api/services/{id}
    Route::delete('{id}', [ServiceController::class, 'destroy']); // DELETE /api/services/{id}
});

Route::apiResource('testimonials', TestimonialController::class);
