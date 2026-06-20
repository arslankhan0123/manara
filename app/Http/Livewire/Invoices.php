<?php

namespace App\Http\Livewire;

use App\Models\Invoice;
use App\Repositories\InvoiceRepository;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Contracts\View\View;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Str;
use Carbon\Carbon;

class Invoices extends SearchableComponent
{
    public $statusFilter = '';
    public $customer = '';
    public $branchFilterID = '';
    public $monthFilter = '';
    public $startDateFilter = '';
    public $endDateFilter = '';
    public $paginate = 100;

    /**
     * @var string[]
     */
    protected $listeners = [
        'refresh' => '$refresh',
        'filterStatus',
        'filterBranch',
        'filterMonth',
        'filterCustomer',
        'filterDateRange'
    ];

    /**
     * @return string
     */
    public function model()
    {
        return Invoice::class;
    }

    /**
     * @return string[]
     */
    public function searchableFields()
    {
        return [
            'title',
            'invoice_number',
            'customer.company_name',
            'user_id',
            'project.project_name',
            'branch_id',
        ];
    }

    /**
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\View\Factory|View
     */
    public function render()
    {
        $invoices = $this->searchInvoices();
        $invoiceRepo = app(InvoiceRepository::class);
        $statusCount = $invoiceRepo->getInvoicesStatusCount();
        $customer = $this->customer;
        $invoiceStatus = Invoice::PAYMENT_STATUS;

        return view('livewire.invoices', compact('invoices', 'statusCount', 'customer', 'invoiceStatus'));
    }

    /**
     * @return LengthAwarePaginator
     */

    public function searchInvoices()
    {
        \Log::info('=== START SEARCH INVOICES ===', [
            'monthFilter' => $this->monthFilter,
            'statusFilter' => $this->statusFilter,
            'customer' => $this->customer,
            'branchFilterID' => $this->branchFilterID,
            'search' => $this->search,
            'startDateFilter' => $this->startDateFilter,
            'endDateFilter' => $this->endDateFilter,
        ]);

        // Add 'project' to the with() clause to eager load the relationship
        $this->setQuery($this->getQuery()->with(['customer', 'project']));

        $this->filterResults();

        $this->getQuery()->when($this->statusFilter !== '', function (Builder $q) {
            $q->where('payment_status', $this->statusFilter);
        });

        $this->getQuery()->when($this->customer !== '', function (Builder $q) {
            $q->where('customer_id', $this->customer);
        });

        $this->getQuery()->when($this->monthFilter !== '', function (Builder $q) {
            // Parse the selected month (YYYY-MM format)
            $selectedDate = Carbon::createFromFormat('Y-m', $this->monthFilter);
            $startDate = $selectedDate->copy()->startOfMonth();
            $endDate = $selectedDate->copy()->endOfMonth();

            // Filter by invoice_date between start and end of selected month
            $q->whereBetween('invoice_date', [$startDate, $endDate]);
        });

        $this->getQuery()->when($this->branchFilterID !== '', function (Builder $q) {
            // If branchFilterID is not empty, filter by branch_id
            $q->where('branch_id', $this->branchFilterID);
        }, function (Builder $q) {
            // If branchFilterID is empty, filter by user's branch_id
            $q->whereIn('branch_id', function ($query) {
                $query->select('branch_id')
                    ->from('users_branches')
                    ->where('user_id', auth()->id());
            });
        });

        // Apply date range filter on invoice_date
        if (!empty($this->startDateFilter)) {
            $this->getQuery()->whereDate('invoice_date', '>=', $this->startDateFilter);
        }
        if (!empty($this->endDateFilter)) {
            $this->getQuery()->whereDate('invoice_date', '<=', $this->endDateFilter);
        }

        // Group draft invoices at the top, sort by invoice number descending
        $this->getQuery()->reorder()
            ->orderByRaw("CASE WHEN payment_status = 0 THEN 0 ELSE 1 END ASC")
            ->orderByRaw("LENGTH(invoice_number) DESC")
            ->orderByRaw("invoice_number DESC");

        \Log::info('SQL:', ['sql' => $this->getQuery()->toSql(), 'bindings' => $this->getQuery()->getBindings()]);

        return $this->paginate(false);
    }
    // public function searchInvoices()
    // {
    //     $this->setQuery($this->getQuery()->with('customer'));

    //     $this->getQuery()->where(function (Builder $query) {
    //         $this->filterResults();
    //     });

    //     $this->getQuery()->when($this->statusFilter !== '', function (Builder $q) {
    //         $q->where('payment_status', $this->statusFilter);
    //     });

    //     $this->getQuery()->when($this->customer !== '', function (Builder $q) {
    //         $q->where('customer_id', $this->customer);
    //     });

    //     $this->getQuery()->when($this->monthFilter !== '', function (Builder $q) {
    //         // Parse the selected month (YYYY-MM format)
    //         $selectedDate = Carbon::createFromFormat('Y-m', $this->monthFilter);
    //         $startDate = $selectedDate->copy()->startOfMonth();
    //         $endDate = $selectedDate->copy()->endOfMonth();

    //         // Filter by invoice_date between start and end of selected month
    //         $q->whereBetween('invoice_date', [$startDate, $endDate]);
    //     });

    //     $this->getQuery()->when($this->branchFilterID !== '', function (Builder $q) {
    //         // If branchFilterID is not empty, filter by branch_id
    //         $q->where('branch_id', $this->branchFilterID);
    //     }, function (Builder $q) {
    //         // If branchFilterID is empty, filter by user's branch_id
    //         $q->whereIn('branch_id', function ($query) {
    //             $query->select('branch_id')
    //                 ->from('users_branches')
    //                 ->where('user_id', auth()->id());
    //         });
    //     });

    //     return $this->paginate();
    // }

    /**
     * @return Builder
     */
    public function filterResults()
    {
        $searchableFields = $this->searchableFields();
        $search = $this->search;

        $this->getQuery()->when(! empty($search), function (Builder $q) use ($search, $searchableFields) {
            $this->getQuery()->where(function (Builder $q) use ($search, $searchableFields) {
                $searchString = '%' . $search . '%';
                foreach ($searchableFields as $field) {
                    if (Str::contains($field, '.')) {
                        $field = explode('.', $field);
                        $q->orWhereHas($field[0], function (Builder $query) use ($field, $searchString) {
                            $query->whereRaw("lower($field[1]) like ?", $searchString);
                        });
                    } else {
                        $q->orWhereRaw("lower($field) like ?", $searchString);
                    }
                }
            });
        });

        return $this->getQuery();
    }

    /**
     * @param  int  $id
     */
    public function filterStatus($id)
    {
        $this->statusFilter = $id;
        $this->resetPage();
    }

    /**
     * @param  int  $id
     */
    public function filterBranch($id)
    {
        $this->branchFilterID = $id;
        $this->resetPage();
    }

    /**
     * @param  string  $month
     */
    public function filterMonth($month)
    {
        $this->monthFilter = $month;
        $this->resetPage();
    }

    /**
     * @param  int  $customerId
     */
    public function filterCustomer($customerId)
    {
        $this->customer = $customerId;
        $this->resetPage();
    }

    public function updatingSearch()
    {
        $this->resetPage();
    }

    /**
     * @param  string  $startDate
     * @param  string  $endDate
     */
    public function filterDateRange($startDate, $endDate)
    {
        $this->startDateFilter = $startDate;
        $this->endDateFilter = $endDate;
        $this->resetPage();
    }
}
