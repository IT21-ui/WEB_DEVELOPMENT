<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\ClassSubjectController;
use App\Http\Controllers\Api\SystemReportController;

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Authenticated routes
Route::middleware(['auth:sanctum'])->group(function () {

    // Auth routes
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'me']);

    // User management
    Route::get('/admin/pending-users', [AdminController::class, 'pendingUsers']);
    Route::post('/admin/approve-user/{id}', [AdminController::class, 'approveUser']);

 // Classes and Subjects management
        Route::get('/admin/classes', [AdminController::class, 'getClasses']);
        Route::post('/admin/classes', [AdminController::class, 'addClass']);
        Route::delete('/admin/classes/{id}', [AdminController::class, 'deleteClass']);

    Route::get('/admin/subjects', [ClassSubjectController::class, 'getSubjects']);
    Route::post('/admin/subjects', [ClassSubjectController::class, 'addSubject']);
    Route::delete('/admin/subjects/{id}', [ClassSubjectController::class, 'deleteSubject']);

    Route::get('/admin/teachers', [ClassSubjectController::class, 'getTeachers']);
    Route::post('/admin/assign-teacher', [ClassSubjectController::class, 'assignTeacher']);
});

Route::prefix('reports')->group(function () {
    Route::get('/summary', [SystemReportController::class, 'summary']);
    Route::get('/recent', [SystemReportController::class, 'recentReports']);
    Route::get('/metrics', [SystemReportController::class, 'metrics']);
    Route::post('/generate', [SystemReportController::class, 'generateReport']);
    Route::get('/download/{id}', [SystemReportController::class, 'downloadReport']);
});