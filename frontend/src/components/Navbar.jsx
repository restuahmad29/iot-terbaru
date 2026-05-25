import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Sesuaikan path mundurnya dengan struktur foldermu
import { LayoutDashboard, LogIn, Leaf } from "lucide-react";

export default function Navbar() {
  const { user } = useAuth(); // Mengambil data user yang sedang aktif dari Context

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 fixed top-0 inset-x-0 z-50 h-[73px] transition-all">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        
        {/* Logo Brand */}
        <Link to="/" className="flex items-center gap-2 font-bold text-lg text-emerald-600 tracking-tight">
          <Leaf className="w-5 h-5 fill-emerald-500 text-emerald-500" />
          <span>Smart Garden</span>
        </Link>

        {/* Menu Tengah Navigasi Publik */}
        <div className="flex items-center gap-6 text-sm font-medium text-gray-600">
          <Link to="/" className="hover:text-emerald-600 transition-colors">Beranda</Link>
          <Link to="/education" className="hover:text-emerald-600 transition-colors">Edukasi</Link>
        </div>

        {/* Tombol Aksi Kanan (Deteksi Login) */}
        <div>
          {user ? (
            /* ✅ JIKA SUDAH LOGIN: Tampilkan tombol masuk ke Dashboard kembali */
            <Link 
              to="/dashboard" 
              className="flex items-center gap-2 px-4 py-2.5 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 font-semibold rounded-xl text-sm transition-all"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Panel Dashboard</span>
            </Link>
          ) : (
            /* ❌ JIKA BELUM LOGIN: Tampilkan tombol login seperti biasa */
            <Link 
              to="/login" 
              className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl text-sm shadow-sm shadow-emerald-600/10 transition-all"
            >
              <LogIn className="w-4 h-4" />
              <span>Masuk Aplikasi</span>
            </Link>
          )}
        </div>

      </div>
    </nav>
  );
}