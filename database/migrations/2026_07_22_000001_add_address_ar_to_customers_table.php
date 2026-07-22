<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasColumn('customers', 'address_ar')) {
            Schema::table('customers', function (Blueprint $table) {
                $table->string('address_ar', 300)->nullable()->after('address');
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasColumn('customers', 'address_ar')) {
            Schema::table('customers', function (Blueprint $table) {
                $table->dropColumn('address_ar');
            });
        }
    }
};
