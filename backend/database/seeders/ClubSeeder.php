<?php

namespace Database\Seeders;

use App\Models\ClubMember;
use App\Models\ClubPosition;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class ClubSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Create Club Positions
        $positions = [
            ['name' => 'Chủ nhiệm', 'level' => 1, 'description' => 'Người đứng đầu câu lạc bộ'],
            ['name' => 'Phó chủ nhiệm', 'level' => 2, 'description' => 'Hỗ trợ chủ nhiệm điều hành'],
            ['name' => 'Trưởng ban', 'level' => 3, 'description' => 'Quản lý một ban cụ thể'],
            ['name' => 'Phó ban', 'level' => 4, 'description' => 'Hỗ trợ trưởng ban'],
            ['name' => 'Thành viên chính thức', 'level' => 5, 'description' => 'Thành viên đã qua thử thách'],
        ];

        foreach ($positions as $pos) {
            ClubPosition::updateOrCreate(['name' => $pos['name']], $pos);
        }

        // 2. Create Users
        $adminUser = User::updateOrCreate(
            ['email' => 'admin@ctrlcclub.com'],
            [
                'name' => 'Admin Club',
                'password' => Hash::make('password'),
            ]
        );

        $memberUser = User::updateOrCreate(
            ['email' => 'member@ctrlcclub.com'],
            [
                'name' => 'Club Member 1',
                'password' => Hash::make('password'),
            ]
        );

        $normalUser = User::updateOrCreate(
            ['email' => 'normal@gmail.com'],
            [
                'name' => 'Normal User',
                'password' => Hash::make('password'),
            ]
        );

        // 3. Assign Club Members
        ClubMember::updateOrCreate(
            ['user_id' => $adminUser->id],
            [
                'position_id' => ClubPosition::where('name', 'Chủ nhiệm')->first()->id,
                'department' => 'Ban Chủ Nhiệm',
                'student_id' => 'SV001',
                'joined_at' => now(),
            ]
        );

        ClubMember::updateOrCreate(
            ['user_id' => $memberUser->id],
            [
                'position_id' => ClubPosition::where('name', 'Thành viên chính thức')->first()->id,
                'department' => 'Ban Kỹ Thuật',
                'student_id' => 'SV002',
                'joined_at' => now(),
            ]
        );
    }
}
