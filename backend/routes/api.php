<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\SubjectController;
use App\Http\Controllers\Api\SectionController;
use App\Http\Controllers\Api\TeacherController;
use App\Http\Controllers\Api\StudentController;
use App\Http\Controllers\Api\DepartmentController;
use App\Http\Controllers\Api\YearLevelController;


// Departments
Route::get('/departments', [DepartmentController::class, 'index']);
Route::get('/departments/{id}', [DepartmentController::class, 'show']);

// Year Levels (per department or general)
Route::get('/year-levels', [YearLevelController::class, 'index']);
Route::get('/year-levels/{id}', [YearLevelController::class, 'show']);

// Students
Route::get('/students', [StudentController::class, 'index']);
    Route::put('/students/{id}', [StudentController::class, 'update']);  
// Teachers
Route::get('/teachers', [TeacherController::class, 'index']);

// Sections
Route::get('/sections', [SectionController::class, 'index']);
Route::post('/sections', [SectionController::class, 'store']);
Route::put('/sections/{id}', [SectionController::class, 'update']);
Route::delete('/sections/{id}', [SectionController::class, 'destroy']);

// Students inside a section
Route::get('/sections/{id}/students', [SectionController::class, 'students']);

// SUBJECTS
Route::prefix('subjects')->group(function () {
    Route::get('/', [SubjectController::class, 'index']);       // All or filtered
    Route::post('/', [SubjectController::class, 'store']);      // Add
    Route::get('/{id}', [SubjectController::class, 'show']);    // Get single
    Route::put('/{id}', [SubjectController::class, 'update']);  // Update
    Route::delete('/{id}', [SubjectController::class, 'destroy']); // Delete
});

Route::middleware(['auth:sanctum', 'is_admin'])->group(function () {
       // USER APPROVALS
    Route::get('/admin/pending-users', [AdminController::class, 'pendingUsers']);
    Route::post('/admin/approve-user/{id}', [AdminController::class, 'approveUser']);
    
    // DASHBOARD STATS
    Route::get('/admin/dashboard-stats', [AdminController::class, 'dashboardStats']);
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
});
