<?php

namespace App\Http\Controllers\Api; // 👈 Pastikan namespace ini sesuai folder

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\SensorLog; // 👈 Sesuaikan dengan nama model sensor_logs Anda

class UserController extends Controller
{
    public function updateDevice(Request $request)
    {
        $request->validate([
            'device_serial' => 'required|string|max:255',
        ]);

        $serialInput = $request->device_serial;

        // Validasi apakah nomor seri ini nyata (pernah kirim data dari ESP32)
        $deviceExists = SensorLog::where('device_serial', $serialInput)->exists();

        if (!$deviceExists) {
            return response()->json([
                'status' => 'error',
                'message' => 'Nomor seri alat tidak valid! Pastikan alat IoT Anda sudah menyala dan terhubung ke internet.'
            ], 422);
        }

        // Jika valid, simpan ke kolom device_serial milik user yang sedang login
        $user = $request->user();
        $user->device_serial = $serialInput;
        $user->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Alat IoT resmi dihubungkan ke akun Anda!',
            'user' => $user
        ], 200);
    }
}