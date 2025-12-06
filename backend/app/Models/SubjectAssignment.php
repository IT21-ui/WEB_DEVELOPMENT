<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SubjectAssignment extends Model
{
    protected $fillable = [
        'subject_id',
        'section_id',
        'teacher_id',
        'day',
        'time',
        'room',
        'remark',
    ];

    public function subject()
    {
        return $this->belongsTo(Subject::class);
    }

    public function section()
    {
        return $this->belongsTo(Section::class);
    }

    public function teacher()
    {
        return $this->belongsTo(Teacher::class);
    }
}
