<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SchoolClass;
use App\Models\Subject;
use App\Models\User;
use Illuminate\Http\Request;

class ClassSubjectController extends Controller
{
    // ✅ Fetch all classes
    public function getClasses()
    {
        return response()->json(SchoolClass::orderBy('gradeLevel')->get());
    }

    // ✅ Add a new class
    public function addClass(Request $request)
    {
        $request->validate([
            'gradeLevel' => 'required|string',
            'section' => 'required|string',
        ]);

        $class = SchoolClass::create([
            'gradeLevel' => $request->gradeLevel,
            'section' => $request->section,
        ]);

        return response()->json($class);
    }

    // ✅ Delete a class
    public function deleteClass($id)
    {
        $class = SchoolClass::findOrFail($id);
        $class->delete();

        return response()->json(['message' => 'Class deleted successfully.']);
    }

    // ✅ Fetch all subjects
    public function getSubjects()
    {
        $subjects = Subject::with('teacher:id,name')->get()->map(function ($subject) {
            return [
                'id' => $subject->id,
                'name' => $subject->name,
                'gradeLevel' => $subject->gradeLevel,
                'teacher' => $subject->teacher?->name,
                'teacher_id' => $subject->teacher_id,
            ];
        });

        return response()->json($subjects);
    }

    // ✅ Add new subject
    public function addSubject(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'gradeLevel' => 'required|string',
        ]);

        $subject = Subject::create([
            'name' => $request->name,
            'gradeLevel' => $request->gradeLevel,
        ]);

        return response()->json($subject);
    }

    // ✅ Delete subject
    public function deleteSubject($id)
    {
        $subject = Subject::findOrFail($id);
        $subject->delete();

        return response()->json(['message' => 'Subject deleted successfully.']);
    }

    // ✅ Assign teacher to subject
    public function assignTeacher(Request $request)
    {
        $request->validate([
            'subject_id' => 'required|exists:subjects,id',
            'teacher_id' => 'required|exists:users,id',
        ]);

        $subject = Subject::findOrFail($request->subject_id);
        $subject->teacher_id = $request->teacher_id;
        $subject->save();

        return response()->json(['message' => 'Teacher assigned successfully.']);
    }

    // ✅ Get list of teachers
    public function getTeachers()
    {
        $teachers = User::where('role', 'teacher')
            ->where('is_approved', 1)
            ->select('id', 'name', 'email')
            ->get();

        return response()->json($teachers);
    }
}
