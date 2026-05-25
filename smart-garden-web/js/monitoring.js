let chart;
let monitoringPollInterval = null; // Penampung referensi interval agar bisa dibersihkan

// === 1. AMBIL DATA RIWAYAT SENSOR ===
async function getHistory() {
  try {
    const response = await apiFetch("/sensor/history");

    // ✅ JIKA SUKSES: Berarti user sudah punya alat. Tampilkan grafik, sembunyikan form aktivasi.
    const monitoringSection = document.getElementById("monitoringSection");
    const noDeviceSection = document.getElementById("noDeviceSection");
    
    if (monitoringSection) {
      monitoringSection.classList.remove("hidden");
      monitoringSection.classList.add("block");
    }
    if (noDeviceSection) {
      noDeviceSection.classList.add("hidden");
    }

    // Validasi pelindung jika database riwayat sensor masih kosong
    if (!response || response.length === 0) return;

    // Ambil data kiriman paling terakhir/terbaru untuk mengisi angka card info di atas grafik
    const latestData = response[response.length - 1]; 
    
    // ✅ SINKRONISASI BARU: Isi teks kelembaban & status tanah di dashboard secara realtime
    const moistureText = document.getElementById("moistureText");
    const statusText = document.getElementById("statusText");
    
    if (moistureText) moistureText.innerText = `${latestData.moisture}%`;
    if (statusText) statusText.innerText = latestData.status;

    // Sinkronisasi data grafik asli Anda
    const labels = response.map(item => item.id);
    const moistureData = response.map(item => item.moisture);

    if (chart) {
      chart.data.labels = labels;
      chart.data.datasets[0].data = moistureData;
      chart.update(); 
    } else {
      renderChart(labels, moistureData);
    }

    calculateStatistics(moistureData);

  } catch (error) {
    // ✅ JIKA GAGAL KARENA BELUM PUNYA ALAT (Error 403 Forbidden)
    if (error.message.includes("403") || error.message.includes("status: 403") || error.message.includes("menghubungkan alat")) {
      
      // 1. Sembunyikan grafik, munculkan form input nomor seri alat
      const monitoringSection = document.getElementById("monitoringSection");
      const noDeviceSection = document.getElementById("noDeviceSection");
      
      if (monitoringSection) {
        monitoringSection.classList.add("hidden");
        monitoringSection.classList.remove("block");
      }
      if (noDeviceSection) {
        noDeviceSection.classList.remove("hidden");
      }

      // 2. HENTIKAN POLLING: Jangan nembak API setiap 5 detik lagi karena hasilnya pasti akan ditolak terus
      if (monitoringPollInterval) {
        clearInterval(monitoringPollInterval);
        monitoringPollInterval = null;
        console.log("Polling otomatis dihentikan sementara karena alat belum terdaftar.");
      }
    } else {
      // Jika errornya di luar masalah 403 (misal server mati / lost connection)
      console.error("Gagal memuat riwayat monitoring:", error);
    }
  }
}

// === 2. RENDERING GRAFIK CHART.JS ===
function renderChart(labels, moistureData) {
  const ctx = document.getElementById("moistureChart");
  if (!ctx) return;

  if (chart) {
    chart.destroy();
  }

  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "Kelembaban Tanah",
          data: moistureData,
          borderWidth: 3,
          tension: 0.4,
          borderColor: "#16a34a",
          backgroundColor: "rgba(22, 163, 74, 0.05)",
          fill: true
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  });
}

// === 3. KALKULASI STATISTIK ===
function calculateStatistics(data) {
  if (data.length === 0) return;

  const total = data.reduce((a, b) => a + b, 0);
  const avg = (total / data.length).toFixed(1);
  const max = Math.max(...data);
  const min = Math.min(...data);

  const avgEl = document.getElementById("avgMoisture");
  const maxEl = document.getElementById("maxMoisture");
  const minEl = document.getElementById("minMoisture");

  if (avgEl) avgEl.innerText = `${avg}%`;
  if (maxEl) maxEl.innerText = `${max}%`;
  if (minEl) minEl.innerText = `${min}%`;
}

// === 4. BOOTLOADER MANAGEMENT ===
function initMonitoring() {
  // Ambil data pertama kali saat halaman dibuka
  getHistory();

  // Jika sudah ada interval berjalan, hapus dulu agar tidak tumpang tindih
  if (monitoringPollInterval) {
    clearInterval(monitoringPollInterval);
  }

  // Daftarkan interval pengecekan berkala (5 detik)
  monitoringPollInterval = setInterval(() => {
    getHistory();
  }, 5000);
}

// Clean up interval saat pindah halaman
window.addEventListener("beforeunload", () => {
  if (monitoringPollInterval) {
    clearInterval(monitoringPollInterval);
  }
});

// === 5. LISTEN FORM HUBUNGKAN ALAT BARU ===
document.addEventListener("DOMContentLoaded", () => {
  initMonitoring();

  const activateForm = document.getElementById("activateDeviceForm");
  if (activateForm) {
    activateForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const serialNumber = document.getElementById("serialInput").value.trim();

      if (!serialNumber) {
        alert("Nomor seri alat tidak boleh kosong!");
        return;
      }

      try {
        // Kirim data nomor seri baru ke Laravel
        await apiFetch("/user/update-device", {
          method: "POST",
          body: JSON.stringify({ device_serial: serialNumber })
        });

        alert("Alat IoT berhasil dipasang ke akun Anda!");
        
        // PENTING: Hidupkan kembali sistem mesin pencari data (polling) setelah sukses pasang alat
        initMonitoring(); 
        
      } catch (error) {
        alert("Gagal menghubungkan alat: " + error.message);
      }
    });
  }
});