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
use App\Http\Controllers\Api\AdminSettingsController;
use App\Http\Controllers\Api\SubjectAssignmentController;

/*
|--------------------------------------------------------------------------
| ADMIN SETTINGS
|--------------------------------------------------------------------------
*/
Route::get('/settings', [AdminSettingsController::class, 'index']);
Route::put('/settings', [AdminSettingsController::class, 'update']);

/*
|--------------------------------------------------------------------------
| DEPARTMENTS
|--------------------------------------------------------------------------
*/
Route::get('/departments', [DepartmentController::class, 'index']);
Route::get('/departments/{id}', [DepartmentController::class, 'show']);

/*
|--------------------------------------------------------------------------
| YEAR LEVELS
|--------------------------------------------------------------------------
*/
Route::get('/year-levels', [YearLevelController::class, 'index']);
Route::get('/year-levels/{id}', [YearLevelController::class, 'show']);

/*
|--------------------------------------------------------------------------
| STUDENTS
|--------------------------------------------------------------------------
*/
Route::get('/students', [StudentController::class, 'index']);
Route::put('/students/{id}', [StudentController::class, 'update']);

/*
|--------------------------------------------------------------------------
| TEACHERS
|--------------------------------------------------------------------------
*/
Route::get('/teachers', [TeacherController::class, 'index']);
Route::get('/teacher/stats', [TeacherController::class, 'stats']);
Route::get('/teacher/announcements', [TeacherController::class, 'announcements']);

/*
|--------------------------------------------------------------------------
| SECTIONS
|--------------------------------------------------------------------------
*/
Route::get('/sections', [SectionController::class, 'index']);
Route::post('/sections', [SectionController::class, 'store']);
Route::put('/sections/{id}', [SectionController::class, 'update']);
Route::delete('/sections/{id}', [SectionController::class, 'destroy']);
Route::get('/sections/{id}/students', [SectionController::class, 'students']);

/*
|--------------------------------------------------------------------------
| SUBJECTS
|--------------------------------------------------------------------------
*/
Route::prefix('subjects')->group(function () {
    Route::get('/', [SubjectController::class, 'index']);
    Route::post('/', [SubjectController::class, 'store']);
    Route::get('/{id}', [SubjectController::class, 'show']);
    Route::put('/{id}', [SubjectController::class, 'update']);
    Route::delete('/{id}', [SubjectController::class, 'destroy']);
});

/*
|--------------------------------------------------------------------------
| SUBJECT ASSIGNMENTS (NEW!!!)
|--------------------------------------------------------------------------
| → Each subject gets its own teacher, section, day, time, room, etc.
| → This replaces teacher_id, day, time, room, remark in subjects table.
|--------------------------------------------------------------------------
*/

Route::prefix('subject-assignments')->group(function () {
    Route::get('/', [SubjectAssignmentController::class, 'index']); 
    Route::post('/', [SubjectAssignmentController::class, 'store']); 

    // get assignments for a subject
    Route::post('/subjects/{id}/assign-schedule', [SubjectController::class, 'assignSchedule']);
    Route::get('/subject/{subject_id}', [SubjectAssignmentController::class, 'bySubject']);

    // update specific assignment
    Route::put('/{id}', [SubjectAssignmentController::class, 'update']);

    // delete specific assignment
    Route::delete('/{id}', [SubjectAssignmentController::class, 'destroy']);
});

/*
|--------------------------------------------------------------------------
| ADMIN ROUTES
|--------------------------------------------------------------------------
*/
Route::middleware(['auth:sanctum', 'is_admin'])->group(function () {

    // Pending Users
    Route::get('/admin/pending-users', [AdminController::class, 'pendingUsers']);
    Route::post('/admin/approve-user/{id}', [AdminController::class, 'approveUser']);

    // Dashboard Stats
    Route::get('/admin/dashboard-stats', [AdminController::class, 'dashboardStats']);
});

/*
|--------------------------------------------------------------------------
| AUTH
|--------------------------------------------------------------------------
*/

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
});
