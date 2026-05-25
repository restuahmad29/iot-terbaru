const form = document.getElementById("loginForm");

if (form) {
  form.addEventListener("submit", async function (e) {
    // 1. Menghentikan reload bawaan browser
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorText = document.getElementById("errorText");
    const errorSpan = errorText.querySelector("span"); // Mengambil elemen teks di dalam alert error

    // 2. Proteksi Tambahan: Jika password kosong, paksa berhenti
    if (!email || !password) {
      console.warn("Submit diblokir: Email atau Password belum diisi.");
      return;
    }

    try {
      // Sembunyikan error text setiap kali mencoba login kembali
      errorText.classList.add("hidden");

      // ✅ FIX: Mengubah 'value' menjadi 'method' agar dikirim sebagai POST resmi
      const response = await apiFetch("/login", {
        method: "POST", 
        body: JSON.stringify({ email, password }),
      });

      if (response && response.token) {
        // Simpan token menggunakan fungsi bawaan auth.js Anda
        saveAuth(response.token, response.user);

        // Memastikan token terduplikasi ke kunci "user_token" agar dibaca sistem proteksi login.html
        localStorage.setItem("user_token", response.token);

        // 3. INTEGRASI ROLE: Pastikan role disimpan ke localStorage
        if (response.user && response.user.role) {
          localStorage.setItem("role", response.user.role);
        } else {
          localStorage.setItem("role", "user");
        }

        // 4. DIALIKKAN KE DASHBOARD UTAMA
        window.location.href = "dashboard.html";
        
      } else {
        // Fallback jika response sukses tapi tidak membawa token
        if (errorSpan) errorSpan.innerText = "Gagal mendapatkan token autentikasi dari server.";
        errorText.classList.remove("hidden");
      }

    } catch (error) {
      console.error("Login Error:", error);
      
      // ✅ OPTIMALISASI: Menampilkan pesan error asli dari backend Laravel jika password benar-benar salah
      if (errorSpan) {
        errorSpan.innerText = error.message || "Email atau password salah. Silakan coba lagi.";
      }
      errorText.classList.remove("hidden");
    }
  });
}