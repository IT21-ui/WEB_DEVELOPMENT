<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    // Register a new user
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|min:6|confirmed',
            'role' => 'required|in:admin,administrator,teacher,student',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password, // Make sure this is hashed in User model
            'role' => $request->role,
            'is_approved' => false, // default: not yet approved
        ]);

        return response()->json([
            'message' => 'Registration successful. Please wait for admin approval before logging in.',
        ]);
    }

    // Login an existing user
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        // ✅ Check if user is approved
        if (!$user->is_approved) {
            return response()->json([
                'message' => 'Your account is not yet approved by the admin.',
            ], 403);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $user,
        ]);
    }

    // Logout the user
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logged out successfully',
        ]);
    }

    // Get logged-in user info
    public function me(Request $request)
    {
        return response()->json($request->user());
    }
}
