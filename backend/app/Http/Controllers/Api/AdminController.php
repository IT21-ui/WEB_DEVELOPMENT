<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\SchoolClass;
use App\Models\Subject;
use App\Models\Section;

class AdminController extends Controller
{
    /* ========================================
     * DASHBOARD STATISTICS
     * ======================================== */
public function dashboardStats(Request $request)
{
    $admin = $request->user();

    if (!in_array(strtolower($admin->role), ['admin', 'administrator'])) {
        return response()->json(['message' => 'Unauthorized'], 403);
    }

    // TOTAL users
    $totalUsers = User::count();

    // STATUS COUNTS
    $approvedUsers = User::where('is_approved', 1)->count();
    $pendingUsers = User::where('is_approved', 0)
                        ->orWhereNull('is_approved')
                        ->count();
    $deniedUsers = User::where('is_approved', 2)->count();

    // ROLE + STATUS
    $approvedStudents = User::where('role', 'student')
                            ->where('is_approved', 1)
                            ->count();

    $approvedTeachers = User::where('role', 'teacher')
                            ->where('is_approved', 1)
                            ->count();

    $systemReports = 0;

    return response()->json([
        'total_users'        => $totalUsers,
        'approved_users'     => $approvedUsers,   
        'pending_users'      => $pendingUsers,
        'denied_users'       => $deniedUsers,     
        'approved_students'  => $approvedStudents,
        'approved_teachers'  => $approvedTeachers,
        'systemReports'  => $systemReports,
    ]);
}

    /* ========================================
     * PENDING USERS LIST
     * ======================================== */
    public function pendingUsers(Request $request)
    {
        $admin = $request->user();

        if (!in_array(strtolower($admin->role), ['admin', 'administrator'])) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $users = User::where('id', '!=', $admin->id)
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
                    'registrationDate' => optional($user->created_at)->toDateString(),
                ];
            });

        return response()->json($users);
    }


    /* ========================================
     * APPROVE / DENY USER
     * ======================================== */
    public function approveUser(Request $request, $id)
    {
        $admin = $request->user();

        if (!in_array(strtolower($admin->role), ['admin', 'administrator'])) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $action = $request->input('action');
        $user   = User::findOrFail($id);

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
                $message = 'User approval reset to pending.';
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


    /* ========================================
     * CLASS MANAGEMENT
     * ======================================== */
    public function getClasses()
    {
        return response()->json(
            SchoolClass::orderBy('grade_level', 'asc')->get()
        );
    }

    public function addClass(Request $request)
    {
        $request->validate([
            'grade_level' => 'required|string|max:50',
            'section'     => 'required|string|max:50',
        ]);

        $class = SchoolClass::create([
            'grade_level' => $request->grade_level,
            'section'     => $request->section,
        ]);

        return response()->json($class, 201);
    }

    public function deleteClass($id)
    {
        $class = SchoolClass::findOrFail($id);
        $class->delete();

        return response()->json(['message' => 'Class deleted successfully.']);
    }


    /* ========================================
     * SUBJECT MANAGEMENT
     * ======================================== */
    public function getSubjects()
    {
        $subjects = Subject::with('teacher:id,name,email')
            ->get()
            ->map(function ($subject) {
                return [
                    'id'          => $subject->id,
                    'name'        => $subject->name,
                    'grade_level' => $subject->grade_level,
                    'teacher'     => $subject->teacher?->name,
                    'teacher_id'  => $subject->teacher_id,
                ];
            });

        return response()->json($subjects);
    }

    public function addSubject(Request $request)
    {
        $request->validate([
            'name'        => 'required|string|max:100',
            'grade_level' => 'required|string|max:50',
        ]);

        $subject = Subject::create([
            'name'        => $request->name,
            'grade_level' => $request->grade_level,
        ]);

        return response()->json($subject, 201);
    }

    public function deleteSubject($id)
    {
        $subject = Subject::findOrFail($id);
        $subject->delete();

        return response()->json(['message' => 'Subject deleted successfully.']);
    }


    /* ========================================
     * TEACHERS
     * ======================================== */
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
