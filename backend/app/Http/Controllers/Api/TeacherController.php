<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Teacher;

class TeacherController extends Controller
{
    public function index()
    {
        // load department for filtering
        return response()->json(
            Teacher::with('department')->get(),
            200
        );
    }
}
