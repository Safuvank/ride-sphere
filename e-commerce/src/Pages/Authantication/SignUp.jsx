import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext.jsx";
import { FaRunning } from "react-icons/fa";

export default function SignUp() {
  const navigate = useNavigate();
  const { signup } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isValidName = (name) => /^[A-Za-z\s]+$/.test(name);

  const isValidEmail = (email) => email.includes("@") && !email.includes(" ");

  const isValidPassword = (password) => password.length >= 6;

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();

    if (!trimmedName || !trimmedEmail || !trimmedPassword) {
      setLoading(false);
      return setError("All fields are required!");
    }

    if (!isValidName(trimmedName)) {
      setLoading(false);
      return setError("Name should contain only letters");
    }

    if (!isValidEmail(trimmedEmail)) {
      setLoading(false);
      return setError("Invalid email address");
    }

    if (!isValidPassword(trimmedPassword)) {
      return setError("Password must be at least 6 characters");
    }

    try {
      await signup({
        name: trimmedName,
        email: trimmedEmail,
        password: trimmedPassword,
      });

      navigate("/login");
    } catch (err) {
      console.error("Signup error:", err);
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-lime-500/10 blur-[100px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-red-600/10 blur-[100px] rounded-full" />
        <div className="absolute top-0 left-1/4 w-1 h-full bg-zinc-900 skew-x-[-20deg]" />
        <div className="absolute top-0 right-1/4 w-1 h-full bg-zinc-900 skew-x-[-20deg]" />
      </div>

      <div className="relative z-10 w-[90%] sm:w-[450px]">
        {/* Card Container */}
        <div className="bg-zinc-900 border-2 border-zinc-800 p-8 shadow-2xl shadow-black/50 relative">
          {/* Top Border Accent */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 via-lime-500 to-red-600" />

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black italic uppercase text-white tracking-tighter flex items-center justify-center gap-2">
              <span className="text-lime-500">Join</span> The Ride
              <FaRunning className="text-red-600" />
            </h1>
            <p className="text-zinc-500 text-sm font-bold uppercase tracking-widest mt-2">
              Start Your Adventure
            </p>
          </div>

          {error && (
            <div className="bg-red-900/20 border-l-4 border-red-500 text-red-400 p-3 mb-6 text-sm font-bold italic">
              {error}
            </div>
          )}

          <form onSubmit={handleSignUp} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase text-zinc-500 mb-1 ml-1">
                Full Name
              </label>
              <input
                type="text"
                placeholder="RACER NAME"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-950 border border-zinc-700 text-white placeholder-zinc-700 focus:outline-none focus:border-lime-500 focus:ring-1 focus:ring-lime-500 transition-all font-medium italic"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-zinc-500 mb-1 ml-1">
                Email Address
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

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 mt-4 font-black uppercase tracking-widest text-sm transform -skew-x-12 transition-all duration-300 group ${
                loading
                  ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                  : "bg-lime-500 text-zinc-950 hover:bg-white hover:scale-[1.02]"
              }`}
            >
              <span className="block transform skew-x-12">
                {loading ? "Igniting Engine..." : "Sign Up Now"}
              </span>
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-zinc-800 text-center">
            <p className="text-zinc-400 text-sm font-medium">
              Already a member?{" "}
              <Link
                to="/login"
                className="text-red-500 hover:text-white font-black italic uppercase transition-colors ml-1"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
