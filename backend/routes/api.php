<?php
use App\Mail\ContactFormMail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\ContactController;



Route::middleware('api')->group(function () {

    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/logout', [AuthController::class, 'logout'])->name('api.logout');


    Route::middleware(['auth:sanctum', 'role:user'])->group(function () {
        Route::get('/user-dashboard', function () {
            return 'Welcome, User!';
        });
    });

    Route::middleware(['auth:sanctum'])->group(function () {
        Route::post('/members', [MemberController::class, 'store']);
        Route::put('/members/update/{id}', [MemberController::class, 'update']);
        Route::delete('/members/{id}', [MemberController::class, 'destroy']);
    });

    Route::middleware(['auth:sanctum'])->group(function () {
        Route::post('/projects', [ProjectController::class, 'store']);
        Route::post('/projects/update/{id}', [ProjectController::class, 'update']);
        Route::delete('/projects/{id}', [ProjectController::class, 'destroy']);
    });

    Route::middleware(['auth:sanctum'])->group(function () {
        Route::post('/services', [ServiceController::class, 'store']);
        Route::post('/services/update/{id}', [ServiceController::class, 'update']);
        Route::delete('/services/{id}', [ServiceController::class, 'destroy']);
    });

 

    Route::middleware('throttle:60,1')->group(function () {
        Route::get('/members', [MemberController::class, 'index']);
        Route::get('/members/{id}', [MemberController::class, 'show']);
        Route::get('/projects', [ProjectController::class, 'index']);
        Route::get('/projects/{id}', [ProjectController::class, 'show']);
        Route::get('/services', [ServiceController::class, 'index']);
        Route::get('/services/{id}', [ServiceController::class, 'show']);
        Route::get('/services/specific', [ServiceController::class, 'getSpecificServices']);


    });


});


Route::post('/send-contact-mail', [ContactController::class, 'sendContactMail'])->middleware('api');


Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('/reset-password', [AuthController::class, 'resetPassword']);
    


