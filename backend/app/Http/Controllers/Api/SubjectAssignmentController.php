<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class SubjectAssignmentController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'subject_id' => 'required|exists:subjects,id',
            'section_id' => 'required|exists:sections,id',
            'teacher_id' => 'nullable|exists:teachers,id',
            'day' => 'nullable|string',
            'time' => 'nullable|string',
            'room' => 'nullable|string',
            'remark' => 'nullable|string',
        ]);

        $assignment = SubjectAssignment::create($request->all());

        return response()->json($assignment, 201);
    }
}
