// import React, { useContext } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import { AuthContext } from "../../Pages/Authantication/AuthContext";

// export default function Sidebar() {
//   const { logout } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout(); 
//     navigate("/login"); 
//   };

//   const linkClass = ({ isActive }) =>
//     `block px-4 py-2 rounded-lg my-2 text-white hover:bg-red-500 hover:text-white ${
//       isActive ? "bg-red-500 text-white" : ""
//     }`;

//   return (
//     <div className="w-64 h-screen fixed left-0 top-0 bg-gray-800 flex flex-col justify-between shadow-lg p-4">
//       {/* Top section */}
//       <div>
//         <h2 className="text-2xl font-bold text-center mb-6 text-white">
//           Admin
//         </h2>
//         <nav>
//           <NavLink to="/admin/dashboard" className={linkClass}>
//             Overview
//           </NavLink>
//           <NavLink to="/admin/users" className={linkClass}>
//             Users
//           </NavLink>
//           <NavLink to="/admin/manageorders" className={linkClass}>
//             Manage Orders
//           </NavLink>
//           <NavLink to="/admin/products" className={linkClass}>
//             Products
//           </NavLink>
//         </nav>
//       </div>

//       {/* Bottom Logout button */}
//       <button
//         onClick={handleLogout}
//         className="bg-white text-gray-800 font-semibold py-2 rounded-lg mt-6 cursor-pointer"
//       >
//         Logout
//       </button>
//     </div>
//   );
// }







import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Pages/Authantication/AuthContext";
import { FaSignOutAlt } from "react-icons/fa"; // Optional sporty icon

export default function Sidebar() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); 
    navigate("/login"); 
  };

  // Sporty, skewed active link logic
  const linkClass = ({ isActive }) =>
    `block px-6 py-4 my-3 font-black italic uppercase tracking-widest text-sm transition-all duration-300 transform -skew-x-12 border-2 ${
      isActive
        ? "bg-lime-500 text-zinc-950 border-lime-500 shadow-[0_0_20px_rgba(132,204,22,0.3)] scale-[1.05] ml-2"
        : "bg-zinc-900 text-zinc-500 border-zinc-800 hover:border-lime-500 hover:text-white"
    }`;

  return (
    <div className="w-64 h-screen fixed left-0 top-0 bg-zinc-950 border-r-4 border-zinc-800 flex flex-col justify-between shadow-2xl p-6 z-50">
      
      {/* Top section */}
      <div>
        {/* Slanted Racing Header */}
        <div className="mb-12 text-center">
            <div className="inline-block bg-lime-500 px-6 py-2 transform -skew-x-12 shadow-lg shadow-lime-500/20">
                <h2 className="text-2xl font-black italic text-zinc-950 uppercase tracking-tighter transform skew-x-12">
                    Admin <span className="text-white drop-shadow-md">Panel</span>
                </h2>
            </div>
        </div>

        <nav className="flex flex-col gap-2">
          <NavLink to="/admin/dashboard" className={linkClass}>
            <span className="block transform skew-x-12">Overview</span>
          </NavLink>
          
          <NavLink to="/admin/users" className={linkClass}>
            <span className="block transform skew-x-12">Users</span>
          </NavLink>
          
          <NavLink to="/admin/manageorders" className={linkClass}>
            <span className="block transform skew-x-12">Manage Orders</span>
          </NavLink>
          
          <NavLink to="/admin/products" className={linkClass}>
            <span className="block transform skew-x-12">Products</span>
          </NavLink>
        </nav>
      </div>

      {/* Bottom Logout button */}
      <button
        onClick={handleLogout}
        className="group w-full bg-red-600 text-white font-black italic uppercase tracking-widest py-4 mt-6 transform -skew-x-12 hover:bg-white hover:text-black transition-all duration-300 shadow-lg shadow-red-900/20"
      >
        <span className="flex items-center justify-center gap-2 transform skew-x-12">
          Logout <FaSignOutAlt />
        </span>
      </button>
      
    </div>
  );
}
