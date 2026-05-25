let chart;

// Mengambil data user yang login aman dari localStorage
const user = JSON.parse(localStorage.getItem("user")) || { role: "guest" };

async function getSensor() {
  try {
    const data = await apiFetch("/sensor/latest");
    document.getElementById("moistureText").innerText = `${data.moisture}%`;
    document.getElementById("statusText").innerText = data.status;
  } catch (error) {
    console.error("Gagal memuat data sensor:", error);
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
  // 1. Sembunyikan seluruh kontainer dinamis terlebih dahulu
  document.getElementById("otomatisSection").classList.add("hidden");
  document.getElementById("jadwalSection").classList.add("hidden");
  document.getElementById("manualSection").classList.add("hidden");

  // Normalisasi string mode ke huruf kecil
  const activeMode = mode ? mode.toLowerCase() : "";

  // 2. Tampilkan section yang sesuai dengan respon database backend
  if (activeMode === "otomatis" || activeMode === "auto" || activeMode === "automatic") {
    document.getElementById("otomatisSection").classList.remove("hidden");
  } 
  else if (activeMode === "jadwal" || activeMode === "schedule") {
    document.getElementById("jadwalSection").classList.remove("hidden");
    // Pemicu otomatis: ambil daftar tabel saat menu jadwal terbuka
    getSchedules(); 
  } 
  else if (activeMode === "manual") {
    document.getElementById("manualSection").classList.remove("hidden");
  }
}

async function changeMode(mode) {
  try {
    let payloadMode = mode;
    // Jika backend kamu menggunakan istilah 'auto', aktifkan baris di bawah ini:
    // if (mode === "otomatis") payloadMode = "auto"; 

    await apiFetch("/change-mode", {
      method: "POST",
      body: JSON.stringify({ mode: payloadMode }),
    });

    alert(`Mode berhasil beralih ke: ${mode}`);
    getConfig(); // Ambil ulang data config untuk memicu pembaruan layout
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
    
    // Reset form input setelah sukses insert data
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

async function getHistory() {
  try {
    const data = await apiFetch("/sensor/history");
    const labels = data.map(item => item.id);
    const moistureData = data.map(item => item.moisture);

    renderChart(labels, moistureData);
  } catch (error) {
    console.error("Gagal mengambil riwayat grafik:", error);
  }
}

function renderChart(labels, moistureData) {
  const ctx = document.getElementById("moistureChart");
  if (!ctx) return;

  if (chart) {
    chart.destroy();
  }

  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Kelembaban (%)",
          data: moistureData,
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
      maintainAspectRatio: false
    }
  });
}

// Fungsi inisialisasi boot utama halaman pertama kali
async function loadDashboard() {
  // Mengamankan Hak Akses Pembuat Jadwal (Form Create) secara absolut
  const adminSection = document.getElementById("adminSection");
  if (adminSection) {
    if (user.role === "admin") {
      adminSection.classList.remove("hidden");
    } else {
      adminSection.classList.add("hidden"); // Non-admin tidak bisa melihat form input
    }
  }

  await getSensor();
  await getConfig();
  await getHistory();
}

// Eksekusi boot awal halaman
loadDashboard();

// INTERVAL RE-FETCH: Hanya menarik data sensor real-time setiap 5 detik agar server hemat beban
setInterval(() => {
  getSensor();
}, 5000);