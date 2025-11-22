<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Department;
use App\Models\YearLevel;

class YearLevelsSeeder extends Seeder
{
    public function run()
    {
        $departments = Department::all();

        foreach ($departments as $dept) {
            $yearLevels = [
                ['name' => '1st Year', 'level' => 1],
                ['name' => '2nd Year', 'level' => 2],
                ['name' => '3rd Year', 'level' => 3],
                ['name' => '4th Year', 'level' => 4],
            ];

            foreach ($yearLevels as $yl) {
                YearLevel::create([
                    'department_id' => $dept->id,
                    'name' => $yl['name'],
                    'level' => $yl['level'],
                ]);
            }
        }
    }
}
