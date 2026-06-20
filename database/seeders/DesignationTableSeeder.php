<?php

namespace Database\Seeders;

use App\Models\Designation;
use App\Models\Department;
use Illuminate\Database\Seeder;

class DesignationTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $marketing = Department::where('name', 'Marketing Department')->first();
        $operations = Department::where('name', 'Operations Department')->first();
        $finance = Department::where('name', 'Finance Department')->first();

        $input = [
            [
                'name' => 'Marketing Manager',
                'department_id' => $marketing->id ?? 1,
            ],
            [
                'name' => 'Sales Executive',
                'department_id' => $marketing->id ?? 1,
            ],
            [
                'name' => 'Operations Head',
                'department_id' => $operations->id ?? 2,
            ],
            [
                'name' => 'Accountant',
                'department_id' => $finance->id ?? 3,
            ],
        ];

        foreach ($input as $designation) {
            Designation::create($designation);
        }
    }
}
