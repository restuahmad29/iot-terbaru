import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Home from "./pages/public/Home";
import Education from "./pages/public/Education";
import Login from "./pages/public/Login";
import Dashboard from "./pages/private/Dashboard";
import Monitoring from "./pages/private/Monitoring";

// DIPERBAIKI: Menyesuaikan alamat file ProtectedRoute yang benar
import ProtectedRoute from "./routes/ProtectedRoute"; 
import DashboardLayout from "./layouts/DashboardLayout";

//bagian admin
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminRoutes from "./routes/AdminRoute";

function App() {
  return (
    <Routes>
      {/* PUBLIC */}
      <Route path="/" element={<Home />} />
      <Route path="/education" element={<Education />} />
      <Route path="/login" element={<Login />} />

      {/* PRIVATE */}
      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/monitoring" element={<Monitoring />} />
      </Route>

      {/* ADMIN */}
      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/admin" element={<AdminDashboard />} />
      </Route>
    </Routes>
  );
}

export default App;