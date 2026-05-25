<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('sensor_logs', function (Blueprint $table) {
            // Menambahkan kolom status setelah kolom moisture
            $table->string('status')->after('moisture'); 
        });
    }

    public function down(): void
    {
        Schema::table('sensor_logs', function (Blueprint $table) {
            // Antisipasi jika migration dibatalkan
            $table->dropColumn('status');
        });
    }
};