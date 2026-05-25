import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";

export default function MoistureChart({ history }) {
  // Format data jam menit agar sumbu X grafik terlihat rapi (HH:MM)
  const formattedHistory = history.map((item, index) => ({
    ...item,
    displayTime: item.created_at 
      ? new Date(item.created_at).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }) 
      : `Data ${index + 1}`
  }));

  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700/60 transition-colors w-full">
      <h2 className="text-lg md:text-xl font-bold mb-4 text-gray-800 dark:text-white">
        Grafik Kelembaban Realtime
      </h2>

      <div className="w-full h-[280px] md:h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={formattedHistory} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:hidden" />
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" className="hidden dark:block" />
            
            <XAxis 
              dataKey="displayTime" 
              tick={{ fontSize: 11 }} 
              stroke="#9ca3af"
            />
            <YAxis 
              domain={[0, 100]} 
              tick={{ fontSize: 11 }} 
              stroke="#9ca3af"
            />
            
            <Tooltip 
              contentStyle={{ 
                borderRadius: "12px", 
                backgroundColor: document.documentElement.classList.contains("dark") ? "#1f2937" : "#ffffff",
                borderColor: "#9ca3af",
                color: document.documentElement.classList.contains("dark") ? "#ffffff" : "#000000"
              }} 
            />
            
            <Line
              type="monotone"
              dataKey="moisture"
              stroke="#10b981"
              strokeWidth={3}
              dot={{ r: 3 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}