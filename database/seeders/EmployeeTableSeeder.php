<?php

namespace Database\Seeders;

use App\Models\Employee;
use App\Models\Department;
use App\Models\Designation;
use Illuminate\Database\Seeder;

class EmployeeTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $marketing = Department::where('name', 'Marketing Department')->first();
        $manager = Designation::where('name', 'Marketing Manager')->first();
        
        $input = [
            [
                'name' => 'John Doe',
                'code' => 'EMP001',
                'department_id' => $marketing->id ?? 1,
                'designation_id' => $manager->id ?? 1,
                'iqama_no' => '1234567890',
                'branch_id' => 1,
                'status' => 1,
            ],
            [
                'name' => 'Jane Smith',
                'code' => 'EMP002',
                'department_id' => $marketing->id ?? 1,
                'designation_id' => $manager->id ?? 1,
                'iqama_no' => '0987654321',
                'branch_id' => 1,
                'status' => 1,
            ],
        ];

        foreach ($input as $employee) {
            Employee::create($employee);
        }
    }
}
