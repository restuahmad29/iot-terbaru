const form = document.getElementById("loginForm");

if (form) {
  form.addEventListener("submit", async function (e) {
    // 1. Menghentikan reload bawaan browser
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorText = document.getElementById("errorText");

    // 2. Proteksi Tambahan: Jika password kosong, paksa berhenti
    if (!email || !password) {
      console.warn("Submit diblokir: Email atau Password belum diisi.");
      return;
    }

    try {
      // Sembunyikan error text setiap kali mencoba login kembali
      errorText.classList.add("hidden");

      const response = await apiFetch("/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      if (response && response.token) {
        // Simpan token menggunakan fungsi bawaan auth.js Anda
        saveAuth(response.token, response.user);

        // ===== TAMBAHAN OPTIMALISASI KUNCI UNTUK EDUCATION.HTML =====
        // Memastikan token terduplikasi ke kunci "user_token" agar dibaca oleh skrip di education.html
        localStorage.setItem("user_token", response.token);
        // ============================================================

        // 3. INTEGRASI ROLE: Pastikan role disimpan ke localStorage
        if (response.user && response.user.role) {
          localStorage.setItem("role", response.user.role);
        } else {
          localStorage.setItem("role", "user");
        }

        // 4. DIALIKKAN KE MANA?
        // Jika ingin setelah login langsung melihat artikel edukasi tanpa login ulang:
        window.location.href = "education.html";
        
        // Pilihan alternatif (Gunakan baris bawah ini jika ingin tetap langsung masuk dashboard):
        // window.location.href = "dashboard.html";
        
      } else {
        errorText.classList.remove("hidden");
      }

    } catch (error) {
      console.error("Login Error:", error);
      errorText.classList.remove("hidden");
    }
  });
}