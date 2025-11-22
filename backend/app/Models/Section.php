<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Section extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'department_id',
        'year_level_id',  
    ];

    public function department() {
        return $this->belongsTo(Department::class);
    }

    public function students() {
        return $this->hasMany(Student::class);
    }

    public function subjects() {
        return $this->hasMany(Subject::class);
    }

    public function yearLevelInfo() {
            return $this->belongsTo(YearLevel::class, 'year_level_id', 'id');
        }
}
