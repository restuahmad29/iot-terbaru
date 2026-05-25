import { Outlet, Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Activity,
  CalendarDays,
  GraduationCap,
  BookOpen, // Ikon resmi untuk Katalog
  Cpu,
  Menu,
  X,
  ChevronRight
} from "lucide-react";
import { useState } from "react";

export default function DashboardLayout() {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Mengatur style menu navigasi agar lebih clean dan modern
  const getMenuClass = (path) => {
    const base = "group w-full flex items-center justify-between p-3 rounded-xl font-medium transition-all duration-200 text-sm relative ";

    if (location.pathname === path) {
      return base + "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 font-semibold";
    }

    return base + "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800/60";
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950 overflow-hidden font-sans transition-colors duration-200">
      
      {/* Overlay Mobile dengan blur efek modern */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden transition-all"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64
        bg-white dark:bg-gray-900 text-gray-800 dark:text-white p-5
        border-r border-gray-100 dark:border-gray-800/80
        transform transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>

        {/* LOGO AREA */}
        <div className="flex justify-between items-center pb-6 mb-4 border-b border-gray-100 dark:border-gray-800/60">
          <h1 className="font-bold text-lg flex items-center gap-2.5 tracking-tight text-gray-900 dark:text-white">
            <div className="p-2 bg-emerald-500 rounded-xl text-white shadow-sm shadow-emerald-500/20">
              <Cpu className="w-5 h-5" />
            </div>
            <span>Smart Garden</span>
          </h1>

          <button
            className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* MENU NAVIGASI */}
        <nav className="space-y-1.5">
          <p className="px-3 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2.5">Menu Utama</p>

          <Link to="/" className={getMenuClass("/")}>
            <div className="flex items-center gap-3">
              <LayoutDashboard className="w-4 h-4" />
              <span>Beranda</span>
            </div>
            {location.pathname === "/" && <ChevronRight className="w-3.5 h-3.5" />}
          </Link>

          <Link to="/education" className={getMenuClass("/education")}>
            <div className="flex items-center gap-3">
              <GraduationCap className="w-4 h-4" />
              <span>Edukasi</span>
            </div>
            {location.pathname === "/education" && <ChevronRight className="w-3.5 h-3.5" />}
          </Link>

          {/* ✅ PERBAIKAN: Ikon diganti ke BookOpen, teks kapital, dan validasi indikator diarahkan ke "/catalog" */}
          <Link to="/catalog" className={getMenuClass("/catalog")}>
            <div className="flex items-center gap-3">
              <BookOpen className="w-4 h-4" />
              <span>Katalog</span>
            </div>
            {location.pathname === "/catalog" && <ChevronRight className="w-3.5 h-3.5" />}
          </Link>

          <p className="px-3 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest pt-4 mb-2.5">Sistem IoT</p>

          <Link to="/dashboard" className={getMenuClass("/dashboard")}>
            <div className="flex items-center gap-3">
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </div>
            {location.pathname === "/dashboard" && <ChevronRight className="w-3.5 h-3.5" />}
          </Link>

          <Link to="/monitoring" className={getMenuClass("/monitoring")}>
            <div className="flex items-center gap-3">
              <Activity className="w-4 h-4" />
              <span>Monitoring</span>
            </div>
            {location.pathname === "/monitoring" && <ChevronRight className="w-3.5 h-3.5" />}
          </Link>

          <Link to="/schedule" className={getMenuClass("/schedule")}>
            <div className="flex items-center gap-3">
              <CalendarDays className="w-4 h-4" />
              <span>Jadwal</span>
            </div>
            {location.pathname === "/schedule" && <ChevronRight className="w-3.5 h-3.5" />}
          </Link>
        </nav>
      </aside>

      {/* KONTEN UTAMA */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* HEADER TOP BAR */}
        <header className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800/80 px-6 py-4 flex items-center justify-between h-[73px] transition-colors">
          <div className="flex items-center">
            <button
              className="lg:hidden p-2 -ml-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>

            <h1 className="ml-3 lg:ml-0 font-bold text-base md:text-lg text-gray-800 dark:text-white tracking-tight">
              Sistem Pemantauan Tanaman
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:block w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
          </div>
        </header>

        {/* AREA ISI HALAMAN (OUTLET) */}
        <main className="flex-1 overflow-y-auto bg-gray-50/50 dark:bg-gray-950 p-4 md:p-6 lg:p-8">
          <div className="max-w-[1400px] mx-auto w-full">
            <Outlet />
          </div>
        </main>

      </div>
    </div>
  );
}