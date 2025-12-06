<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;


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
        'systemReports'      => $systemReports,
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

}