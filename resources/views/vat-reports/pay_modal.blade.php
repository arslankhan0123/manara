<!-- Modal Structure -->
<div class="modal fade" id="payModal" tabindex="-1" aria-labelledby="payModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="payModalLabel">Report Information</h5>
                <button type="button" class="btn btn-close" data-bs-dismiss="modal" aria-label="Close"> <i
                        class="fa fa-times" aria-hidden="true"></i></button>
            </div>
            <div class="modal-body">
                <!-- Dynamic content will be injected here -->
                <div>
                    {{ Form::open(['id' => 'report-form']) }}

                    <!-- Period Label and Input -->
                    <div class="mb-3">
                        <label for="period" class="form-label">Period</label>
                        <input type="text" class="form-control" id="period" name="period" disabled>
                    </div>
                    <div class="mb-3">
                        <label for="period" class="form-label">Branch</label>
                        <input type="text" class="form-control" id="branch" disabled>
                    </div>
                    <div class="mb-3">
                        <label for="paid" class="form-label">Bank Name</label>
                        <input type="text" class="form-control" name="bank_name" id="bank_name" required>
                    </div>
                    <div class="mb-3">
                        <label for="paid" class="form-label">Account Number</label>
                        <input type="text" class="form-control" name="account_number" required id="account_number">
                    </div>
                    <!-- Paid Field Label and Input -->
                    <div class="mb-3">
                        <label for="paid" class="form-label">Amount</label>
                        <input type="number" class="form-control" id="paid" name="paid" required>
                    </div>

                    <input type="hidden" name="id" id="vat_report_id">
                    {{ Form::close() }}
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-close btn-warning" data-bs-dismiss="modal">Close</button>
                <button type="submit" form="report-form" class="btn btn-success" id="submit-report">Submit</button>
            </div>
        </div>
    </div>
</div>
