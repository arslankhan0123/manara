<?php

namespace App\Queries;

use App\Models\HourlyTimesheet;
use App\Models\MonthlyTimesheet;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Builder;

class CasualEmployeeTimesheetDataTable
{
    public function get($input = [])
    {
        // Get unique batches with summary information
        $query = DB::table('hourly_timesheets')
            ->select(
                'hourly_timesheets.batch_id',
                DB::raw("MIN(hourly_timesheets.timesheet_date) as date"),
                DB::raw("'Hourly & Monthly' as type"),
                DB::raw("COUNT(DISTINCT hourly_timesheets.casual_employee_id) as employee_count"),
                DB::raw("SUM(hourly_timesheets.net_amount) as total_amount"),
                DB::raw("MAX(hourly_timesheets.created_at) as created_at")
            )
            ->groupBy('hourly_timesheets.batch_id')
            ->unionAll(
                DB::table('monthly_timesheets')
                    ->select(
                        'monthly_timesheets.batch_id',
                        DB::raw("MIN(monthly_timesheets.month_year) as date"),
                        DB::raw("'Hourly & Monthly' as type"),
                        DB::raw("COUNT(DISTINCT monthly_timesheets.casual_employee_id) as employee_count"),
                        DB::raw("SUM(monthly_timesheets.net_amount) as total_amount"),
                        DB::raw("MAX(monthly_timesheets.created_at) as created_at")
                    )
                    ->groupBy('monthly_timesheets.batch_id')
            )
            ->orderBy('created_at', 'desc');

        return $query;
    }
}
