<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Student;

class StudentController extends Controller
{
    // GET all students
    public function index()
    {
        $students = Student::with(['department', 'yearLevel', 'section'])->get();
        return response()->json($students);
    }

    // UPDATE student (assign department, year level or section)
    public function update(Request $request, $id)
    {
        $student = Student::find($id);

        if (!$student) {
            return response()->json(['message' => 'Student not found'], 404);
        }

        $request->validate([
            'department_id' => 'sometimes|exists:departments,id',
            'year_level_id' => 'sometimes|exists:year_levels,id',
            'section_id'    => 'sometimes|exists:sections,id',
        ]);

        $student->update($request->all());

        return response()->json($student);
    }
}
