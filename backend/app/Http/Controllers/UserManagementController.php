<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserManagementController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        if (!in_array($user->role, ['admin', 'administrator'])) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $users = User::select('id', 'name', 'email', 'role', 'is_approved', 'created_at', 'updated_at', 'gradeLevel')
            ->get()
            ->map(function ($u) {
                return [
                    'id' => $u->id,
                    'name' => $u->name,
                    'email' => $u->email,
                    'role' => $u->role,
                    'status' => $u->is_approved == 1 ? 'approved' : ($u->is_approved == 2 ? 'denied' : 'pending'),
                    'registrationDate' => $u->created_at->format('Y-m-d'),
                    'lastLogin' => $u->updated_at ? $u->updated_at->format('Y-m-d') : null,
                    'gradeLevel' => $u->gradeLevel,
                ];
            });

        return response()->json(['users' => $users]);
    }

    public function approve($id)
    {
        $user = User::findOrFail($id);
        $user->is_approved = 1;
        $user->save();

        return response()->json(['message' => 'User approved successfully']);
    }

    public function deny($id)
    {
        $user = User::findOrFail($id);
        $user->is_approved = 2;
        $user->save();

        return response()->json(['message' => 'User denied successfully']);
    }

    public function reset($id)
    {
        $user = User::findOrFail($id);
        $user->is_approved = 0;
        $user->save();

        return response()->json(['message' => 'User status reset successfully']);
    }

    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return response()->json(['message' => 'User deleted successfully']);
    }

    public function assignGrade(Request $request, $id)
    {
        $request->validate(['grade' => 'required|string']);
        
        $user = User::findOrFail($id);
        if ($user->role !== 'teacher') {
            return response()->json(['message' => 'Only teachers can be assigned a grade'], 400);
        }

        $user->gradeLevel = $request->grade;
        $user->save();

        return response()->json(['message' => "Assigned to {$request->grade} successfully"]);
    }
}
