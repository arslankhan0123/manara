@extends('layouts.app')

@section('title')
    Financial Year Management
@endsection

@section('page_css')
    <link href="{{ asset('assets/css/jquery.dataTables.min.css') }}" rel="stylesheet" type="text/css" />
    <link href="{{ asset('assets/css/select2.min.css') }}" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" href="{{ asset('assets/css/bs4-summernote/summernote-bs4.css') }}">
@endsection

@section('content')
    <section class="section">
        <div class="section-header">
            <h1>Financial Year</h1>
        </div>
        <div class="section-body">
            <div class="card">
                <div class="card-body">
                    <!-- Form Section -->
                    <form>
                        <div class="row mb-3">
                            <div class="col-md-6">
                                <label for="title" class="form-label">
                                    Title <span class="text-danger">*</span>
                                </label>
                                <input type="text" name="title" class="form-control" value="2024-2024" required>
                            </div>

                            <div class="col-md-3">
                                <label for="from_date" class="form-label">
                                    From Date <span class="text-danger">*</span>
                                </label>
                                <input type="date" name="from_date" class="form-control" value="2024-09-11" required>
                            </div>

                            <div class="col-md-3">
                                <label for="to_date" class="form-label">
                                    To Date <span class="text-danger">*</span>
                                </label>
                                <input type="date" name="to_date" class="form-control" value="2024-09-11" required>
                            </div>
                        </div>

                        <div class="row mb-3">
                            <div class="col-md-6">
                                <label for="status" class="form-label">
                                    Status <span class="text-danger">*</span>
                                </label>
                                <div>
                                    <input type="radio" id="active" name="status" value="active" checked>
                                    <label for="active">Active</label>
                                    <input type="radio" id="inactive" name="status" value="inactive">
                                    <label for="inactive">Inactive</label>
                                </div>
                            </div>
                        </div>

                        <button type="submit" class="btn btn-success">Save</button>
                    </form>

                </div>
            </div>

            <!-- Table Section -->
            <div class="card mt-4">
                <div class="card-body">
                    <h5>Financial Year List</h5>
                    <hr>
                    <table class="table table-bordered" id="financialYearTable">
                        <thead>
                            <tr>
                                <th>SL</th>
                                <th>Title</th>
                                <th>From Date</th>
                                <th>To Date</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>2021-2022</td>
                                <td>2021-10-25</td>
                                <td>2022-10-31</td>
                                <td>Ended</td>
                                <td>
                                    <button class="btn btn-info btn-sm"><i class="fas fa-edit"></i></button>
                                    <button class="btn btn-danger btn-sm"><i class="fas fa-trash"></i></button>
                                </td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>2022-2023</td>
                                <td>2022-11-01</td>
                                <td>2023-10-31</td>
                                <td>Ongoing</td>
                                <td>
                                    <button class="btn btn-info btn-sm"><i class="fas fa-edit"></i></button>
                                    <button class="btn btn-danger btn-sm"><i class="fas fa-trash"></i></button>
                                </td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>2023-2024</td>
                                <td>2023-11-01</td>
                                <td>2024-10-31</td>
                                <td>Upcoming</td>
                                <td>
                                    <button class="btn btn-info btn-sm"><i class="fas fa-edit"></i></button>
                                    <button class="btn btn-danger btn-sm"><i class="fas fa-trash"></i></button>
                                </td>
                            </tr>
                            <tr>
                                <td>4</td>
                                <td>2020-2021</td>
                                <td>2020-10-25</td>
                                <td>2021-10-31</td>
                                <td>Ended</td>
                                <td>
                                    <button class="btn btn-info btn-sm"><i class="fas fa-edit"></i></button>
                                    <button class="btn btn-danger btn-sm"><i class="fas fa-trash"></i></button>
                                </td>
                            </tr>
                            <tr>
                                <td>5</td>
                                <td>2019-2020</td>
                                <td>2019-10-25</td>
                                <td>2020-10-31</td>
                                <td>Ended</td>
                                <td>
                                    <button class="btn btn-info btn-sm"><i class="fas fa-edit"></i></button>
                                    <button class="btn btn-danger btn-sm"><i class="fas fa-trash"></i></button>
                                </td>
                            </tr>
                            <tr>
                                <td>6</td>
                                <td>2018-2019</td>
                                <td>2018-10-25</td>
                                <td>2019-10-31</td>
                                <td>Ended</td>
                                <td>
                                    <button class="btn btn-info btn-sm"><i class="fas fa-edit"></i></button>
                                    <button class="btn btn-danger btn-sm"><i class="fas fa-trash"></i></button>
                                </td>
                            </tr>
                            <tr>
                                <td>7</td>
                                <td>2017-2018</td>
                                <td>2017-10-25</td>
                                <td>2018-10-31</td>
                                <td>Ended</td>
                                <td>
                                    <button class="btn btn-info btn-sm"><i class="fas fa-edit"></i></button>
                                    <button class="btn btn-danger btn-sm"><i class="fas fa-trash"></i></button>
                                </td>
                            </tr>
                            <!-- Repeat rows as necessary -->
                        </tbody>
                    </table>
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
        $(document).ready(function() {
            $('#financialYearTable').DataTable();
        });
    </script>
@endsection
