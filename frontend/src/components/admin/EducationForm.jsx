import { useState, useEffect } from "react";
import { X, Upload, Save } from "lucide-react";

export default function EducationForm({ currentData, onSave, onClose, apiUrl }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    if (currentData) {
      setTitle(currentData.title || "");
      setContent(currentData.content || "");
      if (currentData.image) {
        setImagePreview(`${apiUrl}/storage/${currentData.image}`);
      }
    } else {
      setTitle("");
      setContent("");
      setImageFile(null);
      setImagePreview("");
    }
  }, [currentData, apiUrl]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (imageFile) {
      formData.append("image", imageFile);
    }
    onSave(formData);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 max-w-2xl w-full">
      <div className="flex justify-between items-center mb-6 pb-3 border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-800">
          {currentData ? "Edit Konten Edukasi" : "Tambah Konten Edukasi Baru"}
        </h2>
        <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600 transition-colors">
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Judul Edukasi</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Masukkan judul materi tanaman..."
            className="w-full px-3.5 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Isi Materi Edukasi</label>
          <textarea
            required
            rows="6"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Tuliskan panduan edukasi secara lengkap di sini..."
            className="w-full px-3.5 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all text-sm resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Cover Gambar Tanaman</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            <div className="relative border-2 border-dashed border-gray-300 hover:border-green-500 rounded-xl p-4 transition-colors flex flex-col items-center justify-center bg-gray-50 group cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <Upload className="text-gray-400 group-hover:text-green-600 mb-2 transition-colors" size={24} />
              <span className="text-xs font-medium text-gray-600 group-hover:text-green-600 transition-colors">
                Pilih atau seret gambar
              </span>
              <span className="text-[10px] text-gray-400 mt-1">PNG, JPG, JPEG up to 2MB</span>
            </div>

            {imagePreview && (
              <div className="relative border border-gray-200 rounded-xl overflow-hidden h-28 bg-gray-100 flex items-center justify-center">
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Batal
          </button>
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg shadow-sm transition-colors"
          >
            <Save size={16} />
            Simpan Konten
          </button>
        </div>
      </form>
    </div>
  );
}