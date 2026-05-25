import { Edit2, Trash2, Plus } from "lucide-react";

export default function EducationTable({ educations, onEdit, onDelete, onAddClick, apiUrl }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
        <div>
          <h2 className="text-lg font-bold text-gray-800">Manajemen Edukasi Tanaman</h2>
          <p className="text-sm text-gray-500">Kelola artikel, panduan, dan gambar edukasi untuk user.</p>
        </div>
        <button
          onClick={onAddClick}
          className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium text-sm rounded-lg transition-colors shadow-sm"
        >
          <Plus size={18} />
          Tambah Edukasi
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50 text-xs font-semibold text-gray-600 uppercase tracking-wider">
              <th className="py-3 px-5 w-24">Gambar</th>
              <th className="py-3 px-5">Judul Materi</th>
              <th className="py-3 px-5">Ringkasan Konten</th>
              <th className="py-3 px-5 text-right w-32">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
            {educations?.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-10 text-gray-400">
                  Belum ada data edukasi tanaman.
                </td>
              </tr>
            ) : (
              educations?.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/70 transition-colors">
                  <td className="py-4 px-5">
                    {item.image ? (
                      <img
                        src={`${apiUrl}/storage/${item.image}`}
                        alt={item.title}
                        className="w-16 h-12 object-cover rounded-lg border border-gray-100 shadow-sm"
                      />
                    ) : (
                      <div className="w-16 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-xs text-gray-400 font-medium">
                        No Image
                      </div>
                    )}
                  </td>
                  <td className="py-4 px-5 font-semibold text-gray-900 max-w-xs truncate">
                    {item.title}
                  </td>
                  <td className="py-4 px-5 max-w-md truncate text-gray-500">
                    {item.content}
                  </td>
                  <td className="py-4 px-5 text-right whitespace-nowrap">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => onEdit(item)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit Konten"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => onDelete(item.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Hapus Konten"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}