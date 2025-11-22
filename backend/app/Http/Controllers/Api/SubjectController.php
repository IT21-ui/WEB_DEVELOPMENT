<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Subject;

class SubjectController extends Controller
{
    // 🟦 GET ALL SUBJECTS (OPTIONAL FILTER BY DEPARTMENT & YEAR LEVEL)
    public function index(Request $request)
    {
        $query = Subject::with(['department', 'yearLevel', 'teacher']);

        // Filter by department
        if ($request->has('department_id')) {
            $query->where('department_id', $request->department_id);
        }

        // Filter by year level
        if ($request->has('year_level_id')) {
            $query->where('year_level_id', $request->year_level_id);
        }

        $subjects = $query->get();

        // Format output for frontend
        return $subjects->map(function ($subject) {
            return [
                'id' => $subject->id,
                'code' => $subject->code,
                'title' => $subject->title,
                'units' => $subject->units,
                'semester' => $subject->semester,
                'curriculum_year' => $subject->curriculum_year,

                'department_id' => $subject->department_id,
                'department_name' => $subject->department?->name,

                'year_level_id' => $subject->year_level_id,
                'year_level_name' => $subject->yearLevel?->name,

                'teacher_id' => $subject->teacher_id,
                'teacher_name' => $subject->teacher 
                    ? $subject->teacher->first_name . ' ' . $subject->teacher->last_name 
                    : null,

                'day' => $subject->day,
                'time' => $subject->time,
                'room' => $subject->room,

                'created_at' => $subject->created_at,
                'updated_at' => $subject->updated_at,
            ];
        });
    }

    // 🟦 GET SPECIFIC SUBJECT
    public function show($id)
    {
        $subject = Subject::with(['department', 'yearLevel', 'teacher'])->find($id);

        if (!$subject) {
            return response()->json(['message' => 'Subject not found'], 404);
        }

        return response()->json($subject);
    }

    // 🟩 CREATE SUBJECT
    public function store(Request $request)
    {
        $request->validate([
            'code' => 'required|string|unique:subjects,code',
            'title' => 'required|string',

            'department_id' => 'required|exists:departments,id',
            'year_level_id' => 'required|exists:year_levels,id',

            'teacher_id' => 'nullable|exists:teachers,id',

            'units' => 'nullable|numeric',
            'semester' => 'nullable|string',
            'curriculum_year' => 'nullable|string',
            'day' => 'nullable|string',
            'time' => 'nullable|string',
            'room' => 'nullable|string',
        ]);

        $subject = Subject::create($request->all());

        return response()->json($subject, 201);
    }

    // 🟧 UPDATE SUBJECT
    public function update(Request $request, $id)
    {
        $subject = Subject::find($id);

        if (!$subject) {
            return response()->json(['message' => 'Subject not found'], 404);
        }

        $request->validate([
            'code' => 'sometimes|string|unique:subjects,code,' . $id,
            'department_id' => 'sometimes|exists:departments,id',
            'year_level_id' => 'sometimes|exists:year_levels,id',
            'teacher_id' => 'sometimes|nullable|exists:teachers,id',
        ]);

        $subject->update($request->all());

        return response()->json($subject);
    }

    // 🟥 DELETE SUBJECT
    public function destroy($id)
    {
        $subject = Subject::find($id);

        if (!$subject) {
            return response()->json(['message' => 'Subject not found'], 404);
        }

        $subject->delete();

        return response()->json(['message' => 'Subject deleted']);
    }
}
