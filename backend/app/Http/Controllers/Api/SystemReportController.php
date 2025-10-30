<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SystemReportController extends Controller
{
    // Dashboard summary stats
    public function summary()
    {
        $totalUsers = User::count();
        $activeSessions = DB::table('sessions')->count();
        $generatedReports = DB::table('reports')->count();
        $systemUptime = '99.8%'; // Simulated

        return response()->json([
            'totalUsers' => $totalUsers,
            'activeSessions' => $activeSessions,
            'generatedReports' => $generatedReports,
            'systemUptime' => $systemUptime,
        ]);
    }

    // Recent reports (last 10)
    public function recentReports()
    {
        $reports = DB::table('reports')
            ->orderBy('created_at', 'desc')
            ->limit(10)
            ->get(['id', 'name', 'type', 'created_at as date', 'status', 'size']);

        return response()->json($reports);
    }

    // System metrics (simulated)
    public function metrics()
    {
        $metrics = [
            ['metric' => 'Database Performance', 'value' => 94, 'status' => 'excellent'],
            ['metric' => 'API Response Time', 'value' => 87, 'status' => 'good'],
            ['metric' => 'User Satisfaction', 'value' => 92, 'status' => 'excellent'],
            ['metric' => 'System Load', 'value' => 76, 'status' => 'good'],
        ];

        return response()->json($metrics);
    }

    // Generate a new report (simulate creation)
    public function generateReport(Request $request)
    {
        $request->validate(['type' => 'required|string']);

        $name = ucwords(str_replace('-', ' ', $request->type)) . ' Report';

        $reportId = DB::table('reports')->insertGetId([
            'name' => $name,
            'type' => $request->type,
            'status' => 'processing',
            'size' => rand(1, 5) . ' MB',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return response()->json([
            'message' => 'Report generation started.',
            'report_id' => $reportId,
        ]);
    }

    // Download report
    public function downloadReport($id)
    {
        $report = DB::table('reports')->find($id);

        if (!$report) {
            return response()->json(['message' => 'Report not found.'], 404);
        }

        // Simulate file
        return response()->json([
            'message' => "Downloading {$report->name}",
            'report' => $report,
        ]);
    }
}
