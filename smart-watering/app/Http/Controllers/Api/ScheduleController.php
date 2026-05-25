<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Schedule;
use Illuminate\Http\Request;

class ScheduleController extends Controller
{
    public function index()
    {
        return response()->json(

            Schedule::where(
                'user_id',
                auth()->id()
            )->get()

        );
    }

    public function store(Request $request)
    {
        $request->validate([
            'time' => 'required',
            'duration' => 'required|integer|min:1|max:10'
        ]);

        $schedule = Schedule::create([
            'user_id' => auth()->id(),
            'time' => $request->time,
            'duration' => $request->duration,
            'is_active' => true
        ]);

        return response()->json([
            'message' => 'Jadwal berhasil dibuat',
            'data' => $schedule
        ]);
    }

    public function destroy($id)
    {
        $schedule = Schedule::findOrFail($id);

        if($schedule->user_id != auth()->id()){

            return response()->json([
                'message' => 'Forbidden'
            ], 403);
        }

        $schedule->delete();

        return response()->json([
            'message' => 'Jadwal berhasil dihapus'
        ]);
    }
}