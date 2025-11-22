<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AdminSettingsController extends Controller
{
    public function index()
    {
        return Setting::first(); 
    }

    public function update(Request $request)
    {
        $settings = Setting::first();
        $settings->update($request->all());

        return response()->json([
            "message" => "Settings updated",
            "settings" => $settings
        ]);
    }
}