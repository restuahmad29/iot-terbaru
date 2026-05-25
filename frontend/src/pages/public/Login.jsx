import { useState } from "react";
import { useNavigate } from "react-router-dom";
// DIPERBAIKI: Alamat mundur 2 tingkat lalu masuk folder services
import api from "../../services/api"; 
import { useAuth } from "../../context/AuthContext";

export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault(); 
        try {
            const response = await api.post("/login", {
                email,
                password
            });

            login({
                token: response.data.token,
                user: response.data.user
            });

            navigate("/dashboard");
        } catch (error) {
            alert("Login gagal");
            console.log(error);
        }
    };

    return (
        <div className="h-screen flex items-center justify-center bg-gray-50">
            <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 w-full max-w-sm space-y-4">
                <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">Login</h1>
                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50 font-medium text-sm"
                        required
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50 font-medium text-sm"
                        required
                    />
                </div>
                <button 
                    type="submit"
                    className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-md transition-all cursor-pointer text-sm transform active:scale-95"
                >
                    Login
                </button>
            </form>
        </div>
    );
}