<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Section;

class SectionController extends Controller
{
    // GET: all sections (with optional filtering)
    public function index(Request $request)
    {
        $query = Section::with(['department']);

        if ($request->has('department_id')) {
            $query->where('department_id', $request->department_id);
        }

        if ($request->has('year_level_id')) {
            $query->where('year_level_id', $request->year_level_id);
        }

        return response()->json($query->get());
    }

    // GET: single section
    public function show($id)
    {
        $section = Section::with(['department', 'students'])->find($id);

        if (!$section) {
            return response()->json(['message' => 'Section not found'], 404);
        }

        return response()->json($section);
    }

    // CREATE section
    public function store(Request $request)
    {
        $request->validate([
            'name'          => 'required|string',
            'department_id' => 'required|exists:departments,id',
            'year_level_id' => 'required|exists:year_levels,id',
        ]);

        $section = Section::create($request->all());
        return response()->json($section, 201);
    }

    // UPDATE section
    public function update(Request $request, $id)
    {
        $section = Section::find($id);

        if (!$section) {
            return response()->json(['message' => 'Section not found'], 404);
        }

        $request->validate([
            'department_id' => 'sometimes|exists:departments,id',
            'year_level_id' => 'sometimes|exists:year_levels,id',
        ]);

        $section->update($request->all());
        return response()->json($section);
    }

    // DELETE section
    public function destroy($id)
    {
        $section = Section::find($id);

        if (!$section) {
            return response()->json(['message' => 'Section not found'], 404);
        }

        $section->delete();
        return response()->json(['message' => 'Section deleted']);
    }

    // GET all students in this section
    public function students($id)
    {
        $section = Section::with('students')->find($id);

        if (!$section) {
            return response()->json(['message' => 'Section not found'], 404);
        }

        return response()->json($section->students);
    }
}
