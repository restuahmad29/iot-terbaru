import { useState } from "react";
import { Play, Plus, Trash2, Clock, Cpu, ToggleLeft } from "lucide-react";

export default function ModeControl({ config, changeMode, manualWater, addSchedule, deleteSchedule }) {
  // State untuk form input jadwal baru
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState("");

  const handleSubmitSchedule = (e) => {
    e.preventDefault();
    if (!time || !duration) return;
    
    addSchedule({ time, duration: parseInt(duration) });
    setTime("");
    setDuration("");
  };

  // Sekoci Pengaman: Jika config null/undefined, system tetap menganggap mode saat ini adalah "otomatis"
  const activeMode = config && config.active_mode ? config.active_mode : "otomatis";

  return (
    <div className="space-y-6 w-full">
      
      {/* 1. KONTROL PILIHAN MODE (DIPAKSA TETAP MUNCUL) */}
      <div className="p-5 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm transition-colors">
        <div className="flex items-center gap-2 mb-4">
          <Cpu className="w-5 h-5 text-indigo-500" />
          <h2 className="text-lg font-bold text-gray-800 dark:text-white">Mode Sistem</h2>
        </div>
        
        <div className="grid grid-cols-3 gap-2 p-1 bg-gray-50 dark:bg-gray-900 rounded-xl">
          {["otomatis", "jadwal", "manual"].map((mode) => (
            <button
              key={mode}
              onClick={() => changeMode(mode)}
              className={`py-2 px-3 text-xs md:text-sm font-semibold rounded-lg capitalize transition-all ${
                activeMode === mode
                  ? "bg-white dark:bg-gray-700 text-indigo-600 dark:text-white shadow-sm font-bold border border-gray-100 dark:border-gray-600"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* 2. KONDISIONAL MODE MANUAL: TOMBOL SIRAM */}
      {activeMode === "manual" && (
        <div className="p-5 bg-amber-50/50 dark:bg-amber-950/20 rounded-2xl border border-amber-100 dark:border-amber-900/40 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <ToggleLeft className="w-5 h-5 text-amber-500" />
            <h2 className="text-lg font-bold text-amber-800 dark:text-amber-400">Kontrol Manual</h2>
          </div>
          <p className="text-xs md:text-sm text-amber-700/80 dark:text-amber-400/70 mb-4">
            Klik tombol di bawah untuk menyalakan pompa air ESP32 secara instan selama 5 detik.
          </p>
          <button
            onClick={manualWater}
            className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-4 rounded-xl shadow-md flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <Play className="w-5 h-5 fill-current" />
            Siram Tanaman Sekarang
          </button>
        </div>
      )}

      {/* 3. KONDISIONAL MODE JADWAL: FORM & LIST JADWAL */}
      {activeMode === "jadwal" && (
        <div className="space-y-6">
          
          {/* FORM TAMBAH JADWAL */}
          <div className="p-5 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm transition-colors">
            <div className="flex items-center gap-2 mb-4">
              <Plus className="w-5 h-5 text-emerald-500" />
              <h2 className="text-lg font-bold text-gray-800 dark:text-white">Tambah Jadwal</h2>
            </div>
            
            <form onSubmit={handleSubmitSchedule} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1"> Jam Menyiram </label>
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1"> Durasi (Detik) </label>
                  <input
                    type="number"
                    placeholder="Contoh: 5"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    min="1"
                    className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all text-sm active:scale-95"
              >
                Simpan Jadwal Baru
              </button>
            </form>
          </div>

          {/* DAFTAR JADWAL AKTIF */}
          {config && config.schedules && config.schedules.length > 0 && (
            <div className="p-5 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm transition-colors">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-5 h-5 text-indigo-500" />
                <h2 className="text-lg font-bold text-gray-800 dark:text-white">Jadwal Aktif</h2>
              </div>
              <div className="divide-y divide-gray-100 dark:divide-gray-700 max-h-[220px] overflow-y-auto pr-1">
                {config.schedules.map((item) => (
                  <div key={item.id} className="flex justify-between items-center py-3 first:pt-0 last:pb-0">
                    <div>
                      <p className="text-base font-bold text-gray-800 dark:text-white">
                        {item.time ? item.time.substring(0, 5) : "--:--"} WIB
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-400">
                        Durasi: {item.duration || 5} Detik
                      </p>
                    </div>
                    <button
                      onClick={() => deleteSchedule(item.id)}
                      className="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg transition-colors group"
                      title="Hapus Jadwal"
                    >
                      <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
}