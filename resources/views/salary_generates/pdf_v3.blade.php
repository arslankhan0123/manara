@php
    use Carbon\Carbon;
    $report_date = \Carbon\Carbon::createFromFormat('Y-m', $salaryGenerate->salary_month)->format('F Y');

    $baseImagePath = public_path('img/company');
    // Company logo
    $imagePath = $baseImagePath . '/company_logo_color.png';
    $imageData = file_get_contents($imagePath);
    $base64 = base64_encode($imageData);
    $company_logo = 'data:image/png;base64,' . $base64; // Ensure correct format
    $bgColor = '#fff7f2';
    $bColor = '#e2e2e2';
    $totalWd = 0;
    $totalCTC = 0;
    $totalDeductions = 0;

@endphp

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invoice Details</title>
    <style>
        @page {
            size: A4 landscape;
            /* Set the page size to A4 and change the orientation to landscape */
            margin: 0;
            padding: 0;
        }

        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
        }

        .content_header {
            display: table;
            width: 100%;
            background-color: {{ $bgColor }};
            /* Set the background color */
            border: 2px solid {{ $bColor }};
            /* Optional border */
            padding: 10px 5px 5px 5px;

        }

        .content_header .left,
        .content_header .middle,
        .content_header .right {
            display: table-cell;
            vertical-align: middle;
            text-align: center;
        }

        .left {
            display: block;
            width: 30%;
            height: 2.62cm;

        }
        .right{
            padding-right: 10px;
        }

        .left div {
            width: 3cm;
            height: 2.62cm;
            margin-left: 10px;
            background-image: url('{{ $company_logo }}');
            background-size: 92%;

            background-position: center;
            background-repeat: no-repeat;

        }

        .content_header .left {
            text-align: left;
            width: 20%;
        }

        .content_header .middle {
            text-align: center;
            width: 60%;
        }

        .content_header .right {
            text-align: right;
            width: 20%;
        }

        .content_header img {
            max-width: 100%;
            max-height: 50px;
        }

        .content_header h2 {
            margin: 0;
            font-size: 18px;
        }

        .bColor {
            border: .05cm solid #e2e2e2 !important;
        }

        .bgColor {
            background: #fff7f2 !important;
        }

        .salary_sheet_table {
            border-collapse: collapse;
            width: 99%;
            margin: auto;
            margin-top: 15px;
            font-family: Arial, sans-serif;
            font-size: 8.5pt;
        }

        .salary_sheet_table th,
        .salary_sheet_table td {
            border: 1px solid #e2e2e2;
            padding: 4px;
            text-align: center;
        }

        .salary_sheet_table th {
            background-color: {{ $bgColor }};
        }

        .salary_sheet_table .header-row {
            background-color: {{ $bgColor }};
        }

        .salary_sheet_table .earnings-column {
            background-color: {{ $bgColor }}2;
        }

        .salary_sheet_table .deductions-column {
            background-color: {{ $bgColor }};
        }

        .salary_sheet_table .total-row {
            font-weight: bold;
        }

        .salary_sheet_table .amount-in-words {
            font-style: italic;
        }

        .text-left {
            text-align: left !important;
        }

        .text-right {
            text-align: right !important;
        }

        .textH {
            color: #ff7038 !important;
        }
    </style>
</head>

<body>
    <div class="contents">
        <div class="content_header">
            <div class="left">
                <div>
                </div>
            </div>
            <div class="middle">
                <h1 style="font-size: 20pt;line-height:0px;color:#f7996e;">{{ $settings['company'] ?? '' }}</h1>
                <p style="line-height:18px;"><span style="font-size: 18pt;font-weight:bold;color:#3b6b67;">SALARY
                        SHEET</span><br>{{$salaryGenerate->branch?->name??''}}</p>
                <p></p>
            </div>
            <div class="right">
                <h1 style="font-size: 20pt;">Total<br>{{ number_format($sheets->sum('net_salary'), 2) }}</h1>
            </div>
        </div>
        <div class="content_body">
            <table class="salary_sheet_table">
                <tr>
                    <th rowspan="2" class="header-row">S<br>N</th>
                    <th rowspan="2" class="header-row text-left">Employee<br>ID</th>
                    <th rowspan="2" class="header-row text-left">Employee<br>Name</th>
                    <th rowspan="2" class="header-row text-left">Designation</th>
                    <th rowspan="2" class="header-row textH">CTC</th>
                    <th rowspan="2" class="header-row">WD</th>
                    <th colspan="5" class="header-row earnings-column">Earnings</th>
                    <th colspan="5" class="header-row deductions-column">Deductions</th>
                    <th rowspan="2" class="header-row">Net</th>
                    <th rowspan="2" class="header-row" style="padding-left:10px;padding-right:10px;">Finger</th>
                    <th rowspan="2" class="header-row" style="padding-left:10px;padding-right:10px;">Signature</th>

                </tr>
                <tr>
                    <th>Basic</th>
                    <th>HRA</th>
                    <th>Bonus</th>
                    <th>Overtime</th>
                    <th>Payable</th>
                    <th>Absent</th>
                    <th>Advance</th>
                    <th>Loan</th>
                    <th>Other</th>
                    <th>Deductible</th>
                </tr>
                @foreach ($sheets as $sheet)
                    @php

                        $salaryMonth = Carbon::parse($sheet->salaryGenerate->salary_month);
                        $totalDaysInMonth = $salaryMonth->daysInMonth;
                        $dailyWorkingHours = 8;
                        // Calculate total working hours for the month
                        $totalWorkingHoursInMonth = $totalDaysInMonth * $dailyWorkingHours;

                        // Calculate Worked Days
                        $workedAndOvertimeHours = $sheet->worked_hours + $sheet->overtime_hours;
                        $workedDays = $workedAndOvertimeHours / $dailyWorkingHours;
                        $totalWd += $workedDays;

                        $ctc = $sheet->basic_salary + $sheet->total_bonus + $sheet->total_allowances;
                        $totalCTC += $ctc;
                        $rowTotalDeduction =
                            $sheet->salary_advance + $sheet->loan + $sheet->total_deduction + $sheet->hourly_deduction;
                        $totalDeductions += $rowTotalDeduction;

                    @endphp
                    <tr>
                        <td>{{ $loop->iteration }}</td>
                        <td class="text-left"
                            style="max-width: 90px; white-space: normal; word-break: break-word; overflow-wrap: break-word;">
                            {{ $sheet->employee->iqama_no }}
                        </td>

                        <td class="text-left"
                            style="max-width: 90px; white-space: normal; word-break: break-word; overflow-wrap: break-word;">
                            {{ $sheet->employee->name }}
                        </td>

                        <td class="text-left"
                            style="max-width: 68px; white-space: normal; word-break: break-word; overflow-wrap: break-word;">
                            {{ $sheet->employee?->designation?->name ?? '' }}
                        </td>

                        <td class="textH text-left">{{ number_format($ctc ?? 0, 2) }}</td>
                        <!-- Assuming 'ctc' is part of the $sheet data -->
                        <td>{{ $workedDays }}</td> <!-- Assuming 'wd' stands for 'Working Days' -->

                        <!-- Earnings Columns -->
                        <td class=" text-right">{{ number_format($sheet->basic_salary, 2) }}</td>
                        <td class=" text-right">{{ number_format($sheet->total_allowances, 2) }}</td>
                        <td class=" text-right">{{ number_format($sheet->total_bonus, 2) }}</td>

                        <td class=" text-right">{{ number_format($sheet->total_overtimes, 2) }}</td>
                        <!-- Placeholder for additional earnings -->
                        <td class=" text-right">{{ number_format($sheet->gross_salary, 2) }}</td>

                        <!-- Deductions Columns -->
                        <td class=" text-right">{{ number_format($sheet->hourly_deduction, 2) }}</td>
                        <td class=" text-right">{{ number_format($sheet->salary_advance, 2) }}</td>
                        <td class=" text-right">{{ number_format($sheet->loan, 2) }}</td>
                        <!-- Placeholder for tax -->
                        <td class=" text-right">{{ number_format($sheet->other_deductions, 2) }}</td>
                        <!-- Placeholder for other deductions -->
                        <td class=" text-right">{{ number_format($rowTotalDeduction, 2) }}</td>

                        <td class="text-right">{{ number_format($sheet->net_salary, 2) }}</td>
                        <td></td> <!-- Placeholder for Finger -->
                        <td></td> <!-- Placeholder for Signature -->
                    </tr>
                @endforeach
                <tr class="total-row">
                    <td colspan="4">Total</td>
                    <td class="textH text-right">{{ number_format($totalCTC, 2) }}</td>
                    <td> </td>
                    <td class="textH text-right">{{ number_format($sheets->sum('basic_salary'), 2) }}</td>
                    <td class="textH text-right">{{ number_format($sheets->sum('total_allowances'), 2) }}</td>
                    <td class="textH text-right">{{ number_format($sheets->sum('total_bonus'), 2) }}</td>
                    <td class="textH text-right">{{ number_format($sheets->sum('total_overtimes'), 2) }}</td>
                    <td class="textH text-right">{{ number_format($sheets->sum('gross_salary'), 2) }}</td>
                    <td class="textH text-right">{{ number_format($sheets->sum('hourly_deduction'), 2) }}</td>
                    <td class="textH text-right">{{ number_format($sheets->sum('salary_advance'), 2) }}</td>
                    <td class="textH text-right">{{ number_format($sheets->sum('loan'), 2) }}</td>
                    <td class="textH text-right">{{ number_format($sheets->sum('total_deduction'), 2) }}</td>
                    <td class="textH text-right">{{ number_format($totalDeductions, 2) }}</td>
                    <td class="textH text-right">{{ number_format($sheets->sum('net_salary'), 2) }}</td>
                    {{--




                     --}}
                    <td ></td> <!-- Placeholder for Finger -->
                    <td></td> <!-- Placeholder for Signature -->
                </tr>

            </table>
            <table style="margin: 0 auto; text-align: center; width: 100%; table-layout: fixed;margin-top:70px;">
                <tr>
                    <td style="padding: 10px;">Prepared By ________________</td>
                    <td style="padding: 10px;"> </td>
                    <td style="padding: 10px;">Approved By ________________</td>
                </tr>
            </table>

        </div>
    </div>

</body>

</html>
