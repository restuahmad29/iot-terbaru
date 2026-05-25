<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\DeviceController;
use App\Http\Controllers\Api\ScheduleController;
use App\Http\Controllers\Api\SensorController;
use App\Http\Controllers\Api\EducationController; // DITAMBAHKAN: Import Controller Baru

/*
|--------------------------------------------------------------------------
| PUBLIC ROUTES (Akses Tanpa Token / Mikrokontroler IoT & Auth)
|--------------------------------------------------------------------------
*/
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/device-config', [DeviceController::class, 'config']);
Route::post('/reset-manual-pump', [DeviceController::class, 'resetManualPump']);
Route::post('/sensor', [SensorController::class, 'store']); 


/*
|--------------------------------------------------------------------------
| PROTECTED ROUTES (Wajib Login via Sanctum)
|--------------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')->group(function () {

    // --- FOR ALL AUTHENTICATED USERS (USER & ADMIN) ---
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // Kontrol Device
    Route::post('/change-mode', [DeviceController::class, 'changeMode']);
    Route::post('/manual-water', [DeviceController::class, 'manualWater']);

    // Data Sensor Monitoring
    Route::get('/sensor/latest', [SensorController::class, 'latest']); 
    Route::get('/sensor/history', [SensorController::class, 'history']); 

    // Jadwal Penyiraman (Melihat Data)
    Route::get('/schedules', [ScheduleController::class, 'index']);

    // Edukasi: Semua user yang login bisa melihat daftar edukasi & detail kontenya
    Route::apiResource('educations', EducationController::class)->only(['index', 'show']);


    // --- FOR ADMIN ONLY (Proteksi Ketat Middleware Admin) ---
    Route::middleware('admin')->group(function () {

        // Manajemen Jadwal (CRUD)
        Route::post('/schedules', [ScheduleController::class, 'store']);
        Route::delete('/schedules/{id}', [ScheduleController::class, 'destroy']);

        // Edukasi: Hanya Admin yang bisa membuat, mengubah, dan menghapus konten
        Route::apiResource('educations', EducationController::class)->except(['index', 'show']);

    });
});