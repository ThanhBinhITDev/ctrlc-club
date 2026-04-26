<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ClubPosition;
use Illuminate\Http\Request;

class ClubPositionController extends Controller
{
    /**
     * Display a listing of club positions.
     */
    public function index()
    {
        return response()->json(ClubPosition::orderBy('level', 'asc')->get());
    }
}
