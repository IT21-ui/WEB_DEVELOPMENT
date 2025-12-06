<?php


namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model; 

class Subject extends Model {

    protected $fillable = [
        'code',
        'title',
        'department_id',   
        'year_level_id',   
        'units',          
        'semester',        
        'curriculum_year', 
    ];

public function sections() {
    return $this->hasMany(Section::class, 'year_level_id', 'year_level_id')
                ->where('department_id', $this->department_id);
}

    public function assignments()
    {
        return $this->hasMany(SubjectAssignment::class);
    }

    public function department()
    {
        return $this->belongsTo(Department::class);
    }

    public function yearLevel()
    {
        return $this->belongsTo(YearLevel::class);
    }
}

