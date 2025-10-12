<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // Fix the enum column definition
        DB::statement("ALTER TABLE users MODIFY role ENUM('admin', 'administrator', 'teacher', 'student') DEFAULT 'student'");

        // Fix existing invalid values
        DB::statement("UPDATE users SET role = 'admin' WHERE role = 'Admin = administrator'");
    }

    public function down(): void
    {
        // Rollback to old definition (if needed)
        DB::statement("ALTER TABLE users MODIFY role ENUM('Admin = administrator', 'teacher', 'student') DEFAULT 'student'");
    }
};
