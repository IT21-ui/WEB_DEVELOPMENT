<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Teacher;
use App\Models\Student;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    // Register a new user
        public function register(Request $request)
    {
$validated = $request->validate([
    'name' => 'required|string|max:255',
    'email' => 'required|string|email|unique:users',
    'password' => 'required|string|min:6|confirmed',
    'role' => 'required|in:admin,administrator,teacher,student',
    'mobile' => 'nullable|string|required_if:role,teacher,student',
    'department_id' => 'required_if:role,student,teacher|integer|exists:departments,id',
    'year_level_id' => 'required_if:role,student|integer|exists:year_levels,id',
]);

            $nameParts = explode(' ', $validated['name']);
            $firstName = $nameParts[0];
            $lastName = isset($nameParts[1]) ? implode(' ', array_slice($nameParts, 1)) : '';
            
            $user = User::create([
                'name' => $validated['name'], 
                'email' => $validated['email'],
                'password' => $validated['password'], 
                'role' => $validated['role'],
                'is_approved' => false,
            ]);

            if ($validated['role'] === 'teacher') {
                Teacher::create([
                    'user_id' => $user->id,
                    'first_name' => $firstName,
                    'last_name' => $lastName,
                    'email' => $validated['email'],
                    'mobile' => $validated['mobile'] ?? null,
                    'department_id' => $validated['department_id'],
                ]);
            }

if ($validated['role'] === 'student') {
    Student::create([
    'user_id'        => $user->id,
    'first_name'     => $firstName,
    'last_name'      => $lastName,
    'email'          => $request->email,
    'mobile'         => $request->mobile,
    'department_id'  => $request->department_id,   
    'year_level_id'  => $request->year_level_id,   
    'section_id'     => null, 
]);
            }

        return response()->json([
            'message' => 'Registration successful. Please wait for admin approval.',
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

    // Logout
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logged out successfully']);
    }

    // Get logged-in user info
    public function me(Request $request)
    {
        return response()->json($request->user());
    }
}
