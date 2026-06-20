<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MonthlyTimesheet extends Model
{
    use HasFactory;

    protected $fillable = [
        'casual_employee_id',
        'month_year',
        'total_days',
        'overtime',
        'basic_salary',
        'ot_amount',
        'safety',
        'absent_deduction',
        'advance',
        'net_amount',
        'batch_id'
    ];

    protected $casts = [
        'month_year' => 'date',
        'overtime' => 'decimal:2',
        'basic_salary' => 'decimal:2',
        'ot_amount' => 'decimal:2',
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
