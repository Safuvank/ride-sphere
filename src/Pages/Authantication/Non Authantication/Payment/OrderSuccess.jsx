// OrderSuccess.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function OrderSuccess() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-10 text-center">
        <h2 className="text-3xl font-bold text-green-600 mb-4">
         Order Placed Successfully!
        </h2>
        <p className="text-gray-600 mb-6">
          Thank you for shopping with us. Your order will be delivered soon.
        </p>
        <Link
          to="/orderhistory"
          className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition"
        >
          View your Orders
        </Link>
      </div>
    </div>
  );
}
