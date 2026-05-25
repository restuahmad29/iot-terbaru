import { ShieldCheck, User, Trash2 } from "lucide-react";

export default function UserTable({ users, onDeleteUser }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-5 border-b border-gray-100 bg-gray-50/50">
        <h2 className="text-lg font-bold text-gray-800">Daftar Pengguna Sistem</h2>
        <p className="text-sm text-gray-500">Melihat dan mengontrol akun pengguna yang terdaftar di aplikasi IoT.</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50 text-xs font-semibold text-gray-600 uppercase tracking-wider">
              <th className="py-3 px-5">Nama Lengkap</th>
              <th className="py-3 px-5">Alamat Email</th>
              <th className="py-3 px-5">Hak Akses (Role)</th>
              <th className="py-3 px-5">Tanggal Bergabung</th>
              <th className="py-3 px-5 text-right w-24">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
            {users?.map((account) => (
              <tr key={account.id} className="hover:bg-gray-50/70 transition-colors">
                <td className="py-3.5 px-5 font-medium text-gray-900">{account.name}</td>
                <td className="py-3.5 px-5 text-gray-500">{account.email}</td>
                <td className="py-3.5 px-5">
                  {account.role === "admin" ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-50 text-purple-700 border border-purple-200">
                      <ShieldCheck size={12} />
                      Admin
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                      <User size={12} />
                      User/Petani
                    </span>
                  )}
                </td>
                <td className="py-3.5 px-5 text-gray-500">
                  {new Date(account.created_at).toLocaleDateString("id-ID", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </td>
                <td className="py-3.5 px-5 text-right">
                  <button
                    disabled={account.role === "admin"}
                    onClick={() => onDeleteUser(account.id)}
                    className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
                    title={account.role === "admin" ? "Admin Utama tidak bisa dihapus" : "Hapus Akun Pengguna"}
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}