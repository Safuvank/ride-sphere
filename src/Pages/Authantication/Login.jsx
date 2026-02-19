import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../api/api";
import { AuthContext } from "./AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill all fields!");
      return;
    }

    try {
      const { data } = await API.post("/auth/login", {
        email,
        password,
      });

       console.log("Login response:", data);

      localStorage.setItem("accessToken", data.accessToken);
      // localStorage.setItem("refreshToken", data.refreshToken);
      login(data.user)

      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white w-full max-w-sm p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-2">
          Welcome Back
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Login to your RideSphere account
        </p>

        {error && (
          <div className="bg-red-100 text-red-700 text-sm p-2 rounded mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-400 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-400 focus:outline-none"
          />

          <button
            type="submit"
            className="w-full bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition"
          >
            Sign In
          </button>
        </form>

        <p className="mt-5 text-center text-gray-600 text-sm">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-red-500 font-medium hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
