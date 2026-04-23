

import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-gray-50 font-sans text-gray-900">
      
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content Area */}
      {/* The ml-64 offsets the main content by the width of the fixed sidebar */}
      <div className="flex-1 ml-64 min-h-screen p-8">
        
        {/* Page Content Container */}
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
        
      </div>
    </div>
  );
}