<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasApiTokens;

    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function clubMember()
    {
        return $this->hasOne(ClubMember::class);
    }

    public function isClubMember()
    {
        return $this->clubMember()->exists();
    }

    /**
     * Lấy level hiện tại của user (Nếu không phải thành viên CLB thì coi như level vô hạn)
     */
    public function getClubLevel()
    {
        return $this->clubMember?->position?->level ?? 999;
    }

    /**
     * Kiểm tra xem user này có quyền quản lý đối tượng khác không
     */
    public function canManage(User $targetUser)
    {
        // Chủ nhiệm (Level 1) có thể làm mọi thứ
        if ($this->getClubLevel() === 1) return true;

        // Chỉ được quản lý người có level thấp hơn mình (số lớn hơn)
        return $this->getClubLevel() < $targetUser->getClubLevel();
    }
}
