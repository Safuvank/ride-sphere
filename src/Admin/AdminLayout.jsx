import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function AdminLayout() {
  return (
    <div className="flex">
      {/* Fixed Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <div className="ml-64 w-full min-h-screen bg-gray-100 p-5">
        <Outlet />
      </div>
    </div>
  );
}
