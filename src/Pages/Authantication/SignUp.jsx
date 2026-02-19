import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../api/api";



export default function SignUp() {
  const navigate = useNavigate();
  

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async (e) => {
  e.preventDefault();

  if (!name || !email || !password) {
    setError("All fields are required!");
    return;
  }

  try {
    const res = await API.post("/auth/register", {
      name,
      email,
      password,
    });

    alert(res.data.message);

    navigate("/");

  } catch (err) {
    setError(
      err.response?.data?.message || "Failed to sign up"
    );
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-[90%] sm:w-[400px]">
        <h2 className="text-3xl font-semibold text-gray-800 mb-2 text-center">
          Sign Up
        </h2>
        <p className="text-gray-500 mb-6 text-center">
          Create your RideSphere account
        </p>

        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSignUp} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-400 focus:outline-none"
          />

          <input
            type="email"
            placeholder="Email address"
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
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-red-500 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
