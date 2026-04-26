<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ClubMember;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    /**
     * Get summary statistics for the dashboard.
     */
    public function index()
    {
        $totalUsers = User::count();
        $totalMembers = ClubMember::count();
        
        $membersByDepartment = ClubMember::select('department', DB::raw('count(*) as count'))
            ->groupBy('department')
            ->get();
            
        $recentMembers = ClubMember::with(['user', 'position'])
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get();

        return response()->json([
            'total_users' => $totalUsers,
            'total_members' => $totalMembers,
            'members_by_department' => $membersByDepartment,
            'recent_members' => $recentMembers
        ]);
    }
}
