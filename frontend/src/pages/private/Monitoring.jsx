import { useEffect, useState } from "react";
import api from "../../services/api";
import echo from "../../services/echo"; 

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function Monitoring() {
    const [sensor, setSensor] = useState(null);
    const [history, setHistory] = useState([]);

    const getSensor = async () => {
        try {
            const response = await api.get("/sensor/latest");
            setSensor(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const getHistory = async () => {
        try {
            const response = await api.get("/sensor/history");
            setHistory(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getSensor();
        getHistory();
    }, []);

    useEffect(() => {
        echo.channel("sensor-channel")
          .listen(".sensor.updated", (e) => {
            console.log("Realtime data masuk di Monitoring:", e);
            
            // DIPERBAIKI: Mengambil 'e' langsung untuk update card
            if (e && e.sensor) {
            setSensor(e.sensor);

            // DIPERBAIKI: Mengambil 'e' langsung untuk memperbarui jalur grafik
            setHistory((prev) => {
              const updatedHistory = [...prev, e.sensor];
              return updatedHistory.slice(-10);
            });
        }
          });

        return () => {
          echo.leaveChannel("sensor-channel");
        };
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-10">
            <h1 className="text-4xl font-bold mb-10">Monitoring IoT</h1>

            {/* CARD */}
            <div className="grid grid-cols-2 gap-5">
                <div className="bg-white p-5 rounded-xl shadow">
                    <h2 className="text-2xl font-bold mb-3">Kelembaban</h2>
                    <p className="text-5xl font-bold text-green-600">{sensor?.moisture}%</p>
                </div>

                <div className="bg-white p-5 rounded-xl shadow">
                    <h2 className="text-2xl font-bold mb-3">Status Tanah</h2>
                    <p className={`text-5xl font-bold ${sensor?.status === "Kering" ? "text-red-500" : "text-green-600"}`}>
                        {sensor?.status}
                    </p>
                </div>
            </div>

            {/* GRAFIK */}
            <div className="bg-white p-5 rounded-xl shadow mt-10">
                <h2 className="text-2xl font-bold mb-5">Grafik Kelembaban</h2>
                <ResponsiveContainer width="100%" height={350}>
                    <LineChart data={history}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="id" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="moisture" stroke="#16a34a" strokeWidth={3} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}