// import React, { useContext } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import { AuthContext } from "../Pages/Authantication/AuthContext";

// export default function Sidebar() {
//   const { logout } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout(); // remove user from context/localStorage
//     navigate("/login"); // redirect to login page
//   };

//   const linkClass = ({ isActive }) =>
//     `block px-4 py-2 rounded-lg my-2 text-white hover:bg-red-500 hover:text-white ${
//       isActive ? "bg-red-500 text-white" : ""
//     }`;

//   return (
//     <div className="w-64 h-screen fixed left-0 top-0 bg-gray-800 flex flex-col justify-between shadow-lg p-4">
//       {/* ✅ Top section */}
//       <div>
//         <h2 className="text-2xl font-bold text-center mb-6 text-white">
//           Admin
//         </h2>
//         <nav>
//           <NavLink to="/admin/overview" className={linkClass}>
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

//       {/* ✅ Bottom Logout button */}
//       <button
//         onClick={handleLogout}
//         className="bg-white text-gray-800 font-semibold py-2 rounded-lg mt-6 cursor-pointer"
//       >
//         Logout
//       </button>
//     </div>
//   );
// }
