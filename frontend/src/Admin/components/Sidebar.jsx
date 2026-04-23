

import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Pages/Authantication/AuthContext";
import { 
  FaSignOutAlt, 
  FaChartPie, 
  FaUsers, 
  FaClipboardList, 
  FaBoxOpen 
} from "react-icons/fa";

export default function Sidebar() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Clean, modern active link logic
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 mb-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
      isActive
        ? "bg-blue-50 text-blue-700"
        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
    }`;

  return (
    <div className="w-64 h-screen fixed left-0 top-0 bg-white border-r border-gray-200 flex flex-col justify-between p-6 z-50 font-sans">
      
      {/* Top section */}
      <div>
        {/* Header */}
        <div className="mb-10 px-2">
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">
            Admin Dashboard
          </h2>
          <p className="text-xs text-gray-500 font-medium mt-1 uppercase tracking-wider">
            Management Panel
          </p>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col">
          <NavLink to="/admin/dashboard" className={linkClass}>
            <FaChartPie className="text-lg opacity-80" />
            <span>Overview</span>
          </NavLink>

          <NavLink to="/admin/users" className={linkClass}>
            <FaUsers className="text-lg opacity-80" />
            <span>Users</span>
          </NavLink>

          <NavLink to="/admin/orders" className={linkClass}>
            <FaClipboardList className="text-lg opacity-80" />
            <span>Manage Orders</span>
          </NavLink>

          <NavLink to="/admin/products" className={linkClass}>
            <FaBoxOpen className="text-lg opacity-80" />
            <span>Products</span>
          </NavLink>
        </nav>
      </div>

      {/* Bottom Logout button */}
      <button
        onClick={handleLogout}
        className="flex items-center justify-center gap-2 w-full bg-white border border-gray-200 text-red-600 font-medium py-3 rounded-lg hover:bg-red-50 hover:border-red-100 transition-colors duration-200 mt-6"
      >
        <FaSignOutAlt />
        <span>Logout</span>
      </button>
      
    </div>
  );
}