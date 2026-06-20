@extends('layouts.app')
@section('title')
    {{ __('messages.salary_generates.salary_generates') }}
@endsection
@section('page_css')
    <link href="{{ asset('assets/css/jquery.dataTables.min.css') }}" rel="stylesheet" type="text/css" />
    <link href="{{ asset('assets/css/select2.min.css') }}" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" href="{{ asset('assets/css/bs4-summernote/summernote-bs4.css') }}">
@endsection
@php
    $report_date =
        \Carbon\Carbon::createFromFormat('Y-m', $salaryGenerate->salary_month)->format('F Y') .
            ' | ' .
            $salaryGenerate->branch?->name ??
        '';
@endphp
@section('content')
    <section class="section">
        <div class="section-header item-align-right">
            <h1>{{ __('messages.salary_generates.salary_chart') }}
                {{ $report_date }}
            </h1>
            <div class="section-header-breadcrumb float-right">
                <div class="card-header-action mr-3 select2-mobile-margin">
                </div>
            </div>
            <div class="float-right">
                <a href="{{ route('salary_generates.index') }}"
                    class="btn btn-primary form-btn">{{ __('messages.salary_generates.list') }} </a>
            </div>
        </div>
        <div class="section-body">
            <div class="card">

                <div class="card-body">
                    @can('export_generate_salaries')
                        <div class="d-flex justify-content-end mb-3">
                            <!-- Print Button -->

                            <a target="_blank"
                                href="{{ route('salary_generates.sheets.export', ['action' => 'csv', 'id' => $salaryGenerate->id]) }}"
                                class="btn btn-primary mr-2 text-white"
                                style="line-height: 30px;background:#1E90FF !important;">
                                <i class="fas fa-print"></i> CSV Download
                            </a>
                            <a target="_blank"
                                href="{{ route('salary_generates.sheets.export', ['action' => 'print', 'id' => $salaryGenerate->id]) }}"
                                class="btn btnWarning mr-2 text-white"
                                style="line-height: 30px;background:#87CEFA  !important;">
                                <i class="fas fa-print"></i> Print
                            </a>

                            <!-- PDF Download Button -->
                            <a href="{{ route('salary_generates.sheets.export', ['action' => 'download', 'id' => $salaryGenerate->id]) }}"
                                id="downloadButton" class="btn btn-primary mb-4"
                                style="line-height: 30px;background:#4682B4  !important;">
                                <i class="fas fa-download"></i> PDF
                            </a>
                        </div>
                    @endcan
                    <div class="table-responsive">


                        <table id="salaryTable" class="table table-bordered">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th style="text-align: center;">{{ __('messages.employee_salaries.id') }}</th>
                                    <th>
                                        <div style="width: 130px;text-align:center">
                                            {{ __('messages.employee_salaries.employee_name') }}</div>
                                    </th>
                                    <th>{{ __('messages.employee_salaries.basic_salary') }}</th>
                                    <th>{{ __('messages.employee_salaries.bonuses') }}</th>
                                    <th>{{ __('messages.employee_salaries.overtime') }}</th>
                                    <th>{{ __('messages.employee_salaries.total_allowances') }}</th>
                                    <th>{{ __('messages.employee_salaries.gross_salary') }}</th>
                                    <th>{{ __('messages.employee_salaries.salary_advance') }}</th>
                                    <th>{{ __('messages.employee_salaries.loan') }}</th>
                                    <th>{{ __('messages.employee_salaries.total_insurance') }}</th>
                                    <th>{{ __('messages.employee_salaries.hourly_deduction') }}</th>
                                    <th>{{ __('messages.employee_salaries.total_deduction') }}</th>
                                    <th>{{ __('messages.employee_salaries.net_salary') }}</th>
                                    <th>Action</th>

                                </tr>
                            </thead>
                            <tbody>
                                @foreach ($sheets as $sheet)
                                    <tr>
                                        <td>{{ $loop->iteration }}</td>
                                        <td>
                                            <div style="width: 100px;text-align:center">{{ $sheet->employee->iqama_no }}
                                            </div>
                                        </td>
                                        <td>
                                            <div style="width: 130px;text-align:left;">{{ $sheet->employee->name }}</div>
                                        </td>
                                        <td>{{ number_format($sheet->basic_salary, 2) }}</td>
                                        <td>{{ number_format($sheet->total_bonus, 2) }}</td>
                                        <td>{{ number_format($sheet->total_overtimes, 2) }}</td>
                                        <td>{{ number_format($sheet->total_allowances, 2) }}</td>
                                        <td>{{ number_format($sheet->gross_salary, 2) }}</td>
                                        <td>{{ number_format($sheet->salary_advance, 2) }}</td>
                                        <td>{{ number_format($sheet->loan, 2) }}</td>
                                        <td>{{ number_format($sheet->total_insurance, 2) }}</td>
                                        <td>{{ number_format($sheet->hourly_deduction, 2) }}</td>
                                        <td>{{ number_format($sheet->total_deduction, 2) }}</td>
                                        <td>{{ number_format($sheet->net_salary, 2) }}</td>
                                        <td style="white-space: nowrap;">
                                            <button onclick="printItem({{ $sheet->id }})" class="btn btn-info btn-sm">
                                                <i class="fas fa-print"></i>
                                            </button>
                                            <button onclick="downloadItem({{ $sheet->id }})"
                                                class="btn btn-success btn-sm ms-2">
                                                <i class="fas fa-download"></i>
                                            </button>
                                        </td>


                                        {{-- <td>{{ number_format($sheet->state_income_tax, 2) }}</td>
                                        <td>{{ number_format($sheet->total_commission, 2) }}</td> --}}
                                    </tr>
                                @endforeach
                            </tbody>
                        </table>
                    </div>
                </div>


            </div>
        </div>
    </section>
@endsection
@section('page_scripts')
    <script src="{{ asset('assets/js/jquery.dataTables.min.js') }}"></script>
    <script src="{{ mix('assets/js/custom/custom-datatable.js') }}"></script>
    <script src="{{ mix('assets/js/bs4-summernote/summernote-bs4.js') }}"></script>
    <script src="{{ mix('assets/js/select2.min.js') }}"></script>
@endsection
@section('scripts')
    <script src="{{ mix('assets/js/custom/input-price-format.js') }}"></script>



    <script>
        function printItem(id) {

            const url = route('employee-salaries.payslip.download-view', {
                salarySheet: id
            });

            window.open(url, '_blank');
        }

        function downloadItem(id) {
            const url = route('employee-salaries.payslip.download', {
                salarySheet: id
            });
            window.open(url, '_blank');
        }
    </script>
@endsection
