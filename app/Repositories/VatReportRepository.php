<?php

namespace App\Repositories;

use App\Models\VatReport;
use Exception;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Hash;
use App\Models\SalesItem;
use App\Models\Expense;
use App\Models\Invoice;
use App\Models\CreditNote;
use App\Models\Branch;
use App\Models\PosOrder;
use App\Models\PosOrderRefund;
use App\Models\PurchasedItem;
use Illuminate\Support\Facades\Log;
use App\Models\PurchaseInvoice;
use App\Models\PurchaseReturn;
use Carbon\Carbon;
use App\Models\ManualSale;

/**
 * Class CustomerRepository
 *
 * @version April 3, 2020, 6:37 am UTC
 */
class VatReportRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = ['period', 'input', 'output', 'net', 'paid', 'unpaid', 'year', 'bank_name', 'account_number'];

    /**
     * Return searchable fields
     *
     * @return array
     */
    public function getFieldsSearchable()
    {
        return $this->fieldSearchable;
    }

    /**
     * Configure the Model
     **/
    public function model()
    {
        return VatReport::class;
    }

    public function create($input)
    {
        return VatReport::create(Arr::only($input, $this->getFieldsSearchable()));
    }
    public function getInvoicesData($id)
    {

        $report = VatReport::findOrFail($id);

        // Determine the start and end date based on the quarter (period)
        $dates = $this->getQuarterDateRange($report->period);
        // Fetch invoices related to SalesItem model within the given date range
        $invoices = SalesItem::whereIn('owner_type', ['App\Models\Invoice', 'App\Models\CreditNote'])->whereBetween('created_at', [$dates['start'], $dates['end']])
            ->get();

        $result = $this->calculateVatReport($invoices);
        $report['result'] = $result;
        $report['branch'] = $report->load('branch');
        // Return the invoices data (You can modify the structure as needed)
        //  dd($result);
        return $report;
    }

   public function calculateVatReport($invoices)
{
    $input = 0;
    $output = 0;

    foreach ($invoices as $invoice) {
        if ($invoice['owner_type'] === 'App\Models\Invoice') {
            // Sales invoices add to OUTPUT VAT (VAT you charge on sales)
            $tmpOutput = $invoice['rate'] * $invoice['quantity'];
            $output += ($tmpOutput * $invoice['tax']) / 100;
        }
        if ($invoice['owner_type'] === 'App\Models\ManualSale') {
            // Manual sales add to OUTPUT VAT (VAT you charge on sales)
            $tmpOutput = $invoice['rate'] * $invoice['quantity'];
            $output += ($tmpOutput * $invoice['tax']) / 100;
        }
        if ($invoice['owner_type'] === 'App\Models\CreditNote') {
            // Credit notes reduce OUTPUT VAT (when you give credit, you reduce VAT payable)
            $tmpInput = $invoice['rate'] * $invoice['quantity'];
            $input += ($tmpInput * $invoice['tax']) / 100;
        }
    }

    return [
        'input' => $input,   // Credit notes (reduce output VAT)
        'output' => $output, // Sales invoices + Manual sales (VAT you need to pay)
    ];
}
    public function calculateVatReportPurchase($invoices)
    {
        $input = 0;
        $output = 0;
    
        foreach ($invoices as $invoice) {
            if ($invoice['owner_type'] === 'App\Models\PurchaseInvoice') {
                // Purchase invoices add to INPUT VAT (VAT you pay on purchases - claimable)
                $tmpInput = $invoice['rate'] * $invoice['quantity'];
                $input += ($tmpInput * $invoice['tax']) / 100;
            }
            if ($invoice['owner_type'] === 'App\Models\PurchaseReturn') {
                // Purchase returns reduce INPUT VAT (when you return goods, you lose VAT claim)
                $tmpOutput = $invoice['rate'] * $invoice['quantity'];
                $output += ($tmpOutput * $invoice['tax']) / 100;
            }
        }
    
        return [
            'input' => $input,    
            'output' => $output,  
        ];
    }

    private function getQuarterDateRange($period)
    {
        // Define the date ranges for each quarter
        switch ($period) {
            case 'q1':
                // January to March
                $start = now()->year . '-01-01';
                $end = now()->year . '-03-31';
                break;
            case 'q2':
                // April to June
                $start = now()->year . '-04-01';
                $end = now()->year . '-06-30';
                break;
            case 'q3':
                // July to September
                $start = now()->year . '-07-01';
                $end = now()->year . '-09-30';
                break;
            case 'q4':
                // October to December
                $start = now()->year . '-10-01';
                $end = now()->year . '-12-31';
                break;
            default:
                $start = null;
                $end = null;
                break;
        }

        return ['start' => $start, 'end' => $end];
    }

    public function updatePaid($data)
    {

        $vatReport = VatReport::findOrFail($data['id']);
        $vatReport->paid = $vatReport->paid + $data['paid'];
        $vatReport->bank_name = $data['bank_name'];
        $vatReport->account_number = $data['account_number'];
        $vatReport->unpaid = $vatReport->unpaid - $data['paid'];

        $vatReport->save();
    }
public function makeReport($year, $usersBranches)
{
    try {
        $usersBranches = Branch::pluck('name', 'id');

        $quarters = [
            'q1' => ['start' => "$year-01-01", 'end' => "$year-03-31"],
            'q2' => ['start' => "$year-04-01", 'end' => "$year-06-30"],
            'q3' => ['start' => "$year-07-01", 'end' => "$year-09-30"],
            'q4' => ['start' => "$year-10-01", 'end' => "$year-12-31"],
        ];

        $reportData = [];

        foreach ($usersBranches as $branchId => $branch) {
            foreach ($quarters as $quarter => $dates) {
                \Log::info("=== PROCESSING: Branch $branchId, Quarter $quarter ===");
                
                // Fetch sales items - Only PAID invoices and manual sales
                $invoices = SalesItem::whereBetween('created_at', [$dates['start'], $dates['end']])
                    ->where(function ($query) use ($branchId) {
                        $query->where(function ($subQuery) use ($branchId) {
                            // Filter for PAID Invoices only
                            $subQuery->where('owner_type', 'App\Models\Invoice')
                                ->whereHas('invoice', function ($q) use ($branchId) {
                                    $q->where('branch_id', $branchId)
                                        ->where('payment_status', 2); // Only paid invoices
                                });
                        })
                        ->orWhere(function ($subQuery) use ($branchId) {
                            // Filter for CreditNotes
                            $subQuery->where('owner_type', 'App\Models\CreditNote')
                                ->whereHas('creditNote', function ($q) use ($branchId) {
                                    $q->where('branch_id', $branchId);
                                });
                        })
                        ->orWhere(function ($subQuery) use ($branchId) {
                            // Filter for PAID ManualSales only
                            $subQuery->where('owner_type', 'App\Models\ManualSale')
                                ->whereHas('manualSale', function ($q) use ($branchId) {
                                    $q->where('branch_id', $branchId)
                                        ->where('payment_status', 2); // Only paid manual sales
                                });
                        });
                    })
                    ->with(['invoice', 'creditNote', 'manualSale'])
                    ->get();

                \Log::info("Sales Items Found: " . $invoices->count());
                foreach ($invoices as $item) {
                    if ($item->owner_type === 'App\Models\ManualSale' && $item->manualSale) {
                        \Log::info("ManualSale - ID: {$item->manualSale->id}, Payment Status: " . ($item->manualSale->payment_status ?? 'N/A') . ", Rate: {$item->rate}, Qty: {$item->quantity}, Tax: {$item->tax}");
                    } else if ($item->owner_type === 'App\Models\Invoice' && $item->invoice) {
                        \Log::info("Invoice - ID: {$item->invoice->id}, Payment Status: " . ($item->invoice->payment_status ?? 'N/A') . ", Rate: {$item->rate}, Qty: {$item->quantity}, Tax: {$item->tax}");
                    } else {
                        \Log::info("Sales Item - Type: {$item->owner_type}, Rate: {$item->rate}, Qty: {$item->quantity}, Tax: {$item->tax}");
                    }
                }

                // Fetch purchase items - WITH BRANCH FILTER
                $purchaseItems = PurchasedItem::whereBetween('created_at', [$dates['start'], $dates['end']])
                    ->where(function ($query) use ($branchId) {
                        $query->where(function ($subQuery) use ($branchId) {
                            // Filter for owner_type = PurchaseInvoice with branch
                            $subQuery->where('owner_type', 'App\Models\PurchaseInvoice')
                                ->whereHas('purchaseInvoice', function ($q) use ($branchId) {
                                    $q->where('branch_id', $branchId);
                                });
                        })
                        ->orWhere(function ($subQuery) use ($branchId) {
                            // Filter for owner_type = PurchaseReturn with branch
                            $subQuery->where('owner_type', 'App\Models\PurchaseReturn')
                                ->whereHas('purchaseReturn', function ($q) use ($branchId) {
                                    $q->where('branch_id', $branchId);
                                });
                        });
                    })
                    ->with(['purchaseInvoice', 'purchaseReturn'])
                    ->get();

                \Log::info("Purchase Items Found: " . $purchaseItems->count());
                foreach ($purchaseItems as $item) {
                    \Log::info("Purchase Item - Type: {$item->owner_type}, Rate: {$item->rate}, Qty: {$item->quantity}, Tax: {$item->tax}");
                }

                // Calculate VAT reports
                $salesResult = $this->calculateVatReport($invoices);
                $purchaseResult = $this->calculateVatReportPurchase($purchaseItems);

                $totalExpenses = Expense::with('tax1Rate')
                    ->whereBetween('created_at', [$dates['start'], $dates['end']])
                    ->where('branch_id', $branchId)
                    ->where('isTaxable', 1)
                    ->get()
                    ->map(function ($expense) {
                        $taxAmount = 0;
                        if ($expense->tax1Rate) {
                            $taxRate = $expense->tax1Rate->tax_rate;
                            $taxAmount = ($expense->amount * $taxRate) / 100;
                        }
                        return $taxAmount;
                    })
                    ->sum();

                \Log::info("Expenses VAT: " . $totalExpenses);

                // Combine results
                $totalInput = $salesResult['input'] + $purchaseResult['input'];
                $totalOutput = $salesResult['output'] + $purchaseResult['output'] + $totalExpenses;

                \Log::info("=== CALCULATION SUMMARY ===");
                \Log::info("Sales - Input: {$salesResult['input']}, Output: {$salesResult['output']}");
                \Log::info("Purchase - Input: {$purchaseResult['input']}, Output: {$purchaseResult['output']}");
                \Log::info("Expenses VAT: {$totalExpenses}");
                \Log::info("TOTAL - Input: {$totalInput}, Output: {$totalOutput}");
                \Log::info("Net: " . ($totalInput - $totalOutput));
                \Log::info("=== END CALCULATION SUMMARY ===");

                // Prepare and save data
                $data = [
                    'year' => $year,
                    'period' => $quarter,
                    'input' => $totalInput,
                    'output' => $totalOutput,
                    'net' => $totalInput - $totalOutput,
                    'unpaid' => $totalInput - $totalOutput,
                    'updated_at' => now(),
                ];

                VatReport::updateOrCreate(
                    [
                        'year' => $year,
                        'period' => $quarter,
                        'branch_id' => $branchId
                    ],
                    $data
                );

                $reportData[] = $data;
            }
        }

        return response()->json([
            'success' => true,
            'data' => $reportData,
            'message' => 'VAT report generated successfully'
        ], 200);

    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Error generating VAT report: ' . $e->getMessage()
        ], 500);
    }
}

  public function getViewData($report)
{
    $year = $report->year;
    $quarters = [
        'q1' => ['start' => "$year-01-01", 'end' => "$year-03-31"],
        'q2' => ['start' => "$year-04-01", 'end' => "$year-06-30"],
        'q3' => ['start' => "$year-07-01", 'end' => "$year-09-30"],
        'q4' => ['start' => "$year-10-01", 'end' => "$year-12-31"],
    ];

    // Get the quarter data for the current report's period
    $reportQuarter = $quarters[$report->period] ?? null;

    // Existing sales data (with branch filter)
    $invoices = Invoice::with('salesItems', 'branch')
        ->where('branch_id', $report->branch_id)
        ->where('payment_status', 2)
        ->whereBetween('created_at', [$reportQuarter['start'], $reportQuarter['end']])
        ->get()
        ->map(function ($invoice) {
            $excludingVatAmount = 0;
            $totalVatAmount = 0;
            $includingVatAmount = 0;

            foreach ($invoice->salesItems as $item) {
                $subtotal = $item['rate'] * $item['quantity'];
                $excludingVatAmount += $subtotal;
                $vatAmount = ($subtotal * $item['tax']) / 100;
                $totalVatAmount += $vatAmount;
                $includingVatAmount += $subtotal + $vatAmount;
            }

            $invoice->excludingVatAmount = $excludingVatAmount;
            $invoice->totalVatAmount = $totalVatAmount;
            $invoice->includingVatAmount = $includingVatAmount;

            return $invoice;
        });

    $manualSales = ManualSale::with('salesItems', 'branch')
        ->where('branch_id', $report->branch_id)
        ->whereBetween('created_at', [$reportQuarter['start'], $reportQuarter['end']])
        ->get()
        ->map(function ($invoice) {
            $excludingVatAmount = 0;
            $totalVatAmount = 0;
            $includingVatAmount = 0;

            foreach ($invoice->salesItems as $item) {
                $subtotal = $item['rate'] * $item['quantity'];
                $excludingVatAmount += $subtotal;
                $vatAmount = ($subtotal * $item['tax']) / 100;
                $totalVatAmount += $vatAmount;
                $includingVatAmount += $subtotal + $vatAmount;
            }

            $invoice->excludingVatAmount = $excludingVatAmount;
            $invoice->totalVatAmount = $totalVatAmount;
            $invoice->includingVatAmount = $includingVatAmount;

            return $invoice;
        });

    $creditNotes = CreditNote::with('salesItems', 'branch')
        ->where('branch_id', $report->branch_id)
        ->whereBetween('created_at', [$reportQuarter['start'], $reportQuarter['end']])
        ->get()
        ->map(function ($invoice) {
            $excludingVatAmount = 0;
            $totalVatAmount = 0;
            $includingVatAmount = 0;

            foreach ($invoice->salesItems as $item) {
                $subtotal = $item['rate'] * $item['quantity'];
                $excludingVatAmount += $subtotal;
                $vatAmount = ($subtotal * $item['tax']) / 100;
                $totalVatAmount += $vatAmount;
                $includingVatAmount += $subtotal + $vatAmount;
            }

            $invoice->excludingVatAmount = $excludingVatAmount;
            $invoice->totalVatAmount = $totalVatAmount;
            $invoice->includingVatAmount = $includingVatAmount;

            return $invoice;
        });

    // Purchase data - WITH BRANCH FILTER using salesItems relationship
    $purchaseInvoices = PurchaseInvoice::with('salesItems', 'branch')
        ->where('branch_id', $report->branch_id)
        ->whereBetween('created_at', [$reportQuarter['start'], $reportQuarter['end']])
        ->get()
        ->map(function ($purchase) {
            $excludingVatAmount = 0;
            $totalVatAmount = 0;
            $includingVatAmount = 0;

            foreach ($purchase->salesItems as $item) {
                $subtotal = $item['rate'] * $item['quantity'];
                $excludingVatAmount += $subtotal;
                $vatAmount = ($subtotal * $item['tax']) / 100;
                $totalVatAmount += $vatAmount;
                $includingVatAmount += $subtotal + $vatAmount;
            }

            $purchase->excludingVatAmount = $excludingVatAmount;
            $purchase->totalVatAmount = $totalVatAmount;
            $purchase->includingVatAmount = $includingVatAmount;

            return $purchase;
        });

    $purchaseReturns = PurchaseReturn::with('salesItems', 'branch')
        ->where('branch_id', $report->branch_id)
        ->whereBetween('created_at', [$reportQuarter['start'], $reportQuarter['end']])
        ->get()
        ->map(function ($purchaseReturn) {
            $excludingVatAmount = 0;
            $totalVatAmount = 0;
            $includingVatAmount = 0;

            foreach ($purchaseReturn->salesItems as $item) {
                $subtotal = $item['rate'] * $item['quantity'];
                $excludingVatAmount += $subtotal;
                $vatAmount = ($subtotal * $item['tax']) / 100;
                $totalVatAmount += $vatAmount;
                $includingVatAmount += $subtotal + $vatAmount;
            }

            $purchaseReturn->excludingVatAmount = $excludingVatAmount;
            $purchaseReturn->totalVatAmount = $totalVatAmount;
            $purchaseReturn->includingVatAmount = $includingVatAmount;

            return $purchaseReturn;
        });

    $expenses = Expense::with('tax1Rate', 'branch')
        ->whereBetween('created_at', [$reportQuarter['start'], $reportQuarter['end']])
        ->where('isTaxable', 1)
        ->where('branch_id', $report->branch_id)
        ->get()
        ->map(function ($expense) {
            $taxAmount = 0;
            if ($expense->tax1Rate) {
                $taxRate = $expense->tax1Rate->tax_rate;
                $taxAmount = ($expense->amount * $taxRate) / 100;
            }
            $expense->totalVatAmount = $taxAmount;
            return $expense;
        });

    return [
        'invoices' => $invoices, 
        'creditNotes' => $creditNotes, 
        'expenses' => $expenses, 
        'manualSales' => $manualSales,
        'purchaseInvoices' => $purchaseInvoices,
        'purchaseReturns' => $purchaseReturns
    ];
}
}
