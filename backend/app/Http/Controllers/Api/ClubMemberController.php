<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ClubMember;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ClubMemberController extends Controller
{
    /**
     * Display a listing of club members only.
     */
    public function index()
    {
        $members = ClubMember::with(['user', 'position'])
            ->join('club_positions', 'club_members.position_id', '=', 'club_positions.id')
            ->orderBy('club_positions.level', 'asc')
            ->select('club_members.*')
            ->get();
            
        return response()->json($members);
    }

    /**
     * Assign a user to the club (Promote to Club Member).
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id|unique:club_members,user_id',
            'position_id' => 'required|exists:club_positions,id',
            'department' => 'nullable|string',
            'student_id' => 'nullable|string',
            'joined_at' => 'nullable|date',
        ]);

        $member = ClubMember::create($validated);
        return response()->json($member->load(['user', 'position']), 201);
    }

    /**
     * Update club member information/position.
     */
    public function update(Request $request, string $id)
    {
        $member = ClubMember::findOrFail($id);
        
        $validated = $request->validate([
            'position_id' => 'sometimes|exists:club_positions,id',
            'department' => 'sometimes|string',
            'status' => 'sometimes|in:active,inactive,alumni',
        ]);

        $member->update($validated);
        return response()->json($member->load(['user', 'position']));
    }

    /**
     * Remove a member from the club (Demote to Normal User).
     */
    public function destroy(string $id)
    {
        $member = ClubMember::findOrFail($id);
        $member->delete();
        return response()->json(['message' => 'Removed from club successfully. User account remains.']);
    }
}
