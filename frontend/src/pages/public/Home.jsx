import { Link } from "react-router-dom";
import { Cpu, Droplet, Layout, CheckCircle, ArrowRight, Activity, Calendar } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      
      {/* 1. NAVBAR */}
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm px-6 md:px-10 py-4 flex justify-between items-center border-b border-gray-100">
        <h1 className="text-xl font-black text-green-700 tracking-tight flex items-center gap-2">
          <Cpu className="w-6 h-6" />
          Smart Garden
        </h1>
        <div className="space-x-1 md:space-x-5 font-semibold text-sm text-gray-600">
          <Link to="/" className="px-3 py-2 text-green-700 transition-colors">
            Beranda
          </Link>
          <Link to="/education" className="px-3 py-2 hover:text-green-700 transition-colors">
            Edukasi
          </Link>
          <Link to="/monitoring" className="px-3 py-2 hover:text-green-700 transition-colors">
            Monitoring
          </Link>
          <Link to="/login" className="ml-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-all shadow-sm">
            Login
          </Link>
        </div>
      </nav>

      {/* 2. HERO SECTION (SESUAI PERINTAH) */}
      <section className="min-h-[calc(100--80px)] flex items-center justify-center bg-gradient-to-br from-green-700 to-green-900 text-white px-6 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent)] pointer-events-none" />
        <div className="text-center z-10 max-w-3xl mx-auto space-y-6">
          <span className="bg-green-600/50 text-green-200 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-green-500/30">
            IoT Eco-System v1.0
          </span>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-none mb-6">
            Smart Garden IoT
          </h1>
          <p className="text-lg md:text-xl text-green-100 max-w-2xl mx-auto font-medium leading-relaxed">
            Monitoring dan penyiraman tanaman otomatis berbasis ESP32
          </p>
          <div className="pt-4 flex justify-center gap-4">
            <Link to="/login" className="inline-flex items-center gap-2 bg-white text-green-800 font-bold px-6 py-3 rounded-xl shadow-md hover:bg-green-50 hover:scale-105 transition-all">
              Mulai Monitor
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/education" className="inline-flex items-center bg-green-800/40 text-white font-semibold px-6 py-3 rounded-xl border border-green-500/30 hover:bg-green-800/60 transition-all">
              Pelajari Edukasi
            </Link>
          </div>
        </div>
      </section>

      {/* 3. FEATURE SECTION */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            Fitur Unggulan Sistem
          </h2>
          <p className="text-gray-500 mt-3 text-sm md:text-base">
            Arsitektur cerdas yang menggabungkan hardware andal dan integrasi software terpadu.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl w-fit mb-5 group-hover:scale-110 transition-transform">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">Monitoring Realtime</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Memantau kadar kelembaban tanah secara instan kapan saja menggunakan pemancar sensor IoT berbasis WebSockets.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
            <div className="p-3 bg-green-50 text-green-600 rounded-xl w-fit mb-5 group-hover:scale-110 transition-transform">
              <Droplet className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">Penyiraman Otomatis</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Kecerdasan buatan mikro yang mampu mengaktifkan pompa air secara mandiri begitu mendeteksi tanah kritis air.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-xl w-fit mb-5 group-hover:scale-110 transition-transform">
              <Layout className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">Kontrol Jarak Jauh</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Kendali penuh saklar manual pompa serta manajemen penjadwalan penyiraman langsung melalui panel cloud website.
            </p>
          </div>
        </div>
      </section>

      {/* 4. MONITORING PREVIEW */}
      <section className="py-16 px-6 bg-gray-100/60 border-y border-gray-200/50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Otomatisasi & Keunggulan Infrastruktur Alat
            </h2>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
              Sistem Smart Watering ini dirancang hemat air dan efisien menggunakan modul ESP32. Memberikan kestabilan pengiriman log data dan automasi terjadwal demi kesehatan pertumbuhan tanaman Anda.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {["Realtime Monitoring", "Kontrol Jarak Jauh", "Efisiensi Air", "Smart Automation"].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-sm font-semibold text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>
          
          {/* Mockup Card Preview */}
          <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 space-y-4 max-w-md mx-auto w-full">
            <div className="flex justify-between items-center pb-2 border-b border-gray-50">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Preview Node</span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-100">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Active
              </span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase">Kelembaban</p>
                <h4 className="text-2xl font-black text-gray-800 mt-0.5">68%</h4>
              </div>
              <Droplet className="text-blue-500 w-8 h-8" />
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase">Mode Aktif</p>
                <h4 className="text-lg font-bold text-gray-800 mt-0.5">Otomatis (Auto)</h4>
              </div>
              <Calendar className="text-purple-500 w-6 h-6" />
            </div>
          </div>
        </div>
      </section>

      {/* 5. CTA (CALL TO ACTION) SECTION */}
      <section className="py-20 px-6 text-center max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-3xl p-10 md:p-14 shadow-xl space-y-6 relative overflow-hidden">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight">
            Mulai Pantau Kebun Anda Sekarang
          </h2>
          <p className="text-green-100 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            Dapatkan hak akses kontrol penuh serta grafik analitik sensor kelembaban secara instan.
          </p>
          <div className="pt-2">
            <Link to="/login" className="inline-flex items-center gap-2 bg-white text-green-700 font-bold px-8 py-3.5 rounded-xl shadow-md hover:bg-gray-50 transition-all transform hover:-translate-y-0.5">
              Masuk ke Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* 6. FOOTER */}
      <footer className="bg-white border-t border-gray-200 py-8 px-6 text-center text-sm text-gray-400 font-medium">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} Smart Garden IoT. All rights reserved.</p>
          <div className="flex gap-4 text-gray-500">
            <Link to="/" className="hover:text-green-700 transition-colors">Beranda</Link>
            <Link to="/education" className="hover:text-green-700 transition-colors">Edukasi</Link>
            <Link to="/monitoring" className="hover:text-green-700 transition-colors">Monitoring</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}