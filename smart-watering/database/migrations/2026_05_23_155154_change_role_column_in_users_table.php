<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Kita ubah tipe datanya menjadi enum secara aman
            $table->enum('role', ['admin', 'user'])->default('user')->change();
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Jika di-rollback, kita kembalikan ke string biasa
            $table->string('role')->default('user')->change();
        });
    }
};