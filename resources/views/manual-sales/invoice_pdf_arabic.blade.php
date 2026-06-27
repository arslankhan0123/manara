@php
    $com_name = $settings['company'] ?? '';
    $trn_number = $settings['vat_number'] ?? '';

    // Load logo in base64 format for mPDF stability
    $logo_path = public_path('img/company/manara_logo.jpeg');
    $logo_base64 = '';

    if (file_exists($logo_path)) {
        $extension = pathinfo($logo_path, PATHINFO_EXTENSION);

        $mimeType = match (strtolower($extension)) {
            'jpg', 'jpeg' => 'image/jpeg',
            'png'         => 'image/png',
            'gif'         => 'image/gif',
            default       => 'image/jpeg',
        };

        $logo_base64 = 'data:' . $mimeType . ';base64,' . base64_encode(file_get_contents($logo_path));
    } else {
        $logo_base64 = $settings['logo'] ?? '';
    }

    // Clean and format phone number
    $phone_val   = $settings['phone'] ?? '';
    $clean_phone = preg_replace('/[^0-9]/', '', $phone_val);
    if (strpos($clean_phone, '966') === 0) {
        $clean_phone = '0' . substr($clean_phone, 3);
    }
    if (strlen($clean_phone) == 9 && strpos($clean_phone, '11') === 0) {
        $clean_phone = '0' . $clean_phone;
    }
    if (empty($clean_phone)) {
        $clean_phone = '0112368577';
    }

    // Format address
    $address_en = $settings['address'] ?? '';
    $address_ar = '';
    if (strpos(strtolower($address_en), 'jeerer') !== false || strpos(strtolower($address_en), 'jareer') !== false) {
        $address_ar = 'حي جرير - شارع أم القوين رقم المبنى 8528 رقم الوحده 3';
    } else {
        $address_ar = $address_en;
    }

    // Format dates
    $invoiceDateStrEn = \Carbon\Carbon::parse($invoice->invoice_date)->format('Y-m-d');
    $invoiceDateStrAr = \Carbon\Carbon::parse($invoice->invoice_date)->format('d-m-Y');
    if ($invoice->created_at) {
        $timeStr           = \Carbon\Carbon::parse($invoice->created_at)->format('H:i:s');
        $invoiceDateStrEn .= ' ' . $timeStr;
        $invoiceDateStrAr .= ' ' . $timeStr;
    }

    // Format Customer Address
    $customerAddressText = '';
    if ($invoice->customer && $invoice->customer->customerAddress) {
        $parts = [];
        if (!empty($invoice->customer->customerAddress->street)) {
            $parts[] = $invoice->customer->customerAddress->street;
        }
        if (!empty($invoice->customer->customerAddress->city)) {
            $parts[] = $invoice->customer->customerAddress->city;
        }
        if (!empty($invoice->customer->customerAddress->customerState?->name)) {
            $parts[] = $invoice->customer->customerAddress->customerState->name;
        }
        if (!empty($invoice->customer->customerAddress->zip)) {
            $parts[] = $invoice->customer->customerAddress->zip;
        }
        if (!empty($invoice->customer->customerAddress->addressCountry?->name)) {
            $parts[] = $invoice->customer->customerAddress->addressCountry->name;
        }
        if (!empty($invoice->customer->address)) {
            $parts[] = $invoice->customer->address;
        }
        $customerAddressText = implode(', ', $parts);
    } else if ($invoice->customer) {
        $customerAddressText = $invoice->customer->address ?? '';
    }

    $hasArabic  = preg_match('/\p{Arabic}/u', $customerAddressText);
    $engAddress = $hasArabic ? '-' : ($customerAddressText ?: '-');
    $arAddress  = $hasArabic ? ($customerAddressText ?: '-') : '-';

    // Resolve project fields — ManualSale has both a project() relation and direct columns
    $projectName     = $invoice->project->project_name     ?? $invoice->project_name     ?? 'N/A';
    $projectLocation = $invoice->project->project_location ?? 'N/A';
    $poNumber        = $invoice->project->po_number        ?? $invoice->po_number        ?? 'N/A';
    $vendorCode      = $invoice->vendor_code               ?? 'N/A';
@endphp

<body>
    <head>
        <style>
            body {
                font-family: 'DejaVu Sans', sans-serif;
                color: #000;
                margin: 0;
                padding: 0;
                font-size: 9.5pt;
                line-height: 1.4;
            }
            .header-table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 5px;
            }
            .header-table td {
                vertical-align: top;
            }
            .company-info-en {
                width: 38%;
                text-align: left;
                font-size: 8.5pt;
                line-height: 1.3;
            }
            .company-logo-td {
                width: 24%;
                text-align: center;
            }
            .company-logo {
                max-height: 75px;
                max-width: 100%;
            }
            .company-info-ar {
                width: 38%;
                text-align: right;
                font-size: 8.5pt;
                line-height: 1.3;
                direction: rtl;
            }
            .divider {
                border-top: 1.5px solid #000;
                margin-top: 5px;
                margin-bottom: 12px;
                width: 100%;
            }
        </style>
    </head>

    <main>
        <!-- Dynamic Header -->
        <table class="header-table">
            <tr>
                <td class="company-info-en">
                    <div style="font-weight: bold; font-size: 9.5pt; margin-bottom: 3px;">Dawod Suliman Ebrahim Alhabdan Contracting Company</div>
                    <div>Kingdom of Saudi Arabia</div>
                    <div>TEL: {{ $clean_phone }}</div>
                    <div>Address: {{ $address_en }}</div>
                    <div>C.R. No: {{ $settings['code'] ?? '1010266184' }}</div>
                    <div>VAT No: {{ $settings['vat_number'] ?? '311371213800003' }}</div>
                </td>
                <td class="company-logo-td">
                    @if ($logo_base64)
                        <img class="company-logo" src="{{ $logo_base64 }}" alt="Logo" />
                    @endif
                </td>
                <td class="company-info-ar">
                    <div style="font-weight: bold; font-size: 9.5pt; margin-bottom: 3px;">شركة داود سليمان ابراهيم الهبدان للمقاولات</div>
                    <div>المملكة العربية السعودية</div>
                    <div>تليفون: {{ $clean_phone }}</div>
                    <div>العنوان: {{ $address_ar }}</div>
                    <div>رقم السجل: {{ $settings['code'] ?? '1010266184' }}</div>
                    <div>رقم ضريبي: {{ $settings['vat_number'] ?? '311371213800003' }}</div>
                </td>
            </tr>
        </table>
        <div class="divider"></div>

        <!-- Metadata Section with QR code in middle -->
        <table style="width: 100%; border-collapse: collapse; margin-top: 5px;">
            <tr>
                <td style="width: 40%; vertical-align: top; text-align: left;">
                    <div style="color: #d32f2f; font-weight: bold; font-size: 12pt; text-transform: uppercase; margin-bottom: 8px;">TAX INVOICE</div>
                    <div style="font-size: 8.5pt; margin-bottom: 3px;">Invoice Date: <span style="font-weight: bold;">{{ $invoiceDateStrEn }}</span></div>
                    <div style="font-size: 8.5pt; margin-bottom: 3px;">Invoice No: <span style="font-weight: bold;">{{ $invoice->invoice_number }}</span></div>
                    <div style="font-size: 8.5pt; margin-bottom: 3px;">Invoice Month: <span style="font-weight: bold;">{{ \Carbon\Carbon::parse($invoice->invoice_date)->format('F Y') }}</span></div>
                    <div style="font-size: 8.5pt; margin-bottom: 3px;">P.O. No: <span style="font-weight: bold;">{{ $poNumber }}</span></div>
                    <div style="font-size: 8.5pt; margin-bottom: 3px;">Vendor Code: <span style="font-weight: bold;">{{ $vendorCode }}</span></div>
                </td>
                <td style="width: 20%; vertical-align: middle; text-align: center;">
                    @php
                        use Salla\ZATCA\GenerateQrCode;
                        use Salla\ZATCA\Tags\Seller;
                        use Salla\ZATCA\Tags\TaxNumber;
                        use Salla\ZATCA\Tags\InvoiceDate as QrInvoiceDate;
                        use Salla\ZATCA\Tags\InvoiceTotalAmount;
                        use Salla\ZATCA\Tags\InvoiceTaxAmount;

                        $qr_seller_trn      = $trn_number;
                        $qr_tax_amount      = $taxAmount;
                        $qr_invoice_amount  = $netAmount;
                        $qr_seller_name     = $com_name;

                        $qr_invoice_date = !empty($invoice->invoice_date)
                            ? date('Y-m-d', strtotime($invoice->invoice_date))
                            : null;
                        if ($qr_invoice_date && $invoice->created_at) {
                            $qr_invoice_date .= ' ' . date('H:i:s', strtotime($invoice->created_at));
                        }

                        $qr_code = null;
                        if ($qr_seller_name && $qr_seller_trn && $qr_invoice_date && $qr_invoice_amount) {
                            $qr_code = GenerateQrCode::fromArray([
                                new Seller($qr_seller_name),
                                new TaxNumber($qr_seller_trn),
                                new QrInvoiceDate($qr_invoice_date),
                                new InvoiceTotalAmount(round($qr_invoice_amount)),
                                new InvoiceTaxAmount($qr_tax_amount),
                            ])->render();
                        }
                    @endphp
                    @if ($qr_code)
                        <img style="width: 85px; height: 85px;" src="{{ $qr_code }}" alt="QR Code" />
                    @endif
                </td>
                <td style="width: 40%; vertical-align: top; text-align: right; direction: rtl;">
                    <div style="color: #d32f2f; font-weight: bold; font-size: 12pt; margin-bottom: 8px;">فاتورة ضريبية</div>
                    <div style="font-size: 8.5pt; margin-bottom: 3px; direction: rtl;">تاريخ الفاتورة: <span style="font-weight: bold;">{{ $invoiceDateStrAr }}</span></div>
                    <div style="font-size: 8.5pt; margin-bottom: 3px; direction: rtl;">رقم الفاتورة: <span style="font-weight: bold;">{{ $invoice->invoice_number }}</span></div>
                    <div style="font-size: 8.5pt; margin-bottom: 3px; direction: rtl;">نوع الفاتورة: <span style="font-weight: bold;">-</span></div>
                    <div style="font-size: 8.5pt; margin-bottom: 3px; direction: rtl;">أمر الشراء: <span style="font-weight: bold;">{{ $poNumber }}</span></div>
                    <div style="font-size: 8.5pt; margin-bottom: 3px; direction: rtl;">أمر التوريد: <span style="font-weight: bold;">{{ $vendorCode }}</span></div>
                </td>
            </tr>
        </table>
        <div style="border-top: 1px solid #ccc; margin-top: 8px; margin-bottom: 10px;"></div>

        <!-- Customer Section -->
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">
            <tr>
                <td style="width: 50%; vertical-align: top; text-align: left;">
                    <div style="font-weight: bold; font-size: 10pt; text-transform: uppercase; margin-bottom: 5px;">CUSTOMER:</div>
                    <div style="font-weight: bold; font-size: 9.5pt; margin-bottom: 4px;">{!! $invoice->customer->company_name ?? 'N/A' !!}</div>
                    <div style="font-size: 8.5pt; margin-bottom: 2px;">VAT No: <span style="font-weight: bold;">{{ $invoice->customer->vat_number ?? 'N/A' }}</span></div>
                    <div style="font-size: 8.5pt; margin-bottom: 2px;">Tel No: <span style="font-weight: bold;">{{ $invoice->customer->phone ?? 'N/A' }}</span></div>
                    <div style="font-size: 8.5pt; margin-bottom: 2px;">Eng. Address: <span style="font-weight: bold;">{{ $engAddress }}</span></div>
                </td>
                <td style="width: 50%; vertical-align: top; text-align: right; direction: rtl;">
                    <div style="font-weight: bold; font-size: 10pt; margin-bottom: 5px;">بيانات العميل:</div>
                    <div style="font-weight: bold; font-size: 9.5pt; margin-bottom: 4px;">{!! $invoice->customer->customer_arabic_name ?? 'N/A' !!}</div>
                    <div style="font-size: 8.5pt; margin-bottom: 2px;">رقم ضريبي: <span style="font-weight: bold;">{{ $invoice->customer->vat_number ?? 'N/A' }}</span></div>
                    <div style="font-size: 8.5pt; margin-bottom: 2px;">تليفون: <span style="font-weight: bold;">{{ $invoice->customer->phone ?? 'N/A' }}</span></div>
                    <div style="font-size: 8.5pt; margin-bottom: 2px;">العنوان عربي: <span style="font-weight: bold;">{{ $arAddress }}</span></div>
                </td>
            </tr>
        </table>

        <div style="border-top: 1px solid #ccc; margin-top: 8px; margin-bottom: 10px;"></div>

        <table style="width: 100%; border-collapse: collapse; margin-top: 5px;">
            <tr>
                <td style="width: 50%; text-align: left;">
                    <span>Project Name: </span>
                    <span style="font-weight: bold;">
                        {!! $projectName !!}
                    </span>
                </td>

                <td style="width: 50%; text-align: right;">
                    <span>Project Location: </span>
                    <span style="font-weight: bold;">
                        {{ $projectLocation }}
                    </span>
                </td>
            </tr>
        </table>

        <!-- Items Table -->
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 9pt;">
            <thead>
                <tr style="background-color: #fafafa; border-top: 1px solid #000; border-bottom: 1px solid #000;">
                    <th style="width: 8%; text-align: center; padding: 6px 4px; font-weight: bold;">Ser<br>الرقم</th>
                    <th style="width: 52%; text-align: left; padding: 6px 4px; font-weight: bold;">Description<br>الشرح</th>
                    <th style="width: 12%; text-align: right; padding: 6px 4px; font-weight: bold;">QTY<br>كمية</th>
                    <th style="width: 13%; text-align: right; padding: 6px 4px; font-weight: bold;">PRICE<br>سعر</th>
                    <th style="width: 15%; text-align: right; padding: 6px 4px; font-weight: bold;">AMOUNT<br>اجمالي</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($invoice->salesItems as $index => $item)
                    @php
                        $itemAmount = $item->quantity * $item->rate;
                    @endphp
                    <tr style="border-bottom: 1px solid #eee;">
                        <td style="text-align: center; padding: 6px 4px;">{{ $index + 1 }}</td>
                        <td style="text-align: left; padding: 6px 4px; word-wrap: break-word;">
                            {{ html_entity_decode($item->service->title ?? '') }} / <span style="direction: rtl; unicode-bidi: plaintext;">{{ $item->service->title_arabic }}</span>
                        </td>
                        <td style="text-align: right; padding: 6px 4px;">{{ number_format($item->quantity, 2) }}</td>
                        <td style="text-align: right; padding: 6px 4px;">{{ number_format($item->rate, 2) }}</td>
                        <td style="text-align: right; padding: 6px 4px;">{{ number_format($itemAmount, 2) }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>

        <!-- Calculations & Totals Block -->
        <div style="width: 100%; margin-top: 10px;">
            <table style="margin-left: auto; margin-right: 0; border-collapse: collapse; font-size: 9pt;">
                <tr>
                    <td style="text-align: right; padding: 5px 10px; font-weight: bold; border-bottom: 1px solid #eee;">Items Amount(السعر):</td>
                    <td style="text-align: right; padding: 5px 10px; border-bottom: 1px solid #eee; width: 3cm;">{{ number_format($subtotal, 2) }}</td>
                </tr>
                <tr>
                    <td style="text-align: right; padding: 5px 10px; font-weight: bold; border-bottom: 1px solid #eee;">Discount(الخصم):</td>
                    <td style="text-align: right; padding: 5px 10px; border-bottom: 1px solid #eee;">({{ number_format($discount, 2) }})</td>
                </tr>
                <tr>
                    <td style="text-align: right; padding: 5px 10px; font-weight: bold; border-bottom: 1px solid #eee;">Amount due(المستحق) (%100.00):</td>
                    <td style="text-align: right; padding: 5px 10px; border-bottom: 1px solid #eee;">{{ number_format($amountDue, 2) }}</td>
                </tr>
                <tr>
                    <td style="text-align: right; padding: 5px 10px; font-weight: bold; border-bottom: 1px solid #eee;">Tax Amount(الضريبة) (%15.00):</td>
                    <td style="text-align: right; padding: 5px 10px; border-bottom: 1px solid #eee;">{{ number_format($taxAmount, 2) }}</td>
                </tr>
                <tr style="border-top: 1.5px solid #000; border-bottom: 1.5px solid #000; background-color: #f5f5f5;">
                    <td style="text-align: right; padding: 7px 10px; font-weight: bold; font-size: 10pt;">Net Amount(الصافي):</td>
                    <td style="text-align: right; padding: 7px 10px; font-weight: bold; font-size: 10pt; color: #0d47a1;">{{ number_format($netAmount, 2) }}</td>
                </tr>
            </table>
        </div>

        <!-- Terms and Conditions if present -->
        @if ($invoice->project?->terms && $invoice->project?->terms->isNotEmpty())
            <div style="margin-top: 30px; font-size: 8pt; clear: both; width: 100%;">
                <div style="font-weight: bold; border-bottom: 1px solid #ccc; padding-bottom: 3px; margin-bottom: 5px;">Terms and Conditions / الشروط و الأحكام :</div>
                <ul style="margin: 0; padding-left: 15px;">
                    @foreach ($invoice->project?->terms as $estimateTerm)
                        <li style="margin-bottom: 2px;">{{ $estimateTerm['description'] }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        <!-- Thank you centered text -->
        <div style="text-align: center; font-weight: bold; font-size: 11pt; margin-top: 40px; clear: both; width: 100%;">
            THANK YOU FOR YOUR BUSINESS!! شكرا لتعاملكم معنا
        </div>
    </main>
</body>
