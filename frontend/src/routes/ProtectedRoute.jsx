import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  // Tampilkan layar loading jika AuthContext sedang mengecek status login (misal: validasi token ke API)
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-500 font-medium animate-pulse">Loading...</p>
        </div>
      </div>
    );
  }

  // Jika pengecekan selesai dan user ternyata tidak terautentikasi, tendang ke halaman login
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Jika aman, render komponen child di dalamnya (misal: DashboardLayout dan Dashboard)
  return children;
}