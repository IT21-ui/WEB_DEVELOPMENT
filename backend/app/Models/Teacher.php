<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Teacher extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'first_name',
        'last_name',
        'email',
        'mobile',
        'department_id',
    ];

    public function subjects()
    {
        return $this->hasMany(Subject::class);
    }

    public function department()
    {
        return $this->belongsTo(Department::class);
    }
}
