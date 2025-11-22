<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'code'];

    public function yearLevels() {
        return $this->hasMany(YearLevel::class);
    }

    public function sections() {
        return $this->hasMany(Section::class);
    }

    public function teachers() {
        return $this->hasMany(Teacher::class);
    }

    public function students() {
        return $this->hasMany(Student::class);
    }

    public function subjects() {
        return $this->hasMany(Subject::class);
    }
}
