<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasColumn('items', 'title_arabic')) {
            Schema::table('items', function (Blueprint $table) {
                $table->string('title_arabic', 300)->nullable()->after('title');
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasColumn('items', 'title_arabic')) {
            Schema::table('items', function (Blueprint $table) {
                $table->dropColumn('title_arabic');
            });
        }
    }
};
