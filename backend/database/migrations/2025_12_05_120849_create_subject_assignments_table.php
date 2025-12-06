<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
public function up()
{
    Schema::create('subject_assignments', function (Blueprint $table) {
        $table->id();

        $table->foreignId('subject_id')->constrained()->cascadeOnDelete();
        $table->foreignId('section_id')->constrained()->cascadeOnDelete();
        $table->foreignId('teacher_id')->nullable()->constrained()->nullOnDelete();

        $table->string('day')->nullable();
        $table->string('time')->nullable();
        $table->string('room')->nullable();
        $table->string('remark')->nullable();

        $table->timestamps();
    });
}


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('subject_assignments');
    }
};
