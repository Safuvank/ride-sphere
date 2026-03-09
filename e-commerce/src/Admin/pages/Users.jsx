import React, { useEffect, useState } from "react";
import api from "../../api/api";
import { FaBan, FaCheck, FaUserSlash } from "react-icons/fa";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      // const res = await api.get("/admin/users");
      // const res = await api.get(`/admin/users?keyword=${keyword}`);
      // setUsers(res.data);

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
    <div className="text-white">
      {/* Header */}
      <div className="flex items-center gap-4 mb-10 border-b border-zinc-800 pb-4">
        <div className="h-8 w-1 bg-lime-500 skew-x-[-20deg]" />
        <h1 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter text-white">
          User <span className="text-lime-500">Roster</span>
        </h1>
      </div>

      <input
        type="text"
        placeholder="Search user..."
        value={keyword}
        onChange={(e) => {
          setKeyword(e.target.value);
          setPage(1);
        }}
        className="bg-zinc-800 border border-zinc-700 px-4 py-2 mb-6 w-full text-white"
      />

      <div className="bg-zinc-900 border border-zinc-800 overflow-x-auto shadow-2xl relative">
        {/* Top Border Accent */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-lime-500 via-zinc-800 to-transparent" />

        <table className="w-full border-collapse text-sm text-left mt-1">
          <thead className="bg-zinc-950 border-b-2 border-zinc-800">
            <tr>
              <th className="p-4 font-black italic uppercase tracking-widest text-zinc-500">
                ID
              </th>
              <th className="p-4 font-black italic uppercase tracking-widest text-zinc-500">
                Name
              </th>
              <th className="p-4 font-black italic uppercase tracking-widest text-zinc-500">
                Email
              </th>
              <th className="p-4 font-black italic uppercase tracking-widest text-zinc-500">
                Status
              </th>
              <th className="p-4 font-black italic uppercase tracking-widest text-zinc-500">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/50">
            {users.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-zinc-800/30 transition-colors group"
              >
                <td className="p-4 font-mono text-zinc-500 text-xs tracking-wider">
                  {user._id}
                </td>
                <td className="p-4 font-bold text-white uppercase tracking-wide">
                  {user.name}
                </td>
                <td className="p-4 text-zinc-400 font-medium italic">
                  {user.email}
                </td>
                <td className="p-4">
                  <div
                    className={`inline-flex px-3 py-1 transform -skew-x-12 border ${
                      user.blocked
                        ? "bg-red-500/10 text-red-500 border-red-500/30"
                        : "bg-lime-500/10 text-lime-400 border-lime-500/30"
                    }`}
                  >
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
      <div className="flex gap-2 mt-8 justify-center">

  {[...Array(pages).keys()].map((x) => (

    <button
      key={x + 1}
      onClick={() => setPage(x + 1)}
      className={`px-4 py-2 border ${
        page === x + 1
          ? "bg-lime-500 text-black"
          : "bg-zinc-800 text-white"
      }`}
    >
      {x + 1}
    </button>

  ))}

</div>
    </div>
  );
}
