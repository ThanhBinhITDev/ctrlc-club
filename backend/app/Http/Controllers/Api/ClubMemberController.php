<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ClubMember;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ClubMemberController extends Controller
{
    public function index()
    {
        $members = ClubMember::with(['user', 'position'])
            ->join('club_positions', 'club_members.position_id', '=', 'club_positions.id')
            ->orderBy('club_positions.level', 'asc')
            ->select('club_members.*')
            ->get();
            
        return response()->json($members);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id|unique:club_members,user_id',
            'position_id' => 'required|exists:club_positions,id',
            'department' => 'nullable|string',
            'student_id' => 'nullable|string',
            'joined_at' => 'nullable|date',
        ]);

        // Kiểm tra quyền bổ nhiệm: Bạn chỉ được bổ nhiệm chức vụ có level thấp hơn mình
        $currentUser = $request->user();
        $targetPosition = DB::table('club_positions')->find($validated['position_id']);

        if ($currentUser->getClubLevel() >= $targetPosition->level && $currentUser->getClubLevel() !== 1) {
            return response()->json(['message' => 'Bạn không có quyền bổ nhiệm chức vụ cao hơn hoặc bằng cấp bậc của mình.'], 403);
        }

        $member = ClubMember::create($validated);
        return response()->json($member->load(['user', 'position']), 201);
    }

    public function update(Request $request, string $id)
    {
        $member = ClubMember::with('user')->findOrFail($id);
        $currentUser = $request->user();

        // Kiểm tra quyền: Chỉ cấp cao hơn mới được sửa cấp thấp hơn
        if (!$currentUser->canManage($member->user)) {
            return response()->json(['message' => 'Bạn không có quyền chỉnh sửa thành viên cùng cấp hoặc cao cấp hơn.'], 403);
        }
        
        $validated = $request->validate([
            'position_id' => 'sometimes|exists:club_positions,id',
            'department' => 'sometimes|string',
            'status' => 'sometimes|in:active,inactive,alumni',
        ]);

        $member->update($validated);
        return response()->json($member->load(['user', 'position']));
    }

    public function destroy(Request $request, string $id)
    {
        $member = ClubMember::with('user')->findOrFail($id);
        $currentUser = $request->user();

        // Kiểm tra quyền xóa
        if (!$currentUser->canManage($member->user)) {
            return response()->json(['message' => 'Bạn không có quyền xóa thành viên cùng cấp hoặc cao cấp hơn.'], 403);
        }

        $member->delete();
        return response()->json(['message' => 'Đã xóa khỏi danh sách CLB.']);
    }
}
