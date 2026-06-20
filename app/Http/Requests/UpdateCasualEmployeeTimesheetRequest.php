<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCasualEmployeeTimesheetRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        $type = $this->input('timesheet_type');

        $rules = [
            'casual_employee_id' => 'required|exists:casual_employees,id',
            'timesheet_type' => 'required|in:hourly,monthly',
        ];

        if ($type === 'hourly') {
            $rules = array_merge($rules, [
                // 'timesheet_date' => 'required|date',
                'working_hours' => 'required|numeric|min:0',
                'rate_per_hour' => 'required|numeric|min:0',
                'safety' => 'required|numeric|min:0',
                'absent_deduction' => 'required|numeric|min:0',
                'advance' => 'required|numeric|min:0',
            ]);
        } elseif ($type === 'monthly') {
            $rules = array_merge($rules, [
                // 'month_year' => 'required|date',
                'total_days' => 'required|integer|min:0|max:31',
                'overtime' => 'required|numeric|min:0',
                'basic_salary' => 'required|numeric|min:0',
                'safety' => 'required|numeric|min:0',
                'absent_deduction' => 'required|numeric|min:0',
                'advance' => 'required|numeric|min:0',
            ]);
        }

        return $rules;
    }

    public function attributes()
    {
        return [
            'casual_employee_id' => 'employee',
            'working_hours' => 'working hours',
            'rate_per_hour' => 'rate per hour',
            'total_days' => 'total days',
            'basic_salary' => 'basic salary',
        ];
    }
}
