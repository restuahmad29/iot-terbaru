let chart; // Variabel global penampung objek Chart.js

// Mengambil data user yang login aman dari localStorage
const user = JSON.parse(localStorage.getItem("user")) || { role: "guest" };

// === 1. INISIALISASI GRAFIK KOSONG (Dijalankan sekali saat halaman terbuka) ===
function initChart() {
  const ctx = document.getElementById("moistureChart");
  if (!ctx) return;

  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: [], // Akan diisi waktu (jam:menit:detik) dari sensor
      datasets: [
        {
          label: "Kelembaban (%)",
          data: [], // Akan diisi angka kelembaban tanah
          borderColor: "#2563eb",
          backgroundColor: "rgba(37, 99, 235, 0.05)",
          borderWidth: 3,
          tension: 0.4,
          fill: true
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          min: 0,
          max: 100 // Batas ukur kelembaban tanah 0% - 100%
        }
      }
    }
  });
}

// === 2. AMBIL DATA SENSOR & UPDATE GRAFIK SECARA REALTIME ===
async function getSensor() {
  try {
    const data = await apiFetch("/sensor/latest");
    
    // Update komponen teks card utama
    document.getElementById("moistureText").innerText = `${data.moisture}%`;
    document.getElementById("statusText").innerText = data.status;

    // JIKA GRAFIK SUDAH SIAP, MASUKKAN DATA SECARA REALTIME
    if (chart) {
      // Buat penanda waktu lokal saat data diterima (Contoh: 14:20:05)
      const currentTime = new Date().toLocaleTimeString('id-ID', { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
      });

      // Dorong data baru ke sisi kanan grafik
      chart.data.labels.push(currentTime);
      chart.data.datasets[0].data.push(data.moisture);

      // STRATEGI 10 DATA TERAKHIR: Jika data melebihi 10, potong data paling kiri (terlama)
      if (chart.data.labels.length > 10) {
        chart.data.labels.shift(); // Hapus label terlama
        chart.data.datasets[0].data.shift(); // Hapus nilai kelembaban terlama
      }

      // Perbarui grafik secara instan tanpa destroy/membuat ulang objek
      chart.update();
    }
  } catch (error) {
    console.error("Gagal memuat data sensor:", error);
  }
}

// === 3. AMBIL DATA RIWAYAT AWAL (Saat Pertama Kali Buka Dashboard) ===
async function getHistory() {
  try {
    const data = await apiFetch("/sensor/history");
    
    // Ambil maksimal 10 data terakhir dari history database Laravel
    const limitedData = data.slice(-10);

    // Jika database mengembalikan data id/waktu, mapping ke label grafik
    const labels = limitedData.map(item => {
      // Jika backend mengirim timestamp/created_at, ubah jadi format jam menit
      if (item.created_at) {
        return new Date(item.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
      }
      return `ID ${item.id}`; // Fallback pakai ID data
    });
    
    const moistureData = limitedData.map(item => item.moisture);

    // Masukkan data history ke dalam objek chart yang sudah ada
    if (chart) {
      chart.data.labels = labels;
      chart.data.datasets[0].data = moistureData;
      chart.update();
    }
  } catch (error) {
    console.error("Gagal mengambil riwayat grafik:", error);
  }
}

async function getConfig() {
  try {
    const data = await apiFetch("/device-config");
    console.log("Mode aktif dari API backend:", data.active_mode);
    
    document.getElementById("modeText").innerText = data.active_mode;
    renderModeSection(data.active_mode);
  } catch (error) {
    console.error("Gagal memuat konfigurasi alat:", error);
  }
}

function renderModeSection(mode) {
  const otomatisSec = document.getElementById("otomatisSection");
  const jadwalSec = document.getElementById("jadwalSection");
  const manualSec = document.getElementById("manualSection");

  if (!otomatisSec || !jadwalSec || !manualSec) {
    console.error("⚠️ Error: Salah satu elemen ID section tidak ditemukan di HTML!");
    return;
  }

  otomatisSec.classList.add("hidden");
  jadwalSec.classList.add("hidden");
  manualSec.classList.add("hidden");

  const activeMode = mode ? String(mode).toLowerCase().trim() : "";
  console.log("⚙️ Sistem mendeteksi mode aktif:", `"${activeMode}"`);

  if (activeMode === "otomatis" || activeMode === "auto" || activeMode === "automatic") {
    otomatisSec.remove("hidden");
    console.log("🎨 Layout otomatis berhasil dibuka.");
  } 
  else if (activeMode === "jadwal" || activeMode === "schedule") {
    jadwalSec.classList.remove("hidden");
    console.log("🎨 Layout jadwal berhasil dibuka.");
    getSchedules(); 
  } 
  else if (activeMode === "manual") {
    manualSec.classList.remove("hidden");
    console.log("🎨 Layout manual berhasil dibuka.");
  } else {
    console.warn(`⚠️ Warning: Mode "${activeMode}" tidak terdaftar di sistem saklar.`);
  }
}

async function changeMode(mode) {
  try {
    let payloadMode = mode;
    await apiFetch("/change-mode", {
      method: "POST",
      body: JSON.stringify({ mode: payloadMode }),
    });

    alert(`Mode berhasil beralih ke: ${mode}`);
    getConfig(); 
  } catch (error) {
    console.error("Gagal mengubah mode alat:", error);
  }
}

async function manualWater() {
  try {
    await apiFetch("/manual-water", { method: "POST" });
    alert("Perintah dikirim! Pompa berhasil dinyalakan.");
  } catch (error) {
    console.error("Gagal menyalakan pompa manual:", error);
  }
}

async function getSchedules() {
  try {
    const response = await apiFetch("/schedules");
    renderSchedules(response);
  } catch (error) {
    console.error("Gagal mengambil daftar jadwal:", error);
  }
}

function renderSchedules(schedules) {
  const table = document.getElementById("scheduleTable");
  if (!table) return;
  table.innerHTML = "";

  if (schedules.length === 0) {
    table.innerHTML = `<tr><td colspan="3" class="py-4 text-center text-gray-400">Belum ada jadwal penyiraman dikonfigurasi.</td></tr>`;
    return;
  }

  schedules.forEach(item => {
    table.innerHTML += `
      <tr class="border-b border-gray-100 hover:bg-gray-50/50">
        <td class="py-4 font-medium text-gray-700">${item.time} WIB</td>
        <td class="py-4 text-gray-600">${item.duration} detik</td>
        <td class="py-4">
          ${
            user.role === "admin"
            ? `<button onclick="deleteSchedule(${item.id})" class="px-4 py-2 bg-red-500 text-white text-xs font-bold rounded-xl hover:bg-red-600 transition-colors cursor-pointer shadow-sm">Hapus</button>`
            : `<span class="text-gray-400 text-xs">-</span>`
          }
        </td>
      </tr>
    `;
  });
}

async function addSchedule() {
  const time = document.getElementById("timeInput").value;
  const duration = document.getElementById("durationInput").value;

  if (!time || !duration) {
    alert("Semua data input jadwal wajib diisi!");
    return;
  }

  try {
    await apiFetch("/schedules", {
      method: "POST",
      body: JSON.stringify({ time, duration }),
    });

    alert("Jadwal penyiraman berhasil ditambahkan!");
    document.getElementById("timeInput").value = "";
    document.getElementById("durationInput").value = "";
    getSchedules();
  } catch (error) {
    console.error("Gagal menambahkan jadwal:", error);
  }
}

async function deleteSchedule(id) {
  if (!confirm("Apakah Anda yakin ingin menghapus jadwal ini?")) return;
  try {
    await apiFetch(`/schedules/${id}`, { method: "DELETE" });
    alert("Jadwal berhasil dihapus.");
    getSchedules();
  } catch (error) {
    console.error("Gagal menghapus data jadwal:", error);
  }
}

// === 4. BOOTLOADER DASHBOARD (Urutan Eksekusi Diatur Ketat) ===
async function loadDashboard() {
  const adminSection = document.getElementById("adminSection");
  if (adminSection) {
    if (user && user.role === "admin") {
      adminSection.classList.remove("hidden");
    } else {
      adminSection.classList.add("hidden");
    }
  }

  // A. Siapkan Canvas Chart kosong terlebih dahulu di memori DOM browser
  initChart();

  // B. Panggil data pendukung secara independen
  getConfig();
  
  // C. Tarik history data awal untuk mengisi Chart pertama kali, baru setelah itu aktifkan getSensor realtime
  await getHistory();
  getSensor();
}

document.addEventListener("DOMContentLoaded", () => {
  loadDashboard();
});

// === 5. INTERVAL POOLING (Grafik & Teks diperbarui bersamaan tiap 5 detik) ===
setInterval(() => {
  getSensor();
}, 5000);