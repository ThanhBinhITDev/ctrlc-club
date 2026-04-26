<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ClubMember extends Model
{
    protected $fillable = [
        'user_id',
        'position_id',
        'department',
        'student_id',
        'joined_at',
        'status'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function position()
    {
        return $this->belongsTo(ClubPosition::class, 'position_id');
    }
}
