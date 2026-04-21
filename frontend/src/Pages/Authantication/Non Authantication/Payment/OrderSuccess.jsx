import React from "react";
import { Link, useLocation, Navigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

export default function OrderSuccess() {
  const location = useLocation();

  // Keep existing logic to prevent direct access
  if (!location.state?.success) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 font-sans">
      
      {/* Success Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-12 max-w-md w-full text-center">
        
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-green-500">
            <FaCheckCircle size={40} />
          </div>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Order Successful!
        </h2>
        
        <p className="text-gray-600 mb-8 leading-relaxed">
          Thank you for shopping with us. Your order has been placed and will be delivered to you soon.
        </p>

        <Link
          to="/orderhistory"
          className="block w-full bg-blue-600 text-white px-8 py-3.5 rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-sm"
        >
          View Your Orders
        </Link>

        <div className="mt-6">
          <Link
            to="/products"
            className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>

      </div>
    </div>
  );
}