// import React, { useEffect, useState } from "react";
// import api from "../api/api";


// export default function Users() {
//   const [users, setUsers] = useState([]);

//   // Fetch all users
//   const fetchUsers = async () => {
//     try {
//       const res = await api.get("/users");
//       setUsers(res.data);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   // Block / Unblock user

//   const toggleBlock = async (user) => {
//     try {
//       const updatedUser = { ...user, blocked: !user.blocked };
//       await api.put(`${"/users"}/${user.id}`, updatedUser);
//       setUsers(
//         users.map((u) => (u.id === user.id ? updatedUser : u))
//       );
//     } catch (error) {
//       console.error("Error updating user:", error);
//     }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-6">User Management</h1>

//       <div className="overflow-x-auto bg-white rounded shadow-md">
//         <table className="w-full border-collapse">
//           <thead className="bg-gray-800 text-white">
//             <tr>
//               {/* <th className="border p-2 text-left">ID</th> */}
//               <th className="border p-2 text-left">ID</th>
//               <th className="border p-2 text-left">Name</th>
//               <th className="border p-2 text-left">Email</th>
//               <th className="border p-2 text-left">Status</th>
//               <th className="border p-2 text-left">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user) => (
//               <tr key={user.id} className="border-t hover:bg-gray-50">
//                 <td className="border p-2">{user.id}</td>
//                 {/* <td className="border p-2">{user.id}</td> */}
//                 <td className="border p-2">{user.name}</td>
//                 <td className="border p-2">{user.email}</td>
//                 <td
//                   className={`border p-2 font-medium ${
//                     user.blocked ? "text-red-600" : "text-green-600 "
//                   }`}
//                 >
//                   {user.blocked ? "Blocked" : "Active"}
//                 </td>
//                 <td className="border p-2">
//                   <button
//                     onClick={() => toggleBlock(user)}
//                     className={`${
//                       user.blocked
//                         ? "bg-green-500 hover:bg-green-600"
//                         : "bg-red-500 hover:bg-red-600"
//                     } text-white px-3 py-1 rounded`}
//                   >
//                     {user.blocked ? "Unblock" : "Block"}
//                   </button>
//                 </td>
//               </tr>
//             ))}

//             {users.length === 0 && (
//               <tr>
//                 <td colSpan="5" className="text-center p-4 text-gray-500">
//                   No users found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
