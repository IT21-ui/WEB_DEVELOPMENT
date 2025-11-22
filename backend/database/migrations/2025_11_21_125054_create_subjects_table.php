<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::create('subjects', function (Blueprint $table) {
            $table->id();

            $table->string('code')->unique();
            $table->string('title');
            $table->integer('units')->nullable();
            $table->string('semester')->nullable();
            $table->string('curriculum_year')->nullable();

            // Foreign keys
            $table->foreignId('department_id')->constrained()->cascadeOnDelete();
            $table->foreignId('year_level_id')->constrained()->cascadeOnDelete();
            $table->foreignId('teacher_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('section_id')->nullable()->constrained()->cascadeOnDelete();

            $table->timestamps();
        });
    }


    public function down(): void
    {
        Schema::dropIfExists('subjects');
    }
};
