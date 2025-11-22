<?php 

use Illuminate\Database\Migrations\Migration; 
use Illuminate\Database\Schema\Blueprint; 
use Illuminate\Support\Facades\Schema; 

return new class extends Migration 
{ 
    public function up(): void 
    { 
        Schema::create('students', function (Blueprint $table) { 
            $table->id(); 
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete(); 
            $table->string('first_name'); 
            $table->string('last_name'); 
            $table->string('email')->unique(); 
            $table->string('mobile')->nullable(); 
            $table->foreignId('department_id')->constrained()->cascadeOnDelete(); 
            $table->foreignId('year_level_id')->constrained('year_levels')->cascadeOnDelete(); 
            $table->foreignId('section_id')->nullable()->constrained('sections')->nullOnDelete(); 
            $table->timestamps(); 
        }); 
    } 
    public function down(): void 
    { 
        Schema::dropIfExists('students'); 
    } 
};