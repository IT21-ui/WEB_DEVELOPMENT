<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Department;

class DepartmentsSeeder extends Seeder
{
    public function run()
    {
        $departments = [
            ['name' => 'Information Technology', 'code' => 'BSIT'],
            ['name' => 'Computer Science', 'code' => 'BSCS'],
            ['name' => 'Business Administration', 'code' => 'BSBA'],
        ];

        foreach ($departments as $dept) {
            Department::create($dept);
        }
    }
}
