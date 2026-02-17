
import React from "react";
import { Link } from "react-router-dom";

export default function ErrorResponse() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <h1 className="text-[120px] font-bold text-red-500 leading-none">404</h1>
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">
        Oops! Page Not Found
      </h2>
      <p className="text-gray-600 mb-6 px-4">
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-red-500 text-white rounded-full font-medium hover:bg-red-600 transition"
      >
        Back to Home
      </Link>
    </div>
  );
}
