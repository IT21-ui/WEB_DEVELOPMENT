<?php


namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model; 

class Subject extends Model {

    protected $fillable = [
        'code',
        'title',
        'day',
        'time',
        'room',
        'teacher_id',
        'department_id',   // ADD THIS
        'year_level_id',   // ADD THIS
        'units',           // optional, if you added it
        'semester',        // optional, if you added it
        'curriculum_year', // optional, if you added it
    ];

public function sections() {
    return $this->hasMany(Section::class, 'year_level_id', 'year_level_id')
                ->where('department_id', $this->department_id);
}

    public function teacher() {
        return $this->belongsTo(Teacher::class);
    }

    public function department() {
        return $this->belongsTo(Department::class);
    }

    public function yearLevel() {
        return $this->belongsTo(YearLevel::class);
    }
}

