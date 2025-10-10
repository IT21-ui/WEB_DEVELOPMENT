<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserApprovalController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        if (!in_array($user->role, ['admin', 'administrator'])) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $users = User::select('id', 'name', 'email', 'role', 'is_approved', 'created_at')
            ->get()
            ->map(function ($u) {
                return [
                    'id' => $u->id,
                    'name' => $u->name,
                    'email' => $u->email,
                    'role' => $u->role,
                    'status' => $u->is_approved == 1 ? 'approved' : ($u->is_approved == 2 ? 'rejected' : 'pending'),
                    'date' => $u->created_at->format('Y-m-d'),
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

    public function reject($id)
    {
        $user = User::findOrFail($id);
        $user->is_approved = 2;
        $user->save();

        return response()->json(['message' => 'User rejected successfully']);
    }
}
