<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'first_name',
        'last_name',
        'email',
        'mobile',
        'department_id',
        'year_level_id',
        'section_id',
    ];

    public function department()
    {
        return $this->belongsTo(Department::class);
    }

    public function yearLevel()
    {
        return $this->belongsTo(YearLevel::class);
    }

    public function section()
    {
        return $this->belongsTo(Section::class);
    }
}
