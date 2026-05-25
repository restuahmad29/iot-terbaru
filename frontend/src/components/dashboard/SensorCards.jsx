import { Droplet, Sprout, Cpu } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function SensorCards({ sensor, config }) {
  return (
    // Menggunakan grid responsif yang adaptif dengan layout dashboard utama
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full">
      
      {/* KARTU 1: KELEMBABAN */}
      <div className="bg-white dark:bg-gray-800 p-5 md:p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700/60 flex items-center justify-between transition-colors">
        <div>
          <p className="text-xs md:text-sm font-semibold text-gray-400 dark:text-gray-400 uppercase tracking-wider">Kelembaban Tanah</p>
          <h3 className="text-2xl md:text-3xl font-black text-gray-800 dark:text-white mt-1">
            {sensor ? `${sensor.moisture}%` : <Skeleton height={35} width={80} />}
          </h3>
        </div>
        <div className="p-3 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-xl">
          <Droplet size={24} className="animate-pulse" />
        </div>
      </div>

      {/* KARTU 2: STATUS TANAH */}
      <div className="bg-white dark:bg-gray-800 p-5 md:p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700/60 flex items-center justify-between transition-colors">
        <div>
          <p className="text-xs md:text-sm font-semibold text-gray-400 dark:text-gray-400 uppercase tracking-wider">Status Tanah</p>
          <div className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mt-1 capitalize">
            {sensor ? sensor.status : <Skeleton height={30} width={100} />}
          </div>
        </div>
        <div className="p-3 bg-green-50 dark:bg-green-950/40 text-green-600 dark:text-green-400 rounded-xl">
          {/* Diubah dari Thermometer menjadi Sprout (Ikon Tanaman) agar relevan dengan status tanah */}
          <Sprout size={24} />
        </div>
      </div>

      {/* KARTU 3: MODE AKTIF DEVICE */}
      <div className="bg-white dark:bg-gray-800 p-5 md:p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700/60 flex items-center justify-between transition-colors sm:col-span-2 lg:col-span-1">
        <div>
          <p className="text-xs md:text-sm font-semibold text-gray-400 dark:text-gray-400 uppercase tracking-wider">Mode Aktif Sistem</p>
          <div className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mt-1 capitalize">
            {config ? config.active_mode : <Skeleton height={30} width={100} />}
          </div>
        </div>
        <div className="p-3 bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 rounded-xl">
          <Cpu size={24} />
        </div>
      </div>

    </div>
  );
}