<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Education; // Pastikan nama Model kamu sesuai, misal: Education atau EducationContent
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class EducationController extends Controller
{
    /**
     * TAMPILKAN SEMUA DATA (Bisa diakses User & Admin)
     */
    public function index()
    {
        $educations = Education::latest()->get();
        return response()->json([
            'success' => true,
            'data' => $educations
        ], 200);
    }

    /**
     * SIMPAN DATA BARU + UPLOAD GAMBAR (Hanya Admin)
     */
    public function store(Request $request)
    {
        // 1. Validasi Input Form
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Batas maksimal 2MB
        ]);

        $data = $request->all();

        // 2. Logika Upload Gambar sesuai perintahmu
        if ($request->hasFile('image')) {
            $image = $request->file('image')->store('educations', 'public');
            $data['image'] = $image;
        }

        // 3. Simpan ke Database
        $education = Education::create($data);

        return response()->json([
            'success' => true,
            'message' => 'Konten edukasi berhasil ditambahkan!',
            'data' => $education
        ], 201);
    }

    /**
     * TAMPILKAN DETAIL SATU DATA (Bisa diakses User & Admin)
     */
    public function show($id)
    {
        $education = Education::find($id);

        if (!$education) {
            return response()->json(['message' => 'Konten tidak ditemukan'], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $education
        ], 200);
    }

    /**
     * UBAH DATA + GANTI GAMBAR LAMA (Hanya Admin)
     */
    public function update(Request $request, $id)
    {
        $education = Education::find($id);

        if (!$education) {
            return response()->json(['message' => 'Konten tidak ditemukan'], 404);
        }

        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $data = $request->all();

        // Logika Ganti Gambar: Jika admin upload gambar baru
        if ($request->hasFile('image')) {
            // Hapus gambar lama dari storage jika ada agar tidak memenuhi server
            if ($education->image) {
                Storage::disk('public')->delete($education->image);
            }

            // Simpan gambar baru
            $image = $request->file('image')->store('educations', 'public');
            $data['image'] = $image;
        }

        $education->update($data);

        return response()->json([
            'success' => true,
            'message' => 'Konten edukasi berhasil diperbarui!',
            'data' => $education
        ], 200);
    }

    /**
     * HAPUS DATA + HAPUS GAMBARNYA (Hanya Admin)
     */
    public function destroy($id)
    {
        $education = Education::find($id);

        if (!$education) {
            return response()->json(['message' => 'Konten tidak ditemukan'], 404);
        }

        // Hapus file gambar dari folder storage sebelum datanya dihapus dari database
        if ($education->image) {
            Storage::disk('public')->delete($education->image);
        }

        $education->delete();

        return response()->json([
            'success' => true,
            'message' => 'Konten edukasi dan gambar berhasil dihapus!'
        ], 200);
    }
}