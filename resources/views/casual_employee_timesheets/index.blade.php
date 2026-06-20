@extends('layouts.app')
@section('title')
    {{ __('Casual Employee Timesheets') }}
@endsection
@section('page_css')
    <link href="{{ asset('assets/css/jquery.dataTables.min.css') }}" rel="stylesheet" type="text/css" />
    <link href="https://cdn.datatables.net/buttons/2.4.2/css/buttons.dataTables.min.css" rel="stylesheet" />
@endsection
@section('content')
    <section class="section">
        <div class="section-header">
            <h1>{{ __('Casual Employee Timesheets') }}</h1>
            <div class="section-header-breadcrumb">
                <a href="{{ route('casual-employee-timesheets.create') }}" class="btn btn-primary form-btn">
                    {{ __('Add Timesheet') }}
                </a>
            </div>
        </div>
        <div class="section-body">
            <div class="card">
                <div class="card-body">
                    @include('casual_employee_timesheets.table')
                </div>
            </div>
        </div>
    </section>
@endsection
@section('page_scripts')
    <script src="{{ asset('assets/js/jquery.dataTables.min.js') }}"></script>
    <script src="https://cdn.datatables.net/buttons/2.4.2/js/dataTables.buttons.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/pdfmake.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/vfs_fonts.js"></script>
    <script src="https://cdn.datatables.net/buttons/2.4.2/js/buttons.html5.min.js"></script>
    <script src="{{ mix('assets/js/custom/custom-datatable.js') }}"></script>
@endsection
@section('scripts')
    <script>
        let timesheetsUrl = "{{ route('casual-employee-timesheets.index') }}";

        let tbl = $('#casualEmployeeTimesheetsTable').DataTable({
            processing: true,
            serverSide: true,
            ajax: timesheetsUrl,
            dom: 'Blfrtip',
            buttons: [
                'csvHtml5',
                'pdfHtml5'
            ],
            lengthMenu: [
                [10, 25, 50, 100, -1],
                [10, 25, 50, 100, "All"]
            ],
            columns: [{
                    data: 'batch_id',
                    name: 'batch_id'
                },
                {
                    data: 'date',
                    name: 'date',
                    render: function(data) {
                        if (data) {
                            return moment(data).format('DD MMM, YYYY');
                        }
                        return 'N/A';
                    }
                },
                {
                    data: 'type',
                    name: 'type',
                    render: function(data) {
                        return `<span class="badge badge-info">${data}</span>`;
                    }
                },
                {
                    data: 'employee_count',
                    name: 'employee_count',
                    render: function(data) {
                        return data + ' Employees';
                    }
                },
                {
                    data: 'total_amount',
                    name: 'total_amount',
                    render: function(data) {
                        return 'SAR ' + parseFloat(data).toFixed(2);
                    }
                },
                {
                    data: 'created_at',
                    name: 'created_at',
                    render: function(data) {
                        return moment(data).format('DD MMM, YYYY');
                    }
                },
                {
                    data: function(row) {
                        let viewUrl = "{{ route('casual-employee-timesheets.show', ':id') }}".replace(':id',
                            row.batch_id);
                        let editUrl = "{{ route('casual-employee-timesheets.edit', ':id') }}".replace(':id',
                            row.batch_id);

                        return `
                            <a href="${viewUrl}" class="btn btn-info btn-sm" title="View">
                                <i class="fas fa-eye"></i>
                            </a>
                            <a href="${editUrl}" class="btn btn-warning btn-sm" title="Edit">
                                <i class="fas fa-edit"></i>
                            </a>
                            <button class="btn btn-danger btn-sm delete-btn" data-id="${row.batch_id}" title="Delete">
                                <i class="fas fa-trash"></i>
                            </button>
                        `;
                    },
                    orderable: false,
                    searchable: false
                }
            ],
            columnDefs: [{
                    orderable: false,
                    targets: [6]
                } // Action column
            ]
        });

        $(document).on('click', '.delete-btn', function() {
            let batchId = $(this).data('id');
            deleteItem('{{ route('casual-employee-timesheets.destroy', '') }}/' + batchId,
                '#casualEmployeeTimesheetsTable', 'Timesheet Batch');
        });
    </script>
@endsection
