<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SensorLog;
use Illuminate\Http\Request;
use App\Events\SensorUpdated;

class SensorController extends Controller
{
    public function store(Request $request)
    {
        // 1. Validasi kiriman data dari mikrokontroler (ESP32)
        $request->validate([
            'device_serial' => 'required|string',
            'moisture'      => 'required|numeric',
            'status'        => 'required|string',
        ]);

        // 2. Menyimpan data sensor baru lengkap dengan nomor seri alat
        $sensor = SensorLog::create([
            'device_serial' => $request->device_serial, // ✅ Wajib ditangkap untuk filter user
            'moisture'      => $request->moisture,
            'status'        => $request->status
        ]);

        // 3. Memicu broadcast melalui Laravel Reverb agar data langsung terkirim ke React secara real-time
        event(new SensorUpdated($sensor));

        // 4. Mengembalikan respons sukses ke mikrokontroler dengan status code 201 (Created)
        return response()->json([
            'message' => 'Log sensor berhasil disimpan',
            'data'    => $sensor
        ], 201);
    }

    public function latest()
    {
        return response()->json(
            SensorLog::latest()->first()
        );
    }

    // Fungsi history yang disesuaikan secara presisi dengan instruksi Langkah 2
    public function history(Request $request)
    {
        // 1. Ambil data user yang sedang login dari token
        $user = $request->user(); 

        // 2. JIKA user belum mendaftarkan nomor seri alat di akunnya
        if (!$user->device_serial) {
            return response()->json([
                'status' => 'error',
                'message' => 'Anda belum menghubungkan alat IoT ke akun ini.'
            ], 403); // Memicu error 403 Forbidden agar form aktivasi di web terbuka
        }

        // 3. JIKA sudah punya alat, HANYA ambil data sensor yang device_serial-nya COCOK dengan milik user
        $data = SensorLog::where('device_serial', $user->device_serial)
            ->latest()
            ->take(10) // Mengambil 10 data terakhir untuk grafik
            ->get()
            ->reverse() // Di-reverse agar urutan grafik berjalan dari kiri ke kanan (kronologis)
            ->values(); // Reset index array pasca reverse agar dibaca sebagai Array murni di JS

        return response()->json($data);
    }
}