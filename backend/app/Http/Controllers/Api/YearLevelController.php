<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\YearLevel;
use Illuminate\Http\Request;

class YearLevelController extends Controller
{
    // GET: all or filtered by department
    public function index(Request $request)
    {
        $query = YearLevel::with('department');

        if ($request->has('department_id')) {
            $query->where('department_id', $request->department_id);
        }

        return response()->json($query->get());
    }

    // GET: single year level
    public function show($id)
    {
        $yearLevel = YearLevel::with('department')->find($id);

        if (!$yearLevel) {
            return response()->json(['message' => 'Year level not found'], 404);
        }

        return response()->json($yearLevel);
    }
}
