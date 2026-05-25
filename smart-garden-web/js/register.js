// Menginisialisasi ikon Lucu/Lucide agar muncul di HTML
if (typeof lucide !== "undefined") {
  lucide.createIcons();
}

async function handleRegister(event) {
  event.preventDefault(); // Mencegah reload halaman otomatis saat form diklik

  // Ambil data dari elemen input HTML
  const name = document.getElementById("nameInput").value.trim();
  const email = document.getElementById("emailInput").value.trim();
  const password = document.getElementById("passwordInput").value;

  // Validasi sederhana sisi frontend
  if (!name || !email || !password) {
    alert("Semua kolom input wajib diisi!");
    return;
  }

  if (password.length < 6) {
    alert("Password minimal harus terdiri dari 6 karakter!");
    return;
  }

  try {
    // 🚀 Kirim data pendaftaran ke endpoint API Laravel Anda
    // Fungsi apiFetch diasumsikan sudah dikonfigurasi dengan Content-Type: application/json di file api.js
    const response = await apiFetch("/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });

    // Menangani respons sukses dari backend
    alert("Akun sukses dibuat! Silakan masuk menggunakan akun baru Anda.");
    
    // Alihkan pengguna secara otomatis ke halaman login setelah pendaftaran berhasil
    window.location.href = "login.html";

  } catch (error) {
    console.error("Gagal melakukan registrasi:", error);
    // Menampilkan pesan error spesifik jika dikirim oleh API, jika tidak tampilkan fallback teks default
    alert(error.message || "Gagal membuat akun. Email mungkin sudah terdaftar atau terjadi masalah pada server.");
  }
}

// Daftarkan event handler pada form ketika halaman selesai dimuat
document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", handleRegister);
  }
});