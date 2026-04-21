// import React, { useEffect, useState } from "react";
// import api from "../../api/api";
// import { FaBan, FaCheck, FaUserSlash } from "react-icons/fa";

// export default function Users() {
//   const [users, setUsers] = useState([]);
//   const [keyword, setKeyword] = useState("");
//   const [page, setPage] = useState(1);
//   const [pages, setPages] = useState(1);

//   // Fetch all users
//   const fetchUsers = async () => {
//     try {
//       // const res = await api.get("/admin/users");
//       // const res = await api.get(`/admin/users?keyword=${keyword}`);
//       // setUsers(res.data);

//       const res = await api.get(`/admin/users?page=${page}&keyword=${keyword}`);

//       setUsers(res.data.users);
//       setPages(res.data.pages);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, [page, keyword]);

//   const toggleBlock = async (user) => {
//     try {
//       const res = await api.put(`/admin/users/block/${user._id}`);

//       setUsers(users.map((u) => (u._id === user._id ? res.data : u)));
//     } catch (error) {
//       console.error("Error updating user:", error);
//     }
//   };

//   return (
//     <div className="text-white">
//       {/* Header */}
//       <div className="flex items-center gap-4 mb-10 border-b border-zinc-800 pb-4">
//         <div className="h-8 w-1 bg-lime-500 skew-x-[-20deg]" />
//         <h1 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter text-white">
//           User <span className="text-lime-500">Roster</span>
//         </h1>
//       </div>

//       <input
//         type="text"
//         placeholder="Search user..."
//         value={keyword}
//         onChange={(e) => {
//           setKeyword(e.target.value);
//           setPage(1);
//         }}
//         className="bg-zinc-800 border border-zinc-700 px-4 py-2 mb-6 w-full text-white"
//       />

//       <div className="bg-zinc-900 border border-zinc-800 overflow-x-auto shadow-2xl relative">
//         {/* Top Border Accent */}
//         <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-lime-500 via-zinc-800 to-transparent" />

//         <table className="w-full border-collapse text-sm text-left mt-1">
//           <thead className="bg-zinc-950 border-b-2 border-zinc-800">
//             <tr>
//               <th className="p-4 font-black italic uppercase tracking-widest text-zinc-500">
//                 ID
//               </th>
//               <th className="p-4 font-black italic uppercase tracking-widest text-zinc-500">
//                 Name
//               </th>
//               <th className="p-4 font-black italic uppercase tracking-widest text-zinc-500">
//                 Email
//               </th>
//               <th className="p-4 font-black italic uppercase tracking-widest text-zinc-500">
//                 Status
//               </th>
//               <th className="p-4 font-black italic uppercase tracking-widest text-zinc-500">
//                 Action
//               </th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-zinc-800/50">
//             {users.map((user) => (
//               <tr
//                 key={user.id}
//                 className="hover:bg-zinc-800/30 transition-colors group"
//               >
//                 <td className="p-4 font-mono text-zinc-500 text-xs tracking-wider">
//                   {user._id}
//                 </td>
//                 <td className="p-4 font-bold text-white uppercase tracking-wide">
//                   {user.name}
//                 </td>
//                 <td className="p-4 text-zinc-400 font-medium italic">
//                   {user.email}
//                 </td>
//                 <td className="p-4">
//                   <div
//                     className={`inline-flex px-3 py-1 transform -skew-x-12 border ${
//                       user.blocked
//                         ? "bg-red-500/10 text-red-500 border-red-500/30"
//                         : "bg-lime-500/10 text-lime-400 border-lime-500/30"
//                     }`}
//                   >
//                     <span className="block transform skew-x-12 text-[10px] font-black uppercase tracking-widest">
//                       {user.blocked ? "Suspended" : "Active"}
//                     </span>
//                   </div>
//                 </td>
//                 <td className="p-4">
//                   <button
//                     onClick={() => toggleBlock(user)}
//                     className={`group/btn relative px-6 py-2 transform -skew-x-12 transition-all duration-300 font-black italic uppercase tracking-widest text-xs flex items-center justify-center min-w-[120px] ${
//                       user.blocked
//                         ? "bg-lime-500 text-zinc-950 hover:bg-white"
//                         : "bg-red-600 text-white hover:bg-white hover:text-black"
//                     }`}
//                   >
//                     <span className="transform skew-x-12 flex items-center gap-2">
//                       {user.blocked ? (
//                         <>
//                           <FaCheck className="text-sm" /> Restore
//                         </>
//                       ) : (
//                         <>
//                           <FaBan className="text-sm" /> Suspend
//                         </>
//                       )}
//                     </span>
//                   </button>
//                 </td>
//               </tr>
//             ))}

//             {users.length === 0 && (
//               <tr>
//                 <td colSpan="5" className="p-12 text-center bg-zinc-900/50">
//                   <FaUserSlash className="text-zinc-700 text-5xl mx-auto mb-4" />
//                   <p className="text-zinc-500 font-black italic uppercase tracking-widest text-lg">
//                     No Users Detected.
//                   </p>
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//       <div className="flex gap-2 mt-8 justify-center">

//   {[...Array(pages).keys()].map((x) => (

//     <button
//       key={x + 1}
//       onClick={() => setPage(x + 1)}
//       className={`px-4 py-2 border ${
//         page === x + 1
//           ? "bg-lime-500 text-black"
//           : "bg-zinc-800 text-white"
//       }`}
//     >
//       {x + 1}
//     </button>

//   ))}

// </div>
//     </div>
//   );
// }



import React, { useEffect, useState } from "react";
import api from "../../api/api";
import { FaBan, FaCheck, FaUserSlash, FaSearch } from "react-icons/fa";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await api.get(`/admin/users?page=${page}&keyword=${keyword}`);
      setUsers(res.data.users);
      setPages(res.data.pages);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, keyword]);

  const toggleBlock = async (user) => {
    try {
      const res = await api.put(`/admin/users/block/${user._id}`);
      setUsers(users.map((u) => (u._id === user._id ? res.data : u)));
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="font-sans">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
          User Management
        </h1>
        <p className="text-gray-500 mt-1">View registered users and manage account access.</p>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6 shadow-sm flex items-center">
        <FaSearch className="text-gray-400 ml-2 mr-4" />
        <input
          type="text"
          placeholder="Search users by name or email..."
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
            setPage(1);
          }}
          className="w-full bg-transparent border-none text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-0 text-sm"
        />
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 font-semibold">
              <tr>
                <th className="px-6 py-4">User ID</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-16 text-center">
                    <FaUserSlash className="text-gray-300 text-4xl mx-auto mb-3" />
                    <p className="text-gray-500 font-medium">No users found matching your search.</p>
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-gray-500 font-mono text-xs">
                      {user._id}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900">
                      {user.name}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {user.email}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                          user.blocked
                            ? "bg-red-100 text-red-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {user.blocked ? "Suspended" : "Active"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => toggleBlock(user)}
                        className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          user.blocked
                            ? "bg-green-50 text-green-700 hover:bg-green-100 border border-green-200"
                            : "bg-white border border-gray-200 text-red-600 hover:bg-red-50 hover:border-red-100"
                        }`}
                      >
                        {user.blocked ? (
                          <>
                            <FaCheck size={12} />
                            <span>Restore Access</span>
                          </>
                        ) : (
                          <>
                            <FaBan size={12} />
                            <span>Suspend User</span>
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {pages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          {[...Array(pages).keys()].map((x) => (
            <button
              key={x + 1}
              onClick={() => setPage(x + 1)}
              className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                page === x + 1
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              {x + 1}
            </button>
          ))}
        </div>
      )}
      
    </div>
  );
}