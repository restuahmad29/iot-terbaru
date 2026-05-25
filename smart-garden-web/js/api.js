// 1. Pastikan tidak ada tanda garis miring (/) di akhir URL base
const BASE_URL = "http://192.168.1.82:8000/api";

async function apiFetch(endpoint, options = {}) {
  const token = localStorage.getItem("token");

  // Buat default headers
  const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json", // WAJIB untuk Laravel agar merespon JSON, bukan halaman HTML error jika token mati
    ...options.headers,
  };

  // Masukkan token Bearer jika user sudah login
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  // 2. Normalisasi Endpoint: Memastikan gabungan BASE_URL + endpoint selalu dipisahkan oleh satu "/"
  // Menghapus garis miring di awal endpoint jika ada, lalu menggabungkannya secara aman
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint.slice(1) : endpoint;
  const fullUrl = `${BASE_URL}/${cleanEndpoint}`;

  try {
    const response = await fetch(fullUrl, {
      ...options,
      headers,
    });

    // Jika Laravel merespon dengan status Unauthorized (Token kadaluwarsa/salah)
    if (response.status === 401) {
      alert("Sesi Anda telah habis. Silakan login kembali.");
      localStorage.clear();
      window.location.href = "login.html"; // Sesuaikan dengan nama file halaman loginmu
      return;
    }

    // Jika response bukan 2xx (bisa jadi 404, 500, dll)
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error(`API Error (${response.status}):`, errorData.message || "Terjadi kesalahan server.");
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Fetch Failure:", error);
    throw error;
  }
}