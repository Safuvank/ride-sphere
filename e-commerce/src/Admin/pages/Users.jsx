// import React, { useEffect, useState } from "react";
// import api from "../../api/api";

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
//       setUsers(users.map((u) => (u.id === user.id ? updatedUser : u)));
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





import React, { useEffect, useState } from "react";
import api from "../../api/api";
import { FaBan, FaCheck, FaUserSlash } from "react-icons/fa"; // Added sporty icons

export default function Users() {
  const [users, setUsers] = useState([]);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Block / Unblock user
  const toggleBlock = async (user) => {
    try {
      const updatedUser = { ...user, blocked: !user.blocked };
      await api.put(`${"/users"}/${user.id}`, updatedUser);
      setUsers(users.map((u) => (u.id === user.id ? updatedUser : u)));
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="text-white">
      {/* Header */}
      <div className="flex items-center gap-4 mb-10 border-b border-zinc-800 pb-4">
        <div className="h-8 w-1 bg-lime-500 skew-x-[-20deg]" />
        <h1 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter text-white">
            User <span className="text-lime-500">Roster</span>
        </h1>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 overflow-x-auto shadow-2xl relative">
        {/* Top Border Accent */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-lime-500 via-zinc-800 to-transparent" />

        <table className="w-full border-collapse text-sm text-left mt-1">
          <thead className="bg-zinc-950 border-b-2 border-zinc-800">
            <tr>
              <th className="p-4 font-black italic uppercase tracking-widest text-zinc-500">ID</th>
              <th className="p-4 font-black italic uppercase tracking-widest text-zinc-500">Name</th>
              <th className="p-4 font-black italic uppercase tracking-widest text-zinc-500">Email</th>
              <th className="p-4 font-black italic uppercase tracking-widest text-zinc-500">Status</th>
              <th className="p-4 font-black italic uppercase tracking-widest text-zinc-500">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/50">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-zinc-800/30 transition-colors group">
                <td className="p-4 font-mono text-zinc-500 text-xs tracking-wider">{user._id}</td>
                <td className="p-4 font-bold text-white uppercase tracking-wide">{user.name}</td>
                <td className="p-4 text-zinc-400 font-medium italic">{user.email}</td>
                <td className="p-4">
                  <div className={`inline-flex px-3 py-1 transform -skew-x-12 border ${
                    user.blocked 
                      ? "bg-red-500/10 text-red-500 border-red-500/30" 
                      : "bg-lime-500/10 text-lime-400 border-lime-500/30"
                  }`}>
                    <span className="block transform skew-x-12 text-[10px] font-black uppercase tracking-widest">
                      {user.blocked ? "Suspended" : "Active"}
                    </span>
                  </div>
                </td>
                <td className="p-4">
                  <button
                    onClick={() => toggleBlock(user)}
                    className={`group/btn relative px-6 py-2 transform -skew-x-12 transition-all duration-300 font-black italic uppercase tracking-widest text-xs flex items-center justify-center min-w-[120px] ${
                      user.blocked
                        ? "bg-lime-500 text-zinc-950 hover:bg-white"
                        : "bg-red-600 text-white hover:bg-white hover:text-black"
                    }`}
                  >
                    <span className="transform skew-x-12 flex items-center gap-2">
                      {user.blocked ? (
                        <>
                          <FaCheck className="text-sm" /> Restore
                        </>
                      ) : (
                        <>
                          <FaBan className="text-sm" /> Suspend
                        </>
                      )}
                    </span>
                  </button>
                </td>
              </tr>
            ))}

            {users.length === 0 && (
              <tr>
                <td colSpan="5" className="p-12 text-center bg-zinc-900/50">
                  <FaUserSlash className="text-zinc-700 text-5xl mx-auto mb-4" />
                  <p className="text-zinc-500 font-black italic uppercase tracking-widest text-lg">
                    No Users Detected.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}