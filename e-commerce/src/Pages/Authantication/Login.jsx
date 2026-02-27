import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/api.js";
import { AuthContext } from "./AuthContext.jsx";
import { FaFlagCheckered } from "react-icons/fa"; 

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      setError("Please fill all fields!");
      return;
    }

    try {
      const { data } = await api.post("/auth/login", { email, password });

      console.log("Full login response:", data);

      const userData = data.user;
      
     
      localStorage.setItem("accessToken", data.accessToken);

      login(userData);
      console.log("Login userData:", userData);

      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-lime-500/10 blur-[100px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-red-600/10 blur-[100px] rounded-full" />
        {/* Speed Lines */}
        <div className="absolute top-0 right-1/3 w-1 h-full bg-zinc-900 skew-x-[-20deg]" />
        <div className="absolute top-0 right-1/4 w-1 h-full bg-zinc-900 skew-x-[-20deg]" />
      </div>

      <div className="relative z-10 w-[90%] sm:w-[400px]">
        {/* Card Container */}
        <div className="bg-zinc-900 border-2 border-zinc-800 p-8 shadow-2xl shadow-black/50 relative">
          {/* Top Border Accent */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-lime-500 via-white to-lime-500" />

          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-zinc-950 border border-zinc-700 rounded-full flex items-center justify-center text-lime-500">
                <FaFlagCheckered size={20} />
              </div>
            </div>
            <h2 className="text-3xl font-black italic uppercase text-white tracking-tighter">
              Welcome{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-green-600">
                Back
              </span>
            </h2>
            <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mt-2">
              Resume Your Journey
            </p>
          </div>

          {error && (
            <div className="bg-red-900/20 border-l-4 border-red-500 text-red-400 p-3 mb-6 text-sm font-bold italic text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase text-zinc-500 mb-1 ml-1">
                Email
              </label>
              <input
                type="email"
                placeholder="RIDER@EXAMPLE.COM"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-950 border border-zinc-700 text-white placeholder-zinc-700 focus:outline-none focus:border-lime-500 focus:ring-1 focus:ring-lime-500 transition-all font-medium italic"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-zinc-500 mb-1 ml-1">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-950 border border-zinc-700 text-white placeholder-zinc-700 focus:outline-none focus:border-lime-500 focus:ring-1 focus:ring-lime-500 transition-all font-medium italic"
              />
            </div>

            <button className="w-full py-4 mt-2 font-black uppercase tracking-widest text-sm transform -skew-x-12 transition-all duration-300 group bg-lime-500 text-zinc-950 hover:bg-white hover:scale-[1.02] shadow-lg shadow-lime-500/20">
              <span className="block transform skew-x-12">Sign In</span>
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-zinc-800 text-center">
            <p className="text-zinc-400 text-sm font-medium">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-red-500 hover:text-white font-black italic uppercase transition-colors ml-1"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
