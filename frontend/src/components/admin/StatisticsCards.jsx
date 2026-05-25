import { Users, BookOpen, Database, Percent } from "lucide-react";

export default function StatisticsCards({ totalUsers, totalEducations, totalLogs, avgMoisture }) {
  const cards = [
    {
      title: "Total Pengguna",
      value: totalUsers ?? 0,
      sub: "Akun Petani/Admin Terdaftar",
      icon: <Users className="text-blue-600" size={24} />,
      bg: "bg-blue-50 border-blue-100",
    },
    {
      title: "Konten Edukasi",
      value: totalEducations ?? 0,
      sub: "Artikel & Panduan Tanaman",
      icon: <BookOpen className="text-green-600" size={24} />,
      bg: "bg-green-50 border-green-100",
    },
    {
      title: "Data Transmisi",
      value: totalLogs ?? 0,
      sub: "Total Log Masuk dari Alat",
      icon: <Database className="text-amber-600" size={24} />,
      bg: "bg-amber-50 border-amber-100",
    },
    {
      title: "Rerata Kelembaban",
      value: `${avgMoisture ?? 0}%`,
      sub: "Nilai Sensor Kondisi Terkini",
      icon: <Percent className="text-purple-600" size={24} />,
      bg: "bg-purple-50 border-purple-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between hover:scale-[1.02] transition-transform duration-200"
        >
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">{card.title}</p>
            <h3 className="text-3xl font-bold text-gray-800">{card.value}</h3>
            <p className="text-xs text-gray-500 font-medium">{card.sub}</p>
          </div>
          <div className={`p-3 rounded-xl border ${card.bg}`}>
            {card.icon}
          </div>
        </div>
      ))}
    </div>
  );
}