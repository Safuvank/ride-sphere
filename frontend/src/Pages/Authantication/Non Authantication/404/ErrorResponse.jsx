
import React from "react";
import { Link } from "react-router-dom";

export default function ErrorResponse() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 font-sans">
      
      <div className="text-center max-w-lg w-full">
        
        {/* Clean 404 Number */}
        <h1 className="text-[100px] sm:text-[140px] font-extrabold text-blue-600 leading-none mb-2 drop-shadow-sm">
          404
        </h1>
        
        {/* Standard Heading */}
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
          Page Not Found
        </h2>
        
        {/* Clear Description */}
        <p className="text-gray-500 mb-10 text-base sm:text-lg leading-relaxed">
          Sorry, the page you are looking for doesn't exist, has been moved, or is temporarily unavailable.
        </p>
        
        {/* CTA Button */}
        <Link
          to="/"
          className="inline-flex items-center justify-center px-8 py-3.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors shadow-sm w-full sm:w-auto"
        >
          Back to Home
        </Link>
        
      </div>
    </div>
  );
}