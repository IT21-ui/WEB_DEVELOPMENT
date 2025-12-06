<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Teacher;
use App\Models\Subject;
use Illuminate\Http\Request;

class TeacherController extends Controller
{
    // ✔ GET ALL TEACHERS (for admin panel)
    public function index()
    {
        return response()->json(
            Teacher::with('department')->get(),
            200
        );
    }

    // ✔ TEACHER DASHBOARD: STATS
    public function stats(Request $request)
    {
        $teacher = $request->user();

        return response()->json([
            'dtr' => 0,  // placeholder — you can replace later
            'courseLoad' => Subject::where('teacher_id', $teacher->id)->count(),
            'downloadableForms' => 3,
            'studentFeedback' => 12,
        ]);
    }

    // ✔ TEACHER DASHBOARD: ANNOUNCEMENTS
    public function announcements()
    {
        return response()->json([
            [
                'title' => 'Faculty meeting tomorrow',
                'date' => now()->toDateString()
            ],
            [
                'title' => 'Submit grades this Friday',
                'date' => now()->subDays(2)->toDateString()
            ]
        ]);
    }
}
