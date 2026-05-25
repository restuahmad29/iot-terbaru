<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\DeviceSetting;

class DeviceController extends Controller
{
    public function config()
    {
        $setting = DeviceSetting::first();

        $schedules = \App\Models\Schedule::where(
            'is_active',
            true
        )->get();

        return response()->json([
            'active_mode' => $setting->active_mode,
            'manual_pump' => $setting->manual_pump,
            'schedules' => $schedules
        ]);
    }

    public function changeMode(Request $request)
    {
        $request->validate([
            'mode' => 'required|in:otomatis,jadwal,manual'
        ]);

        $setting = DeviceSetting::first();

        $setting->active_mode = $request->mode;
        $setting->save();

        return response()->json([
            'message' => 'Mode berhasil diubah'
        ]);
    }

    public function manualWater()
    {
        $setting = DeviceSetting::first();

        $setting->manual_pump = true;
        $setting->save();

        return response()->json([
            'message' => 'Pompa dinyalakan'
        ]);
    }

    public function resetManualPump()
    {
        $setting = DeviceSetting::first();

        $setting->manual_pump = false;

        $setting->save();

        return response()->json([
            'message' => 'success'
        ]);
    }
}