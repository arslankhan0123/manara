<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HourlyTimesheet extends Model
{
    use HasFactory;

    protected $fillable = [
        'casual_employee_id',
        'timesheet_date',
        'working_hours',
        'rate_per_hour',
        'total_amount',
        'safety',
        'absent_deduction',
        'advance',
        'net_amount',
        'batch_id'
    ];

    protected $casts = [
        'timesheet_date' => 'date',
        'working_hours' => 'decimal:2',
        'rate_per_hour' => 'decimal:2',
        'total_amount' => 'decimal:2',
        'safety' => 'decimal:2',
        'absent_deduction' => 'decimal:2',
        'advance' => 'decimal:2',
        'net_amount' => 'decimal:2'
    ];

    public function casualEmployee()
    {
        return $this->belongsTo(CasualEmployee::class);
    }
}
