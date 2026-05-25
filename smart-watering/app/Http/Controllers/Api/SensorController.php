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
        // 1. Menyimpan data sensor baru yang dikirim oleh mikrokontroler (IoT)
        $sensor = SensorLog::create([
            'moisture' => $request->moisture,
            'status' => $request->status
        ]);

        // 2. Memicu broadcast melalui Laravel Reverb agar data langsung terkirim ke React secara real-time
        event(new SensorUpdated($sensor));

        // 3. Mengembalikan respons sukses ke mikrokontroler
        return response()->json([
            'message' => 'success',
            'data' => $sensor
        ]);
    }

    public function latest()
    {
        return response()->json(
            SensorLog::latest()->first()
        );
    }

    // Fungsi baru untuk mengambil 10 data sensor terakhir dengan urutan kronologis
    public function history()
    {
        return response()->json(
            SensorLog::latest()
                ->take(10)
                ->get()
                ->reverse()
                ->values()
        );
    }
}