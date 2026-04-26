<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\ClubMemberController;
use App\Http\Controllers\Api\ClubPositionController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix('v1')->group(function () {
    // User routes
    Route::apiResource('users', UserController::class);
    
    // Club Member routes
    Route::apiResource('club/members', ClubMemberController::class);
    
    // Club Position routes
    Route::get('club/positions', [ClubPositionController::class, 'index']);
});
