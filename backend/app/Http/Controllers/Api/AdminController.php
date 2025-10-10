<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\SchoolClass;
use App\Models\Subject;

class AdminController extends Controller
{
    /** -------------------------------
     * USER APPROVALS
     * ------------------------------- */
    public function pendingUsers(Request $request)
    {
        $admin = $request->user();

        if ($admin->role !== 'administrator') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $users = User::where('id', '!=', $admin->id)
            ->select('id', 'name', 'email', 'role', 'is_approved', 'created_at')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role ?? 'student',
                    'status' => match ($user->is_approved) {
                        1 => 'approved',
                        2 => 'denied',
                        default => 'pending',
                    },
                    'registrationDate' => $user->created_at->toDateString(),
                ];
            });

        return response()->json($users);
    }

    public function approveUser(Request $request, $id)
    {
        $admin = $request->user();
        if ($admin->role !== 'administrator') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $action = $request->input('action');
        $user = User::findOrFail($id);

        switch ($action) {
            case 'approve':
                $user->is_approved = 1;
                $message = 'User approved successfully.';
                break;
            case 'deny':
                $user->is_approved = 2;
                $message = 'User denied successfully.';
                break;
            case 'reset':
                $user->is_approved = 0;
                $message = 'User reset to pending.';
                break;
            case 'delete':
                $user->delete();
                return response()->json(['message' => 'User deleted successfully.']);
            default:
                return response()->json(['message' => 'Invalid action'], 400);
        }

        $user->save();
        return response()->json(['message' => $message]);
    }

    /** -------------------------------
     * CLASSES MANAGEMENT
     * ------------------------------- */
    public function getClasses()
    {
        return response()->json(SchoolClass::orderBy('gradeLevel', 'asc')->get());
    }

    public function addClass(Request $request)
    {
        $request->validate([
            'gradeLevel' => 'required|string|max:50',
            'section' => 'required|string|max:50',
        ]);

        $class = SchoolClass::create([
            'gradeLevel' => $request->gradeLevel,
            'section' => $request->section,
        ]);

        return response()->json($class, 201);
    }

    public function deleteClass($id)
    {
        $class = SchoolClass::findOrFail($id);
        $class->delete();
        return response()->json(['message' => 'Class deleted successfully.']);
    }

    /** -------------------------------
     * SUBJECTS MANAGEMENT
     * ------------------------------- */
    public function getSubjects()
    {
        $subjects = Subject::with('teacher:id,name,email')->get()->map(function ($subject) {
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

    public function addSubject(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:100',
            'gradeLevel' => 'required|string|max:50',
        ]);

        $subject = Subject::create([
            'name' => $request->name,
            'gradeLevel' => $request->gradeLevel,
        ]);

        return response()->json($subject, 201);
    }

    public function deleteSubject($id)
    {
        $subject = Subject::findOrFail($id);
        $subject->delete();
        return response()->json(['message' => 'Subject deleted successfully.']);
    }

    /** -------------------------------
     * TEACHERS MANAGEMENT
     * ------------------------------- */
    public function getTeachers()
    {
        $teachers = User::where('role', 'teacher')
            ->where('is_approved', 1)
            ->select('id', 'name', 'email')
            ->get();

        return response()->json($teachers);
    }

    public function assignTeacher(Request $request)
    {
        $request->validate([
            'subject_id' => 'required|integer|exists:subjects,id',
            'teacher_id' => 'required|integer|exists:users,id',
        ]);

        $subject = Subject::findOrFail($request->subject_id);
        $subject->teacher_id = $request->teacher_id;
        $subject->save();

        return response()->json(['message' => 'Teacher assigned successfully.']);
    }
}
