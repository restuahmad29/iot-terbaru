import { useEffect, useState } from "react";
import api from "../../services/api";
import SensorCards from "../../components/dashboard/SensorCards";
import MoistureChart from "../../components/dashboard/MoistureChart";
import ModeControl from "../../components/dashboard/ModeControl";
import echo from "../../services/echo";
import toast from "react-hot-toast";

// Import skeleton di dashboard
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// Import icon Moon & Sun dari lucide-react
import { Moon, Sun } from "lucide-react";

// Import framer-motion untuk animasi enter-screen
import { motion } from "framer-motion";

export default function Dashboard() {
  const [config, setConfig] = useState(null);
  const [sensor, setSensor] = useState(null);
  const [history, setHistory] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const getConfig = async () => {
    try {
      const response = await api.get("/device-config");
      
      // SOLUSI: Deteksi otomatis apakah data dibungkus objek .data atau langsung
      const targetData = response.data?.data ? response.data.data : response.data;
      
      if (targetData) {
        setConfig(targetData);
        // Pastikan schedules yang diambil berbentuk Array
        setSchedules(Array.isArray(targetData.schedules) ? targetData.schedules : []);
      }
    } catch (error) {
      console.error("Gagal memuat konfigurasi alat:", error);
    }
  };

  const getSensor = async () => {
    try {
      const response = await api.get("/sensor/latest");
      setSensor(response.data);
    } catch (error) {
      console.error("Gagal memuat data sensor:", error);
    }
  };

  const getHistory = async () => {
    try {
      const response = await api.get("/sensor/history");
      setHistory(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Gagal memuat riwayat sensor:", error);
    }
  };

  const addSchedule = async (scheduleData) => {
    try {
      await api.post("/schedules", scheduleData);
      toast.success("Jadwal berhasil dibuat");
      getConfig(); 
    } catch (error) {
      toast.error("Gagal menambahkan jadwal");
      console.error(error);
    }
  };

  const deleteSchedule = async (id) => {
    try {
      await api.delete(`/schedules/${id}`);
      toast.success("Jadwal berhasil dihapus");
      getConfig();
    } catch (error) {
      console.error(error);
    }
  };

  const changeMode = async (mode) => {
    try {
      await api.post("/change-mode", { mode });
      toast.success(`Mode berhasil diubah ke ${mode}`);
      getConfig();
    } catch (error) {
      toast.error("Gagal mengubah mode");
      console.error(error);
    }
  };

  const manualWater = async () => {
    try {
      await api.post("/manual-water");
      toast.success("Pompa berhasil dinyalakan");
    } catch (error) {
      toast.error("Gagal menyalakan pompa");
      console.error(error);
    }
  };

  useEffect(() => {
    getConfig();
    getSensor();
    getHistory();
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    if (echo) {
      echo.channel("sensor-channel")
        .listen(".sensor.updated", (e) => {
          console.log("Realtime data masuk:", e);
          if (e && e.sensor) {
            setSensor(e.sensor);
            setHistory((prev) => {
              const currentHistory = Array.isArray(prev) ? prev : [];
              const updatedHistory = [...currentHistory, e.sensor];
              return updatedHistory.slice(-10); 
            });
          }
        });
    }

    return () => {
      if (echo) echo.leaveChannel("sensor-channel");
    };
  }, []);

  // Ambil data mode secara aman untuk menghindari blank screen
  const currentActiveMode = config?.active_mode || "otomatis";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-4 md:p-6 space-y-6 min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200"
    >
      
      {/* HEADER DASHBOARD */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 pb-4 border-b border-gray-200 dark:border-gray-700">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white">
            Dashboard Monitoring
          </h1>
          <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
            Sistem Kontrol dan Pemantauan IoT Tanaman
          </p>
        </div>
        
        {/* STATUS DEVICE & DARK MODE */}
        <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
          <div className="flex items-center gap-2 bg-green-50 dark:bg-green-900/20 px-3.5 py-1.5 rounded-full">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
            <p className="text-xs font-semibold text-green-700 dark:text-green-400">
              Device Online
            </p>
          </div>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-amber-400 hover:scale-105 transition-all shadow-sm"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* SEKSI KARTU SENSOR */}
      <div className="w-full">
        <SensorCards sensor={sensor} config={config} />
      </div>

      {/* STRUKTUR UTAMA LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start w-full">
        
        {/* Kiri & Tengah: Grafik */}
        <div className="w-full lg:col-span-2 min-w-0">
          <MoistureChart history={history} />
        </div>
        
        {/* Kanan: Panel Kontrol Mode */}
        <div className="w-full space-y-6">
          
          {/* Empty State Jadwal */}
          {currentActiveMode === "jadwal" && schedules.length === 0 && (
            <div className="text-center py-6 bg-white dark:bg-gray-800 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="text-3xl mb-2">🌱</div>
              <h3 className="text-sm font-bold text-gray-700 dark:text-white">
                Belum Ada Jadwal
              </h3>
              <p className="text-gray-400 dark:text-gray-500 text-xs px-4 mt-1">
                Gunakan form di bawah untuk membuat jadwal baru
              </p>
            </div>
          )}

          <ModeControl 
            config={config} 
            changeMode={changeMode} 
            manualWater={manualWater} 
            addSchedule={addSchedule}     
            deleteSchedule={deleteSchedule} 
          />
        </div>

      </div>
    </motion.div>
  );
}