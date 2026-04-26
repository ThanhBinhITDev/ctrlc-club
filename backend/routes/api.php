<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\ClubMemberController;
use App\Http\Controllers\Api\ClubPositionController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\AuthController;

// Public routes
Route::post('/v1/login', [AuthController::class, 'login']);

// Protected routes
Route::middleware('auth:sanctum')->prefix('v1')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // Dashboard
    Route::get('dashboard/stats', [DashboardController::class, 'index']);

    // User routes
    Route::apiResource('users', UserController::class);
    
    // Club Member routes
    Route::apiResource('club/members', ClubMemberController::class);
    
    // Club Position routes
    Route::get('club/positions', [ClubPositionController::class, 'index']);
});
