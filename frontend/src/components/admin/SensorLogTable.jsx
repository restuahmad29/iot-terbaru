import { RefreshCw, Droplet } from "lucide-react";

export default function SensorLogTable({ history, onRefresh }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
        <div>
          <h2 className="text-lg font-bold text-gray-800">Log Pengiriman Sensor IoT</h2>
          <p className="text-sm text-gray-500">Rekam jejak seluruh data kelembaban tanah dari hardware ESP32.</p>
        </div>
        <button
          onClick={onRefresh}
          className="p-2 text-gray-600 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors shadow-sm bg-white"
          title="Refresh Log"
        >
          <RefreshCw size={16} />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50 text-xs font-semibold text-gray-600 uppercase tracking-wider">
              <th className="py-3 px-5">ID Log</th>
              <th className="py-3 px-5">Tingkat Kelembaban</th>
              <th className="py-3 px-5">Status Tanah</th>
              <th className="py-3 px-5">Waktu Penerimaan Data</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
            {history?.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-10 text-gray-400">
                  Belum ada transmisi data sensor masuk.
                </td>
              </tr>
            ) : (
              history?.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-3 px-5 text-gray-500 font-mono">#{log.id}</td>
                  <td className="py-3 px-5 font-semibold text-gray-900">
                    <div className="flex items-center gap-1.5">
                      <Droplet size={14} className="text-blue-500" />
                      {log.moisture}%
                    </div>
                  </td>
                  <td className="py-3 px-5">
                    <span
                      className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                        log.status === "Kering"
                          ? "bg-red-50 text-red-700 border-red-100"
                          : log.status === "Lembab"
                          ? "bg-green-50 text-green-700 border-green-100"
                          : "bg-blue-50 text-blue-700 border-blue-100"
                      }`}
                    >
                      {log.status}
                    </span>
                  </td>
                  <td className="py-3 px-5 text-gray-500">
                    {new Date(log.created_at).toLocaleString("id-ID", {
                      dateStyle: "medium",
                      timeStyle: "medium",
                    })}
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