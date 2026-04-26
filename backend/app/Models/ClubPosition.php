<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ClubPosition extends Model
{
    protected $fillable = ['name', 'level', 'description'];

    public function members()
    {
        return $this->hasMany(ClubMember::class, 'position_id');
    }
}
